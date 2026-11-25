import express from 'express';
import request from 'supertest';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { createSessionAssistRuntime } from './runtime.js';
import { registerSessionAssistRoutes } from './routes.js';

/**
 * The hover card's "Summarize" request. Oracle: the outcome contract in
 * DOCUMENTATION.md ("On-demand summary"): a summary is written only for an
 * idle, top-level, unarchived, unreverted session without a current one;
 * failure and "nothing to summarize" are different answers; one run per
 * session, a cap across sessions, a cooldown after a run.
 */

const answered = [
  { id: 'msg_idle', type: 'idle', outcome: 'succeeded' },
  { id: 'msg_a', type: 'assistant', content: [{ type: 'text', text: 'Fixed the login timeout; the docs are next.' }], finish: 'stop', time: { completed: 2 }, model: { providerID: 'p', id: 'm' } },
  { id: 'msg_u', type: 'user', text: 'Fix the login timeout and update the docs' },
];

const SUMMARY_JSON = JSON.stringify({
  recap: 'Login timeout fixed.',
  done: 'Fixed the login timeout.',
  left: 'Update the docs.',
  stoppedAt: 'After the fix, before the docs.',
});

const serve = ({ sessions = {}, active = {}, records = answered, metadata } = {}) => {
  const calls = [];
  vi.stubGlobal('fetch', vi.fn(async (input) => {
    const url = new URL(String(input));
    calls.push(url.pathname);
    let body;
    if (url.pathname === '/api/session/active') body = { data: active };
    else if (url.pathname.endsWith('/message')) body = { data: records.slice(0, Number(url.searchParams.get('limit'))), cursor: {} };
    else {
      const id = url.pathname.split('/').at(-1);
      const session = sessions[id] ?? { id, location: { directory: '/repo' }, time: { created: 1, updated: 1, idle: 1_000 }, metadata };
      body = { data: session };
    }
    return new Response(JSON.stringify(body), { status: 200, headers: { 'content-type': 'application/json' } });
  }));
  return calls;
};

const runtimes = [];
const makeRuntime = (overrides = {}) => {
  const persistSessionAssist = vi.fn(async () => undefined);
  const generateSmallModelText = overrides.generateSmallModelText ?? vi.fn(async () => ({ text: SUMMARY_JSON }));
  const runtime = createSessionAssistRuntime({
    buildOpenCodeUrl: (route) => `http://opencode.test${route}`,
    getOpenCodeAuthHeaders: () => ({}),
    getSmallModelService: async () => ({
      describeSmallModel: async () => ({ inputCharBudget: 20_000 }),
      generateSmallModelText,
    }),
    getTargets: () => ({ recap: true, suggestion: true }),
    getHoverSummaryEnabled: () => true,
    persistSessionAssist,
    ...overrides,
  });
  runtimes.push(runtime);
  return { runtime, persistSessionAssist, generateSmallModelText };
};

afterEach(() => {
  while (runtimes.length > 0) runtimes.pop().stop();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  vi.useRealTimers();
});

describe('on-demand summary', () => {
  it('writes done, left and where it stopped for an idle session, keeping the suggestion written for the same answer', async () => {
    serve({ metadata: { openchamber: { assist: { recap: 'old', suggestion: 'Now the docs.', forMessageID: 'msg_a', generatedAt: 10 } } } });
    const { runtime, persistSessionAssist } = makeRuntime();

    const outcome = await runtime.summarizeNow('ses_1', '/repo', { trigger: 'manual' });

    expect(outcome).toEqual({ status: 'written' });
    expect(persistSessionAssist).toHaveBeenCalledTimes(1);
    expect(persistSessionAssist.mock.calls[0][2]).toMatchObject({
      recap: 'Login timeout fixed.',
      suggestion: 'Now the docs.',
      summary: { done: 'Fixed the login timeout.', left: 'Update the docs.', stoppedAt: 'After the fix, before the docs.' },
      forMessageID: 'msg_a',
    });
  });

  it('answers fresh without a model call when the stored summary is newer than the last turn end', async () => {
    serve({ metadata: { openchamber: { assist: { recap: 'r', summary: { done: 'd', left: '', stoppedAt: 's' }, forMessageID: 'msg_a', generatedAt: 2_000 } } } });
    const { runtime, generateSmallModelText } = makeRuntime();
    expect(await runtime.summarizeNow('ses_1', '/repo', { trigger: 'manual' })).toEqual({ status: 'fresh' });
    expect(generateSmallModelText).not.toHaveBeenCalled();
  });

  it('regenerates a summary written before the last turn ended (oracle: generatedAt < time.idle is stale)', async () => {
    serve({ metadata: { openchamber: { assist: { recap: 'r', summary: { done: 'd', left: '', stoppedAt: 's' }, forMessageID: 'msg_old', generatedAt: 500 } } } });
    const { runtime, generateSmallModelText } = makeRuntime();
    expect(await runtime.summarizeNow('ses_1', '/repo', { trigger: 'manual' })).toEqual({ status: 'written' });
    expect(generateSmallModelText).toHaveBeenCalledTimes(1);
  });

  it('tells nothing to summarize apart from a failed generation', async () => {
    serve({ records: [{ id: 'msg_u', type: 'user', text: 'Hello' }] });
    const empty = makeRuntime();
    expect(await empty.runtime.summarizeNow('ses_1', '/repo', { trigger: 'manual' })).toEqual({ status: 'empty' });
    expect(empty.generateSmallModelText).not.toHaveBeenCalled();

    vi.unstubAllGlobals();
    serve();
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    const failing = makeRuntime({
      generateSmallModelText: vi.fn(async () => {
        throw Object.assign(new Error('upstream 503'), { statusCode: 503, code: 'provider-unavailable' });
      }),
    });
    const outcome = await failing.runtime.summarizeNow('ses_1', '/repo', { trigger: 'manual' });
    expect(outcome).toEqual({ status: 'failed', reason: 'provider-unavailable' });
    expect(failing.persistSessionAssist).not.toHaveBeenCalled();

    vi.unstubAllGlobals();
    serve();
    const unusable = makeRuntime({ generateSmallModelText: vi.fn(async () => ({ text: '{"recap":"only a recap"}' })) });
    expect(await unusable.runtime.summarizeNow('ses_1', '/repo', { trigger: 'manual' })).toEqual({ status: 'failed', reason: 'unusable-output' });
    expect(unusable.persistSessionAssist).not.toHaveBeenCalled();
  });

  it.each([
    ['busy', { active: { ses_1: { type: 'running' } } }, {}],
    ['child', { sessions: { ses_1: { id: 'ses_1', parentID: 'ses_0', location: { directory: '/repo' }, time: { idle: 1 } } } }, {}],
    ['reverted', { sessions: { ses_1: { id: 'ses_1', revert: { messageID: 'msg_a' }, location: { directory: '/repo' }, time: { idle: 1 } } } }, {}],
    ['archived', {}, { isSessionArchived: async () => true }],
  ])('refuses a %s session without a model call', async (reason, served, overrides) => {
    serve(served);
    const { runtime, generateSmallModelText, persistSessionAssist } = makeRuntime(overrides);
    expect(await runtime.summarizeNow('ses_1', '/repo', { trigger: 'manual' })).toEqual({ status: 'refused', reason });
    expect(generateSmallModelText).not.toHaveBeenCalled();
    expect(persistSessionAssist).not.toHaveBeenCalled();
  });

  it('follows the settings: recap off refuses every request, the hover switch only hover requests', async () => {
    const calls = serve();
    const recapOff = makeRuntime({ getTargets: () => ({ recap: false, suggestion: true }) });
    expect(await recapOff.runtime.summarizeNow('ses_1', '/repo', { trigger: 'manual' })).toEqual({ status: 'refused', reason: 'disabled' });

    const hoverOff = makeRuntime({ getHoverSummaryEnabled: () => false });
    expect(await hoverOff.runtime.summarizeNow('ses_1', '/repo', { trigger: 'hover' })).toEqual({ status: 'refused', reason: 'disabled' });
    expect(calls).toEqual([]);
    expect(await hoverOff.runtime.summarizeNow('ses_1', '/repo', { trigger: 'manual' })).toEqual({ status: 'written' });
  });

  it('runs one generation for concurrent requests on a session, caps runs across sessions, and cools down after a run', async () => {
    serve();
    let release;
    const gate = new Promise((resolve) => { release = resolve; });
    const generateSmallModelText = vi.fn(async () => {
      await gate;
      return { text: SUMMARY_JSON };
    });
    const { runtime } = makeRuntime({ generateSmallModelText, maxConcurrentSummaries: 2, summaryCooldownMs: 30_000 });

    const first = runtime.summarizeNow('ses_1', '/repo', { trigger: 'hover' });
    const second = runtime.summarizeNow('ses_1', '/repo', { trigger: 'manual' });
    const other = runtime.summarizeNow('ses_2', '/repo', { trigger: 'manual' });
    expect(await runtime.summarizeNow('ses_3', '/repo', { trigger: 'manual' })).toEqual({ status: 'capacity' });

    release();
    expect(await first).toEqual({ status: 'written' });
    expect(await second).toEqual({ status: 'written' });
    expect(await other).toEqual({ status: 'written' });
    expect(generateSmallModelText).toHaveBeenCalledTimes(2);

    // A written summary starts no cooldown: the next request may run again.
    expect(await runtime.summarizeNow('ses_1', '/repo', { trigger: 'manual' })).toEqual({ status: 'written' });
  });

  it('cools a session down after a failed run, and only that session', async () => {
    serve();
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    const generateSmallModelText = vi.fn(async () => {
      throw Object.assign(new Error('upstream 503'), { statusCode: 503 });
    });
    const { runtime } = makeRuntime({ generateSmallModelText, summaryCooldownMs: 30_000 });
    expect((await runtime.summarizeNow('ses_1', '/repo', { trigger: 'manual' })).status).toBe('failed');
    const cooled = await runtime.summarizeNow('ses_1', '/repo', { trigger: 'manual' });
    expect(cooled.status).toBe('cooldown');
    expect(cooled.retryAfterMs).toBeGreaterThan(0);
    expect(generateSmallModelText).toHaveBeenCalledTimes(1);
    expect((await runtime.summarizeNow('ses_2', '/repo', { trigger: 'manual' })).status).toBe('failed');
  });

  it('a turn-end run without a summary keeps the one the hover card wrote for the same answer', async () => {
    const stored = { recap: 'Login timeout fixed.', suggestion: '', summary: { done: 'Fixed the login timeout.', left: 'Update the docs.', stoppedAt: 'After the fix.' }, forMessageID: 'msg_a', generatedAt: 2_000 };
    serve({ metadata: { openchamber: { assist: stored } } });
    let finished;
    const done = new Promise((resolve) => { finished = resolve; });
    const { runtime, persistSessionAssist } = makeRuntime({
      quietMs: 1,
      evaluateTurn: async () => ({ recap: false, suggestion: true }),
      generateSmallModelText: vi.fn(async () => ({ text: '{"suggestion":"Update the docs."}' })),
      onPendingChange: ({ pending }) => { if (!pending) finished(); },
    });
    runtime.processPayload({ type: 'session.status', properties: { sessionID: 'ses_1', status: { type: 'idle' } } });
    await done;
    expect(persistSessionAssist).toHaveBeenCalledTimes(1);
    expect(persistSessionAssist.mock.calls[0][2]).toMatchObject({ recap: 'Login timeout fixed.', suggestion: 'Update the docs.', summary: stored.summary });
  });

  it('stops the run when its only caller goes away, and not while another still waits', async () => {
    serve();
    let seenSignal;
    const generateSmallModelText = vi.fn(({ signal }) => {
      seenSignal = signal;
      return new Promise((_resolve, reject) => signal.addEventListener('abort', () => reject(signal.reason)));
    });
    const { runtime, persistSessionAssist } = makeRuntime({ generateSmallModelText });

    const leaving = new AbortController();
    const staying = new AbortController();
    const a = runtime.summarizeNow('ses_1', '/repo', { trigger: 'hover', signal: leaving.signal });
    const b = runtime.summarizeNow('ses_1', '/repo', { trigger: 'hover', signal: staying.signal });
    await vi.waitFor(() => expect(generateSmallModelText).toHaveBeenCalled());

    leaving.abort();
    expect(await a).toEqual({ status: 'cancelled' });
    expect(seenSignal.aborted).toBe(false);

    staying.abort();
    expect(await b).toEqual({ status: 'cancelled' });
    await vi.waitFor(() => expect(seenSignal.aborted).toBe(true));
    expect(persistSessionAssist).not.toHaveBeenCalled();
  });
});

describe('summary route', () => {
  const appWith = (summarizeNow) => {
    const app = express();
    registerSessionAssistRoutes(app, { sessionAssistRuntime: { summarizeNow } });
    return app;
  };

  it.each([
    [{ status: 'written' }, 200],
    [{ status: 'fresh' }, 200],
    [{ status: 'empty' }, 200],
    [{ status: 'refused', reason: 'busy' }, 409],
    [{ status: 'capacity' }, 429],
    [{ status: 'failed', reason: 'generation-failed' }, 502],
  ])('answers %o with HTTP %i', async (outcome, code) => {
    const summarizeNow = vi.fn(async () => outcome);
    const response = await request(appWith(summarizeNow))
      .post('/api/session-assist/sessions/ses_1/summary')
      .send({ directory: '/repo', trigger: 'hover' });
    expect(response.status).toBe(code);
    expect(response.body).toEqual(outcome);
    expect(summarizeNow).toHaveBeenCalledWith('ses_1', '/repo', expect.objectContaining({ trigger: 'hover' }));
  });

  it('sends Retry-After with a cooldown and rejects a request without a directory', async () => {
    const app = appWith(async () => ({ status: 'cooldown', retryAfterMs: 12_300 }));
    const cooled = await request(app).post('/api/session-assist/sessions/ses_1/summary').send({ directory: '/repo' });
    expect(cooled.status).toBe(429);
    expect(cooled.headers['retry-after']).toBe('13');

    const invalid = await request(app).post('/api/session-assist/sessions/ses_1/summary').send({});
    expect(invalid.status).toBe(400);
  });
});
