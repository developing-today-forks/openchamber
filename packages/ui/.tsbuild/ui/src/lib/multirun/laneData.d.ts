export type LanePrompt = {
    messageId: string;
    text: string;
    files: Array<{
        mime: string;
        filename?: string;
        url: string;
    }>;
};
export type LaneDiffStat = {
    files: number;
    insertions: number;
    deletions: number;
};
/** The user message that started the lane, with its attachments. Null when there is none yet. */
export declare function loadLaneFirstPrompt(sessionId: string, directory: string): Promise<LanePrompt | null>;
export type LaneLastTurn = {
    /** Latest assistant reply text; empty when it has not answered yet. */
    text: string;
    /** Error OpenCode recorded on the newest assistant message, if any. */
    error: string | null;
};
/** The lane's latest reply text and the error its newest step recorded. */
export declare function loadLaneLastTurn(sessionId: string, directory: string): Promise<LaneLastTurn>;
/** Text of the lane's latest assistant reply; an empty string when it has not answered yet. */
export declare function loadLaneLastReply(sessionId: string, directory: string): Promise<string>;
/**
 * Uncommitted changes of a lane worktree against its HEAD: every changed path
 * counts as a file, tracked edits contribute line counts. Throws on failure,
 * so a read error is never shown as a lane without changes.
 */
export declare function loadLaneDiffStat(directory: string): Promise<LaneDiffStat>;
/**
 * Tiny result cache for the overview: an entry is reused while its token
 * (runtime + session + the lane's last idle time) is unchanged, so reopening
 * the overview does not refetch finished lanes. Bounded by eviction of the
 * oldest entries.
 */
export declare function createLaneCache<T>(limit?: number): {
    tokenFor(sessionId: string, revision: number | string | undefined): string;
    get(sessionId: string, token: string): T | undefined;
    set(sessionId: string, token: string, value: T): void;
};
