/**
 * Archives a worktree's sessions once its PR is merged, and removes the
 * worktree with its local branch when nothing there can be lost. Opt-in
 * (`mergedWorktreeCleanupEnabled`). Runs on desktop and web only: VS Code has
 * no worktrees, and a phone would race the desktop it drives for the same
 * worktree.
 */
export declare const useMergedWorktreeCleanup: ({ enabled }: {
    enabled: boolean;
}) => void;
