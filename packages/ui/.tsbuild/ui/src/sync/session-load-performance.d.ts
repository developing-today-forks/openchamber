type SessionLoadPerformanceOutcome = "complete" | "error" | "stale" | "deduplicated" | "canceled";
type SessionLoadPerformanceEvent = {
    operation: string;
    caller?: string;
    queuedMs?: number;
    requestLimit?: number;
    cursorPresent?: boolean;
    durationMs: number;
    outcome: SessionLoadPerformanceOutcome;
    retryCount?: number;
    recordCount?: number;
    at: number;
};
type SessionLoadPerformanceState = {
    events: SessionLoadPerformanceEvent[];
};
declare global {
    interface Window {
        __openchamberSessionLoadPerformance?: SessionLoadPerformanceState;
    }
}
export declare function startSessionLoadPerformanceEvent(input: Omit<SessionLoadPerformanceEvent, "at" | "durationMs" | "outcome">): (outcome: SessionLoadPerformanceOutcome, details?: Partial<Pick<SessionLoadPerformanceEvent, "retryCount" | "recordCount">>) => void;
type FirstVisibleSessionPerformanceDependencies = {
    enabled: () => boolean;
    requestFrame: (callback: FrameRequestCallback) => number;
    cancelFrame: (frame: number) => void;
    markVisible: () => void;
    startEvent: typeof startSessionLoadPerformanceEvent;
};
export declare function createFirstVisibleSessionPerformanceTracker(dependencies?: Partial<FirstVisibleSessionPerformanceDependencies>): {
    schedule(key: string, recordCount: number): () => void;
};
export {};
