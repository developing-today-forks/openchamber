/**
 * Moves what the shown session's turn is blocked on (a running shell command,
 * a subagent it waits for) to the background, for the session the status row
 * describes. The caller decides when that is possible (`working.canBackground`
 * from `useAssistantStatus`); OpenCode ignores the request when nothing blocks.
 */
export declare function useBackgroundSessionWork(): () => void;
