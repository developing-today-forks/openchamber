import { describe, expect, it, vi } from 'vitest';

import {
  createIdleSessionReaper,
  IDLE_SESSION_MAX_AGE_MS,
  IDLE_SESSION_SWEEP_INTERVAL_MS,
} from './idle-session-reaper.js';

const NOW = 1_700_000_000_000;
const HOUR = 60 * 60 * 1000;

/** In-memory archive store honouring the real store's contract: a failed batch applies nothing. */
const makeArchiveStore = ({ fail = false } = {}) => {
  const archived = new Map();
  return {
    archived,
    archive: vi.fn(async (ids) => {
      if (fail) return { archived: [], failedIds: [...ids] };
      const stamp = NOW;
      for (const id of ids) archived.set(id, stamp);
      return { archived: ids.map((id) => ({ id, archivedAt: stamp })), failedIds: [] };
    }),
  };
};

const session = (id, { status = 'idle', updated = NOW - 3 * HOUR, created = NOW - 4 * HOUR, archived = undefined } = {}) => {
  const record = { id, status, time: { created, updated } };
  if (archived !== undefined) record.time.archived = archived;
  return record;
};

const makeReaper = ({ sessions, store = makeArchiveStore(), ...rest } = {}) =>
  createIdleSessionReaper({
    archiveStore: store,
    listSessions: async () => sessions,
    now: () => NOW,
    log: () => {},
    ...rest,
  });

describe('createIdleSessionReaper', () => {
  it('archives a finished idle session older than the threshold', async () => {
    const store = makeArchiveStore();
    const reaper = makeReaper({ sessions: [session('ses_old')], store });

    const result = await reaper.sweep();

    expect(result).toEqual({ skipped: null, liveIdle: 1, reaped: ['ses_old'], failedIds: [] });
    expect(store.archived.has('ses_old')).toBe(true);
  });

  it('never archives a busy or retrying session, however old', async () => {
    const store = makeArchiveStore();
    const reaper = makeReaper({
      sessions: [session('ses_busy', { status: 'busy' }), session('ses_retry', { status: { type: 'retry' } })],
      store,
    });

    const result = await reaper.sweep();

    expect(result.liveIdle).toBe(0);
    expect(result.reaped).toEqual([]);
    expect(store.archive).not.toHaveBeenCalled();
  });

  it('does not archive a recently active idle session', async () => {
    const store = makeArchiveStore();
    const reaper = makeReaper({ sessions: [session('ses_recent', { updated: NOW - 5 * 60 * 1000 })], store });

    const result = await reaper.sweep();

    expect(result.liveIdle).toBe(1);
    expect(result.reaped).toEqual([]);
    expect(store.archive).not.toHaveBeenCalled();
  });

  it('leaves the session live when the archive write fails', async () => {
    const store = makeArchiveStore({ fail: true });
    const reaper = makeReaper({ sessions: [session('ses_old')], store });

    const result = await reaper.sweep();

    expect(result.reaped).toEqual([]);
    expect(result.failedIds).toEqual(['ses_old']);
    expect(store.archived.has('ses_old')).toBe(false);
  });

  it('skips sessions with no known status or no usable timestamp', async () => {
    const store = makeArchiveStore();
    const reaper = makeReaper({
      sessions: [
        { id: 'ses_unknown', time: { created: NOW - 4 * HOUR, updated: NOW - 3 * HOUR } },
        session('ses_no_time', { updated: 0, created: 0 }),
      ],
      store,
    });

    const result = await reaper.sweep();

    // ses_no_time is idle (counts as live idle) but has no usable timestamp,
    // so it is counted, never reaped; ses_unknown has no status at all.
    expect(result.liveIdle).toBe(1);
    expect(result.reaped).toEqual([]);
    expect(store.archive).not.toHaveBeenCalled();
  });

  it('uses the status provider over the record and counts live idle before reaping', async () => {
    const store = makeArchiveStore();
    const lines = [];
    const reaper = makeReaper({
      sessions: [
        session('ses_old', { status: undefined }),
        session('ses_recent', { status: undefined, updated: NOW - 60 * 1000 }),
        session('ses_done', { status: undefined, archived: NOW - HOUR }),
      ],
      store,
      getSessionStatuses: async () => ({ ses_old: { type: 'idle' }, ses_recent: { type: 'idle' }, ses_done: { type: 'idle' } }),
      log: (line) => lines.push(line),
    });

    const result = await reaper.sweep();

    expect(result.liveIdle).toBe(3);
    expect(result.reaped).toEqual(['ses_old']);
    expect(lines).toEqual([
      `[openchamber-sessions] idle-session sweep: live-idle=3 reaped=1 failed=0 threshold-ms=${IDLE_SESSION_MAX_AGE_MS}`,
    ]);
  });

  it('keeps a session with pending or unknown pending work live', async () => {
    const store = makeArchiveStore();
    const sessions = [session('ses_parent'), session('ses_unknown'), session('ses_clear')];
    const reaper = makeReaper({
      sessions,
      store,
      hasPendingWork: async (s) => (s.id === 'ses_parent' ? true : s.id === 'ses_unknown' ? null : false),
    });

    const result = await reaper.sweep();

    expect(result.reaped).toEqual(['ses_clear']);
  });

  it('does not reap a session the archive store already holds', async () => {
    const store = makeArchiveStore();
    store.isArchived = async (id) => id === 'ses_held';
    const reaper = makeReaper({ sessions: [session('ses_held'), session('ses_free')], store });

    const result = await reaper.sweep();

    expect(result.reaped).toEqual(['ses_free']);
  });

  it('honours a configured threshold', async () => {
    const store = makeArchiveStore();
    const reaper = makeReaper({
      sessions: [session('ses_mid', { updated: NOW - 30 * 60 * 1000 })],
      store,
      maxIdleAgeMs: 15 * 60 * 1000,
    });

    const result = await reaper.sweep();
    expect(result.reaped).toEqual(['ses_mid']);
    expect(reaper.maxIdleAgeMs).toBe(15 * 60 * 1000);
  });

  it('starts and stops the periodic sweep once', async () => {
    vi.useFakeTimers();
    try {
      const store = makeArchiveStore();
      const reaper = makeReaper({ sessions: [session('ses_old')], store });
      expect(reaper.start(1000)).toBe(true);
      expect(reaper.start(1000)).toBe(false);
      await vi.advanceTimersByTimeAsync(1000);
      expect(store.archived.has('ses_old')).toBe(true);
      expect(reaper.stop()).toBe(true);
      expect(reaper.stop()).toBe(false);
    } finally {
      vi.useRealTimers();
    }
  });

  it('exports the named defaults the packet requires', () => {
    expect(IDLE_SESSION_MAX_AGE_MS).toBe(2 * HOUR);
    expect(IDLE_SESSION_SWEEP_INTERVAL_MS).toBe(15 * 60 * 1000);
  });
});
