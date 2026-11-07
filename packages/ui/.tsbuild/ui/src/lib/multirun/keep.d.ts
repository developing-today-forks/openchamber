import type { Session } from '@/lib/opencode/model';
import { type RunMemberLocation } from './memberLocation';
import type { MultiRunSummary } from './runs';
type KeepFailureReason = 'membership-changed' | 'snapshot-failed' | 'archive-failed' | 'worktree-in-use' | 'worktree-removal-failed';
export type KeepRunResult = {
    keptSessionId: string;
    /** Members whose chat was archived (their worktree is gone unless listed in `failures`). */
    archivedIds: string[];
    failures: Array<{
        sessionId: string;
        reason: KeepFailureReason;
    }>;
};
/** Private ref that preserves a lane's complete work before its worktree is removed. */
export declare const runSnapshotRef: (run: Pick<MultiRunSummary, 'key' | 'groupSlug' | 'lanes' | 'fusions'>, sessionId: string) => string;
/**
 * Where a member lives: its project, and the worktree when it has one. A
 * member in the project root has no worktree and is never removed.
 */
export declare function resolveRunMemberLocation(session: Session, run: MultiRunSummary): Promise<RunMemberLocation | null>;
/**
 * Keeps one member of a run and cleans up the others. For every other member:
 * snapshot its worktree (tracked and untracked work) into a private ref, then
 * archive its chat, then remove the worktree and its local branch. A step that
 * fails stops cleanup for that member only and leaves its worktree in place.
 * The project root is never removed.
 */
export declare function keepRunMember(run: MultiRunSummary, keptSessionId: string, sessionById: ReadonlyMap<string, Session>): Promise<KeepRunResult>;
export {};
