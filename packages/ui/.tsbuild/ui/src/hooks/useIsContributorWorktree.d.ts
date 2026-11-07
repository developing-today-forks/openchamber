/**
 * Whether `directory` is a worktree checked out from a contributor's fork.
 * Such a worktree tracks nothing and pushes only to a destination the user
 * picks, so its push control names that choice.
 */
export declare const useIsContributorWorktree: (directory: string | null | undefined) => boolean;
