import { describe, expect, it } from 'vitest';

import { registerProjectSetupRoutes } from './routes.js';
import { actionPlatformOf } from './project-setup.js';

describe('project config route', () => {
  it('tells the client which OS its actions run on, the server\'s own', async () => {
    const handlers = new Map();
    const app = { get: (route, handler) => handlers.set(`GET ${route}`, handler), put: (route, handler) => handlers.set(`PUT ${route}`, handler) };
    registerProjectSetupRoutes(app, { projectConfigRuntime: { readProjectSetup: async () => ({ projectActions: [] }) } });
    const response = { status() { return this; }, json(body) { this.body = body; return this; } };
    await handlers.get('GET /api/projects/:projectId/config')({ params: { projectId: 'p' } }, response);
    expect(response.body).toEqual({ projectActions: [], platform: actionPlatformOf(process.platform) ?? null });
    expect([actionPlatformOf('darwin'), actionPlatformOf('win32'), actionPlatformOf('linux'), actionPlatformOf('freebsd')]).toEqual(['macos', 'windows', 'linux', undefined]);
  });

  it('returns a conflict when a Settings action list was read before a newer agent mutation', async () => {
    const handlers = new Map();
    const stale = Object.assign(new Error('Project actions changed since Settings loaded'), { code: 'project_actions_stale' });
    const app = { get: (route, handler) => handlers.set(`GET ${route}`, handler), put: (route, handler) => handlers.set(`PUT ${route}`, handler) };
    registerProjectSetupRoutes(app, {
      projectConfigRuntime: {
        readProjectSetup: async () => ({ projectActions: [] }),
        updateSharedProjectSetup: async () => ({}),
        updateProjectSetup: async () => { throw stale; },
      },
    });
    const response = {
      statusCode: null,
      status(code) { this.statusCode = code; return this; },
      json(body) { this.body = body; return this; },
    };

    await handlers.get('PUT /api/projects/:projectId/config')({
      params: { projectId: 'p' },
      body: { projectActions: [], projectActionsBaseRevision: 'sha256:old-settings-read' },
    }, response);

    expect(response.statusCode).toBe(409);
    expect(response.body).toEqual({ error: stale.message, code: 'project_actions_stale' });
  });
});
