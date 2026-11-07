export declare const streamDebugEnabled: () => boolean;
type PerfCounter = {
    count: number;
    total: number;
    max: number;
    last: number;
};
type StreamPerfState = {
    counters: Map<string, PerfCounter>;
    startedAt: number;
    lastUpdatedAt: number;
};
type StreamPerfEntry = {
    metric: string;
    count: number;
    avg: number;
    max: number;
    total: number;
    last: number;
};
export type StreamPerfSnapshot = {
    enabled: boolean;
    startedAt: number | null;
    lastUpdatedAt: number | null;
    durationMs: number;
    entries: StreamPerfEntry[];
};
declare global {
    interface Window {
        __openchamberStreamPerfState?: StreamPerfState;
        __openchamberStreamPerformance?: {
            setEnabled: (enabled: boolean) => void;
            reset: () => void;
            getSnapshot: () => StreamPerfSnapshot;
        };
        __openchamberVsCodeStreamPerfState?: {
            counters: Map<string, PerfCounter>;
            lastReportAt?: number;
            lastUpdatedAt?: number;
            reportTimer?: number | null;
            startedAt?: number;
        };
    }
}
export declare const setStreamPerfEnabled: (enabled: boolean) => void;
export declare const setStreamPerfMemoryDebugEnabled: (enabled: boolean) => void;
export declare const resetStreamPerf: () => void;
export declare const getStreamPerfSnapshot: () => StreamPerfSnapshot;
export declare const getVsCodeStreamPerfSnapshot: () => StreamPerfSnapshot;
export declare const streamPerfCount: (metric: string, count?: number) => void;
export declare const streamPerfObserve: (metric: string, value: number) => void;
export declare const streamPerfMark: (metric: string) => void;
export declare const streamPerfMeasure: <T>(metric: string, fn: () => T) => T;
export {};
