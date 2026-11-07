import * as fs from 'fs';
import { getFsMimeType, normalizeFsPath, resolveFileReadPath, type FsReadPathResolution } from './bridge-fs-helpers-runtime';

// Bounded read helper for the VS Code bridge
// Enforces byte caps during the read to prevent files grown between stat and read
// from being buffered past the limit.
const readBoundedFile = async (filePath: string, maxBytes: number): Promise<{ ok: true, content: string } | { ok: false, status: number, error: string }> => {
  let fd: number | null = null;
  try {
    fd = fs.openSync(filePath, fs.constants.O_RDONLY);
  } catch (error: any) {
    if (error?.code === 'ENOENT') {
      return { ok: false, status: 404, error: 'File not found' };
    }
    return { ok: false, status: 500, error: 'Unable to open file' };
  }
  
  try {
    const stat = fs.fstatSync(fd);
    if (!stat.isFile()) {
      return { ok: false, status: 400, error: 'Specified path is not a file' };
    }
    
    // Read in chunks to enforce the cap during reading
    const chunks: Buffer[] = [];
    let total = 0;
    const READ_CHUNK_BYTES = 64 * 1024;
    
    while (total <= maxBytes) {
      const chunk = Buffer.alloc(Math.min(READ_CHUNK_BYTES, maxBytes + 1 - total));
      const bytesRead = fs.readSync(fd, chunk, 0, chunk.length, total);
      if (bytesRead === 0) break;
      chunks.push(chunk.subarray(0, bytesRead));
      total += bytesRead;
      
      // If we've exceeded the cap during reading, stop and return too-large
      if (total > maxBytes) {
        return { ok: false, status: 413, error: `File exceeds maximum size of ${maxBytes} bytes` };
      }
    }
    
    const content = Buffer.concat(chunks, total).toString('utf8');
    return { ok: true, content };
  } finally {
    if (fd !== null) {
      fs.closeSync(fd);
    }
  }
};

type ApiProxyResponsePayload = {
  status: number;
  headers: Record<string, string>;
  bodyBase64: string;
};

export const base64EncodeUtf8 = (text: string) => Buffer.from(text, 'utf8').toString('base64');

export const collectHeaders = (headers: Headers): Record<string, string> => {
  const result: Record<string, string> = {};
  headers.forEach((value, key) => {
    result[key] = value;
  });
  return result;
};

export const buildUnavailableApiResponse = (): ApiProxyResponsePayload => {
  const body = JSON.stringify({ error: 'OpenCode API unavailable' });
  return {
    status: 503,
    headers: { 'content-type': 'application/json' },
    bodyBase64: base64EncodeUtf8(body),
  };
};

export const sanitizeForwardHeaders = (input: Record<string, string> | undefined): Record<string, string> => {
  const headers: Record<string, string> = { ...(input || {}) };
  delete headers['content-length'];
  delete headers['host'];
  delete headers['connection'];
  return headers;
};

// Local-fs proxy read caps (#1027): the bridge answers with the whole file
// base64-encoded inside one JSON payload, so neither read route can stream
// and an uncapped file is held in memory several times over (Buffer, base64
// string, payload copy). The text route is capped tighter because its body
// is ALSO a UTF-8 string copy: 16 MiB of text is already a ~21 MiB payload,
// and no legitimate editor text file approaches it. The raw route serves
// the same previews/media as the web /api/fs/raw, so it takes the web
// preview cap MAX_SERVE_BYTES (packages/web/server/lib/fs/routes.js).
export const LOCAL_FS_READ_MAX_BYTES = 16 * 1024 * 1024;
export const LOCAL_FS_RAW_MAX_BYTES = 100 * 1024 * 1024;

const buildProxyJsonError = (status: number, error: string): ApiProxyResponsePayload => ({
  status,
  headers: { 'content-type': 'application/json' },
  bodyBase64: base64EncodeUtf8(JSON.stringify({ error })),
});

const normalizeFsProxyPath = (pathname: string): '/api/fs/stat' | '/api/fs/read' | '/api/fs/raw' | null => {
  if (pathname === '/api/fs/stat' || pathname === '/fs/stat') return '/api/fs/stat';
  if (pathname === '/api/fs/read' || pathname === '/fs/read') return '/api/fs/read';
  if (pathname === '/api/fs/raw' || pathname === '/fs/raw') return '/api/fs/raw';
  return null;
};

export const tryHandleLocalFsProxy = async (method: string, requestPath: string): Promise<ApiProxyResponsePayload | null> => {
  let parsed: URL;
  try {
    parsed = new URL(requestPath, 'https://openchamber.local');
  } catch {
    return buildProxyJsonError(400, 'Invalid request path');
  }

  const fsProxyPath = normalizeFsProxyPath(parsed.pathname);
  if (parsed.pathname === '/api/fs/directory-stat' || parsed.pathname === '/api/fs/directory-stats') {
    return buildProxyJsonError(501, 'Directory availability probes are not supported in the VS Code runtime');
  }
  if (/^\/api\/openchamber\/sessions\/[^/]+\/markdown-image-grants$/.test(parsed.pathname)) {
    return buildProxyJsonError(501, 'Markdown image grants are not supported in the VS Code runtime');
  }
  if (!fsProxyPath) {
    return null;
  }

  if (method !== 'GET' && method !== 'HEAD') {
    return buildProxyJsonError(405, 'Method not allowed');
  }

  const targetPath = parsed.searchParams.get('path') || '';
  const optional = parsed.searchParams.get('optional') === 'true';
  const resolution: FsReadPathResolution = await resolveFileReadPath(
    targetPath,
    parsed.searchParams.get('directory') || undefined,
  );
  if (!resolution.ok) {
    if (fsProxyPath === '/api/fs/stat' && optional && resolution.status === 404) {
      return {
        status: 200,
        headers: {
          'content-type': 'application/json',
          'cache-control': 'no-store',
        },
        bodyBase64: base64EncodeUtf8(JSON.stringify({ path: targetPath, exists: false })),
      };
    }
    return buildProxyJsonError(resolution.status, resolution.error);
  }

  try {
    const stats = await fs.promises.stat(resolution.resolvedPath);
    if (!stats.isFile()) {
      return buildProxyJsonError(400, 'Specified path is not a file');
    }

    if (fsProxyPath === '/api/fs/stat') {
      return {
        status: 200,
        headers: {
          'content-type': 'application/json',
          'cache-control': 'no-store',
        },
        bodyBase64: base64EncodeUtf8(JSON.stringify({
          path: normalizeFsPath(resolution.resolvedPath),
          isFile: true,
          size: stats.size,
          mtimeMs: stats.mtimeMs,
        })),
      };
    }

    if (fsProxyPath === '/api/fs/read') {
      const readResult = await readBoundedFile(resolution.resolvedPath, LOCAL_FS_READ_MAX_BYTES);
      if (!readResult.ok) {
        return buildProxyJsonError(readResult.status, readResult.error);
      }
      return {
        status: 200,
        headers: {
          'content-type': 'text/plain; charset=utf-8',
          'cache-control': 'no-store',
        },
        bodyBase64: base64EncodeUtf8(readResult.content),
      };
    }

    const rawResult = await readBoundedFile(resolution.resolvedPath, LOCAL_FS_RAW_MAX_BYTES);
    if (!rawResult.ok) {
      return buildProxyJsonError(rawResult.status, rawResult.error);
    }

    return {
      status: 200,
      headers: {
        'content-type': getFsMimeType(resolution.resolvedPath),
        'cache-control': 'no-store',
      },
      bodyBase64: Buffer.from(rawResult.content, 'binary').toString('base64'),
    };
  } catch (error) {
    const err = error as NodeJS.ErrnoException;
    if (err?.code === 'ENOENT') {
      if (fsProxyPath === '/api/fs/stat' && optional) {
        return {
          status: 200,
          headers: {
            'content-type': 'application/json',
            'cache-control': 'no-store',
          },
          bodyBase64: base64EncodeUtf8(JSON.stringify({ path: targetPath, exists: false })),
        };
      }
      return buildProxyJsonError(404, 'File not found');
    }
    if (fsProxyPath === '/api/fs/stat') {
      return buildProxyJsonError(500, 'Unable to stat file');
    }
    return buildProxyJsonError(500, 'Unable to read file');
  }
};
