import type { OpenSessionLeave } from '@/stores/sidebarLayout';
import type { SessionSidebarNavigationEntry } from '../sessionSidebarRowModel';
type LeaveTargetArgs = {
    policy: OpenSessionLeave;
    sessionId: string;
    /** Every session leaving with it (a batch archive), none of which can be the target. */
    leavingIds: ReadonlySet<string>;
    entries: readonly SessionSidebarNavigationEntry[];
    isAttentionContainer: (containerKey: string) => boolean;
    /** A finished turn not looked at yet. */
    isUnread: (sessionId: string) => boolean;
    /** Sessions opened before, newest last. */
    history: readonly string[];
};
/**
 * The session to open once the open one is marked done or archived, from the
 * rows as the user saw them: the top one needing attention (else the first
 * finished one not looked at, else the first in the same list), the next one
 * down or up in the same list (then in the whole sidebar), one direction
 * with the other as fallback when there is nothing that way, or the session
 * opened before. Null when nothing fits or the choice opens nothing.
 */
export declare const resolveLeaveTarget: (args: LeaveTargetArgs) => SessionSidebarNavigationEntry | null;
export {};
