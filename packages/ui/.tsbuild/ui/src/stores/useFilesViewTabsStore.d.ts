type RootTabsState = {
    openPaths: string[];
    selectedPath: string | null;
    expandedPaths: string[];
    touchedAt: number;
};
type FilesViewTabsState = {
    byRoot: Record<string, RootTabsState>;
    activeRuntimeKey: string;
    runtimeSnapshots: Record<string, {
        byRoot: Record<string, RootTabsState>;
        updatedAt: number;
    }>;
};
type FilesViewTabsActions = {
    addOpenPath: (root: string, path: string, options?: {
        allowOutsideRoot?: boolean;
    }) => void;
    removeOpenPath: (root: string, path: string) => void;
    removeOpenPathsByPrefix: (root: string, prefixPath: string) => void;
    /** Drops a stale open path. The path on screen stays, so its tab keeps showing its own error. */
    removeUnselectedOpenPath: (root: string, path: string) => void;
    removeExpandedPathsByPrefix: (root: string, prefixPath: string) => void;
    /** Points open, selected and expanded paths at or under `fromPath` at `toPath` after a move or rename. */
    movePaths: (root: string, fromPath: string, toPath: string) => void;
    setSelectedPath: (root: string, path: string | null, options?: {
        allowOutsideRoot?: boolean;
    }) => void;
    ensureSelectedPath: (root: string) => void;
    toggleExpandedPath: (root: string, path: string) => void;
    collapseAllExpandedPaths: (root: string) => void;
    expandPath: (root: string, path: string) => void;
    expandPaths: (root: string, paths: string[]) => void;
    resetForRuntimeSwitch: (runtimeKey: string) => void;
};
type FilesViewTabsStore = FilesViewTabsState & FilesViewTabsActions;
export declare const useFilesViewTabsStore: import("zustand").UseBoundStore<Omit<Omit<import("zustand").StoreApi<FilesViewTabsStore>, "devtools" | "setState"> & {
    setState(partial: Partial<FilesViewTabsStore> | ((state: FilesViewTabsStore) => Partial<FilesViewTabsStore> | FilesViewTabsStore) | FilesViewTabsStore, replace?: false | undefined, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): void;
    setState(state: ((state: FilesViewTabsStore) => FilesViewTabsStore) | FilesViewTabsStore, replace: true, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): void;
    devtools: {
        cleanup: () => void;
    };
}, "persist" | "setState"> & {
    setState(partial: Partial<FilesViewTabsStore> | ((state: FilesViewTabsStore) => Partial<FilesViewTabsStore> | FilesViewTabsStore) | FilesViewTabsStore, replace?: false | undefined, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): unknown;
    setState(state: ((state: FilesViewTabsStore) => FilesViewTabsStore) | FilesViewTabsStore, replace: true, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): unknown;
    persist: {
        setOptions: (options: Partial<import("zustand/middleware").PersistOptions<FilesViewTabsStore, unknown, unknown>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: FilesViewTabsStore) => void) => () => void;
        onFinishHydration: (fn: (state: FilesViewTabsStore) => void) => () => void;
        getOptions: () => Partial<import("zustand/middleware").PersistOptions<FilesViewTabsStore, unknown, unknown>>;
    };
}>;
export {};
