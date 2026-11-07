import type { GitStatus, GitBranch, GitLogResponse, GitIdentitySummary, GitFileDiffResponse, GitSubmoduleState } from '@/lib/api/types';
type GitStatusRequestOptions = {
    mode?: 'light';
    fresh?: boolean;
};
export type NestedRepoDiscovery = string[] | null | 'unsupported';
/** Two-sided file contents; `submodule` is set when the path is a submodule, whose contents are only commit lines. */
type CachedGitDiff = {
    original: string;
    modified: string;
    isBinary?: boolean;
    submodule: GitSubmoduleState | null;
};
/**
 * Cache entry: the diff, when it was fetched, and its UTF-8 byte size measured
 * once at insertion so eviction never re-encodes cached contents.
 */
type CachedGitDiffEntry = CachedGitDiff & {
    fetchedAt: number;
    sizeBytes: number;
};
interface DirectoryGitState {
    isGitRepo: boolean | null;
    status: GitStatus | null;
    branches: GitBranch | null;
    log: GitLogResponse | null;
    identity: GitIdentitySummary | null;
    diffCache: Map<string, CachedGitDiffEntry>;
    indexRevision: number;
    lastRepoCheckAt: number;
    lastStatusFetch: number;
    lastStatusChange: number;
    lastLogFetch: number;
    lastBranchesFetch: number;
    lastIdentityFetch: number;
    logMaxCount: number;
    isLoadingStatus: boolean;
    isLoadingLog: boolean;
    isLoadingBranches: boolean;
    isLoadingIdentity: boolean;
}
interface GitStore {
    runtimeKey: string;
    directories: Map<string, DirectoryGitState>;
    activeDirectory: string | null;
    setActiveDirectory: (directory: string | null) => void;
    getDirectoryState: (directory: string) => DirectoryGitState | null;
    fetchStatus: (directory: string, git: GitAPI, options?: {
        silent?: boolean;
        mode?: 'light';
        force?: boolean;
        throwOnError?: boolean;
    }) => Promise<boolean>;
    fetchBranches: (directory: string, git: GitAPI) => Promise<void>;
    fetchLog: (directory: string, git: GitAPI, maxCount?: number) => Promise<void>;
    fetchIdentity: (directory: string, git: GitAPI) => Promise<void>;
    fetchAll: (directory: string, git: GitAPI, options?: {
        force?: boolean;
        silentIfCached?: boolean;
    }) => Promise<void>;
    ensureStatus: (directory: string, git: GitAPI) => Promise<void>;
    ensureAll: (directory: string, git: GitAPI) => Promise<void>;
    moveStatusPathsOptimistically: (directory: string, paths: string[], direction: 'stage' | 'unstage') => GitStatus | null;
    restoreStatus: (directory: string, status: GitStatus | null) => void;
    bumpIndexRevision: (directory: string) => void;
    getDiff: (directory: string, filePath: string) => (CachedGitDiff & {
        fetchedAt: number;
    }) | null;
    setDiff: (directory: string, filePath: string, diff: CachedGitDiff, expectedRuntimeKey?: string) => void;
    clearDiffCache: (directory: string, filePaths?: string[]) => void;
    fetchAllDiffs: (directory: string, git: GitAPI) => Promise<void>;
    prefetchDiffs: (directory: string, git: GitAPI, filePaths: string[], options?: {
        maxFiles?: number;
    }) => Promise<void>;
    setLogMaxCount: (directory: string, maxCount: number) => void;
    nestedReposByRoot: Map<string, NestedRepoDiscovery>;
    nestedRepoSelection: Map<string, string>;
    /**
     * Repositories whose selection was dropped because their probe reported
     * them as no longer a repository (corrupt or missing gitdir). Session-only
     * memory so auto-select does not immediately re-pick the same broken path
     * and loop walk+probe. Not persisted: the next launch re-probes honestly.
     */
    staleClearedSelections: Map<string, Set<string>>;
    ensureNestedRepos: (root: string, options?: {
        force?: boolean;
    }) => Promise<void>;
    selectNestedRepo: (root: string, repository: string) => void;
    clearNestedRepoSelection: (root: string) => void;
    /**
     * Re-probes a directory whose repository state just changed under the app
     * (Git was initialized in it), skipping the cached non-repository answer.
     * Resolves to whether the directory is now a repository.
     */
    recheckRepository: (directory: string, git: GitAPI) => Promise<boolean>;
    refresh: (git: GitAPI, options?: {
        force?: boolean;
    }) => Promise<void>;
    resetForRuntimeSwitch: (runtimeKey: string) => void;
}
interface GitAPI {
    checkIsGitRepository: (directory: string) => Promise<boolean>;
    getGitStatus: (directory: string, options?: GitStatusRequestOptions) => Promise<GitStatus>;
    getGitBranches: (directory: string) => Promise<GitBranch>;
    getGitLog: (directory: string, options?: {
        maxCount?: number;
    }) => Promise<GitLogResponse>;
    getCurrentGitIdentity: (directory: string) => Promise<GitIdentitySummary | null>;
    getGitFileDiff: (directory: string, options: {
        path: string;
    }) => Promise<GitFileDiffResponse>;
}
export declare const useGitStore: import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<GitStore>, "devtools" | "setState"> & {
    setState(partial: GitStore | Partial<GitStore> | ((state: GitStore) => GitStore | Partial<GitStore>), replace?: false | undefined, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): void;
    setState(state: GitStore | ((state: GitStore) => GitStore), replace: true, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): void;
    devtools: {
        cleanup: () => void;
    };
}>;
export declare const useGitStatus: (directory: string | null) => GitStatus | null;
export declare const useGitBranches: (directory: string | null) => GitBranch | null;
export declare const useGitLog: (directory: string | null) => GitLogResponse | null;
export declare const useGitIdentity: (directory: string | null) => {
    userName: string | null;
    userEmail: string | null;
} | null;
export declare const useIsGitRepo: (directory: string | null) => boolean | null;
export declare const useIsUnbornGitRepo: (directory: string | null) => boolean;
export declare const useEffectiveGitDirectory: (root: string | null) => string | null;
export declare const useNestedRepos: (root: string | null) => NestedRepoDiscovery | undefined;
export declare const useNestedRepoSelection: (root: string | null) => string | null;
export declare const useStaleClearedSelections: (root: string | null) => Set<string> | null;
export declare const useGitBranchLabel: (directory: string | null) => string | null;
export declare const useGitAllBranches: (enabled?: boolean) => Map<string, string | null>;
/** `enabled: false` holds the last result instead of following the store. */
export declare const useGitRepoStatusMap: (directories: string[], enabled?: boolean) => Map<string, {
    isGitRepo: boolean | null;
    branch: string | null;
}>;
export declare const useGitLoadingStatus: (directory: string | null) => boolean;
export declare const useGitLoadingLog: (directory: string | null) => boolean;
export declare const useGitLoadingBranches: (directory: string | null) => boolean;
export {};
