type AutoReviewPhase = 'waiting_for_reviewer' | 'waiting_for_implementer';
type AutoReviewStatus = 'running' | 'completed' | 'stopped' | 'error';
export type AutoReviewRun = {
    originalSessionID: string;
    reviewSessionID: string;
    directory: string;
    runtimeKey: string;
    status: AutoReviewStatus;
    phase: AutoReviewPhase;
    iteration: number;
    maxIterations: number;
    lastForwardedMessageID?: string;
    expectedAssistantParentID?: string;
    waitAfterCreatedAt?: number;
    error?: string;
};
type AutoReviewState = {
    runsByOriginalSessionID: Record<string, AutoReviewRun>;
    upsertRun: (run: AutoReviewRun) => void;
    updateRun: (originalSessionID: string, updater: (run: AutoReviewRun) => AutoReviewRun) => void;
    stopRun: (originalSessionID: string) => void;
    completeRun: (originalSessionID: string) => void;
    stopRunningRunsForRuntime: (runtimeKey: string) => void;
    isRunningForSession: (sessionID: string) => boolean;
};
export declare const useAutoReviewStore: import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<AutoReviewState>, "persist" | "setState"> & {
    setState(partial: AutoReviewState | Partial<AutoReviewState> | ((state: AutoReviewState) => AutoReviewState | Partial<AutoReviewState>), replace?: false | undefined): unknown;
    setState(state: AutoReviewState | ((state: AutoReviewState) => AutoReviewState), replace: true): unknown;
    persist: {
        setOptions: (options: Partial<import("zustand/middleware").PersistOptions<AutoReviewState, unknown, unknown>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: AutoReviewState) => void) => () => void;
        onFinishHydration: (fn: (state: AutoReviewState) => void) => () => void;
        getOptions: () => Partial<import("zustand/middleware").PersistOptions<AutoReviewState, unknown, unknown>>;
    };
}>;
export {};
