import type { WorktreeMetadata } from '@/types/worktree';
import type { GitWorktreeValidationResult, GitChangeRequestSourceRequest, GitAPI, SourceControlAPI } from '@/lib/api/types';
export type ProjectRef = {
    id: string;
    path: string;
};
/** The name the sidebar shows for a worktree, used in worktree-scoped toasts. */
export declare const getWorktreeDisplayName: (worktree: WorktreeMetadata) => string;
export declare const getLatestWorktreeMetadata: (metadata: WorktreeMetadata) => WorktreeMetadata;
/**
 * Compare two worktree-by-project maps for equality.
 * Compares discovery-owned metadata (not reference equality)
 * because readStableProjectWorktrees creates new object instances on
 * each call, making reference checks always report changed.
 *
 * `branch` is included so an external `git checkout` between
 * discoveries — which changes `branch` (and the derived `label`
 * and `headState`) while leaving `path` unchanged — still triggers
 * a store update. Without this, the branch label in the sidebar
 * could go stale until the next worktree create/remove or project
 * switch, since there is no periodic worktree-list refresh.
 *
 * Status changes (`worktreeStatus`) are not compared here: those
 * flow through `setStoredWorktreeStatus`, which writes a new Map
 * reference that the persist subscriber picks up directly.
 *
 */
export declare const worktreeMapsEqual: (a: Map<string, WorktreeMetadata[]>, b: Map<string, WorktreeMetadata[]>) => boolean;
/**
 * Partition shared Git worktree topology across configured projects.
 *
 * A configured project may itself be a linked worktree. Asking Git for the
 * worktree list from every configured checkout returns the same repository
 * topology each time, which would otherwise render every sibling worktree
 * under every project. The primary checkout owns the topology when it is
 * configured; otherwise the first configured checkout for that repository
 * owns it. Checkouts that are configured projects are omitted from the owned
 * worktree list because they already have their own project section. So are
 * checkouts that hold a configured project in a sub-folder, such as the
 * repository root of a project at `repo/app`: deleting one would delete that
 * project's folder.
 */
export declare const partitionWorktreesByRegisteredProject: (projects: ReadonlyArray<Pick<ProjectRef, 'path'>>, worktreesByProject: ReadonlyMap<string, WorktreeMetadata[]>) => Map<string, WorktreeMetadata[]>;
/**
 * Replace the worktree buckets of one repository with a freshly listed set.
 *
 * A registered project may itself be a linked worktree, so every bucket whose
 * repository root matches the refreshed one is replaced together; buckets of
 * other repositories keep their references. An empty refreshed set removes the
 * repository's buckets.
 */
export declare const replaceRepositoryWorktrees: (worktreesByProject: ReadonlyMap<string, WorktreeMetadata[]>, projectPath: string, refreshedWorktrees: WorktreeMetadata[], fallbackRepositoryRoot?: string | null) => Map<string, WorktreeMetadata[]>;
/**
 * Carry client-tracked bootstrap statuses from the published topology into a
 * freshly partitioned one before it is published. Buckets without such an
 * entry keep their references.
 */
export declare const preserveClientTrackedWorktreeStatus: (nextByProject: Map<string, WorktreeMetadata[]>, publishedByProject: ReadonlyMap<string, WorktreeMetadata[]>) => Map<string, WorktreeMetadata[]>;
export declare function listProjectWorktrees(project: ProjectRef, options?: {
    force?: boolean;
}): Promise<WorktreeMetadata[]>;
export type CreateWorktreeArgs = {
    preferredName?: string;
    setupCommands?: string[];
    mode?: 'new' | 'existing';
    worktreeName?: string;
    branchName?: string;
    existingBranch?: string;
    startRef?: string;
    setUpstream?: boolean;
    upstreamRemote?: string;
    upstreamBranch?: string;
    ensureRemoteName?: string;
    ensureRemoteUrl?: string;
    expectedRevision?: string;
    changeRequestSource?: GitChangeRequestSourceRequest;
    returnAfterDirectoryCreated?: boolean;
};
export declare function createWorktree(project: ProjectRef, args: CreateWorktreeArgs): Promise<WorktreeMetadata>;
export declare function validateWorktreeCreate(project: ProjectRef, args: CreateWorktreeArgs): Promise<GitWorktreeValidationResult>;
export declare function removeProjectWorktree(project: ProjectRef, worktree: WorktreeMetadata, options?: {
    deleteRemoteBranch?: boolean;
    deleteLocalBranch?: boolean;
    remoteName?: string;
    network?: {
        sourceControl: Pick<SourceControlAPI, 'repositoryBinding'>;
        git: Pick<GitAPI, 'planNetworkOperation' | 'executeNetworkOperation' | 'getNetworkOperation'>;
    };
}): Promise<void>;
