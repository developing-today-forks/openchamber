import type { Request, RequestHandler, Response } from '../shared/http-contracts.js';
import type { RemoteClient } from './contracts.js';
import { permitsClientRoute } from './scopes.js';

type ClientAuthResult = {
  ok: boolean;
  client?: Pick<RemoteClient, 'scopes'> | null;
};

export const createClientRouteScopeGuard = ({
  authenticate,
  respondUnauthorized,
  enabled = true,
}: {
  authenticate: (req: Request) => Promise<ClientAuthResult | null>;
  respondUnauthorized: (req: Request, res: Response) => void | Response;
  enabled?: boolean;
}): RequestHandler => async (req, res, next) => {
  if (!enabled || req.method === 'OPTIONS') return next();
  const clientAuth = await authenticate(req);
  if (!clientAuth) return respondUnauthorized(req, res);
  const requestPath = req.originalUrl || req.path || req.url;
  if (!permitsClientRoute(clientAuth.client?.scopes, req.method, requestPath)) {
    return res.status(403).json({ error: 'Client route scope denied' });
  }
  return next();
};
