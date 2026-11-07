export type GoalObjectiveFileWrite = {
    saved: false;
}
/** `truncated`: the server kept less than was sent, so the goal lost its end. */
 | {
    saved: true;
    truncated: boolean;
};
/** Write the session's objective file. */
export declare function writeGoalObjectiveFile(sessionId: string, content: string): Promise<GoalObjectiveFileWrite>;
/** Best-effort delete; a failure leaves an orphaned file the next goal overwrites. */
export declare function deleteGoalObjectiveFile(sessionId: string): void;
/**
 * The objective file read as a snapshot: `content` when a file was read,
 * `missing` only when the server answered 404 (its confirmed-absence
 * answer), and `unavailable` for every other failure — a transient error is
 * not evidence that no file exists, and a caller that needs to restore or
 * delete the file must be able to tell the two apart.
 */
export type GoalObjectiveSnapshot = {
    kind: 'content';
    content: string;
} | {
    kind: 'missing';
} | {
    kind: 'unavailable';
};
export declare function fetchGoalObjectiveSnapshot(sessionId: string): Promise<GoalObjectiveSnapshot>;
/** Fetch the file-backed objective text; null when unavailable. */
export declare function fetchGoalObjectiveContent(sessionId: string): Promise<string | null>;
