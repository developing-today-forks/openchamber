/**
 * Utilities for creating worktrees and, when needed, sessions bound to them.
 * This is a standalone entrypoint for keyboard shortcuts, menu actions,
 * and other non-hook contexts.
 */
import { type ProjectRef } from '@/lib/worktrees/worktreeManager';
import { type WorktreeStartPlace } from '@/lib/worktrees/worktreeStartSource';
export declare const resolveProjectRef: (directory: string) => ProjectRef | null;
/**
 * The project whose folder a session in `directory` works in, for placing it
 * in another worktree. `resolveProjectRef` answers the project that owns the
 * worktree list, which is the repository root when both `repo` and `repo/ai`
 * are registered; the folder comes from where the session sits in its checkout
 * (`projectPathForCheckoutFolder`), as the server does. Falls back to
 * `resolveProjectRef` when git cannot answer.
 */
export declare const resolveFolderProjectRef: (directory: string) => Promise<ProjectRef | null>;
/**
 * A worktree named `preferredName` (random when absent). Its branch is that
 * name, or with `templated` the Settings branch template filled with it,
 * suffixed when a local branch already has the result.
 */
export declare const createQuickWorktree: (project: ProjectRef, options?: {
    preferredName?: string;
    startRef?: string;
    templated?: boolean;
    cancelOnTrustDismiss?: boolean;
}) => Promise<import("../types/worktree").WorktreeMetadata | null>;
/**
 * Create a new worktree and open a draft scoped to it.
 *
 * @returns The worktree path, or null if creation failed
 */
export declare function createWorktreeSession(): Promise<string | null>;
/**
 * Check if a worktree session is currently being created.
 */
export declare function createWorktreeDraft(options?: {
    initialPrompt?: string;
    title?: string;
}): Promise<string | null>;
/**
 * Create a worktree session for a new branch name.
 * Callers can still use startPoint for metadata or follow-up git operations.
 * Without one, the worktree starts where Settings say for `options.place`,
 * else from the project root's branch.
 */
export declare function createWorktreeSessionForNewBranch(projectDirectory: string, preferredBranchName: string, startPoint?: string, options?: {
    /**
     * Where the worktree is made: its start follows Settings for that place
     * when no start point is given, and its branch follows the Settings
     * branch template.
     */
    place?: WorktreeStartPlace;
    kind?: 'pr' | 'standard';
    worktreeName?: string;
    setUpstream?: boolean;
    upstreamRemote?: string;
    upstreamBranch?: string;
    ensureRemoteName?: string;
    ensureRemoteUrl?: string;
    createdFromBranch?: string;
    returnAfterDirectoryCreated?: boolean;
}): Promise<{
    id: string;
    branch: string;
    path: string;
    directory: string;
} | null>;
