import type { Session } from '@/lib/opencode/model';
import type { SessionGroup } from '../types';
/**
 * The sessions "Archive all" takes from a project: every top-level session in
 * its groups, minus the ones the user still wants in front of them. Their
 * subagents join through `withArchiveAllSubtrees`, and the archived bucket is
 * already archived.
 */
export declare const selectArchiveAllSessionIds: (groups: readonly SessionGroup[], isKept: (session: Session) => boolean) => string[];
/** A top-level session "Archive all" takes, with the subagents that go along. */
type ArchiveAllTarget = {
    id: string;
    descendantIds: readonly string[];
};
/**
 * The server does not cascade an archive, so each session's subagents go in
 * the same batch, or they would stay active as orphan rows. A session whose
 * subagent is still running stays, as a running session itself does.
 */
export declare const withArchiveAllSubtrees: (rootIds: readonly string[], descendantIdsOf: (rootId: string) => readonly string[], isBusy: (sessionId: string) => boolean) => ArchiveAllTarget[];
/**
 * The outcome in top-level sessions, the rows the dialog counted: one counts
 * as archived when it and all its subagents were, and as failed when any of
 * them was not, since a subagent left behind stays as a row of its own.
 */
export declare const countArchiveAllOutcome: (targets: readonly ArchiveAllTarget[], failedIds: readonly string[]) => {
    archived: number;
    failed: number;
};
export {};
