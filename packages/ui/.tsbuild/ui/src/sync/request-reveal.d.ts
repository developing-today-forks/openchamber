export declare const revealRequest: (requestID: string) => void;
/**
 * Calls `onReveal` once when a toast asks to reveal one of `requestIDs`.
 * `onReveal` should be stable.
 */
export declare const useRequestReveal: (requestIDs: readonly string[], onReveal: (requestID: string) => void) => void;
