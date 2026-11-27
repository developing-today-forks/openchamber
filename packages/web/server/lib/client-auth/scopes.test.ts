import { describe, expect, it } from 'vitest';
import {
  CLIENT_ROUTE_SCOPES,
  isClientRouteScopeList,
  permitsClientRoute,
  requiredClientRouteScope,
} from './scopes.js';

describe('paired-client route scopes', () => {
  it('maps the babysitter route families to their named scopes', () => {
    const routes = [
      ['GET', '/api/session?limit=50', 'session-read'],
      ['GET', '/api/session/ses_1', 'session-read'],
      ['GET', '/api/session-activity', 'session-activity'],
      ['GET', '/api/quota/providers', 'quota-read'],
      ['GET', '/api/quota/codex', 'quota-read'],
      ['POST', '/api/session/ses_1/message', 'message-injection'],
      ['GET', '/api/projects', 'plan-todo-binding-read'],
      ['GET', '/api/projects/proj_1/config', 'plan-todo-binding-read'],
      ['GET', '/api/project-context/proj_1', 'plan-todo-binding-read'],
      ['GET', '/api/project-context/proj_1/plans/plan_1', 'plan-todo-binding-read'],
    ] as const;

    for (const [method, path, scope] of routes) {
      expect(requiredClientRouteScope(method, path)).toBe(scope);
      expect(permitsClientRoute([scope], method, path)).toBe(true);
      expect(permitsClientRoute(CLIENT_ROUTE_SCOPES.filter((candidate) => candidate !== scope), method, path)).toBe(false);
    }
  });

  it('denies scoped tokens on unknown paths and methods', () => {
    for (const [method, path] of [
      ['POST', '/api/session'],
      ['POST', '/api/quota/codex'],
      ['PUT', '/api/projects/proj_1/config'],
      ['GET', '/api/client-auth/clients'],
      ['POST', '/api/session/ses_1/prompt'],
    ]) {
      expect(requiredClientRouteScope(method, path)).toBeNull();
      expect(permitsClientRoute(CLIENT_ROUTE_SCOPES, method, path)).toBe(false);
    }
  });

  it('keeps a scope list restricted to the named route families', () => {
    expect(isClientRouteScopeList(['session-read', 'quota-read'])).toBe(true);
    expect(isClientRouteScopeList(['session-read', 'unknown'])).toBe(false);
    expect(isClientRouteScopeList('session-read')).toBe(false);
    expect(permitsClientRoute(null, 'GET', '/api/client-auth/clients')).toBe(true);
  });
});
