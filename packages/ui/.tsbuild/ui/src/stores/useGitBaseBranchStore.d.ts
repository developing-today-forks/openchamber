/**
 * Build the persisted override key for one branch of one repository.
 *
 * The branch is part of the identity on purpose: a base picked for one feature
 * branch is not an answer for a different branch of the same repository, and a
 * directory-only key would silently shadow reflog detection after checkout.
 * Keys include the runtime identity so a remote runtime's paths never shadow
 * local ones.
 */
export declare const gitBaseBranchEntryKey: (directory: string, branch: string) => string;
type GitBaseBranchState = {
    overrides: Record<string, string>;
    getOverride: (directory: string, branch: string) => string | null;
    setOverride: (directory: string, branch: string, base: string) => void;
    clearOverride: (directory: string, branch: string) => void;
};
/**
 * Explicit per-branch base choices for the "Branch" diff scope.
 *
 * Git does not record a parent branch for every branch (clones, detached
 * starts). When no authoritative source exists, the user picks a base once and
 * the choice is remembered for that branch.
 */
export declare const useGitBaseBranchStore: import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<GitBaseBranchState>, "persist" | "setState"> & {
    setState(partial: GitBaseBranchState | Partial<GitBaseBranchState> | ((state: GitBaseBranchState) => GitBaseBranchState | Partial<GitBaseBranchState>), replace?: false | undefined): unknown;
    setState(state: GitBaseBranchState | ((state: GitBaseBranchState) => GitBaseBranchState), replace: true): unknown;
    persist: {
        setOptions: (options: Partial<import("zustand/middleware").PersistOptions<GitBaseBranchState, unknown, unknown>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: GitBaseBranchState) => void) => () => void;
        onFinishHydration: (fn: (state: GitBaseBranchState) => void) => () => void;
        getOptions: () => Partial<import("zustand/middleware").PersistOptions<GitBaseBranchState, unknown, unknown>>;
    };
}>;
export {};
