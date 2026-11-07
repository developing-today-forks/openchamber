import type { WorktreeMetadata } from '@/types/worktree';
/**
 * Persisted display order for worktrees within a project, mirroring how
 * projects persist their order (the array position IS the order). Keyed by
 * project id, the value is an ordered list of normalized worktree paths.
 *
 * Worktrees come from git and are otherwise listed alphabetically; this store
 * lets the user reorder them (e.g. in the mobile project editor) and have that
 * order stick across restarts.
 */
type WorktreeOrderStore = {
    orderByProject: Record<string, string[]>;
    setWorktreeOrder: (projectId: string, orderedPaths: string[]) => void;
};
export declare const useWorktreeOrderStore: import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<WorktreeOrderStore>, "persist" | "setState"> & {
    setState(partial: Partial<WorktreeOrderStore> | WorktreeOrderStore | ((state: WorktreeOrderStore) => Partial<WorktreeOrderStore> | WorktreeOrderStore), replace?: false | undefined): unknown;
    setState(state: WorktreeOrderStore | ((state: WorktreeOrderStore) => WorktreeOrderStore), replace: true): unknown;
    persist: {
        setOptions: (options: Partial<import("zustand/middleware").PersistOptions<WorktreeOrderStore, WorktreeOrderStore, unknown>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: WorktreeOrderStore) => void) => () => void;
        onFinishHydration: (fn: (state: WorktreeOrderStore) => void) => () => void;
        getOptions: () => Partial<import("zustand/middleware").PersistOptions<WorktreeOrderStore, WorktreeOrderStore, unknown>>;
    };
}>;
/**
 * Stable-sort worktrees by a stored order of paths. Worktrees not present in
 * the stored order keep their incoming (alphabetical) order, appended after
 * the known ones.
 */
export declare const orderWorktrees: (orderedPaths: string[] | undefined, worktrees: WorktreeMetadata[]) => WorktreeMetadata[];
export {};
