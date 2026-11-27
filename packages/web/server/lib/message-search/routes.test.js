import express from 'express';
import request from 'supertest';
import { describe, expect, it, vi } from 'vitest';
import { registerMessageSearchRoutes } from './routes.js';


describe('message search routes', () => {
  const createApp = (runtime) => {
    const app = express();
    registerMessageSearchRoutes(app, { messageSearchRuntime: runtime });
    return app;
  };

  it('judges the limit strictly, so malformed spellings fall back to the default page size', async () => {
    const runtime = {
      search: vi.fn(() => ({ status: 'ok', hits: [], next: null, index: null })),
      status: vi.fn(async () => ({ state: 'on', sizeBytes: 0, index: null })),
      deleteIndex: vi.fn(async () => {}),
    };
    const app = createApp(runtime);
    // The runtime clamps a plain integer itself (1..200); the route only
    // decides which spellings are integers at all.
    const cases = [['1e3', 20], ['0x10', 20], ['2.0', 20], ['', 20], ['-5', 20], ['0', 0], ['7', 7], ['500', 500]];
    for (const [limit, expected] of cases) {
      runtime.search.mockClear();
      await request(app).get(`/api/openchamber/message-search?limit=${limit}`).expect(200);
      expect(runtime.search).toHaveBeenCalledWith(expect.objectContaining({ limit: expected }));
    }
    runtime.search.mockClear();
    await request(app).get('/api/openchamber/message-search').expect(200);
    expect(runtime.search).toHaveBeenCalledWith(expect.objectContaining({ limit: 20 }));
  });

  it('rejects a repeated session parameter instead of widening to an unscoped search', async () => {
    const runtime = {
      search: vi.fn(() => ({ status: 'ok', hits: [], next: null, index: null })),
      status: vi.fn(async () => ({ state: 'on', sizeBytes: 0, index: null })),
      deleteIndex: vi.fn(async () => {}),
    };
    const app = createApp(runtime);
    // Express delivers repeated query keys as an array; the schema parse
    // used to degrade that to '' and the route searched with
    // sessionId: null — every indexed conversation, not the requested one.
    const response = await request(app).get('/api/openchamber/message-search?q=secret&session=target-session&session=other-session');
    expect(response.status).toBe(400);
    expect(runtime.search).not.toHaveBeenCalled();
  });

  it.each([
    ['role', 'role=user&role=assistant'],
    ['lifecycle', 'lifecycle=active&lifecycle=archived'],
  ])('rejects a repeated %s parameter instead of widening the search', async (_key, params) => {
    const runtime = {
      search: vi.fn(() => ({ status: 'ok', hits: [], next: null, index: null })),
      status: vi.fn(async () => ({ state: 'on', sizeBytes: 0, index: null })),
      deleteIndex: vi.fn(async () => {}),
    };
    const app = createApp(runtime);
    const response = await request(app).get(`/api/openchamber/message-search?q=secret&${params}`);
    expect(response.status).toBe(400);
    expect(runtime.search).not.toHaveBeenCalled();
  });

  it.each([
    ['reasoning', 'reasoning=0&reasoning=1'],
    ['order', 'order=asc&order=desc'],
    ['before', 'before=1:abc&before=2:def'],
  ])('rejects a repeated %s parameter instead of degrading to the default', async (_key, params) => {
    const runtime = {
      search: vi.fn(() => ({ status: 'ok', hits: [], next: null, index: null })),
      status: vi.fn(async () => ({ state: 'on', sizeBytes: 0, index: null })),
      deleteIndex: vi.fn(async () => {}),
    };
    const app = createApp(runtime);
    const response = await request(app).get(`/api/openchamber/message-search?q=secret&${params}`);
    expect(response.status).toBe(400);
    expect(runtime.search).not.toHaveBeenCalled();
  });

  it('never silently includes reasoning on a unanimous repeated reasoning=0 opt-out', async () => {
    const runtime = {
      search: vi.fn(() => ({ status: 'ok', hits: [], next: null, index: null })),
      status: vi.fn(async () => ({ state: 'on', sizeBytes: 0, index: null })),
      deleteIndex: vi.fn(async () => {}),
    };
    const app = createApp(runtime);
    const response = await request(app).get('/api/openchamber/message-search?q=secret&reasoning=0&reasoning=0');
    if (response.status === 200) {
      expect(runtime.search).toHaveBeenCalledWith(expect.objectContaining({ includeReasoning: false }));
    } else {
      expect(response.status).toBe(400);
      expect(runtime.search).not.toHaveBeenCalled();
    }
  });

  it('keeps scalar role and lifecycle filters working', async () => {
    const runtime = {
      search: vi.fn(() => ({ status: 'ok', hits: [], next: null, index: null })),
      status: vi.fn(async () => ({ state: 'on', sizeBytes: 0, index: null })),
      deleteIndex: vi.fn(async () => {}),
    };
    const app = createApp(runtime);
    await request(app).get('/api/openchamber/message-search?q=secret&role=assistant&lifecycle=archived').expect(200);
    expect(runtime.search).toHaveBeenCalledWith(expect.objectContaining({ role: 'assistant', lifecycle: 'archived' }));
  });

  it('keeps scalar reasoning, order, and before filters working', async () => {
    const runtime = {
      search: vi.fn(() => ({ status: 'ok', hits: [], next: null, index: null })),
      status: vi.fn(async () => ({ state: 'on', sizeBytes: 0, index: null })),
      deleteIndex: vi.fn(async () => {}),
    };
    const app = createApp(runtime);
    await request(app).get('/api/openchamber/message-search?q=secret&reasoning=0&order=asc&before=42:msg_1').expect(200);
    expect(runtime.search).toHaveBeenCalledWith(expect.objectContaining({ includeReasoning: false, order: 'asc', before: { createdAt: 42, id: 'msg_1' } }));
    runtime.search.mockClear();
    await request(app).get('/api/openchamber/message-search?q=secret').expect(200);
    expect(runtime.search).toHaveBeenCalledWith(expect.objectContaining({ includeReasoning: true, order: 'desc', before: null }));
  });

  it('keeps a scalar session scoped and an absent session deliberately unscoped', async () => {
    const runtime = {
      search: vi.fn(() => ({ status: 'ok', hits: [], next: null, index: null })),
      status: vi.fn(async () => ({ state: 'on', sizeBytes: 0, index: null })),
      deleteIndex: vi.fn(async () => {}),
    };
    const app = createApp(runtime);
    await request(app).get('/api/openchamber/message-search?q=secret&session=target-session').expect(200);
    expect(runtime.search).toHaveBeenCalledWith(expect.objectContaining({ sessionId: 'target-session' }));
    runtime.search.mockClear();
    await request(app).get('/api/openchamber/message-search?q=secret').expect(200);
    expect(runtime.search).toHaveBeenCalledWith(expect.objectContaining({ sessionId: null }));
  });
});

// ---- upstream tests ----

const createApp = (searchSessions) => {
  const app = express();
  registerMessageSearchRoutes(app, {
    messageSearchRuntime: {
      searchSessions,
      search: vi.fn(),
      status: vi.fn(),
      deleteIndex: vi.fn(),
    },
  });
  return app;
};

describe('message search grouped route', () => {
  it('returns grouped hits and forwards parsed filters', async () => {
    const searchSessions = vi.fn(() => ({
      status: 'ok',
      hits: [{ sessionId: 'ses_1', sessionTitle: 'Session', directory: '/repo', archived: false, messageId: 'msg_1', role: 'user', createdAt: 1, snippet: 'match', matchCount: 1 }],
      next: { createdAt: 1, sessionId: 'ses_1' },
      totals: { sessions: 1, byDirectory: { '/repo': 1 } },
      index: { backfill: { state: 'done', total: 1, done: 1 }, sessions: 1, messages: 1, lifecycleComplete: true },
    }));
    const response = await request(createApp(searchSessions)).get('/api/openchamber/message-search/sessions?q=match&exclude=ses_2');
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ status: 'ok', next: '1:ses_1', totals: { sessions: 1 } });
    expect(searchSessions).toHaveBeenCalledWith(expect.objectContaining({ query: 'match', exclude: ['ses_2'], lifecycle: 'all' }));
  });

  it('rejects oversized exclusions and malformed cursors', async () => {
    const app = createApp(vi.fn());
    const excluded = Array.from({ length: 201 }, (_, index) => `ses_${index}`);
    expect((await request(app).get('/api/openchamber/message-search/sessions?q=match').query({ exclude: excluded })).status).toBe(400);
    expect((await request(app).get('/api/openchamber/message-search/sessions?q=match&before=bad')).status).toBe(400);
  });

  it('returns unavailable and query-too-short responses', async () => {
    const off = await request(createApp(() => null)).get('/api/openchamber/message-search/sessions?q=match');
    expect(off.status).toBe(503);
    const short = await request(createApp(() => ({ status: 'query-too-short', hits: [] }))).get('/api/openchamber/message-search/sessions?q=ab');
    expect(short.status).toBe(200);
    expect(short.body).toEqual({ status: 'query-too-short', hits: [] });
  });
});
