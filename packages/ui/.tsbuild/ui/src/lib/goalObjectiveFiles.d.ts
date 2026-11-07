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
/** Fetch the file-backed objective text; null when unavailable. */
export declare function fetchGoalObjectiveContent(sessionId: string): Promise<string | null>;
