export declare const recordSessionActionFailure: (sessionId: string, error: Error) => void;
/** Take (and forget) the first recorded error among the given sessions. */
export declare const takeSessionActionFailure: (sessionIds: readonly string[]) => Error | null;
export declare const resetSessionActionFailures: () => void;
