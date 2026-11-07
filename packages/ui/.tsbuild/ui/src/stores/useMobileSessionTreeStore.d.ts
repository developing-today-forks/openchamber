/**
 * Expand/collapse state for the mobile sessions sheet tree.
 *
 * Stores only explicit user overrides, keyed by project id (projects) and
 * `${projectId}::${bucketKey}` (worktree groups). A missing key means "use the
 * default": projects start expanded, worktree groups start collapsed. The
 * user's choice is remembered across app restarts and is intentionally
 * decoupled from the active directory/session — selecting a session no longer
 * forces a project open or closed.
 */
type MobileSessionTreeStore = {
    projectExpanded: Record<string, boolean>;
    worktreeExpanded: Record<string, boolean>;
    setProjectExpanded: (projectId: string, expanded: boolean) => void;
    setWorktreeExpanded: (key: string, expanded: boolean) => void;
};
export declare const useMobileSessionTreeStore: import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<MobileSessionTreeStore>, "persist" | "setState"> & {
    setState(partial: MobileSessionTreeStore | Partial<MobileSessionTreeStore> | ((state: MobileSessionTreeStore) => MobileSessionTreeStore | Partial<MobileSessionTreeStore>), replace?: false | undefined): unknown;
    setState(state: MobileSessionTreeStore | ((state: MobileSessionTreeStore) => MobileSessionTreeStore), replace: true): unknown;
    persist: {
        setOptions: (options: Partial<import("zustand/middleware").PersistOptions<MobileSessionTreeStore, MobileSessionTreeStore, unknown>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: MobileSessionTreeStore) => void) => () => void;
        onFinishHydration: (fn: (state: MobileSessionTreeStore) => void) => () => void;
        getOptions: () => Partial<import("zustand/middleware").PersistOptions<MobileSessionTreeStore, MobileSessionTreeStore, unknown>>;
    };
}>;
export {};
