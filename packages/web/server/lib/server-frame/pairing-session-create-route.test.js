import { describe, expect, it, vi } from 'vitest';
import express from 'express';
import request from 'supertest';
import { registerPairingSessionCreateRoute } from './pairing-session-create-route.js';

const createPairingApp = () => {
  const app = express();
  const createPairingSession = vi.fn(async () => ({ pairing: { id: 'pair_1', secret: 'secret' } }));
  registerPairingSessionCreateRoute(app, {
    express,
    clientPairingRuntime: { createPairingSession },
    runWithClientCreateAuth: async (_req, _res, _next, handler) => handler({ type: 'session' }),
    pairingServerCandidates: async () => [{ type: 'lan', url: 'http://localhost', priority: 10 }],
    clientIdFromAuthContext: () => null,
    getServerLabel: () => 'Test server',
    reconcileRelay: vi.fn(async () => {}),
  });
  return { app, createPairingSession };
};

describe('pairing session creation route scopes', () => {
  it('passes a validated route-scope set into the pairing session', async () => {
    const { app, createPairingSession } = createPairingApp();
    await request(app)
      .post('/api/client-auth/pairing/sessions')
      .send({ scopes: ['session-read', 'quota-read'] })
      .expect(201);

    expect(createPairingSession).toHaveBeenCalledWith(expect.objectContaining({
      scopes: ['session-read', 'quota-read'],
      localOnly: true,
    }));
  });

  it('rejects an unknown scope before creating a pairing session', async () => {
    const { app, createPairingSession } = createPairingApp();
    await request(app)
      .post('/api/client-auth/pairing/sessions')
      .send({ scopes: ['session-read', 'unrecognized'] })
      .expect(400);
    expect(createPairingSession).not.toHaveBeenCalled();
  });
});
