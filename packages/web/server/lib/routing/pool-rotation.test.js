import { describe, expect, it } from 'vitest';

import { planPoolRotation } from './pool-rotation.js';

const NOW = 1_700_000_000_000;

const target = (ref, { sessions = 0, planID = null, ratio = null } = {}) => ({
  ref,
  activeSessions: sessions,
  plan: planID === null
    ? null
    : { id: planID, projection: ratio === null ? null : { ratio } },
});

const poolsWith = (targets) => ({ pool1: { selection: 'weighted', targets } });

const session = (sessionID, { subagent = false, lastActivityAt = 0, auto = false } = {}) => ({
  sessionID,
  isSubagent: subagent,
  lastActivityAt,
  isAuto: auto,
});

const plan = (overrides) => planPoolRotation({
  pools: {},
  sessionsByRef: {},
  settings: { enabled: true, paceMinutes: 5 },
  now: NOW,
  ...overrides,
});

describe('planPoolRotation', () => {
  it('is off by default and when the switch is off', () => {
    const pools = poolsWith([target('a/x', { sessions: 3, planID: 'p1', ratio: 0.9 }), target('b/y')]);
    expect(plan({ pools, settings: { enabled: false, paceMinutes: 5 } })).toEqual([]);
    expect(plan({ pools, settings: undefined })).toEqual([]);
  });

  it('moves one session off a target projecting past 70% with two or more sessions', () => {
    const pools = poolsWith([
      target('a/x', { sessions: 2, planID: 'p1', ratio: 0.7 }),
      target('b/y', { planID: 'p2', ratio: 0.2 }),
    ]);
    const sessionsByRef = { 'a/x': [session('s1', { lastActivityAt: 10 }), session('s2', { lastActivityAt: 20 })] };
    expect(plan({ pools, sessionsByRef })).toEqual([
      { poolID: 'pool1', sessionID: 's1', fromRef: 'a/x', toRef: 'b/y', planID: 'p1', ratio: 0.7 },
    ]);
  });

  it('does not trigger below the ratio or with a single session', () => {
    const sessionsByRef = { 'a/x': [session('s1'), session('s2')] };
    const below = poolsWith([target('a/x', { sessions: 2, planID: 'p1', ratio: 0.69 }), target('b/y')]);
    expect(plan({ pools: below, sessionsByRef })).toEqual([]);
    const lonely = poolsWith([target('a/x', { sessions: 1, planID: 'p1', ratio: 0.95 }), target('b/y')]);
    expect(plan({ pools: lonely, sessionsByRef: { 'a/x': [session('s1')] } })).toEqual([]);
  });

  it('orders subagents first, then the primary idle longest', () => {
    const pools = poolsWith([
      target('a/x', { sessions: 3, planID: 'p1', ratio: 0.8 }),
      target('b/y'),
    ]);
    const sessionsByRef = {
      'a/x': [
        session('primary-recent', { lastActivityAt: 900 }),
        session('subagent', { subagent: true, lastActivityAt: 950 }),
        session('primary-idle', { lastActivityAt: 100 }),
      ],
    };
    expect(plan({ pools, sessionsByRef })[0].sessionID).toBe('subagent');

    const primariesOnly = { 'a/x': sessionsByRef['a/x'].filter((row) => !row.isSubagent) };
    expect(plan({ pools, sessionsByRef: primariesOnly })[0].sessionID).toBe('primary-idle');
  });

  it('skips sessions on Auto but still counts them toward the crowd', () => {
    const pools = poolsWith([
      target('a/x', { sessions: 2, planID: 'p1', ratio: 0.8 }),
      target('b/y'),
    ]);
    const allAuto = { 'a/x': [session('s1', { auto: true }), session('s2', { auto: true })] };
    expect(plan({ pools, sessionsByRef: allAuto })).toEqual([]);
    const mixed = { 'a/x': [session('s1', { auto: true, lastActivityAt: 1 }), session('s2', { lastActivityAt: 2 })] };
    expect(plan({ pools, sessionsByRef: mixed })[0].sessionID).toBe('s2');
  });

  it('never moves a session to a target on the same plan or near its own limit', () => {
    const sessionsByRef = { 'a/x': [session('s1'), session('s2')] };
    const samePlan = poolsWith([
      target('a/x', { sessions: 2, planID: 'p1', ratio: 0.8 }),
      target('b/y', { planID: 'p1', ratio: 0.1 }),
    ]);
    expect(plan({ pools: samePlan, sessionsByRef })).toEqual([]);

    const nearLimit = poolsWith([
      target('a/x', { sessions: 2, planID: 'p1', ratio: 0.8 }),
      target('b/y', { planID: 'p2', ratio: 0.75 }),
      target('c/z', { planID: 'p3', ratio: 0.3 }),
    ]);
    expect(plan({ pools: nearLimit, sessionsByRef })[0].toRef).toBe('c/z');

    const patternOnly = poolsWith([
      target('a/x', { sessions: 2, planID: 'p1', ratio: 0.8 }),
      target('b/*'),
    ]);
    expect(plan({ pools: patternOnly, sessionsByRef })).toEqual([]);
  });

  it('paces moves to one per pool per window, clamped to 1–60 minutes', () => {
    const pools = poolsWith([
      target('a/x', { sessions: 2, planID: 'p1', ratio: 0.8 }),
      target('b/y'),
    ]);
    const sessionsByRef = { 'a/x': [session('s1'), session('s2')] };
    expect(plan({ pools, sessionsByRef, lastMoveAtByPool: { pool1: NOW - 4 * 60_000 } })).toEqual([]);
    expect(plan({ pools, sessionsByRef, lastMoveAtByPool: { pool1: NOW - 5 * 60_000 } })).toHaveLength(1);
    // A pace spelled above the cap clamps to 60 minutes.
    expect(plan({
      pools,
      sessionsByRef,
      settings: { enabled: true, paceMinutes: 600 },
      lastMoveAtByPool: { pool1: NOW - 59 * 60_000 },
    })).toEqual([]);
  });

  it('plans independently per pool', () => {
    const pools = {
      pool1: { selection: 'weighted', targets: [target('a/x', { sessions: 2, planID: 'p1', ratio: 0.8 }), target('b/y')] },
      pool2: { selection: 'weighted', targets: [target('c/z', { sessions: 2, planID: 'p9', ratio: 0.9 }), target('d/w')] },
    };
    const sessionsByRef = { 'a/x': [session('s1'), session('s2')], 'c/z': [session('s8'), session('s9')] };
    const moves = plan({ pools, sessionsByRef, lastMoveAtByPool: { pool2: NOW } });
    expect(moves.map((move) => move.poolID)).toEqual(['pool1']);
  });
});
