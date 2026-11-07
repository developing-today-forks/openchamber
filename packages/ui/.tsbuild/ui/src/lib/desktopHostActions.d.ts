type HostActionFailure = 'invalid-link' | 'unreachable' | 'failed';
/** Runs every pending action in order; one failure does not stop the rest. */
export declare const runPendingDesktopHostActions: (onFailure: (failure: HostActionFailure) => void) => Promise<void>;
export {};
