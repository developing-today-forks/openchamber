interface WorktreeSourceBranchArgs {
    branches: readonly string[];
    /** The branch checked out at the project root, when known. */
    rootBranch: string | null;
}
/**
 * The branch a new worktree starts from unless the user picks another: the one
 * the project root is on, else `main`, `master`, or the first branch. An earlier
 * pick is deliberately not remembered: it silently based later worktrees on a
 * branch that had moved on.
 */
export declare const resolveDefaultSourceBranch: ({ branches, rootBranch }: WorktreeSourceBranchArgs) => string;
export {};
