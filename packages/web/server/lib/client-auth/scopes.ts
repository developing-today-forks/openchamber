import type { ClientRouteScope } from './contracts.js';

export const CLIENT_ROUTE_SCOPES = [
  'session-read',
  'session-activity',
  'quota-read',
  'message-injection',
  'plan-todo-binding-read',
] as const satisfies readonly ClientRouteScope[];

const CLIENT_TOKEN_PREFIX = 'oc_client_';

export const isRemoteClientBearerToken = (token: string | null | undefined): boolean => (
  token?.startsWith(CLIENT_TOKEN_PREFIX) === true
);

export const isClientRouteScope = (value: unknown): value is ClientRouteScope => (
  typeof value === 'string' && CLIENT_ROUTE_SCOPES.some((scope) => scope === value)
);

export const isClientRouteScopeList = (value: unknown): value is ClientRouteScope[] => (
  Array.isArray(value) && value.every(isClientRouteScope)
);

export const requiredClientRouteScope = (method: string | undefined, rawPath: string | undefined): ClientRouteScope | null => {
  const path = (rawPath || '').split('?', 1)[0] || '';
  const verb = method?.toUpperCase();

  if (verb === 'GET' && (path === '/api/session' || /^\/api\/session\/[^/]+(?:\/.*)?$/.test(path))) {
    return 'session-read';
  }
  if (verb === 'GET' && path === '/api/session-activity') return 'session-activity';
  if (verb === 'GET' && (path === '/api/quota' || path.startsWith('/api/quota/'))) return 'quota-read';
  if (verb === 'POST' && /^\/api\/session\/[^/]+\/message$/.test(path)) return 'message-injection';
  if (verb === 'GET' && (
    path === '/api/projects'
    || /^\/api\/projects\/[^/]+\/config$/.test(path)
    || /^\/api\/project-context\/[^/]+(?:\/plans(?:\/[^/]+)?)?$/.test(path)
  )) {
    return 'plan-todo-binding-read';
  }
  return null;
};

export const permitsClientRoute = (
  scopes: readonly ClientRouteScope[] | null | undefined,
  method: string | undefined,
  path: string | undefined,
): boolean => {
  if (scopes == null) return true;
  const required = requiredClientRouteScope(method, path);
  return required !== null && scopes.includes(required);
};
