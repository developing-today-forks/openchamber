type RequestsInFlightState = {
    enabled: boolean;
    startedAt: number;
    inFlight: number;
    peak: number;
    totalStarted: number;
    totalSettled: number;
    samples: number[];
    p50Samples: number[];
    p90Samples: number[];
    p99Samples: number[];
    maxSamples: number[];
    peakAgeMs: number;
    inFlightStarts: Map<number, number>;
    sampleCount: number;
    lastSampleAt: number | null;
    fetchWrapped: boolean;
    originalFetch: typeof window.fetch | null;
    sampleTimer: number | null;
};
export type RequestsInFlightSnapshot = {
    enabled: boolean;
    startedAt: number | null;
    durationMs: number;
    inFlight: number;
    peak: number;
    totalStarted: number;
    totalSettled: number;
    samples: number[];
    ageP50: number;
    ageP90: number;
    ageP99: number;
    ageMax: number;
    peakAgeMs: number;
    p50Samples: number[];
    p90Samples: number[];
    p99Samples: number[];
    maxSamples: number[];
    sampleCount: number;
    lastSampleAt: number | null;
    windowSeconds: number;
};
declare global {
    interface Window {
        __openchamberRequestsInFlight__?: RequestsInFlightState;
    }
}
export declare const setRequestsInFlightTrackingEnabled: (enabled: boolean) => void;
export declare const resetRequestsInFlight: () => void;
export declare const getRequestsInFlightSnapshot: () => RequestsInFlightSnapshot;
export {};
