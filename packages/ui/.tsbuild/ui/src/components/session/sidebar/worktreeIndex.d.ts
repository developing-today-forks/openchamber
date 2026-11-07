import type { WorktreeMetadata } from '@/types/worktree';
type WorktreeIndexProject = {
    id: string;
    normalizedPath: string | null | undefined;
    label?: string | null;
};
type WorktreeIndexEntry<P extends WorktreeIndexProject = WorktreeIndexProject> = {
    meta: WorktreeMetadata;
    project: P;
};
/**
 * Canonical exact worktree index shared by Recent/Timeline, project grouping,
 * and the session switcher. Normalizes every key, excludes the owning project
 * root, and keeps the first entry on duplicate paths so repeated topology
 * publishes cannot flip ownership.
 */
export declare const buildWorktreeByPathIndex: <P extends WorktreeIndexProject>(availableWorktreesByProject: ReadonlyMap<string, readonly WorktreeMetadata[]>, projects: readonly P[]) => Map<string, WorktreeIndexEntry<P>>;
/**
 * Per-project exact worktree index for `useSessionGrouping`. Same contract as
 * the global index: normalized keys, project-root exclusion, first-wins
 * dedupe. Previously the grouping map kept the last duplicate; unifying on
 * first-wins matches Recent and keeps repeated publishes stable.
 */
export declare const buildProjectWorktreeIndex: (availableWorktrees: readonly WorktreeMetadata[], projectRoot: string | null) => Map<string, WorktreeMetadata>;
/**
 * Longest-prefix worktree lookup for sessions inside `<worktree>/sub`.
 * Exact matches are included (`directory === path`). Returns null when no
 * indexed worktree contains the directory.
 */
export declare const findPrefixWorktreeEntry: <T>(directory: string, index: ReadonlyMap<string, T>) => T | null;
/**
 * Live-first branch invariant: live git status wins over discovered worktree
 * metadata when they disagree. The worktree-root live lookup covers sessions
 * in `<worktree>/sub`, whose own directory rarely has a git-status entry.
 */
export declare const resolveBranchLiveFirst: (directory: string, worktreePath: string | null, worktreeBranch: string | null | undefined, gitBranches: ReadonlyMap<string, string | null>) => string | null;
export {};
