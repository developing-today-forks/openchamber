import type { Session } from '@/lib/opencode/model';
import { type LaneDiffStat } from './laneData';
export type LaneReplyState = {
    state: 'loading';
} | {
    state: 'ready';
    text: string;
    error: string | null;
} | {
    state: 'error';
};
export type LaneDiffState = {
    state: 'none';
} | {
    state: 'loading';
} | {
    state: 'ready';
    stat: LaneDiffStat;
} | {
    state: 'error';
};
export type LaneSummary = {
    reply: LaneReplyState;
    diff: LaneDiffState;
};
export type LaneSummaryInput = {
    sessionId: string;
    session: Session | undefined;
    /** Worktree whose changes belong to this member; null when it shares a directory. */
    worktreePath: string | null;
};
/**
 * Final reply and worktree changes of each member, read once per finished
 * turn: a member's `time.idle` changes when a turn ends, which is the only
 * moment its reply or diff can have settled. Busy members keep what was last
 * read. A read failure is its own state, never an empty reply or zero changes.
 * A response is applied only while it answers the member's latest request, so
 * a slow older read never overwrites a newer one.
 */
export declare function useLaneSummaries(members: readonly LaneSummaryInput[], activeSessionIds: ReadonlySet<string>): ReadonlyMap<string, LaneSummary>;
