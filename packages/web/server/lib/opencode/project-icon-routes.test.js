import { describe, expect, it, vi } from 'vitest';
import crypto from 'crypto';
import path from 'path';
import os from 'os';
import nativeFsPromises from 'node:fs/promises';
import { execFileSync } from 'node:child_process';

import { registerProjectIconRoutes } from './project-icon-routes.js';

const createRouteRegistry = () => {
  const routes = new Map();

  return {
    app: {
      get(routePath, handler) {
        routes.set(`GET ${routePath}`, handler);
      },
      post(routePath, handler) {
        routes.set(`POST ${routePath}`, handler);
      },
      put(routePath, handler) {
        routes.set(`PUT ${routePath}`, handler);
      },
      delete(routePath, handler) {
        routes.set(`DELETE ${routePath}`, handler);
      },
    },
    getRoute(method, routePath) {
      return routes.get(`${method} ${routePath}`);
    },
  };
};

const createMockResponse = () => {
  const headers = new Map();
  let statusCode = 200;
  let body = null;

  return {
    setHeader(name, value) {
      headers.set(name.toLowerCase(), value);
    },
    getHeader(name) {
      return headers.get(name.toLowerCase());
    },
    status(code) {
      statusCode = code;
      return this;
    },
    json(payload) {
      body = payload;
      return this;
    },
    send(payload) {
      body = payload;
      return this;
    },
    get statusCode() {
      return statusCode;
    },
    get body() {
      return body;
    },
  };
};

const createMockFileHandle = (bytes, statSize = bytes.length) => {
  let totalBytesRead = 0;
  return {
    stat: vi.fn(async () => ({ size: statSize, isFile: () => true })),
    read: vi.fn(async (buffer, offset, length, position) => {
      const bytesRead = Math.min(length, Math.max(0, bytes.length - position));
      if (bytesRead > 0) {
        bytes.copy(buffer, offset, position, position + bytesRead);
      }
      totalBytesRead += bytesRead;
      return { bytesRead };
    }),
    close: vi.fn(async () => {}),
    totalBytesRead: () => totalBytesRead,
  };
};

describe('project icon routes', () => {
  it('uses fallback file extension MIME when metadata points to a missing icon', async () => {
    const { app, getRoute } = createRouteRegistry();
    const jpgBytes = Buffer.from('jpg-bytes');
    const enoent = Object.assign(new Error('missing'), { code: 'ENOENT' });
    const fsPromises = {
      open: vi.fn(async (iconPath) => {
        if (iconPath.endsWith('.jpg')) {
          return createMockFileHandle(jpgBytes);
        }
        throw enoent;
      }),
    };

    registerProjectIconRoutes(app, {
      fsPromises,
      path,
      crypto,
      openchamberDataDir: '/tmp/openchamber-test',
      sanitizeProjects: (projects) => projects,
      readSettingsFromDiskMigrated: async () => ({
        projects: [{
          id: 'proj-1',
          path: '/repo',
          iconImage: { mime: 'image/png', updatedAt: 1, source: 'custom' },
        }],
      }),
      persistSettings: async () => ({}),
      createFsSearchRuntime: () => ({ searchFilesystemFiles: async () => [] }),
      spawn: vi.fn(),
      resolveGitBinaryForSpawn: vi.fn(),
    });

    const res = createMockResponse();
    await getRoute('GET', '/api/projects/:projectId/icon')({
      params: { projectId: 'proj-1' },
      query: {},
    }, res);

    expect(res.statusCode).toBe(200);
    expect(res.getHeader('Content-Type')).toBe('image/jpeg');
    expect(Buffer.isBuffer(res.body)).toBe(true);
    expect(res.body.equals(jpgBytes)).toBe(true);
    // A repository icon opened as a page must stay inert.
    expect(res.getHeader('Content-Security-Policy')).toContain('sandbox');
    expect(res.getHeader('X-Content-Type-Options')).toBe('nosniff');
  });

  it('refuses an over-cap stored icon without reading it (#1537)', async () => {
    const { app, getRoute } = createRouteRegistry();
    const handle = createMockFileHandle(Buffer.alloc(0), 5 * 1024 * 1024 + 1);
    const fsPromises = {
      open: vi.fn(async () => handle),
    };

    registerProjectIconRoutes(app, {
      fsPromises,
      path,
      crypto,
      openchamberDataDir: '/tmp/openchamber-test',
      sanitizeProjects: (projects) => projects,
      readSettingsFromDiskMigrated: async () => ({
        projects: [{
          id: 'proj-1',
          path: '/repo',
          iconImage: { mime: 'image/png', updatedAt: 1, source: 'custom' },
        }],
      }),
      persistSettings: async () => ({}),
      createFsSearchRuntime: () => ({ searchFilesystemFiles: async () => [] }),
      spawn: vi.fn(),
      resolveGitBinaryForSpawn: vi.fn(),
    });

    const res = createMockResponse();
    await getRoute('GET', '/api/projects/:projectId/icon')({
      params: { projectId: 'proj-1' },
      query: {},
    }, res);

    expect(res.statusCode).toBe(413);
    expect(res.body).toEqual({ error: 'Project icon is too large' });
    expect(handle.read).not.toHaveBeenCalled();
    expect(handle.close).toHaveBeenCalledTimes(1);
  });

  it('serves an at-cap stored icon byte-identically (#1537)', async () => {
    const { app, getRoute } = createRouteRegistry();
    const atCapBytes = Buffer.alloc(5 * 1024 * 1024, 7);
    const fsPromises = {
      open: vi.fn(async () => createMockFileHandle(atCapBytes)),
    };

    registerProjectIconRoutes(app, {
      fsPromises,
      path,
      crypto,
      openchamberDataDir: '/tmp/openchamber-test',
      sanitizeProjects: (projects) => projects,
      readSettingsFromDiskMigrated: async () => ({
        projects: [{
          id: 'proj-1',
          path: '/repo',
          iconImage: { mime: 'image/png', updatedAt: 1, source: 'custom' },
        }],
      }),
      persistSettings: async () => ({}),
      createFsSearchRuntime: () => ({ searchFilesystemFiles: async () => [] }),
      spawn: vi.fn(),
      resolveGitBinaryForSpawn: vi.fn(),
    });

    const res = createMockResponse();
    await getRoute('GET', '/api/projects/:projectId/icon')({
      params: { projectId: 'proj-1' },
      query: {},
    }, res);

    expect(res.statusCode).toBe(200);
    expect(res.getHeader('Content-Type')).toBe('image/png');
    expect(res.getHeader('Cache-Control')).toBe('public, max-age=31536000, immutable');
    expect(res.body.length).toBe(atCapBytes.length);
    expect(res.body.equals(atCapBytes)).toBe(true);
  });

  it('rejects a non-regular stored icon without reading it (#1537)', async () => {
    const { app, getRoute } = createRouteRegistry();
    const read = vi.fn(async () => ({ bytesRead: 0 }));
    const handle = {
      stat: vi.fn(async () => ({ size: 0, isFile: () => false })),
      read,
      close: vi.fn(async () => {}),
    };
    const fsPromises = {
      open: vi.fn(async () => handle),
    };

    registerProjectIconRoutes(app, {
      fsPromises,
      path,
      crypto,
      openchamberDataDir: '/tmp/openchamber-test',
      sanitizeProjects: (projects) => projects,
      readSettingsFromDiskMigrated: async () => ({
        projects: [{
          id: 'proj-1',
          path: '/repo',
          iconImage: { mime: 'image/png', updatedAt: 1, source: 'custom' },
        }],
      }),
      persistSettings: async () => ({}),
      createFsSearchRuntime: () => ({ searchFilesystemFiles: async () => [] }),
      spawn: vi.fn(),
      resolveGitBinaryForSpawn: vi.fn(),
    });

    const res = createMockResponse();
    await getRoute('GET', '/api/projects/:projectId/icon')({
      params: { projectId: 'proj-1' },
      query: {},
    }, res);

    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({ error: 'Failed to read project icon' });
    expect(read).not.toHaveBeenCalled();
    expect(handle.close).toHaveBeenCalledTimes(1);
  });

  it.skipIf(process.platform === 'win32')('does not block serving a FIFO stored icon with no writer (#1537)', async () => {
    const dataDir = await nativeFsPromises.mkdtemp(path.join(os.tmpdir(), 'oc-icon-fifo-'));
    try {
      const iconsDir = path.join(dataDir, 'project-icons');
      await nativeFsPromises.mkdir(iconsDir, { recursive: true });
      const base = `project-${crypto.createHash('sha1').update('proj-1').digest('hex')}`;
      execFileSync('mkfifo', [path.join(iconsDir, `${base}.png`)]);

      const { app, getRoute } = createRouteRegistry();
      registerProjectIconRoutes(app, {
        fsPromises: nativeFsPromises,
        path,
        crypto,
        openchamberDataDir: dataDir,
        sanitizeProjects: (projects) => projects,
        readSettingsFromDiskMigrated: async () => ({
          projects: [{
            id: 'proj-1',
            path: '/repo',
            iconImage: { mime: 'image/png', updatedAt: 1, source: 'custom' },
          }],
        }),
        persistSettings: async () => ({}),
        createFsSearchRuntime: () => ({ searchFilesystemFiles: async () => [] }),
        spawn: vi.fn(),
        resolveGitBinaryForSpawn: vi.fn(),
      });

      const res = createMockResponse();
      await Promise.race([
        getRoute('GET', '/api/projects/:projectId/icon')({
          params: { projectId: 'proj-1' },
          query: {},
        }, res),
        new Promise((_, reject) => setTimeout(() => reject(new Error('icon serve blocked on FIFO open')), 3000)),
      ]);
      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({ error: 'Failed to read project icon' });
    } finally {
      await nativeFsPromises.rm(dataDir, { recursive: true, force: true });
    }
  });

  it('discovers a favicon at a Windows project root', async () => {
    const { app, getRoute } = createRouteRegistry();
    const svgBytes = Buffer.from('svg-bytes');
    const fileHandle = createMockFileHandle(svgBytes);
    const fsPromises = {
      open: vi.fn(async () => fileHandle),
      mkdir: vi.fn(async () => {}),
      writeFile: vi.fn(async () => {}),
      unlink: vi.fn(async () => {}),
    };

    registerProjectIconRoutes(app, {
      fsPromises,
      path,
      crypto,
      openchamberDataDir: '/tmp/openchamber-test',
      sanitizeProjects: (projects) => projects,
      readSettingsFromDiskMigrated: async () => ({
        projects: [{ id: 'proj-1', path: 'C:\\repo' }],
      }),
      persistSettings: async () => ({ projects: [] }),
      createFsSearchRuntime: () => ({
        searchFilesystemFiles: async () => [
          {
            name: 'favicon.svg',
            path: 'C:\\repo\\favicon.svg',
            relativePath: 'favicon.svg',
            extension: 'svg',
          },
        ],
      }),
      spawn: vi.fn(),
      resolveGitBinaryForSpawn: vi.fn(),
    });

    const res = createMockResponse();
    await getRoute('POST', '/api/projects/:projectId/icon/discover')({
      params: { projectId: 'proj-1' },
      body: {},
    }, res);

    expect(res.statusCode).toBe(200);
    expect(res.body.discoveredPath).toBe('C:\\repo\\favicon.svg');
    expect(fsPromises.open).toHaveBeenCalledWith('C:\\repo\\favicon.svg', 'r');
    expect(fileHandle.close).toHaveBeenCalledTimes(1);
  });

  it('filters out hidden or test directories and prioritizes public/ assets', async () => {
    const { app, getRoute } = createRouteRegistry();
    const icoBytes = Buffer.from('ico-bytes');
    const fileHandle = createMockFileHandle(icoBytes);
    const fsPromises = {
      open: vi.fn(async () => fileHandle),
      mkdir: vi.fn(async () => {}),
      writeFile: vi.fn(async () => {}),
      unlink: vi.fn(async () => {}),
    };
    let capturedSearchOptions = null;

    registerProjectIconRoutes(app, {
      fsPromises,
      path,
      crypto,
      openchamberDataDir: '/tmp/openchamber-test',
      sanitizeProjects: (projects) => projects,
      readSettingsFromDiskMigrated: async () => ({
        projects: [{ id: 'proj-1', path: '/repo' }],
      }),
      persistSettings: async () => ({ projects: [] }),
      createFsSearchRuntime: () => ({
        searchFilesystemFiles: async (_root, options) => {
          capturedSearchOptions = options;
          return [
            {
              name: 'favicon.ico',
              path: '/repo/.local/dep/favicon.ico',
              relativePath: '.local/dep/favicon.ico',
              extension: 'ico',
            },
            {
              name: 'favicon.ico',
              path: '/repo/tests/fixtures/favicon.ico',
              relativePath: 'tests/fixtures/favicon.ico',
              extension: 'ico',
            },
            {
              name: 'favicon.ico',
              path: '/repo/web/public/icons/favicon.ico',
              relativePath: 'web/public/icons/favicon.ico',
              extension: 'ico',
            },
          ];
        },
      }),
      spawn: vi.fn(),
      resolveGitBinaryForSpawn: vi.fn(),
    });

    const res = createMockResponse();
    await getRoute('POST', '/api/projects/:projectId/icon/discover')({
      params: { projectId: 'proj-1' },
      body: {},
    }, res);

    expect(res.statusCode).toBe(200);
    expect(capturedSearchOptions).toEqual({
      limit: 200,
      query: 'favicon',
      includeHidden: false,
      respectGitignore: true,
    });
    expect(res.body.discoveredPath).toBe('/repo/web/public/icons/favicon.ico');
  });

  it('prefers svg over ico format in the same directory', async () => {
    const { app, getRoute } = createRouteRegistry();
    const svgBytes = Buffer.from('svg-bytes');
    const fileHandle = createMockFileHandle(svgBytes);
    const fsPromises = {
      open: vi.fn(async () => fileHandle),
      mkdir: vi.fn(async () => {}),
      writeFile: vi.fn(async () => {}),
      unlink: vi.fn(async () => {}),
    };

    registerProjectIconRoutes(app, {
      fsPromises,
      path,
      crypto,
      openchamberDataDir: '/tmp/openchamber-test',
      sanitizeProjects: (projects) => projects,
      readSettingsFromDiskMigrated: async () => ({
        projects: [{ id: 'proj-1', path: '/repo' }],
      }),
      persistSettings: async () => ({ projects: [] }),
      createFsSearchRuntime: () => ({
        searchFilesystemFiles: async () => [
          {
            name: 'favicon.ico',
            path: '/repo/public/favicon.ico',
            relativePath: 'public/favicon.ico',
            extension: 'ico',
          },
          {
            name: 'favicon.svg',
            path: '/repo/public/favicon.svg',
            relativePath: 'public/favicon.svg',
            extension: 'svg',
          },
        ],
      }),
      spawn: vi.fn(),
      resolveGitBinaryForSpawn: vi.fn(),
    });

    const res = createMockResponse();
    await getRoute('POST', '/api/projects/:projectId/icon/discover')({
      params: { projectId: 'proj-1' },
      body: {},
    }, res);

    expect(res.statusCode).toBe(200);
    expect(res.body.discoveredPath).toBe('/repo/public/favicon.svg');
  });

  it('rejects an over-cap favicon from handle stat without reading it', async () => {
    const { app, getRoute } = createRouteRegistry();
    const maxBytes = 5 * 1024 * 1024;
    const fileHandle = createMockFileHandle(Buffer.from('should-not-be-read'), maxBytes + 1);
    const fsPromises = {
      open: vi.fn(async () => fileHandle),
      mkdir: vi.fn(async () => {}),
      writeFile: vi.fn(async () => {}),
      unlink: vi.fn(async () => {}),
    };

    registerProjectIconRoutes(app, {
      fsPromises,
      path,
      crypto,
      openchamberDataDir: '/tmp/openchamber-test',
      sanitizeProjects: (projects) => projects,
      readSettingsFromDiskMigrated: async () => ({
        projects: [{ id: 'proj-1', path: '/repo' }],
      }),
      persistSettings: async () => ({ projects: [] }),
      createFsSearchRuntime: () => ({
        searchFilesystemFiles: async () => [
          {
            name: 'favicon.png',
            path: '/repo/favicon.png',
            relativePath: 'favicon.png',
            extension: 'png',
          },
        ],
      }),
      spawn: vi.fn(),
      resolveGitBinaryForSpawn: vi.fn(),
    });

    const res = createMockResponse();
    await getRoute('POST', '/api/projects/:projectId/icon/discover')({
      params: { projectId: 'proj-1' },
      body: {},
    }, res);

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ error: 'Discovered icon exceeds size limit (5 MB)' });
    expect(fsPromises.open).toHaveBeenCalledWith('/repo/favicon.png', 'r');
    expect(fileHandle.stat).toHaveBeenCalledTimes(1);
    expect(fileHandle.read).not.toHaveBeenCalled();
    expect(fileHandle.close).toHaveBeenCalledTimes(1);
    expect(fsPromises.writeFile).not.toHaveBeenCalled();
  });

  it('rejects an empty favicon from handle stat without reading it', async () => {
    const { app, getRoute } = createRouteRegistry();
    const fileHandle = createMockFileHandle(Buffer.from('should-not-be-read'), 0);
    const fsPromises = {
      open: vi.fn(async () => fileHandle),
      mkdir: vi.fn(async () => {}),
      writeFile: vi.fn(async () => {}),
      unlink: vi.fn(async () => {}),
    };

    registerProjectIconRoutes(app, {
      fsPromises,
      path,
      crypto,
      openchamberDataDir: '/tmp/openchamber-test',
      sanitizeProjects: (projects) => projects,
      readSettingsFromDiskMigrated: async () => ({
        projects: [{ id: 'proj-1', path: '/repo' }],
      }),
      persistSettings: async () => ({ projects: [] }),
      createFsSearchRuntime: () => ({
        searchFilesystemFiles: async () => [
          {
            name: 'favicon.svg',
            path: '/repo/favicon.svg',
            relativePath: 'favicon.svg',
            extension: 'svg',
          },
        ],
      }),
      spawn: vi.fn(),
      resolveGitBinaryForSpawn: vi.fn(),
    });

    const res = createMockResponse();
    await getRoute('POST', '/api/projects/:projectId/icon/discover')({
      params: { projectId: 'proj-1' },
      body: {},
    }, res);

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ error: 'Discovered icon is empty' });
    expect(fileHandle.read).not.toHaveBeenCalled();
    expect(fileHandle.close).toHaveBeenCalledTimes(1);
  });

  it('discovers an at-cap favicon exactly as before', async () => {
    const { app, getRoute } = createRouteRegistry();
    const maxBytes = 5 * 1024 * 1024;
    const svgBytes = Buffer.from('svg-bytes');
    const fileHandle = createMockFileHandle(svgBytes, maxBytes);
    const fsPromises = {
      open: vi.fn(async () => fileHandle),
      mkdir: vi.fn(async () => {}),
      writeFile: vi.fn(async () => {}),
      unlink: vi.fn(async () => {}),
    };

    registerProjectIconRoutes(app, {
      fsPromises,
      path,
      crypto,
      openchamberDataDir: '/tmp/openchamber-test',
      sanitizeProjects: (projects) => projects,
      readSettingsFromDiskMigrated: async () => ({
        projects: [{ id: 'proj-1', path: '/repo' }],
      }),
      persistSettings: async () => ({ projects: [] }),
      createFsSearchRuntime: () => ({
        searchFilesystemFiles: async () => [
          {
            name: 'favicon.svg',
            path: '/repo/favicon.svg',
            relativePath: 'favicon.svg',
            extension: 'svg',
          },
        ],
      }),
      spawn: vi.fn(),
      resolveGitBinaryForSpawn: vi.fn(),
    });

    const res = createMockResponse();
    await getRoute('POST', '/api/projects/:projectId/icon/discover')({
      params: { projectId: 'proj-1' },
      body: {},
    }, res);

    expect(res.statusCode).toBe(200);
    expect(res.body.discoveredPath).toBe('/repo/favicon.svg');
    expect(fsPromises.open).toHaveBeenCalledWith('/repo/favicon.svg', 'r');
    expect(fileHandle.close).toHaveBeenCalledTimes(1);
    expect(fsPromises.writeFile).toHaveBeenCalled();
  });

  it('bounds the read when the favicon grows after the handle stat', async () => {
    const { app, getRoute } = createRouteRegistry();
    const maxBytes = 5 * 1024 * 1024;
    const fileHandle = createMockFileHandle(Buffer.alloc(maxBytes + 32, 0x61), 8);
    const fsPromises = {
      open: vi.fn(async () => fileHandle),
      mkdir: vi.fn(async () => {}),
      writeFile: vi.fn(async () => {}),
      unlink: vi.fn(async () => {}),
    };

    registerProjectIconRoutes(app, {
      fsPromises,
      path,
      crypto,
      openchamberDataDir: '/tmp/openchamber-test',
      sanitizeProjects: (projects) => projects,
      readSettingsFromDiskMigrated: async () => ({
        projects: [{ id: 'proj-1', path: '/repo' }],
      }),
      persistSettings: async () => ({}),
      createFsSearchRuntime: () => ({
        searchFilesystemFiles: async () => [
          {
            name: 'favicon.svg',
            path: '/repo/favicon.svg',
            relativePath: 'favicon.svg',
            extension: 'svg',
          },
        ],
      }),
      spawn: vi.fn(),
      resolveGitBinaryForSpawn: vi.fn(),
    });

    const res = createMockResponse();
    await getRoute('POST', '/api/projects/:projectId/icon/discover')({
      params: { projectId: 'proj-1' },
      body: {},
    }, res);

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ error: 'Discovered icon exceeds size limit (5 MB)' });
    expect(fsPromises.open).toHaveBeenCalledTimes(1);
    expect(fsPromises.open).toHaveBeenCalledWith('/repo/favicon.svg', 'r');
    expect(fileHandle.totalBytesRead()).toBe(maxBytes + 1);
    expect(fileHandle.close).toHaveBeenCalledTimes(1);
    expect(fsPromises.writeFile).not.toHaveBeenCalled();
  });
});
