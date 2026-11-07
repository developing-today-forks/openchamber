export type PersistedLastSession = {
    sessionId: string;
    directory: string | null;
};
export declare function persistLastActiveSession(runtimeKey: string, entry: PersistedLastSession, storage?: Storage): void;
export declare function readLastActiveSession(runtimeKey: string, storage?: Storage): PersistedLastSession | null;
export declare function clearLastActiveSession(runtimeKey: string, storage?: Storage): void;
