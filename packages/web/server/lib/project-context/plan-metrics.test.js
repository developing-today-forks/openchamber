import { describe, expect, test } from 'bun:test';

import { catalogCostUsdOf, createPlanMetricsReader, planMetricsOfSession, sessionTokensOf } from './plan-metrics.js';

const TOKENS = { input: 1_000_000, output: 500_000, reasoning: 100_000, cache: { read: 200_000, write: 100_000 } };
const TOKEN_TOTALS = { input: 1_000_000, output: 500_000, reasoning: 100_000, cacheRead: 200_000, cacheWrite: 100_000, total: 1_900_000 };
const CATALOG = {
  anthropic: {
    models: {
      'claude-sonnet-4-5': { cost: { input: 3, output: 15, cache_read: 0.3, cache_write: 3.75 } },
    },
  },
};
const SESSION = { id: 'ses_1', model: { providerID: 'anthropic', modelID: 'claude-sonnet-4-5' }, tokens: TOKENS };

describe('sessionTokensOf', () => {
  test('normalizes the OpenCode token block into totals', () => {
    expect(sessionTokensOf(SESSION)).toEqual(TOKEN_TOTALS);
  });

  test('no token block is absence, not zeros', () => {
    expect(sessionTokensOf({ id: 'ses_1' })).toBeNull();
    expect(sessionTokensOf(null)).toBeNull();
  });
});

describe('planMetricsOfSession', () => {
  test('the OpenCode cost figure is authoritative and the catalog is not consulted', () => {
    expect(planMetricsOfSession({ ...SESSION, cost: 4.25 }, null)).toEqual({
      costUsd: 4.25,
      costSource: 'opencode',
      tokens: TOKEN_TOTALS,
    });
  });

  test('catalog pricing is the fallback for a session with no cost figure', () => {
    // 1M in @ $3 + (500k out + 100k reasoning) @ $15 + 200k cache read @ $0.30
    // + 100k cache write @ $3.75, all per 1M tokens.
    expect(planMetricsOfSession(SESSION, CATALOG)).toEqual({
      costUsd: 12.435,
      costSource: 'catalog',
      tokens: TOKEN_TOTALS,
    });
  });

  test('an unpriced model leaves cost unknown but keeps the tokens', () => {
    const session = { ...SESSION, model: { providerID: 'unknown', modelID: 'nope' } };
    expect(planMetricsOfSession(session, CATALOG)).toEqual({
      costUsd: null,
      costSource: null,
      tokens: TOKEN_TOTALS,
    });
  });

  test('a session with neither cost nor tokens has no metrics', () => {
    expect(planMetricsOfSession({ id: 'ses_1' }, CATALOG)).toBeNull();
    expect(planMetricsOfSession(null, CATALOG)).toBeNull();
  });

  test('catalogCostUsdOf folds the string model shape', () => {
    const session = { model: 'anthropic/claude-sonnet-4-5', tokens: TOKENS };
    expect(catalogCostUsdOf(CATALOG, session, sessionTokensOf(session))).toBe(12.435);
  });
});

describe('createPlanMetricsReader', () => {
  const readerWith = (session, loadCatalog) => createPlanMetricsReader({
    buildOpenCodeUrl: (fetchPath) => `http://opencode.test${fetchPath}`,
    getOpenCodeAuthHeaders: () => ({}),
    fetchImpl: async (url) => {
      expect(url).toBe('http://opencode.test/api/session/ses_1');
      return session === null
        ? new Response(null, { status: 404 })
        : new Response(JSON.stringify({ data: session }), { status: 200 });
    },
    loadCatalog,
  });

  test('reads the session record through the response envelope', async () => {
    let catalogCalls = 0;
    const reader = readerWith({ ...SESSION, cost: 1.5 }, async () => { catalogCalls += 1; return CATALOG; });
    expect(await reader('ses_1')).toEqual({ costUsd: 1.5, costSource: 'opencode', tokens: TOKEN_TOTALS });
    expect(catalogCalls).toBe(0);
  });

  test('fetches the catalog only when the session has tokens but no cost', async () => {
    const reader = readerWith(SESSION, async () => CATALOG);
    expect((await reader('ses_1'))?.costSource).toBe('catalog');
  });

  test('caches within the TTL, dedups concurrent reads, refetches after expiry (#1476)', async () => {
    let fetches = 0;
    let now = 1_000_000;
    const reader = createPlanMetricsReader({
      buildOpenCodeUrl: (fetchPath) => `http://opencode.test${fetchPath}`,
      getOpenCodeAuthHeaders: () => ({}),
      fetchImpl: async () => {
        fetches += 1;
        return new Response(JSON.stringify({ data: { ...SESSION, cost: 1.5 } }), { status: 200 });
      },
      loadCatalog: async () => CATALOG,
      cacheTtlMs: 30_000,
      now: () => now,
    });

    expect((await reader('ses_1'))?.costUsd).toBe(1.5);
    expect(await reader('ses_1')).not.toBeNull();
    expect(fetches).toBe(1);

    await Promise.all([reader('ses_1'), reader('ses_1'), reader('ses_1')]);
    expect(fetches).toBe(1);

    now += 30_000;
    const [first, second] = await Promise.all([reader('ses_1'), reader('ses_1')]);
    expect(first).toEqual(second);
    expect(fetches).toBe(2);
  });

  test('does not cache a failed read (#1476)', async () => {
    let fetches = 0;
    const reader = createPlanMetricsReader({
      buildOpenCodeUrl: (fetchPath) => `http://opencode.test${fetchPath}`,
      getOpenCodeAuthHeaders: () => ({}),
      fetchImpl: async () => {
        fetches += 1;
        if (fetches === 1) throw new Error('unreachable');
        return new Response(JSON.stringify({ data: { ...SESSION, cost: 2 } }), { status: 200 });
      },
      loadCatalog: async () => CATALOG,
    });
    expect(await reader('ses_1')).toBeNull();
    expect((await reader('ses_1'))?.costUsd).toBe(2);
    expect(fetches).toBe(2);
  });

  test('a missing session and a failed read both give no metrics', async () => {
    expect(await readerWith(null, async () => CATALOG)('ses_1')).toBeNull();
    const failing = createPlanMetricsReader({
      buildOpenCodeUrl: (fetchPath) => `http://opencode.test${fetchPath}`,
      getOpenCodeAuthHeaders: () => ({}),
      fetchImpl: async () => { throw new Error('unreachable'); },
      loadCatalog: async () => CATALOG,
    });
    expect(await failing('ses_1')).toBeNull();
    expect(await failing('')).toBeNull();
  });
});
