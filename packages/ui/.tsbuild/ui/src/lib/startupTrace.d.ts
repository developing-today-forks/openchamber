type StartupTraceEvent = {
    t: number;
    name: string;
    data?: Record<string, unknown>;
};
declare global {
    interface Window {
        __OPENCHAMBER_STARTUP_TRACE__?: StartupTraceEvent[];
        __OPENCHAMBER_STARTUP_TRACE_START__?: number;
    }
}
export declare const startupTraceEnabled: () => boolean;
export declare const markStartupTrace: (name: string, data?: Record<string, unknown>) => void;
export declare const measureStartupTrace: <T>(name: string, fn: () => Promise<T>, data?: Record<string, unknown>) => Promise<T>;
export {};
