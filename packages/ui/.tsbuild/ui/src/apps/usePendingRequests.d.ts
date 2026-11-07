export type PendingRequests = {
    hasPermission: boolean;
    hasForm: boolean;
};
/**
 * Whether a permission request or a form waits for a row. The answer comes
 * from the cross-directory request index, so a project the phone never opened
 * still shows them. `sessionIds` is the row's own session plus any subsessions
 * it hides: a subagent's request blocks the whole family.
 */
export declare const usePendingRequests: (sessionIds: readonly string[]) => PendingRequests;
