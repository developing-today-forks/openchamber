import { z } from 'zod';
import { runtimeFetch } from '@/lib/runtime-fetch';

const ObjectiveResponseSchema = z.object({ content: z.string() });
// `length` arrived in 2026-10; an older server answers `{ ok: true }` alone.
const WriteResponseSchema = z.object({ length: z.number().int().nonnegative().optional() }).catch({});
// What an OpenChamber server from before the goal length setting keeps of an objective.
const LEGACY_SERVER_OBJECTIVE_LIMIT = 5_000;

// File-backed goal objectives: the text lives in a server-side file keyed by
// the session id (one goal per session; a new goal overwrites the old file).
// The metadata only carries an `objectiveFile: true` flag so it stays light
// for session.updated fanout.

const objectiveUrl = (sessionId: string): string =>
  `/api/goals/objective/${encodeURIComponent(sessionId)}`;

export type GoalObjectiveFileWrite =
  | { saved: false }
  /** `truncated`: the server kept less than was sent, so the goal lost its end. */
  | { saved: true; truncated: boolean };

/** Write the session's objective file. */
export async function writeGoalObjectiveFile(sessionId: string, content: string): Promise<GoalObjectiveFileWrite> {
  try {
    const response = await runtimeFetch(objectiveUrl(sessionId), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });
    if (!response.ok) return { saved: false };
    const { length } = WriteResponseSchema.parse(await response.json().catch(() => ({})));
    const kept = length ?? Math.min(content.trim().length, LEGACY_SERVER_OBJECTIVE_LIMIT);
    return { saved: true, truncated: kept < content.trim().length };
  } catch {
    return { saved: false };
  }
}

/** Best-effort delete; a failure leaves an orphaned file the next goal overwrites. */
export function deleteGoalObjectiveFile(sessionId: string): void {
  void runtimeFetch(objectiveUrl(sessionId), { method: 'DELETE' }).catch(() => undefined);
}

/**
 * The objective file read as a snapshot: `content` when a file was read,
 * `missing` only when the server answered 404 (its confirmed-absence
 * answer), and `unavailable` for every other failure — a transient error is
 * not evidence that no file exists, and a caller that needs to restore or
 * delete the file must be able to tell the two apart.
 */
export type GoalObjectiveSnapshot =
  | { kind: 'content'; content: string }
  | { kind: 'missing' }
  | { kind: 'unavailable' };

export async function fetchGoalObjectiveSnapshot(sessionId: string): Promise<GoalObjectiveSnapshot> {
  try {
    const response = await runtimeFetch(objectiveUrl(sessionId));
    if (response.status === 404) return { kind: 'missing' };
    if (!response.ok) return { kind: 'unavailable' };
    const parsed = ObjectiveResponseSchema.safeParse(await response.json().catch(() => null));
    return parsed.success ? { kind: 'content', content: parsed.data.content } : { kind: 'unavailable' };
  } catch {
    return { kind: 'unavailable' };
  }
}

/** Fetch the file-backed objective text; null when unavailable. */
export async function fetchGoalObjectiveContent(sessionId: string): Promise<string | null> {
  const snapshot = await fetchGoalObjectiveSnapshot(sessionId);
  return snapshot.kind === 'content' ? snapshot.content : null;
}
