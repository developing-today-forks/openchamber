import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { createScheduledTaskRunHistory } from './run-history.js';

// Oracle (#2174 Gap 1): every completed scheduled-task run yields
// exactly one durable history row carrying its terminal outcome —
// never zero (a lost run), never two (a duplicate terminal event).

const tempDirs = [];
const makeHistory = () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'run-history-'));
  tempDirs.push(dir);
  const filePath = path.join(dir, 'scheduled-task-run-history.jsonl');
  const logger = { warn: vi.fn() };
  return { history: createScheduledTaskRunHistory({ filePath, logger }), filePath, logger };
};

afterEach(() => {
  for (const dir of tempDirs.splice(0)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

describe('createScheduledTaskRunHistory', () => {
  it('records exactly one row for a running→success run, with start and finish', () => {
    const { history } = makeHistory();
    history.recordEvent({ projectID: 'code', taskID: 'task-1', taskName: 'Lane A', status: 'running', ranAt: 1_000, sessionID: 'ses_1' });
    expect(history.listRuns({ projectID: 'code' })).toEqual([]);
    history.recordEvent({ projectID: 'code', taskID: 'task-1', status: 'success', ranAt: 4_500, sessionID: 'ses_1' });
    // A duplicate delivery of the same terminal event changes nothing.
    history.recordEvent({ projectID: 'code', taskID: 'task-1', status: 'success', ranAt: 4_500, sessionID: 'ses_1' });

    expect(history.listRuns({ projectID: 'code' })).toEqual([
      {
        projectId: 'code',
        taskId: 'task-1',
        taskName: 'Lane A',
        startedAt: 1_000,
        finishedAt: 4_500,
        outcome: 'success',
        sessionId: 'ses_1',
        tokens: null,
      },
    ]);
  });

  it('records a terminal event with no observed start (server restarted mid-run)', () => {
    const { history } = makeHistory();
    history.recordEvent({ projectID: 'code', taskID: 'task-2', status: 'error', ranAt: 9_000, sessionID: 'ses_2' });
    const runs = history.listRuns({ projectID: 'code' });
    expect(runs).toHaveLength(1);
    expect(runs[0]).toMatchObject({ taskId: 'task-2', outcome: 'error', startedAt: null, finishedAt: 9_000 });
  });

  it('ignores non-terminal statuses other than running', () => {
    const { history } = makeHistory();
    history.recordEvent({ projectID: 'code', taskID: 'task-3', status: 'queued', ranAt: 100, sessionID: 'ses_3' });
    expect(history.listRuns({ projectID: 'code' })).toEqual([]);
  });

  it('round-trips rows through the JSONL file, dedupe included', () => {
    const { filePath } = makeHistory();
    const first = createScheduledTaskRunHistory({ filePath, logger: { warn: vi.fn() } });
    first.recordEvent({ projectID: 'code', taskID: 'task-1', status: 'running', ranAt: 10, sessionID: 'ses_1' });
    first.recordEvent({ projectID: 'code', taskID: 'task-1', status: 'success', ranAt: 20, sessionID: 'ses_1' });

    const second = createScheduledTaskRunHistory({ filePath, logger: { warn: vi.fn() } });
    expect(second.listRuns({ projectID: 'code' })).toHaveLength(1);
    second.recordEvent({ projectID: 'code', taskID: 'task-1', status: 'success', ranAt: 20, sessionID: 'ses_1' });
    expect(second.listRuns({ projectID: 'code' })).toHaveLength(1);
    expect(fs.readFileSync(filePath, 'utf8').trim().split('\n')).toHaveLength(1);
  });

  it('skips malformed lines at load instead of losing the file', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'run-history-'));
    tempDirs.push(dir);
    const filePath = path.join(dir, 'scheduled-task-run-history.jsonl');
    const good = JSON.stringify({
      projectId: 'code', taskId: 'task-1', taskName: null, startedAt: 1,
      finishedAt: 2, outcome: 'success', sessionId: null, tokens: null,
    });
    fs.writeFileSync(filePath, `not json\n${good}\n{"projectId":7}\n`);
    const history = createScheduledTaskRunHistory({ filePath, logger: { warn: vi.fn() } });
    expect(history.listRuns({ projectID: 'code' })).toHaveLength(1);
  });

  it('filters by task and time window, newest first', () => {
    const { history } = makeHistory();
    for (const [taskID, finishedAt] of [['task-1', 100], ['task-2', 200], ['task-1', 300]]) {
      history.recordEvent({ projectID: 'code', taskID, status: 'success', ranAt: finishedAt, sessionID: `ses_${finishedAt}` });
    }
    expect(history.listRuns({ projectID: 'code' }).map((r) => r.finishedAt)).toEqual([300, 200, 100]);
    expect(history.listRuns({ projectID: 'code', taskID: 'task-1' }).map((r) => r.finishedAt)).toEqual([300, 100]);
    expect(history.listRuns({ projectID: 'code', since: 150, until: 250 }).map((r) => r.finishedAt)).toEqual([200]);
    expect(history.listRuns({ projectID: 'code', limit: 2 })).toHaveLength(2);
    expect(history.listRuns({ projectID: 'other' })).toEqual([]);
  });

  it('never throws when the file cannot be written', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'run-history-'));
    tempDirs.push(dir);
    const blocker = path.join(dir, 'blocker');
    fs.writeFileSync(blocker, 'a regular file, not a directory');
    const logger = { warn: vi.fn() };
    const history = createScheduledTaskRunHistory({ filePath: path.join(blocker, 'history.jsonl'), logger });
    expect(() => history.recordEvent({ projectID: 'code', taskID: 'task-1', status: 'success', ranAt: 1 })).not.toThrow();
    expect(logger.warn).toHaveBeenCalled();
  });
});
