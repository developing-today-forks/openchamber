import { afterEach, describe, expect, mock, test } from 'bun:test';
import * as fs from 'node:fs/promises';
import * as os from 'node:os';
import * as path from 'node:path';

// The workspace root is created per test on the real filesystem, so the
// vscode mock reads it through this mutable holder instead of a fixed path.
const state = { workspaceRoot: '' };

mock.module('vscode', () => ({
  workspace: {
    get workspaceFolders() {
      return state.workspaceRoot ? [{ uri: { fsPath: state.workspaceRoot } }] : undefined;
    },
    fs: {
      readDirectory: async (uri: { fsPath: string }) => {
        const entries = await fs.readdir(uri.fsPath, { withFileTypes: true });
        return entries.map((entry) => [entry.name, entry.isDirectory() ? 2 : 1] as [string, number]);
      },
      createDirectory: async (uri: { fsPath: string }) => {
        await fs.mkdir(uri.fsPath, { recursive: true });
      },
    },
  },
  Uri: {
    file: (fsPath: string) => ({ fsPath }),
    joinPath: (uri: { fsPath: string }, ...parts: string[]) => ({ fsPath: path.join(uri.fsPath, ...parts) }),
  },
  FileType: { Unknown: 0, File: 1, Directory: 2, SymbolicLink: 64 },
  window: {},
}));

const { handleFsBridgeMessage } = await import('./bridge-fs-runtime');
const helpers = await import('./bridge-fs-helpers-runtime');
const { tryHandleLocalFsProxy } = await import('./bridge-localfs-proxy-runtime');

const deps = {
  resolveUserPath: helpers.resolveUserPath,
  listDirectoryEntries: helpers.listDirectoryEntries,
  normalizeFsPath: helpers.normalizeFsPath,
  execGit: async () => ({ stdout: '', stderr: '', exitCode: 0 }),
  searchDirectory: async () => [],
  resolveFileReadPath: helpers.resolveFileReadPath,
  resolveDirectoryListPath: helpers.resolveDirectoryListPath,
  parseDroppedFileReference: () => {
    throw new Error('not used by fs:read/stat tests');
  },
  readUriAsAttachment: async () => {
    throw new Error('not used by fs:read/stat tests');
  },
} as unknown as Parameters<typeof handleFsBridgeMessage>[1];

const createdBases: string[] = [];

const setupTree = async () => {
  const base = await fs.mkdtemp(path.join(os.tmpdir(), 'fs-read-containment-'));
  createdBases.push(base);
  const workspace = path.join(base, 'workspace');
  const outside = path.join(base, 'outside');
  await fs.mkdir(path.join(workspace, 'inner'), { recursive: true });
  await fs.mkdir(outside, { recursive: true });
  await fs.writeFile(path.join(workspace, 'plain.txt'), 'plain-content');
  await fs.writeFile(path.join(workspace, 'inner', 'real.txt'), 'inner-content');
  await fs.writeFile(path.join(outside, 'secret.txt'), 'outside-secret');
  await fs.symlink(outside, path.join(workspace, 'escape-link'), 'dir');
  await fs.symlink(path.join(outside, 'secret.txt'), path.join(workspace, 'escape-file'), 'file');
  await fs.symlink(path.join(workspace, 'inner'), path.join(workspace, 'alias-link'), 'dir');
  await fs.symlink(path.join(workspace, 'inner', 'real.txt'), path.join(workspace, 'alias-file'), 'file');
  state.workspaceRoot = workspace;
  return { base, workspace, outside };
};

afterEach(async () => {
  state.workspaceRoot = '';
  while (createdBases.length > 0) {
    const base = createdBases.pop() as string;
    await fs.rm(base, { recursive: true, force: true });
  }
});

const read = async (payload: unknown) => {
  const result = await handleFsBridgeMessage({ id: 'read-1', type: 'api:fs:read', payload }, deps);
  if (!result) {
    throw new Error('fs:read returned no response');
  }
  return result;
};

const stat = async (payload: unknown) => {
  const result = await handleFsBridgeMessage({ id: 'stat-1', type: 'api:fs:stat', payload }, deps);
  if (!result) {
    throw new Error('fs:stat returned no response');
  }
  return result;
};

const decodeBody = (response: { bodyBase64: string }) => Buffer.from(response.bodyBase64, 'base64').toString('utf8');

describe('api:fs:read workspace containment', () => {
  test('reads a plain in-workspace file', async () => {
    await setupTree();
    const result = await read({ path: 'plain.txt' });
    expect(result.success).toBe(true);
    expect((result.data as { content: string }).content).toBe('plain-content');
  });

  test('rejects a file reached through a directory symlink escaping the workspace', async () => {
    await setupTree();
    const result = await read({ path: 'escape-link/secret.txt' });
    expect(result.success).toBe(false);
    expect(result.error).toBe('Access to file denied');
  });

  test('rejects a file symlink whose target is outside the workspace', async () => {
    await setupTree();
    const result = await read({ path: 'escape-file' });
    expect(result.success).toBe(false);
    expect(result.error).toBe('Access to file denied');
  });

  test('rejects an absolute path outside the workspace', async () => {
    const { outside } = await setupTree();
    const result = await read({ path: path.join(outside, 'secret.txt') });
    expect(result.success).toBe(false);
    expect(result.error).toBe('Access to file denied');
  });

  test('reads through a directory symlink whose target stays inside the workspace', async () => {
    await setupTree();
    const result = await read({ path: 'alias-link/real.txt' });
    expect(result.success).toBe(true);
    expect((result.data as { content: string }).content).toBe('inner-content');
  });

  test('reads through a file symlink whose target stays inside the workspace', async () => {
    await setupTree();
    const result = await read({ path: 'alias-file' });
    expect(result.success).toBe(true);
    expect((result.data as { content: string }).content).toBe('inner-content');
  });

  test('reports a missing in-workspace file instead of reading it', async () => {
    await setupTree();
    const result = await read({ path: 'nope.txt' });
    expect(result.success).toBe(false);
    expect(result.error).toBe('File not found');
  });
});

describe('api:fs:stat workspace containment', () => {
  test('stats a plain in-workspace file', async () => {
    await setupTree();
    const result = await stat({ path: 'plain.txt' });
    expect(result.success).toBe(true);
    expect((result.data as { size: number }).size).toBe('plain-content'.length);
  });

  test('rejects stat through a directory symlink escaping the workspace', async () => {
    await setupTree();
    const result = await stat({ path: 'escape-link/secret.txt' });
    expect(result.success).toBe(false);
    expect(result.error).toBe('Access to file denied');
  });

  test('rejects stat of a file symlink whose target is outside the workspace', async () => {
    await setupTree();
    const result = await stat({ path: 'escape-file' });
    expect(result.success).toBe(false);
    expect(result.error).toBe('Access to file denied');
  });

  test('stats through a symlink whose target stays inside the workspace', async () => {
    await setupTree();
    const result = await stat({ path: 'alias-file' });
    expect(result.success).toBe(true);
    expect((result.data as { size: number }).size).toBe('inner-content'.length);
  });
});

describe('resolveFileReadPath canonical containment', () => {
  test('denies a target whose canonical path escapes the access root', async () => {
    await setupTree();
    const resolution = await helpers.resolveFileReadPath('escape-link/secret.txt');
    expect(resolution).toEqual({ ok: false, status: 403, error: 'Access to file denied' });
  });

  test('resolves an in-root symlink to its canonical target', async () => {
    const { workspace } = await setupTree();
    const resolution = await helpers.resolveFileReadPath('alias-file');
    expect(resolution.ok).toBe(true);
    if (resolution.ok) {
      expect(resolution.resolvedPath).toBe(await fs.realpath(path.join(workspace, 'inner', 'real.txt')));
    }
  });
});

describe('local filesystem proxy inherits the read containment guard', () => {
  test('refuses to read a file escaping through a symlink', async () => {
    await setupTree();
    const response = await tryHandleLocalFsProxy('GET', `/api/fs/read?path=${encodeURIComponent('escape-link/secret.txt')}`);
    expect(response?.status).toBe(403);
    const body = decodeBody(response as { bodyBase64: string });
    expect(JSON.parse(body).error).toBe('Access to file denied');
    expect(body).not.toContain('outside-secret');
  });

  test('refuses to stat a file escaping through a symlink', async () => {
    await setupTree();
    const response = await tryHandleLocalFsProxy('GET', `/api/fs/stat?path=${encodeURIComponent('escape-file')}`);
    expect(response?.status).toBe(403);
    expect(JSON.parse(decodeBody(response as { bodyBase64: string })).error).toBe('Access to file denied');
  });

  test('reads and stats in-workspace files', async () => {
    await setupTree();
    const readResponse = await tryHandleLocalFsProxy('GET', `/api/fs/read?path=${encodeURIComponent('plain.txt')}`);
    expect(readResponse?.status).toBe(200);
    expect(decodeBody(readResponse as { bodyBase64: string })).toBe('plain-content');

    const statResponse = await tryHandleLocalFsProxy('GET', `/api/fs/stat?path=${encodeURIComponent('alias-file')}`);
    expect(statResponse?.status).toBe(200);
    expect(JSON.parse(decodeBody(statResponse as { bodyBase64: string })).size).toBe('inner-content'.length);
  });
});
