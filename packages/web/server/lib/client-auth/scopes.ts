// Route scopes for paired clients (#2290).
//
// A paired client's record may carry a set of route families ("scopes")
// declared when its pairing session was created. The set is enforced in
// the UI auth gate at the moment a bearer token is resolved to a client
// record, so the restriction binds to the token itself: it applies on
// every transport that presents the token, and it does not apply to the
// operator's own session cookie or tunnel session, which are separate
// credentials that never carry a client record.
//
// A record whose scopes are null is unscoped (every route the token
// authenticates), which is what every record written before scopes
// existed reads as. A record with a set — including an explicitly empty
// one — may call only the routes its families name; a route in no
// family is denied. Scope names are route families, not per-route
// strings, so the set stays stable as individual routes move.

export type ClientScope =
  | 'sessions:read'
  | 'sessions:activity'
  | 'quota:read'
  | 'sessions:message'
  | 'plans:read';

interface ScopeRoute {
  method: string;
  pattern: string;
}

// Evaluation order matters: a parameterized pattern would swallow the
// static route beneath it (/api/session/active has a session-id shape),
// so the family holding that static route is evaluated first.
const SCOPE_ROUTES: Record<ClientScope, ScopeRoute[]> = {
  'sessions:activity': [
    { method: 'GET', pattern: '/api/session/active' },
    { method: 'GET', pattern: '/api/session-activity' },
  ],
  'sessions:read': [
    { method: 'GET', pattern: '/api/session' },
    { method: 'GET', pattern: '/api/session/:sessionID' },
    { method: 'GET', pattern: '/api/session/:sessionID/message' },
    { method: 'GET', pattern: '/api/openchamber/sessions/:sessionId/metadata' },
  ],
  'quota:read': [
    { method: 'GET', pattern: '/api/quota/providers' },
    { method: 'GET', pattern: '/api/quota/extensions' },
    { method: 'GET', pattern: '/api/quota/credentials/:providerId' },
    { method: 'GET', pattern: '/api/quota/:providerId' },
  ],
  'sessions:message': [
    { method: 'POST', pattern: '/api/session/:sessionID/message' },
    { method: 'POST', pattern: '/api/message-queue/sessions/:sessionId/items' },
  ],
  'plans:read': [
    { method: 'GET', pattern: '/api/session/:sessionID/todo' },
    { method: 'GET', pattern: '/api/session-todos/:sessionId' },
    { method: 'GET', pattern: '/api/project-context/:projectId' },
  ],
};

export const CLIENT_SCOPES = Object.keys(SCOPE_ROUTES) as ClientScope[];

const isClientScope = (value: unknown): value is ClientScope =>
  typeof value === 'string' && (CLIENT_SCOPES as string[]).includes(value);

// Null means "no scopes declared": the field was absent or not an array.
// An array — even one that filters down to empty — is a declared set, so
// a declaration full of unknown names scopes the client to nothing
// rather than silently widening it to everything.
export const normalizeClientScopes = (value: unknown): ClientScope[] | null => {
  if (!Array.isArray(value)) return null;
  return Array.from(new Set(value.filter(isClientScope)));
};

const pathSegments = (path: string) => path.split('/').filter((segment) => segment.length > 0);

const routeMatches = (pattern: string, path: string) => {
  const wanted = pathSegments(pattern);
  const actual = pathSegments(path);
  if (wanted.length !== actual.length) return false;
  return wanted.every((segment, index) => segment.startsWith(':') || segment === actual[index]);
};

export const routeFamilyForRequest = (method: string | null | undefined, path: string | null | undefined): ClientScope | null => {
  const normalizedMethod = (method || '').toUpperCase();
  const normalizedPath = (path || '').split('?', 1).join('');
  if (!normalizedMethod || !normalizedPath) return null;
  for (const scope of CLIENT_SCOPES) {
    if (SCOPE_ROUTES[scope].some((route) => route.method === normalizedMethod && routeMatches(route.pattern, normalizedPath))) {
      return scope;
    }
  }
  return null;
};

// Null when the request may proceed; otherwise the family the request
// belongs to (null for a route in no family), for the denial answer.
export const clientScopeDenial = (
  client: { scopes?: readonly string[] | null } | null | undefined,
  method: string | null | undefined,
  path: string | null | undefined,
): { scope: ClientScope | null } | null => {
  const scopes = client?.scopes;
  if (!scopes) return null;
  const family = routeFamilyForRequest(method, path);
  if (family && scopes.includes(family)) return null;
  return { scope: family };
};
