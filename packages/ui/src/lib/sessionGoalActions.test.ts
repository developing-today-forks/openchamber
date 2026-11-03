import { describe, expect, mock, test } from 'bun:test';
import type { Metadata } from '@/lib/opencode/model';
import type { SessionGoalPayload } from '@/lib/sessionGoalMetadata';

// setSessionGoal harness: the save reads and writes through the session
// metadata store and the objective file store. Both are kept in memory here
// so a test can land an intervening change between the pre-check read and
// the guarded metadata write — the window #1372 is about.
let storedMetadata: Metadata = {};
let objectiveFileContent: string | null = null;
let completeGoalBeforeMetadataWrite = false;
const objectiveFileWrites: string[] = [];
let objectiveFileDeletes = 0;

const resetGoalHarness = (goal: Metadata, fileContent: string | null) => {
  storedMetadata = { openchamber: { goal } };
  objectiveFileContent = fileContent;
  completeGoalBeforeMetadataWrite = false;
  objectiveFileWrites.length = 0;
  objectiveFileDeletes = 0;
};

mock.module('@/sync/session-actions', () => ({
  abortCurrentOperation: () => undefined,
  patchSessionMetadata: async (
    _sessionId: string,
    _directory: string | undefined,
    updater: (metadata: Metadata) => Metadata,
  ) => {
    if (completeGoalBeforeMetadataWrite) {
      const namespace = storedMetadata.openchamber as Metadata;
      const goal = namespace.goal as Metadata;
      storedMetadata = { openchamber: { goal: { ...goal, status: 'complete' } } };
    }
    storedMetadata = updater(storedMetadata);
    return { metadata: storedMetadata };
  },
}));

mock.module('@/lib/opencode/client', () => ({
  opencodeClient: {
    getSession: async () => ({ metadata: storedMetadata }),
  },
}));

mock.module('@/lib/goalObjectiveFiles', () => ({
  fetchGoalObjectiveContent: async () => objectiveFileContent,
  writeGoalObjectiveFile: async (_sessionId: string, content: string) => {
    objectiveFileWrites.push(content);
    objectiveFileContent = content;
    return { saved: true, truncated: false };
  },
  deleteGoalObjectiveFile: () => {
    objectiveFileDeletes += 1;
    objectiveFileContent = null;
  },
}));

mock.module('@/lib/smallModel', () => ({
  distillGoalObjective: async () => null,
}));

mock.module('@/lib/goalWriter', () => ({
  requestGoalSpec: async () => ({ ok: false, message: 'writer unused in these tests' }),
}));

mock.module('@/lib/i18n', () => ({
  formatMessage: () => '',
  useI18nStore: { getState: () => ({ dictionary: {} }) },
}));

mock.module('@/components/ui', () => ({
  toast: { error: () => undefined, success: () => undefined },
}));

mock.module('@/stores/useUIStore', () => ({
  useUIStore: { getState: () => ({ sessionGoalObjectiveCharLimit: 100_000 }) },
}));

const { goalObjectiveRevision, nextGoalRecord, setSessionGoal } = await import('./sessionGoalActions');

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

describe('session-goal save against the objective file', () => {
  const priorText = 'Prior objective text';
  const newText = 'New objective text';

  const storedGoal = (overrides: Metadata = {}): Metadata => ({
    id: 'goal-1',
    status: 'active',
    objective: '',
    objectiveFile: true,
    objectiveRevision: goalObjectiveRevision(priorText),
    tokensUsed: 900,
    turnsUsed: 4,
    lastAccountedMessageID: 'msg-9',
    updatedAt: 50,
    ...overrides,
  });

  const editPayload = (): SessionGoalPayload => ({
    ...existing,
    objectiveRevision: goalObjectiveRevision(priorText),
  });

  const storedGoalNow = (): Metadata => (storedMetadata.openchamber as Metadata).goal as Metadata;

  // The check completing the goal while this save is in flight aborts the
  // metadata write; before #1372 the aborted save had already overwritten
  // the objective file, leaving the surviving goal pointing at text its
  // stored revision does not describe.
  test('an intervening completion aborts the save and leaves the objective file byte-identical', async () => {
    resetGoalHarness(storedGoal(), priorText);
    completeGoalBeforeMetadataWrite = true;
    const result = await setSessionGoal('session-1', undefined, { objective: newText, tokenBudget: null }, editPayload());
    expect(result).toEqual({ outcome: 'changed' });
    expect(objectiveFileContent).toBe(priorText);
    expect(storedGoalNow().status).toBe('complete');
    expect(storedGoalNow().objectiveRevision).toBe(goalObjectiveRevision(priorText));
  });

  test('an aborted save with no prior objective file deletes the file it wrote', async () => {
    resetGoalHarness(storedGoal(), null);
    completeGoalBeforeMetadataWrite = true;
    const result = await setSessionGoal('session-1', undefined, { objective: newText, tokenBudget: null }, editPayload());
    expect(result).toEqual({ outcome: 'changed' });
    expect(objectiveFileWrites).toEqual([newText]);
    expect(objectiveFileDeletes).toBe(1);
    expect(objectiveFileContent).toBeNull();
  });

  test('a save with no intervening change writes the new objective and keeps it', async () => {
    resetGoalHarness(storedGoal(), priorText);
    const result = await setSessionGoal('session-1', undefined, { objective: newText, tokenBudget: null }, editPayload());
    expect(result).toEqual({ outcome: 'saved', rewrittenSpec: null });
    expect(objectiveFileContent).toBe(newText);
    expect(objectiveFileDeletes).toBe(0);
    expect(storedGoalNow().objectiveRevision).toBe(goalObjectiveRevision(newText));
  });

  test('a goal already changed at the pre-check is refused before any file write', async () => {
    resetGoalHarness(storedGoal({ status: 'paused' }), priorText);
    const result = await setSessionGoal('session-1', undefined, { objective: newText, tokenBudget: null }, editPayload());
    expect(result).toEqual({ outcome: 'changed' });
    expect(objectiveFileWrites).toEqual([]);
    expect(objectiveFileContent).toBe(priorText);
  });
});
