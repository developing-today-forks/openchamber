import type { SourceControlProvider } from '@/lib/source-control/types';
export type { GitRemote, MergeConflictDetails, CommitFileDiffResponse, } from './api/types';
export declare function checkIsGitRepository(directory: string): Promise<boolean>;
export declare function getGitStatus(directory: string, options?: {
    mode?: 'light';
    fresh?: boolean;
}): Promise<import('./api/types').GitStatus>;
export declare function resolveGitPrimaryRoot(directory: string): Promise<string>;
/** Where `directory` sits inside its repository's checkout; `''` at the root. Rejects when unknown. */
export declare function resolveGitRepositoryPrefix(directory: string): Promise<string>;
export declare function resolveGitTopLevel(directory: string): Promise<string>;
export declare function getGitCommitSummaries(directory: string, shas: string[]): Promise<Array<{
    sha: string;
    short: string;
    subject: string;
}>>;
export declare function getGitRangeDiff(directory: string, options: import('./api/types').GetGitRangeDiffOptions): Promise<import('./api/types').GitDiffResponse>;
export declare function getGitRangeFiles(directory: string, options: import('./api/types').GetGitRangeFilesOptions): Promise<import('./api/types').GitRangeFileEntry[]>;
export declare function getBranchBase(directory: string, branch: string): Promise<import('./api/types').GitBranchBaseResponse>;
export declare function stageGitFile(directory: string, filePath: string): Promise<void>;
export declare function stageGitFiles(directory: string, filePaths: string[]): Promise<void>;
export declare function unstageGitFile(directory: string, filePath: string): Promise<void>;
export declare function unstageGitFiles(directory: string, filePaths: string[]): Promise<void>;
export declare function getGitBranches(directory: string, options?: import('./api/types').GitBranchListOptions): Promise<import('./api/types').GitBranch>;
export declare function getGitUnpushedBranchCounts(directory: string, branches: string[]): Promise<import('./api/types').GitUnpushedBranchCounts>;
export declare function generateCommitMessage(directory: string, files: string[], options?: {
    zenModel?: string;
    providerId?: string;
    modelId?: string;
}): Promise<{
    message: import('./api/types').GeneratedCommitMessage;
}>;
export declare function generatePullRequestDescription(directory: string, payload: {
    base: string;
    head: string;
    context?: string;
    zenModel?: string;
    providerId?: string;
    modelId?: string;
    changeRequestProvider?: SourceControlProvider;
}): Promise<import('./api/types').GeneratedPullRequestDescription>;
declare function listGitWorktrees(directory: string): Promise<import('./api/types').GitWorktreeInfo[]>;
declare function validateGitWorktree(directory: string, payload: import('./api/types').CreateGitWorktreePayload): Promise<import('./api/types').GitWorktreeValidationResult>;
export declare function getGitWorktreeBootstrapStatus(directory: string): Promise<import('./api/types').GitWorktreeBootstrapStatus>;
declare function createGitWorktree(directory: string, payload: import('./api/types').CreateGitWorktreePayload): Promise<import('./api/types').GitWorktreeCreateResult>;
declare function deleteGitWorktree(directory: string, payload: import('./api/types').RemoveGitWorktreePayload): Promise<{
    success: boolean;
}>;
export declare function snapshotGitWorktree(directory: string, payload: import('./api/types').GitWorktreeSnapshotPayload): Promise<import('./api/types').GitWorktreeSnapshotResult>;
export declare const git: {
    worktree: {
        list: typeof listGitWorktrees;
        validate: typeof validateGitWorktree;
        create: typeof createGitWorktree;
        remove: typeof deleteGitWorktree;
        snapshot: typeof snapshotGitWorktree;
    };
};
export declare function listGitStashes(directory: string): Promise<{
    stashes: import('./api/types').GitStashEntry[];
}>;
export declare function countGitStashFiles(directory: string, refs: string[]): Promise<{
    counts: Record<string, number>;
}>;
export declare function stashGitChanges(directory: string, options?: {
    message?: string;
}): Promise<{
    success: boolean;
    created: boolean;
    message: string;
    output: string;
}>;
export declare function applyGitStash(directory: string, options: {
    ref: string;
}): Promise<{
    success: boolean;
    ref: string;
}>;
export declare function popGitStash(directory: string, options: {
    ref: string;
}): Promise<{
    success: boolean;
    ref: string;
}>;
export declare function dropGitStash(directory: string, options: {
    ref: string;
}): Promise<{
    success: boolean;
    ref: string;
}>;
export declare function createBranch(directory: string, name: string, startPoint?: string): Promise<{
    success: boolean;
    branch: string;
}>;
export declare function getGitLog(directory: string, options?: import('./api/types').GitLogOptions): Promise<import('./api/types').GitLogResponse>;
export declare function getCommitFiles(directory: string, hash: string): Promise<import('./api/types').GitCommitFilesResponse>;
export declare function getGitCommitDiff(directory: string, options: import('./api/types').GetGitCommitDiffOptions): Promise<import('./api/types').GitDiffResponse>;
export declare function getCommitFileDiff(directory: string, hash: string, filePath: string, isBinary: boolean): Promise<import('./api/types').CommitFileDiffResponse>;
export declare function getGitIdentities(): Promise<import('./api/types').GitIdentityProfile[]>;
export declare function createGitIdentity(profile: import('./api/types').GitIdentityProfile): Promise<import('./api/types').GitIdentityProfile>;
export declare function updateGitIdentity(id: string, updates: import('./api/types').GitIdentityProfile): Promise<import('./api/types').GitIdentityProfile>;
export declare function deleteGitIdentity(id: string): Promise<void>;
export declare function getGlobalGitIdentity(): Promise<import('./api/types').GitIdentitySummary | null>;
export declare function rebase(directory: string, options: {
    onto: string;
}): Promise<import('./api/types').GitRebaseResult>;
export declare function merge(directory: string, options: {
    branch: string;
}): Promise<import('./api/types').GitMergeResult>;
export declare function checkoutCommit(directory: string, hash: string): Promise<import('./api/types').CheckoutCommitResponse>;
export declare function cherryPick(directory: string, hash: string): Promise<import('./api/types').CherryPickResponse>;
export declare function revertCommit(directory: string, hash: string): Promise<import('./api/types').RevertCommitResponse>;
export declare function resetToCommit(directory: string, hash: string, mode: 'soft' | 'mixed' | 'hard', force?: boolean): Promise<import('./api/types').ResetToCommitResponse>;
/**
 * Whether `directory` exists inside the checkout at `worktreeRoot` once both
 * are canonicalized, so a symlink out of the checkout reports `insideWorktreeRoot: false`.
 */
export declare function validateWorktreeDirectory(directory: string, worktreeRoot: string): Promise<{
    valid: boolean;
    insideWorktreeRoot: boolean;
    resolvedWorktreeRoot: string | null;
    resolvedCwd: string | null;
}>;
export declare function getConflictDetails(directory: string): Promise<import('./api/types').MergeConflictDetails>;
