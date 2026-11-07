import type { CreateWorktreeArgs, ProjectRef } from '@/lib/worktrees/worktreeManager';
import { type WorktreeStartFrom } from '@/lib/worktrees/worktreeStartSource';
export declare class WorktreeRequiresGitRepositoryError extends Error {
    constructor();
}
export declare const resolveRootTrackingRemote: (projectDirectory: string) => Promise<string | null>;
export declare const withWorktreeRemoteStartRef: (project: ProjectRef, args: CreateWorktreeArgs) => Promise<CreateWorktreeArgs>;
/**
 * The start ref the Settings default (`worktreeStartFrom`) names, read from
 * local refs only. Undefined means the project root's branch, which
 * `withWorktreeRemoteStartRef` already starts from; a repository whose remotes
 * name no default branch gets that too. A failed read throws, so a worktree
 * never quietly starts somewhere else.
 */
export declare const resolveDefaultWorktreeStartRef: (projectDirectory: string, startFrom: WorktreeStartFrom) => Promise<string | undefined>;
export declare const createWorktreeWithDefaults: (project: ProjectRef, args: CreateWorktreeArgs, options?: {
    resolvedRootTrackingRemote?: string | null;
}) => Promise<import("../../types/worktree").WorktreeMetadata>;
