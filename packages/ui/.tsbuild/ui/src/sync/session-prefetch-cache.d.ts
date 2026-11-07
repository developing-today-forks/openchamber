/**
 * Runtime-scoped pagination metadata shared with the session message loader.
 */
type Meta = {
    limit: number;
    cursor?: string;
    complete: boolean;
    at: number;
};
export declare function getSessionPrefetch(directory: string, sessionID: string, runtimeKey?: string): Meta | undefined;
export declare function setSessionPrefetch(input: {
    directory: string;
    sessionID: string;
    limit: number;
    cursor?: string;
    complete: boolean;
    at?: number;
    runtimeKey?: string;
}): void;
/** Invalidate cache for specific sessions (e.g. after eviction). */
export declare function clearSessionPrefetch(directory: string, sessionIDs: Iterable<string>, runtimeKey?: string): void;
export declare function clearDirectorySessionPrefetch(directory: string, runtimeKey?: string): void;
export declare function clearRuntimeSessionPrefetch(runtimeKey: string): void;
export {};
