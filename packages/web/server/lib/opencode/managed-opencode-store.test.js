import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
  appendGeneration,
  createEmptyManagedOpenCodeStore,
  currentRecordFromManagedStore,
  MANAGED_OPENCODE_STORE_MAX_BYTES,
  MANAGED_OPENCODE_STORE_VERSION,
  migrateV1StoreToV2,
  readManagedOpenCodeClaimDir,
  readManagedOpenCodeStore,
  reapManagedOpenCodeStore,
  recordHandoffStep,
  replayHandoffStep,
  resolveManagedOpenCodeStorePaths,
  transitionGenerationState,
  writeManagedOpenCodeStore,
} from './managed-opencode-state.js';

// The v1 pair is migration input only since #2423: nothing writes it any
// more, so fixtures write the on-disk v1 JSON directly, exactly as a
// pre-store installation left it.
const writeV1StateFile = (state) => {
  fs.mkdirSync(path.dirname(statePath), { recursive: true });
  fs.writeFileSync(statePath, `${JSON.stringify({ version: 1, ...state }, null, 2)}\n`, { mode: 0o600 });
};

const writeV1DrainingFile = (records) => {
  fs.mkdirSync(path.dirname(drainingPath), { recursive: true });
  fs.writeFileSync(drainingPath, `${JSON.stringify({ version: 1, draining: records }, null, 2)}\n`, { mode: 0o600 });
};

let root;
let storePath;
let statePath;
let drainingPath;

const generation = (overrides = {}) => ({
  pid: 4242,
  port: 45678,
  binary: '/usr/bin/opencode',
  args: ['serve', '--hostname', '127.0.0.1'],
  fingerprint: 'abc123',
  state: 'active',
  started_at: '2026-01-01T00:00:00.000Z',
  ended_at: null,
  ...overrides,
});

const handoff = (overrides = {}) => ({
  handoff_id: 'handoff-1',
  predecessor: 1,
  successor: 2,
  busy_set: ['session-a'],
  step: 'prepared',
  outcome: null,
  at: '2026-01-01T00:00:00.000Z',
  ...overrides,
});

beforeEach(() => {
  root = fs.mkdtempSync(path.join(os.tmpdir(), 'managed-opencode-store-'));
  ({ storePath } = resolveManagedOpenCodeStorePaths(root));
  ({ statePath, drainingPath } = resolveManagedOpenCodeStorePaths(root));
});

afterEach(() => {
  fs.rmSync(root, { recursive: true, force: true });
});

describe('v2 store file', () => {
  it('round-trips the store document with owner-only permissions', () => {
    let store = createEmptyManagedOpenCodeStore();
    store = appendGeneration(store, generation());
    store = recordHandoffStep(store, handoff());
    writeManagedOpenCodeStore(storePath, store);

    expect(readManagedOpenCodeStore(storePath)).toEqual({ ...store, schema_version: 2 });
    expect(fs.statSync(storePath).mode & 0o777).toBe(0o600);
  });

  it('does not follow a planted symlink at the old predictable temp path (#2678)', () => {
    if (process.platform === 'win32') return;
    let store = createEmptyManagedOpenCodeStore();
    store = appendGeneration(store, generation({ password: 'live-secret', agent_tool_token: 'live-token' }));
    fs.mkdirSync(path.dirname(storePath), { recursive: true });
    const victimPath = path.join(root, 'victim.json');
    fs.writeFileSync(victimPath, 'victim-original\n');
    fs.symlinkSync(victimPath, `${storePath}.${process.pid}.tmp`);

    writeManagedOpenCodeStore(storePath, store);

    expect(fs.readFileSync(victimPath, 'utf8')).toBe('victim-original\n');
    expect(fs.lstatSync(storePath).isSymbolicLink()).toBe(false);
    expect(readManagedOpenCodeStore(storePath)).toEqual({ ...store, schema_version: 2 });
  });

  it('returns null only for a missing document and rejects corrupt or oversized files', () => {
    expect(readManagedOpenCodeStore(path.join(root, 'missing.json'))).toBeNull();

    fs.mkdirSync(path.dirname(storePath), { recursive: true });
    fs.writeFileSync(storePath, '{not json');
    expect(() => readManagedOpenCodeStore(storePath)).toThrow(/corrupt.*invalid JSON/);

    fs.writeFileSync(storePath, JSON.stringify({ schema_version: 1, generations: [], handoffs: [] }));
    expect(() => readManagedOpenCodeStore(storePath)).toThrow(/unsupported schema/);

    fs.writeFileSync(storePath, JSON.stringify({ schema_version: 2, generations: [{ bogus: true }], handoffs: [] }));
    expect(() => readManagedOpenCodeStore(storePath)).toThrow(/invalid record/);

    fs.writeFileSync(storePath, JSON.stringify({ schema_version: 2, generations: [], handoffs: [{ bogus: true }] }));
    expect(() => readManagedOpenCodeStore(storePath)).toThrow(/invalid record/);

    fs.writeFileSync(storePath, Buffer.alloc(MANAGED_OPENCODE_STORE_MAX_BYTES + 1));
    expect(() => readManagedOpenCodeStore(storePath)).toThrow(/corrupt or over limit.*overflow/);

    if (process.platform !== 'win32') {
      fs.unlinkSync(storePath);
      fs.symlinkSync(path.join(root, 'missing-target.json'), storePath);
      expect(() => readManagedOpenCodeStore(storePath)).toThrow(/unreadable or corrupt|missing symlink target/);
    }
  });

  it('uses no instance-directory claim hint when an existing store cannot be read', () => {
    fs.mkdirSync(path.dirname(storePath), { recursive: true });
    fs.writeFileSync(storePath, '{not json');
    const original = fs.readFileSync(storePath);
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    try {
      expect(readManagedOpenCodeClaimDir(storePath)).toBeNull();
      expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('without a claim hint'));
      expect(fs.readFileSync(storePath)).toEqual(original);
    } finally {
      errorSpy.mockRestore();
    }
  });

  it('compacts closed generation history while keeping the live record readable', () => {
    const closed = Array.from({ length: 900 }, (_, index) => generation({
      generation_id: index + 1,
      pid: 8000 + index,
      port: 10000 + index,
      binary: `/opencode/${'x'.repeat(500)}`,
      state: 'closed',
      ended_at: '2026-02-01T00:00:00.000Z',
      password: null,
      agent_tool_token: null,
    }));
    const active = generation({
      generation_id: 901,
      pid: 9999,
      state: 'active',
    });
    const store = {
      ...createEmptyManagedOpenCodeStore(),
      generations: [...closed, active],
    };

    writeManagedOpenCodeStore(storePath, store);

    const persisted = readManagedOpenCodeStore(storePath);
    expect(fs.statSync(storePath).size).toBeLessThanOrEqual(MANAGED_OPENCODE_STORE_MAX_BYTES);
    expect(persisted.generations.map((entry) => [entry.generation_id, entry.state])).toEqual([[901, 'active']]);
    expect(currentRecordFromManagedStore(persisted)?.pid).toBe(9999);
    expect(appendGeneration(persisted, generation({ pid: 10000 })).generations.at(-1)?.generation_id).toBe(902);

    writeManagedOpenCodeStore(storePath, { ...createEmptyManagedOpenCodeStore(), generations: closed });
    const closedHistory = readManagedOpenCodeStore(storePath);
    expect(closedHistory.generations.map((entry) => entry.generation_id)).toEqual([900]);
    expect(appendGeneration(closedHistory, generation({ pid: 10001 })).generations.at(-1)?.generation_id).toBe(901);
  });

  it('compacts settled handoffs and preserves unfinished recovery records', () => {
    const settled = Array.from({ length: 1600 }, (_, index) => handoff({
      handoff_id: `aborted-${index}`,
      step: 'aborted',
      outcome: `failed-${'x'.repeat(100)}`,
    }));
    const pending = handoff({ handoff_id: 'unfinished', predecessor: 1, successor: 2, step: 'prepared' });
    const confirmedInProgress = handoff({
      handoff_id: 'confirmed-in-progress',
      predecessor: 3,
      successor: 4,
      step: 'confirmed',
      outcome: 'predecessor-draining',
    });
    const confirmedSettled = handoff({
      handoff_id: 'confirmed-settled',
      predecessor: 5,
      successor: 6,
      step: 'confirmed',
      outcome: 'predecessor-draining',
    });
    const store = {
      ...createEmptyManagedOpenCodeStore(),
      generations: [
        generation({ generation_id: 1, pid: 5001, state: 'draining' }),
        generation({ generation_id: 2, pid: 5002, state: 'starting' }),
        generation({ generation_id: 3, pid: 5003, state: 'active' }),
        generation({ generation_id: 4, pid: 5004, state: 'active' }),
        generation({ generation_id: 5, pid: 5005, state: 'draining' }),
        generation({ generation_id: 6, pid: 5006, state: 'active' }),
      ],
      handoffs: [...settled, pending, confirmedInProgress, confirmedSettled],
    };

    writeManagedOpenCodeStore(storePath, store);

    const persisted = readManagedOpenCodeStore(storePath);
    expect(fs.statSync(storePath).size).toBeLessThanOrEqual(MANAGED_OPENCODE_STORE_MAX_BYTES);
    expect(persisted.handoffs.map((entry) => entry.handoff_id)).toEqual(['unfinished', 'confirmed-in-progress']);
    expect(persisted.generations.map((entry) => entry.pid)).toEqual([5001, 5002, 5003, 5004, 5005, 5006]);
  });

  it('refuses an oversized live store without replacing the previous readable file', () => {
    const previous = appendGeneration(createEmptyManagedOpenCodeStore(), generation({ pid: 7001 }));
    writeManagedOpenCodeStore(storePath, previous);
    const previousBytes = fs.readFileSync(storePath);
    const liveGenerations = Array.from({ length: 700 }, (_, index) => generation({
      generation_id: index + 1,
      pid: 12000 + index,
      port: 20000 + index,
      binary: `/opencode/${'x'.repeat(500)}`,
      state: 'active',
    }));
    const oversized = {
      ...createEmptyManagedOpenCodeStore(),
      generations: liveGenerations,
    };

    expect(() => writeManagedOpenCodeStore(storePath, oversized)).toThrow(/exceeds the 262144-byte write limit/);
    expect(fs.readFileSync(storePath)).toEqual(previousBytes);
    expect(readManagedOpenCodeStore(storePath)).toEqual({ ...previous, schema_version: MANAGED_OPENCODE_STORE_VERSION });
    expect(oversized.generations).toHaveLength(700);
  });
});

describe('generations', () => {
  it('assigns monotonic ids and never rewrites history', () => {
    const empty = createEmptyManagedOpenCodeStore();
    const first = appendGeneration(empty, generation());
    const second = appendGeneration(first, generation({ pid: 4243 }));

    expect(empty.generations).toEqual([]);
    expect(first.generations.map((entry) => entry.generation_id)).toEqual([1]);
    expect(second.generations.map((entry) => entry.generation_id)).toEqual([1, 2]);
  });

  it('rejects invalid generation records', () => {
    expect(() => appendGeneration(createEmptyManagedOpenCodeStore(), generation({ pid: -1 }))).toThrow();
  });

  it('advances starting -> active -> draining -> closed', () => {
    let store = appendGeneration(createEmptyManagedOpenCodeStore(), generation({ state: 'starting' }));
    store = transitionGenerationState(store, 1, 'active');
    store = transitionGenerationState(store, 1, 'draining');
    const closedAt = '2026-02-01T00:00:00.000Z';
    store = transitionGenerationState(store, 1, 'closed', closedAt);

    expect(store.generations[0].state).toBe('closed');
    expect(store.generations[0].ended_at).toBe(closedAt);
  });

  it('rejects skipped and post-close transitions', () => {
    let store = appendGeneration(createEmptyManagedOpenCodeStore(), generation({ state: 'starting' }));
    expect(() => transitionGenerationState(store, 1, 'draining')).toThrow();
    store = transitionGenerationState(store, 1, 'closed');
    expect(() => transitionGenerationState(store, 1, 'active')).toThrow();
    expect(() => transitionGenerationState(store, 999, 'closed')).toThrow();
  });

  it('accepts the launch credential and instance fields a spawn records', () => {
    const store = appendGeneration(createEmptyManagedOpenCodeStore(), generation({
      password: 'secret-password',
      agent_tool_token: 'token-value',
      instance_dir: '/data/instances/instance-a',
    }));

    expect(store.generations[0]).toMatchObject({
      password: 'secret-password',
      agent_tool_token: 'token-value',
      instance_dir: '/data/instances/instance-a',
    });
    expect(() => appendGeneration(createEmptyManagedOpenCodeStore(), generation({ password: '' }))).toThrow();
    expect(() => appendGeneration(createEmptyManagedOpenCodeStore(), generation({ agent_tool_token: 7 }))).toThrow();
  });

  it('scrubs launch credentials when a generation closes, keeping the rest of its history', () => {
    let store = appendGeneration(createEmptyManagedOpenCodeStore(), generation({
      password: 'secret-password',
      agent_tool_token: 'token-value',
      instance_dir: '/data/instances/instance-a',
    }));
    store = transitionGenerationState(store, 1, 'closed', '2026-02-01T00:00:00.000Z');

    expect(store.generations[0].password).toBeNull();
    expect(store.generations[0].agent_tool_token).toBeNull();
    expect(store.generations[0].instance_dir).toBe('/data/instances/instance-a');
    // The scrubbed document still validates on read-back.
    writeManagedOpenCodeStore(storePath, store);
    expect(readManagedOpenCodeStore(storePath)?.generations[0].state).toBe('closed');
  });
});

describe('current record derivation', () => {
  it('returns null when the store names no current generation', () => {
    expect(currentRecordFromManagedStore(createEmptyManagedOpenCodeStore())).toBeNull();
    expect(currentRecordFromManagedStore(null)).toBeNull();

    let store = appendGeneration(createEmptyManagedOpenCodeStore(), generation());
    store = transitionGenerationState(store, 1, 'closed');
    expect(currentRecordFromManagedStore(store)).toBeNull();

    // A draining predecessor is never the current record: it is being
    // retired, and the record state.json carried was always the current
    // server's.
    let drainingOnly = appendGeneration(createEmptyManagedOpenCodeStore(), generation({ state: 'draining' }));
    expect(currentRecordFromManagedStore(drainingOnly)).toBeNull();
  });

  it('derives the record from the newest starting-or-active generation', () => {
    let store = appendGeneration(createEmptyManagedOpenCodeStore(), generation({
      password: 'secret-password',
      agent_tool_token: null,
      instance_dir: '/data/instances/instance-a',
    }));
    store = appendGeneration(store, generation({ pid: 4243, state: 'starting', started_at: '2026-01-02T00:00:00.000Z' }));
    store = transitionGenerationState(store, 1, 'draining');

    // The handoff successor (newest, still starting) supersedes the draining
    // predecessor, and fields a generation never recorded read back as null.
    expect(currentRecordFromManagedStore(store)).toEqual({
      pid: 4243,
      port: 45678,
      binary: '/usr/bin/opencode',
      args: ['serve', '--hostname', '127.0.0.1'],
      fingerprint: 'abc123',
      password: null,
      agentToolToken: null,
      instanceDir: null,
      startedAt: '2026-01-02T00:00:00.000Z',
    });
  });

  it('falls back to an earlier live generation when the newest is closed', () => {
    let store = appendGeneration(createEmptyManagedOpenCodeStore(), generation());
    store = appendGeneration(store, generation({ pid: 4243, state: 'starting' }));
    store = transitionGenerationState(store, 2, 'closed');

    expect(currentRecordFromManagedStore(store)?.pid).toBe(4242);
  });
});

describe('write-ahead handoff record', () => {
  it('upserts the record for one handoff id as steps advance', () => {
    let store = createEmptyManagedOpenCodeStore();
    store = recordHandoffStep(store, handoff({ step: 'prepared' }));
    store = recordHandoffStep(store, handoff({ step: 'switched' }));

    expect(store.handoffs).toHaveLength(1);
    expect(store.handoffs[0].step).toBe('switched');
  });

  it('rejects invalid handoff records', () => {
    expect(() => recordHandoffStep(createEmptyManagedOpenCodeStore(), handoff({ step: 'launched' }))).toThrow();
  });
});

// A crash between two handoff steps is simulated by persisting the store
// after the earlier step and re-reading it from disk — the re-read is the
// whole post-crash state, and replay decides the resume path from it.
const crashBetween = (persistedStep) => {
  let store = appendGeneration(createEmptyManagedOpenCodeStore(), generation());
  store = appendGeneration(store, generation({ pid: 4243, state: 'starting' }));
  store = recordHandoffStep(store, handoff({ step: persistedStep }));
  writeManagedOpenCodeStore(storePath, store);
  const recovered = readManagedOpenCodeStore(storePath);
  return replayHandoffStep(recovered.handoffs.find((entry) => entry.handoff_id === 'handoff-1'));
};

describe('crash replay per handoff step', () => {
  it('resumes the successor start after a crash past prepared', () => {
    expect(crashBetween('prepared')).toEqual({ action: 'resume', reason: 'successor-never-started' });
  });

  it('resumes the readiness confirmation after a crash past switched', () => {
    expect(crashBetween('switched')).toEqual({ action: 'resume', reason: 'successor-readiness-unconfirmed' });
  });

  it('resumes the predecessor drain after a crash past confirmed', () => {
    expect(crashBetween('confirmed')).toEqual({ action: 'resume', reason: 'predecessor-drain-unconfirmed' });
  });

  it('settles an aborted handoff instead of resuming it', () => {
    expect(crashBetween('aborted')).toEqual({ action: 'settle', reason: 'already-aborted' });
  });

  it('aborts recovery for an unknown persisted step', () => {
    expect(replayHandoffStep({ step: 'launched' })).toEqual({ action: 'abort', reason: 'unknown-step' });
    expect(replayHandoffStep(null)).toEqual({ action: 'abort', reason: 'unknown-step' });
  });
});

describe('v1 migration', () => {
  const v1State = {
    pid: 4242,
    port: 45678,
    binary: '/usr/bin/opencode',
    fingerprint: 'abc123',
    password: 'secret-password',
    agentToolToken: null,
    args: ['serve', '--hostname', '127.0.0.1'],
  };

  it('imports every v1 generation with states preserved and loses none', () => {
    writeV1StateFile(v1State);
    writeV1DrainingFile([
      { pid: 7001, port: 45001, binary: '/usr/bin/opencode', drainStartedAt: 1700000000000 },
      { pid: 7002, port: 45002, binary: '/usr/bin/opencode', drainStartedAt: 1700000000001 },
    ]);

    const migrated = migrateV1StoreToV2({ statePath, drainingPath });

    // No lost generations: count and pids before/after match exactly.
    expect(migrated.generations.map((entry) => entry.pid)).toEqual([4242, 7001, 7002]);
    expect(migrated.generations.map((entry) => entry.state)).toEqual(['active', 'draining', 'draining']);
    expect(migrated.schema_version).toBe(MANAGED_OPENCODE_STORE_VERSION);
  });

  it('migrates a v1 install with no draining processes to one active generation', () => {
    writeV1StateFile(v1State);

    const migrated = migrateV1StoreToV2({ statePath, drainingPath });

    expect(migrated.generations).toHaveLength(1);
    expect(migrated.generations[0]).toMatchObject({ pid: 4242, state: 'active' });
  });

  it('carries the v1 record launch credentials and instance folder into the generation', () => {
    writeV1StateFile({ ...v1State, agentToolToken: 'token-value', instanceDir: '/data/instances/instance-a' });

    const migrated = migrateV1StoreToV2({ statePath, drainingPath });

    expect(migrated.generations[0]).toMatchObject({
      password: 'secret-password',
      agent_tool_token: 'token-value',
      instance_dir: '/data/instances/instance-a',
    });
    // And the derived current record hands them back in the lifecycle shape,
    // so a migrated installation adopts with the values the v1 pair held.
    expect(currentRecordFromManagedStore(migrated)).toMatchObject({
      pid: 4242,
      password: 'secret-password',
      agentToolToken: 'token-value',
      instanceDir: '/data/instances/instance-a',
    });
  });

  it('migrates an empty v1 install to an empty store and leaves v1 files untouched', () => {
    const migrated = migrateV1StoreToV2({ statePath, drainingPath });

    expect(migrated.generations).toEqual([]);
    expect(fs.existsSync(statePath)).toBe(false);
    expect(fs.existsSync(drainingPath)).toBe(false);
  });

  it('leaves the v1 files in place, untouched, after migrating', () => {
    writeV1StateFile(v1State);
    const before = fs.readFileSync(statePath, 'utf8');

    migrateV1StoreToV2({ statePath, drainingPath });

    expect(fs.readFileSync(statePath, 'utf8')).toBe(before);
    expect(fs.existsSync(drainingPath)).toBe(false);
  });
});

describe('store-only reaper', () => {
  const deadPid = 2147483647;

  it('closes generations whose pid is gone and records the outcome, without ps', () => {
    let store = appendGeneration(createEmptyManagedOpenCodeStore(), generation({ pid: process.pid }));
    store = appendGeneration(store, generation({ pid: deadPid, state: 'starting' }));

    const { store: reaped, reaped: outcomes } = reapManagedOpenCodeStore(store);

    expect(outcomes).toEqual([{ generation_id: 2, pid: deadPid, outcome: 'pid-gone' }]);
    expect(reaped.generations[0].state).toBe('active');
    expect(reaped.generations[1].state).toBe('closed');
    expect(reaped.generations[1].ended_at).not.toBeNull();
  });

  it('leaves closed generations alone', () => {
    let store = appendGeneration(createEmptyManagedOpenCodeStore(), generation({ pid: deadPid }));
    store = transitionGenerationState(store, 1, 'closed', '2026-02-01T00:00:00.000Z');

    const { store: reaped, reaped: outcomes } = reapManagedOpenCodeStore(store);

    expect(outcomes).toEqual([]);
    expect(reaped.generations[0].ended_at).toBe('2026-02-01T00:00:00.000Z');
  });
});
