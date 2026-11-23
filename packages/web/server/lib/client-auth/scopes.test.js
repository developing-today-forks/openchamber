import { describe, it, expect } from 'vitest';
import { CLIENT_SCOPES, clientScopeDenial, normalizeClientScopes, routeFamilyForRequest } from './scopes.js';

describe('client route scopes', () => {
  it('names the five route families from the babysitter design', () => {
    expect(CLIENT_SCOPES).toEqual(['sessions:activity', 'sessions:read', 'quota:read', 'sessions:message', 'plans:read']);
  });

  it('normalizes declared scopes and keeps undeclared scopes null', () => {
    expect(normalizeClientScopes(undefined)).toBe(null);
    expect(normalizeClientScopes('quota:read')).toBe(null);
    expect(normalizeClientScopes(['quota:read', 'bogus', 'sessions:read', 'quota:read'])).toEqual(['quota:read', 'sessions:read']);
    expect(normalizeClientScopes(['bogus'])).toEqual([]);
    expect(normalizeClientScopes([])).toEqual([]);
  });

  it('classifies requests into route families', () => {
    expect(routeFamilyForRequest('GET', '/api/session')).toBe('sessions:read');
    expect(routeFamilyForRequest('GET', '/api/session/ses_123')).toBe('sessions:read');
    expect(routeFamilyForRequest('GET', '/api/session/ses_123/message')).toBe('sessions:read');
    expect(routeFamilyForRequest('GET', '/api/session/active')).toBe('sessions:activity');
    expect(routeFamilyForRequest('GET', '/api/session-activity')).toBe('sessions:activity');
    expect(routeFamilyForRequest('GET', '/api/quota/providers')).toBe('quota:read');
    expect(routeFamilyForRequest('GET', '/api/quota/codex')).toBe('quota:read');
    expect(routeFamilyForRequest('GET', '/api/quota/credentials/codex')).toBe('quota:read');
    expect(routeFamilyForRequest('POST', '/api/session/ses_123/message')).toBe('sessions:message');
    expect(routeFamilyForRequest('POST', '/api/message-queue/sessions/ses_123/items')).toBe('sessions:message');
    expect(routeFamilyForRequest('GET', '/api/session/ses_123/todo')).toBe('plans:read');
    expect(routeFamilyForRequest('GET', '/api/session-todos/ses_123')).toBe('plans:read');
    expect(routeFamilyForRequest('GET', '/api/project-context/proj_1')).toBe('plans:read');
    expect(routeFamilyForRequest('GET', '/api/config/settings')).toBe(null);
    expect(routeFamilyForRequest('POST', '/api/session')).toBe(null);
    expect(routeFamilyForRequest('DELETE', '/api/quota/codex')).toBe(null);
  });

  it('admits unscoped clients everywhere and scoped clients only inside their families', () => {
    expect(clientScopeDenial(null, 'GET', '/api/config/settings')).toBe(null);
    expect(clientScopeDenial({ scopes: null }, 'GET', '/api/config/settings')).toBe(null);
    const babysitter = { scopes: ['sessions:read', 'sessions:activity', 'quota:read', 'sessions:message', 'plans:read'] };
    expect(clientScopeDenial(babysitter, 'GET', '/api/quota/codex')).toBe(null);
    expect(clientScopeDenial(babysitter, 'POST', '/api/session/ses_123/message')).toBe(null);
    const quotaOnly = { scopes: ['quota:read'] };
    expect(clientScopeDenial(quotaOnly, 'GET', '/api/quota/codex')).toBe(null);
    expect(clientScopeDenial(quotaOnly, 'GET', '/api/session')).toEqual({ scope: 'sessions:read' });
    expect(clientScopeDenial(quotaOnly, 'GET', '/api/config/settings')).toEqual({ scope: null });
    expect(clientScopeDenial({ scopes: [] }, 'GET', '/api/quota/codex')).toEqual({ scope: 'quota:read' });
  });
});
