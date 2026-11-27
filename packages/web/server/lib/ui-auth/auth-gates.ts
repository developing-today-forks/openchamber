import type { NextFunction, Request, RequestHandler, Response } from '../shared/http-contracts.js';
import { isRemoteClientBearerToken } from '../client-auth/scopes.js';
import { getBearerTokenFromRequest } from './request-token.js';

type ClientAuthentication = { ok: boolean } | null;

export const createClientOnlyAuthGate = ({
  enabled,
  requireClientAuth,
  authenticateClientRequest,
  respondUnauthorized,
}: {
  enabled: boolean;
  requireClientAuth: RequestHandler;
  authenticateClientRequest: (req: Request) => Promise<ClientAuthentication>;
  respondUnauthorized: (req: Request, res: Response) => void | Response;
}): RequestHandler => async (req, res, next) => {
  if (!enabled || req.method === 'OPTIONS') return next();
  if (isRemoteClientBearerToken(getBearerTokenFromRequest(req))) {
    return requireClientAuth(req, res, next);
  }
  if (await authenticateClientRequest(req)) return next();
  return respondUnauthorized(req, res);
};

export const createUiSessionAuthGate = ({
  requireClientAuth,
  getSessionToken,
  isSessionValid,
  authenticateClientRequest,
  clearSessionCookie,
  respondUnauthorized,
}: {
  requireClientAuth: RequestHandler;
  getSessionToken: (req: Request) => string | null | undefined;
  isSessionValid: (token: string | null | undefined) => Promise<boolean>;
  authenticateClientRequest: (req: Request) => Promise<ClientAuthentication>;
  clearSessionCookie: (req: Request, res: Response) => void;
  respondUnauthorized: (req: Request, res: Response) => void | Response;
}): RequestHandler => async (req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') return next();
  if (isRemoteClientBearerToken(getBearerTokenFromRequest(req))) {
    return requireClientAuth(req, res, next);
  }
  if (await isSessionValid(getSessionToken(req))) return next();
  if (await authenticateClientRequest(req)) return next();
  clearSessionCookie(req, res);
  return respondUnauthorized(req, res);
};
