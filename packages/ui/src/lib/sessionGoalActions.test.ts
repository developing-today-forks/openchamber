import { describe, expect, mock, test } from 'bun:test';
import type { Metadata } from '@/lib/opencode/model';
import type { SessionGoalPayload } from '@/lib/sessionGoalMetadata';

// In-memory stand-ins for the three boundaries setSessionGoal crosses: the
// session metadata store, the opencode client reading it back, and the
// objective-file HTTP endpoint (keyed by session id, one file per session).
const goalFiles = new Map<string, string>();
let storedMetadata: Record<string, unknown> = {};
let interveneBeforePatch: (() => void) | null = null;

mock.module('@/sync/session-actions', () => ({
  abortCurrentOperation: async () => undefined,
  getSessionLastAssistantModel: async () => null,
  patchSessionMetadata: async (
    _sessionId: string,
    _directory: string | undefined,
    updater: (metadata: Record<string, unknown>) => Record<string, unknown>,
  ) => {
    interveneBeforePatch?.();
    interveneBeforePatch = null;
    storedMetadata = updater(storedMetadata);
  },
}));

mock.module('@/lib/opencode/client', () => ({
  opencodeClient: {
    getSession: async () => ({ metadata: storedMetadata }),
  },
}));

mock.module('@/lib/runtime-fetch', () => ({
  runtimeFetch: async (url: string, init?: { method?: string; body?: string }) => {
    const sessionId = decodeURIComponent(url.split('/').pop() ?? '');
    const method = init?.method ?? 'GET';
    if (method === 'PUT') {
      const { content } = JSON.parse(init?.body ?? '{}') as { content: string };
      goalFiles.set(sessionId, content);
      return { ok: true, json: async () => ({ length: content.length }) };
    }
    if (method === 'DELETE') {
      goalFiles.delete(sessionId);
      return { ok: true, json: async () => ({}) };
    }
    const content = goalFiles.get(sessionId);
    if (content === undefined) return { ok: false, json: async () => ({}) };
    return { ok: true, json: async () => ({ content }) };
  },
}));

const { nextGoalRecord, setSessionGoal, goalObjectiveRevision } = await import('./sessionGoalActions');

const existing: SessionGoalPayload = {
  id: 'goal-1',
  objective: 'Old objective',
  objectiveFile: true,
  objectiveRevision: 'rev-a',
  ignoreObjectiveLimit: false,
  status: 'active',
  tokenBudget: null,
  tokensUsed: 900,
  turnsUsed: 4,
  statusReason: '',
  evaluationProviderID: '',
  evaluationModelID: '',
  lastAccountedMessageID: 'msg-9',
  createdAt: 1,
  updatedAt: 50,
};

const stored = { id: 'goal-1', status: 'active', updatedAt: 50, tokensUsed: 900, turnsUsed: 4, lastAccountedMessageID: 'msg-9' };

const save = (currentGoal: Metadata | null, overrides: Partial<Parameters<typeof nextGoalRecord>[0]> = {}) => nextGoalRecord({
  currentGoal,
  existing,
  objective: '',
  objectiveFile: true,
  objectiveRevision: 'rev-new',
  ignoreLimit: false,
  tokenBudget: null,
  kickoff: true,
  now: 100,
  newId: 'goal-2',
  ...overrides,
});

describe('goal record for a save', () => {
  test('an edit keeps the goal and its usage, and reactivates it', () => {
    expect(save(stored)).toMatchObject({
      changed: false,
      record: { id: 'goal-1', tokensUsed: 900, turnsUsed: 4, status: 'active', statusReason: 'resumed', updatedAt: 100 },
    });
  });

  test('an edit sent with a message does not ask for an immediate check', () => {
    const next = save(stored, { kickoff: false });
    expect(next.changed ? null : next.record.statusReason).toBe('');
  });

  // A rewrite can take minutes: the check may complete the goal, the user may
  // pause it, another window may replace it. Saving over any of those would
  // reactivate an outcome or reset another goal's usage.
  // The server runtime stamps a fresh updatedAt on every accounting
  // merge-write, so a settlement landing while the editor is open must not
  // read as somebody else editing the goal.
  test('an accounting bump after the edit began is not a conflicting edit', () => {
    const next = save({ ...stored, updatedAt: 999, tokensUsed: 1500, turnsUsed: 5, lastAccountedMessageID: 'msg-10' });
    expect(next).toMatchObject({ changed: false, record: { id: 'goal-1', tokensUsed: 1500, turnsUsed: 5 } });
  });

  test('a genuine objective change after the edit began is still refused', () => {
    const inlineExisting = { ...existing, objectiveFile: false };
    expect(save({ ...stored, objective: 'Old objective' }, { existing: inlineExisting }).changed).toBe(false);
    expect(save({ ...stored, objective: 'Rewritten elsewhere' }, { existing: inlineExisting })).toEqual({ changed: true });
  });

  // File-backed goals carry no objective text in the record, so an
  // intervening save is detected by the objective revision it stamps:
  // accounting preserves the revision, a save replaces it.
  test('a file-backed goal whose objective was saved elsewhere is refused', () => {
    expect(save({ ...stored, objectiveRevision: 'rev-b', updatedAt: 999 })).toEqual({ changed: true });
  });

  test('an accounting bump on a file-backed goal keeps its revision and is not a conflict', () => {
    const next = save({ ...stored, objectiveRevision: 'rev-a', updatedAt: 999, tokensUsed: 1500 });
    expect(next).toMatchObject({ changed: false, record: { objectiveRevision: 'rev-new', tokensUsed: 1500 } });
  });

  // Budget and limit flag are user-editable settings an accounting
  // merge-write cannot change; another window lowering the budget while
  // this edit is open is a real conflict, not an accounting bump.
  test('a budget or limit change after the edit began is a conflicting edit', () => {
    expect(save({ ...stored, tokenBudget: 5000 })).toEqual({ changed: true });
    expect(save({ ...stored, ignoreObjectiveLimit: true })).toEqual({ changed: true });
  });

  test('an edit begun after the budget was set still saves over accounting bumps', () => {
    const budgeted = { ...existing, tokenBudget: 5000, ignoreObjectiveLimit: true };
    const next = save(
      { ...stored, tokenBudget: 5000, ignoreObjectiveLimit: true, updatedAt: 999, tokensUsed: 1500 },
      { existing: budgeted },
    );
    expect(next).toMatchObject({ changed: false, record: { id: 'goal-1', tokensUsed: 1500 } });
  });

  test('an edit is refused when the stored goal changed after it began', () => {
    expect(save({ ...stored, status: 'complete' })).toEqual({ changed: true });
    expect(save({ ...stored, status: 'paused', updatedAt: 60 })).toEqual({ changed: true });
    expect(save({ ...stored, id: 'goal-other' })).toEqual({ changed: true });
    expect(save(null)).toEqual({ changed: true });
  });

  test('a new goal states its length limit choice, so the replaced goal cannot pass it on', () => {
    const next = save({ ...stored, ignoreObjectiveLimit: true }, { existing: null });
    expect(next).toMatchObject({
      changed: false,
      record: { id: 'goal-2', ignoreObjectiveLimit: false, tokensUsed: 0, turnsUsed: 0, statusReason: '' },
    });
  });
});

describe('setSessionGoal objective file ordering', () => {
  const sessionId = 'session-1';
  const storedGoal = {
    id: 'goal-1',
    status: 'active',
    objective: '',
    objectiveFile: true,
    objectiveRevision: goalObjectiveRevision('Old objective'),
    ignoreObjectiveLimit: false,
    tokenBudget: null,
    tokensUsed: 900,
    turnsUsed: 4,
    statusReason: '',
    lastAccountedMessageID: 'msg-9',
    createdAt: 1,
    updatedAt: 50,
  };
  const existingPayload: SessionGoalPayload = {
    ...existing,
    objective: '',
    objectiveRevision: goalObjectiveRevision('Old objective'),
  };
  const seed = () => {
    storedMetadata = { openchamber: { goal: { ...storedGoal } } };
    goalFiles.set(sessionId, 'Old objective');
  };

  // #1372: an intervening save lands between this save's pre-check and its
  // metadata write. The metadata write aborts as `changed` — and the
  // intervening save's objective file must survive byte-identical (the old
  // order wrote this save's file first and clobbered it).
  test('an intervening save keeps its objective file when this save aborts as changed', async () => {
    seed();
    interveneBeforePatch = () => {
      storedMetadata = {
        openchamber: {
          goal: { ...storedGoal, objectiveRevision: goalObjectiveRevision('Intervening objective'), updatedAt: 99 },
        },
      };
      goalFiles.set(sessionId, 'Intervening objective');
    };
    const result = await setSessionGoal(sessionId, undefined, { objective: 'My new objective', tokenBudget: null }, existingPayload);
    expect(result.outcome).toBe('changed');
    expect(goalFiles.get(sessionId)).toBe('Intervening objective');
  });

  test('a clean save writes its objective file and stamps its revision', async () => {
    seed();
    const result = await setSessionGoal(sessionId, undefined, { objective: 'My new objective', tokenBudget: null }, existingPayload);
    expect(result.outcome).toBe('saved');
    expect(goalFiles.get(sessionId)).toBe('My new objective');
    const goal = (storedMetadata.openchamber as { goal: Metadata }).goal;
    expect(goal.objectiveFile).toBe(true);
    expect(goal.objectiveRevision).toBe(goalObjectiveRevision('My new objective'));
  });
});
