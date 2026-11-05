// File-backed goal objectives. Session metadata must stay light (it rides
// every session.updated event), so the objective TEXT lives in a file under
// the OpenChamber data dir, keyed by the SESSION ID: sessions are globally
// unique and carry at most one goal at a time, so the mapping is fully
// deterministic — the metadata only carries an `objectiveFile: true` flag,
// never a path, and user-writable metadata cannot become a file-read vector.

import fs from 'fs';
import os from 'os';
import path from 'path';

export const GOAL_OBJECTIVE_CHAR_LIMIT = 5_000;
// The Settings bounds for both limits below; the upper one also caps a goal
// whose limit the user switched off, so one file stays readable.
const MIN_CHAR_LIMIT = 1_000;
export const GOAL_OBJECTIVE_HARD_CAP = 1_000_000;
// The most bytes a bounded objective read may buffer: the hard cap's chars
// at UTF-8's widest (4 bytes a char), plus one char of slack so a read that
// stops at the bound never splits the sequence of the cap's last char.
const GOAL_OBJECTIVE_MAX_READ_BYTES = GOAL_OBJECTIVE_HARD_CAP * 4 + 4;
// How much of the objective the progress check reads. Above the goal limit by
// default, so a goal within its limit reaches the check whole.
const GOAL_CHECK_OBJECTIVE_CHAR_LIMIT = 20_000;

const asCharLimit = (value, fallback) => (
  Number.isInteger(value) && value >= MIN_CHAR_LIMIT && value <= GOAL_OBJECTIVE_HARD_CAP ? value : fallback
);

/**
 * The objective limits from Settings: `objective` is the most a goal keeps
 * (`sessionGoalObjectiveCharLimit`), `check` is the most of it the progress
 * check reads (`sessionGoalCheckObjectiveCharLimit`).
 */
export const goalObjectiveLimits = (settings) => ({
  objective: asCharLimit(settings?.sessionGoalObjectiveCharLimit, GOAL_OBJECTIVE_CHAR_LIMIT),
  check: asCharLimit(settings?.sessionGoalCheckObjectiveCharLimit, GOAL_CHECK_OBJECTIVE_CHAR_LIMIT),
});

// OpenCode session ids are URL-safe tokens; anything else is rejected before
// touching the filesystem.
const SESSION_ID_PATTERN = /^[A-Za-z0-9_-]{4,128}$/;

const goalsDir = () => path.join(
  process.env.OPENCHAMBER_DATA_DIR
    ? path.resolve(process.env.OPENCHAMBER_DATA_DIR)
    : path.join(os.homedir(), '.config', 'openchamber'),
  'goals',
);

const objectiveFilePath = (sessionId) => path.join(goalsDir(), `${sessionId}.md`);

const isValidObjectiveKey = (sessionId) =>
  typeof sessionId === 'string' && SESSION_ID_PATTERN.test(sessionId);

// The goal's own limit is applied before the text gets here (the UI and
// `createSessionGoal` condense a longer one); the file only refuses runaway
// sizes, so a goal whose limit was raised or switched off is kept whole.
const clampContent = (content) => String(content ?? '').trim().slice(0, GOAL_OBJECTIVE_HARD_CAP);

/** Write (or overwrite — a new goal replaces the old one) the session's objective. */
export const writeObjective = async (sessionId, content) => {
  if (!isValidObjectiveKey(sessionId)) {
    throw Object.assign(new Error('invalid session id'), { statusCode: 400 });
  }
  const text = clampContent(content);
  if (!text) {
    throw Object.assign(new Error('objective content is required'), { statusCode: 400 });
  }
  await fs.promises.mkdir(goalsDir(), { recursive: true });
  await fs.promises.writeFile(objectiveFilePath(sessionId), text, 'utf8');
  return { content: text };
};

/** Returns the objective text, or null when missing/invalid. */
export const readObjective = async (sessionId) => {
  if (!isValidObjectiveKey(sessionId)) return null;
  let handle;
  try {
    // The objective file lives in the user's data dir, outside the server's
    // control between writes: it can be far larger than the hard cap, or not
    // a regular file at all (#1582). Open non-blocking (POSIX) so a FIFO
    // with no writer cannot wedge the open, judge the handle's stat, and
    // read at most the byte bound the clamped result can ever need - the
    // cap is enforced during the read, in the shared bounded-read shape
    // (lib/shared/bounded-file-read.js), not after a whole-file buffer.
    const flags = process.platform === 'win32' || fs.constants.O_NONBLOCK === undefined
      ? 'r'
      : fs.constants.O_RDONLY | fs.constants.O_NONBLOCK;
    handle = await fs.promises.open(objectiveFilePath(sessionId), flags);
    const stat = await handle.stat();
    if (!stat.isFile()) return null;
    const chunks = [];
    let total = 0;
    while (total <= GOAL_OBJECTIVE_MAX_READ_BYTES) {
      const chunk = Buffer.alloc(Math.min(64 * 1024, GOAL_OBJECTIVE_MAX_READ_BYTES + 1 - total));
      const { bytesRead } = await handle.read(chunk, 0, chunk.length, total);
      if (bytesRead === 0) break;
      chunks.push(chunk.subarray(0, bytesRead));
      total += bytesRead;
    }
    return clampContent(Buffer.concat(chunks, total).toString('utf8'));
  } catch {
    return null;
  } finally {
    await handle?.close().catch(() => undefined);
  }
};

/** Best-effort delete; missing files are fine. */
export const deleteObjective = async (sessionId) => {
  if (!isValidObjectiveKey(sessionId)) return;
  await fs.promises.unlink(objectiveFilePath(sessionId)).catch(() => undefined);
};
