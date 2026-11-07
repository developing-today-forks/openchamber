/**
 * Recent prompt-send failures, kept in memory for diagnostics.
 *
 * A rejected send rolls the optimistic message back and, for transport-level
 * failures, the composer stays silent by design. That makes a misrouted or
 * refused prompt indistinguishable from "nothing happened" — the user has
 * nothing to report beyond "it disappeared".
 *
 * This buffer gives the failure somewhere to live until someone asks for it,
 * via `__opencodeDebug`; the diagnostic timeline exports only transport status
 * and ambiguity, not the raw reason. It is
 * in-memory only: never persisted, never sent anywhere, and dropped on reload.
 */
export type SendFailureRecord = {
    at: number;
    sessionId: string;
    messageId: string;
    /** Directory the prompt was routed to — the value under suspicion. */
    directory: string | null;
    /** HTTP status, or null for a transport failure with no response. */
    status: number | null;
    /** Whether the send may still have been accepted server-side. */
    ambiguous: boolean;
    /** Whether a confirmation refetch ran and failed to find the message. */
    confirmationChecked: boolean;
    reason: string;
};
export declare function recordSendFailure(record: Omit<SendFailureRecord, 'at' | 'reason'> & {
    reason: string;
}): void;
/** Newest first. */
export declare function getRecentSendFailures(): SendFailureRecord[];
