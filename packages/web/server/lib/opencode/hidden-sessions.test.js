import { describe, expect, test } from 'bun:test';

import { createHiddenSessionRegistry, createHiddenSessionSeedPageReader } from './hidden-sessions.js';

describe('hidden sessions', () => {
  test('holds back the events of a registered session, from its creation on', () => {
    const hidden = createHiddenSessionRegistry();
    hidden.add('ses_dream');
    expect(hidden.isHiddenPayload({ type: 'session.created', data: { sessionID: 'ses_dream' } })).toBe(true);
    expect(hidden.isHiddenPayload({ type: 'message.part.delta', data: { sessionID: 'ses_dream', delta: 'x' } })).toBe(true);
    expect(hidden.isHiddenPayload({ type: 'session.updated', data: { info: { id: 'ses_dream' } } })).toBe(true);
    expect(hidden.isHiddenPayload({ type: 'session.created', data: { sessionID: 'ses_user' } })).toBe(false);
    expect(hidden.isHiddenPayload({ type: 'server.connected' })).toBe(false);
  });

  test('leaves registered sessions out of a list, in either list shape', () => {
    const hidden = createHiddenSessionRegistry();
    hidden.add('ses_dream');
    const sessions = [{ id: 'ses_dream' }, { id: 'ses_user' }];
    expect(hidden.filterSessionList({ data: sessions, cursor: null })).toEqual({ data: [{ id: 'ses_user' }], cursor: null });
    expect(hidden.filterSessionList(sessions)).toEqual([{ id: 'ses_user' }]);
  });

  test('hides a session marked hidden in a list, and its later events', () => {
    const hidden = createHiddenSessionRegistry();
    const sessions = [{ id: 'ses_plugin', metadata: { hidden: true } }, { id: 'ses_user', metadata: { openchamber: { kind: 'x' } } }];
    expect(hidden.filterSessionList({ data: sessions })).toEqual({ data: [sessions[1]] });
    expect(hidden.isHiddenPayload({ type: 'message.part.delta', data: { sessionID: 'ses_plugin' } })).toBe(true);
  });

  test('learns a hidden session from its creation event, so what follows is held back too', () => {
    const hidden = createHiddenSessionRegistry();
    expect(hidden.isHiddenPayload({ type: 'session.created', data: { sessionID: 'ses_new', metadata: { hidden: true } } })).toBe(true);
    expect(hidden.isHiddenPayload({ type: 'session.status', data: { sessionID: 'ses_new' } })).toBe(true);
    expect(hidden.isHiddenPayload({ type: 'session.created', data: { sessionID: 'ses_other', metadata: { hidden: false } } })).toBe(false);
  });

  test('learns hidden sessions that already exist from the session list', async () => {
    const hidden = createHiddenSessionRegistry();
    const pages = [
      { data: [{ id: 'ses_a', metadata: { hidden: true } }, { id: 'ses_b' }], cursor: { next: 'c2' } },
      { data: [{ id: 'ses_c', metadata: { hidden: true } }], cursor: { next: null } },
    ];
    await hidden.seed(async (cursor) => (cursor ? pages[1] : pages[0]));
    expect(hidden.has('ses_a')).toBe(true);
    expect(hidden.has('ses_c')).toBe(true);
    expect(hidden.has('ses_b')).toBe(false);
  });

  test('seed page reader returns a normal page and passes a timeout signal', async () => {
    const page = { data: [{ id: 'ses_a', metadata: { hidden: true } }], cursor: { next: null } };
    let seenSignal;
    const readPage = createHiddenSessionSeedPageReader({
      buildOpenCodeUrl: (path) => `http://loopback${path}`,
      getOpenCodeAuthHeaders: () => ({ Authorization: 'Basic x' }),
      fetchImpl: async (url, init) => {
        expect(url).toBe('http://loopback/api/session?limit=200');
        seenSignal = init.signal;
        return new Response(JSON.stringify(page), { headers: { 'content-type': 'application/json' } });
      },
    });
    expect(await readPage(null)).toEqual(page);
    expect(seenSignal).toBeInstanceOf(AbortSignal);
  });

  test('an oversized seed page aborts the seed instead of buffering unboundedly', async () => {
    const hidden = createHiddenSessionRegistry();
    const oversized = JSON.stringify({ data: [{ id: 'ses_big', metadata: { hidden: true }, pad: 'x'.repeat(4096) }], cursor: { next: 'c2' } });
    const readPage = createHiddenSessionSeedPageReader({
      buildOpenCodeUrl: (path) => `http://loopback${path}`,
      getOpenCodeAuthHeaders: () => ({}),
      maxBytes: 64,
      fetchImpl: async () => new Response(oversized, { headers: { 'content-type': 'application/json' } }),
    });
    expect(await readPage(null)).toBeNull();
    await hidden.seed(readPage);
    expect(hidden.has('ses_big')).toBe(false);
  });

  test('a slow seed page is cut by the timeout and the seed stops', async () => {
    const hidden = createHiddenSessionRegistry();
    const readPage = createHiddenSessionSeedPageReader({
      buildOpenCodeUrl: (path) => `http://loopback${path}`,
      getOpenCodeAuthHeaders: () => ({}),
      timeoutMs: 25,
      fetchImpl: async (url, init) => new Promise((resolve, reject) => {
        init.signal.addEventListener('abort', () => reject(init.signal.reason), { once: true });
      }),
    });
    const startedAt = Date.now();
    expect(await readPage(null)).toBeNull();
    expect(Date.now() - startedAt).toBeLessThan(5000);
    await hidden.seed(readPage);
    expect(hidden.has('ses_anything')).toBe(false);
  });

  test('leaves registered sessions out of the running map', () => {
    const hidden = createHiddenSessionRegistry();
    hidden.add('ses_dream');
    expect(hidden.filterActive({ data: { ses_dream: { type: 'running' }, ses_user: { type: 'running' } } }))
      .toEqual({ data: { ses_user: { type: 'running' } } });
  });
});
