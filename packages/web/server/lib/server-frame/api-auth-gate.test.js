import { describe, expect, it, vi } from 'vitest';
import express from 'express';
import request from 'supertest';
import { createApiAuthGate } from './api-auth-gate.js';

describe('API auth gate with paired-client scopes', () => {
  it('resolves an explicit client token before trusted relay session auth', async () => {
    const app = express();
    const requireClientAuth = vi.fn((_req, _res, next) => next());
    const requireTunnelSession = vi.fn((_req, _res, next) => next());
    const requireAuth = vi.fn((_req, _res, next) => next());
    app.use(createApiAuthGate({
      tunnelAuthController: {
        classifyRequestScope: () => 'tunnel',
        requireTunnelSession,
      },
      uiAuthController: { requireAuth, requireClientAuth },
    }));
    app.get('/api/session', (_req, res) => res.sendStatus(200));

    await request(app)
      .get('/api/session')
      .set('Authorization', 'Bearer oc_client_scoped')
      .expect(200);

    expect(requireClientAuth).toHaveBeenCalledTimes(1);
    expect(requireTunnelSession).not.toHaveBeenCalled();
    expect(requireAuth).not.toHaveBeenCalled();
  });

  it('keeps trusted relay session auth when no client token is supplied', async () => {
    const app = express();
    const requireClientAuth = vi.fn((_req, _res, next) => next());
    const requireTunnelSession = vi.fn((_req, _res, next) => next());
    app.use(createApiAuthGate({
      tunnelAuthController: {
        classifyRequestScope: () => 'tunnel',
        requireTunnelSession,
      },
      uiAuthController: { requireAuth: vi.fn((_req, _res, next) => next()), requireClientAuth },
    }));
    app.get('/api/session', (_req, res) => res.sendStatus(200));

    await request(app).get('/api/session').expect(200);

    expect(requireTunnelSession).toHaveBeenCalledTimes(1);
    expect(requireClientAuth).not.toHaveBeenCalled();
  });
});
