import type { ChangeRequest, ChangeRequestStatus, CI, CISummary, GitHubPullRequestLiveSummary, Project, RuntimeAPIs, SourceControlIdentity, SourceControlProvider, SourceControlReadContext } from '@/lib/api/types';
import { type TrackedItemState, type TrackedThread } from '@/lib/trackedItems/model';
import type { LinkedGitHubPullRequest } from '@/lib/linkedIssues';
export type SourceControlStatus = (ChangeRequestStatus & {
    connected: boolean;
    pr: ChangeRequest | null;
    checks?: CISummary | null;
    repo: (Project & {
        repo: string;
    }) | null;
}) | {
    connected: boolean;
    identity?: SourceControlIdentity;
    fetchedAt?: number;
    project?: Project | null;
    branch?: string;
    changeRequest?: ChangeRequest | null;
    ci?: CI | null;
    canMerge?: boolean;
    defaultBranch?: string | null;
    resolvedRemoteName?: string | null;
    pr?: {
        number: number;
        title: string;
        body?: string;
        url: string;
        state: 'open' | 'closed' | 'merged';
        draft: boolean;
        base: string;
        head: string;
        headSha?: string;
        mergeable?: boolean | null;
        mergeableState?: string | null;
    } | null;
    checks?: CISummary | null;
    repo?: {
        owner: string;
        repo: string;
        url?: string;
        defaultBranch?: string;
        defaultBranchSha?: string | null;
        remoteName?: string | null;
    } | null;
};
export declare const getGitHubPrStatusKey: (directory: string, branch: string, remoteName?: string | null) => string;
type RefreshOptions = {
    force?: boolean;
    onlyExistingPr?: boolean;
    silent?: boolean;
    markInitialResolved?: boolean;
};
type PrTrackingTarget = {
    context?: SourceControlReadContext;
    identity?: SourceControlIdentity;
    directory?: string;
    branch: string;
    remoteName?: string | null;
};
type PrRuntimeParams = {
    runtimeKey?: string;
    directory: string;
    branch: string;
    remoteName: string | null;
    canShow: boolean;
    identity?: SourceControlIdentity;
    readContext?: SourceControlReadContext;
    sourceControl?: Pick<RuntimeAPIs['sourceControl'], 'changeRequestStatus'>;
    authChecked?: boolean;
    connected?: boolean | null;
};
type PrEntryIdentity = {
    runtimeKey: string;
    provider?: SourceControlIdentity['provider'];
    instance?: string;
    directory: string;
    branch: string;
    remoteName: string | null;
    accountId?: string;
    repositoryId?: string;
    bindingRevision?: number;
};
export declare const getSourceControlStatusKey: (context: SourceControlReadContext, branch: string) => string;
type PrStatusEntry = {
    status: SourceControlStatus | null;
    isLoading: boolean;
    error: string | null;
    isInitialStatusResolved: boolean;
    lastRefreshAt: number;
    lastDiscoveryPollAt: number;
    watchers: number;
    params: PrRuntimeParams | null;
    identity: PrEntryIdentity | null;
    resolvedRemoteName: string | null;
    paramsRevision: number;
};
type PersistedPrStatusEntry = Pick<PrStatusEntry, 'status' | 'isInitialStatusResolved' | 'lastRefreshAt' | 'lastDiscoveryPollAt' | 'identity' | 'resolvedRemoteName'>;
type ActiveContextsRegistration = {
    requestId: number;
    contexts: SourceControlReadContext[];
};
type SourceControlStatusStore = {
    entries: Record<string, PrStatusEntry>;
    activeContextRegistrations: Record<string, Record<string, ActiveContextsRegistration>>;
    activeRequestCount: number;
    totalRequestCount: number;
    ensureEntry: (key: string) => void;
    beginActiveContextsLoad: (runtimeKey: string, directory: string, ownerId: string) => number;
    commitActiveContexts: (runtimeKey: string, directory: string, ownerId: string, requestId: number, contexts: SourceControlReadContext[]) => boolean;
    releaseActiveContexts: (runtimeKey: string, directory: string, ownerId: string) => void;
    setParams: (key: string, params: PrRuntimeParams) => void;
    startWatching: (key: string) => void;
    stopWatching: (key: string) => void;
    /** An agent turn finished in `directory`: its watched branches may have a new pull request. */
    noteBranchActivity: (directory: string) => void;
    /** The user came back to the window: watched branches whose answer aged past the floor are asked again. */
    noteWindowReturned: () => void;
    refresh: (key: string, options?: RefreshOptions) => Promise<void>;
    refreshTargets: (targets: PrTrackingTarget[], options?: RefreshOptions) => Promise<void>;
    /** Applies live states the server pushed for branches' open pull requests. */
    applyTrackedPulls: (records: ReadonlyArray<{
        key: string;
        record: TrackedItemState;
    }>) => void;
    updateStatus: (key: string, updater: (prev: SourceControlStatus | null) => SourceControlStatus | null) => void;
    clearDirectoryStatus: (directory: string) => void;
    resetForRuntimeSwitch: () => void;
};
export declare const getFreshestSourceControlStatusForBranch: (entries: Record<string, PrStatusEntry>, context: SourceControlReadContext, branch: string) => SourceControlStatus | null;
export declare const getFreshestActiveSourceControlStatusForBranch: (entries: Record<string, PrStatusEntry>, contexts: SourceControlReadContext[], branch: string) => SourceControlStatus | null;
/**
 * Status keys of the bound entries behind these shown branches: one per read
 * context the branch's directory currently has. Live-summary batches use them
 * so an answer lands on the entry the sidebar actually reads.
 */
export declare const getActiveSourceControlStatusKeys: (registrations: SourceControlStatusStore['activeContextRegistrations'], targets: Iterable<{
    directory: string;
    branch: string;
}>) => string[];
export declare const getFreshestPrStatusForBranch: (entries: Record<string, PrStatusEntry>, directory: string, branch: string) => SourceControlStatus | null;
/**
 * The open pull or merge request of an entry, as the item the server follows
 * for it, read with the account the repository is bound to. A closed or merged
 * one is history: finding the branch's next one is discovery's job.
 */
export declare const getBranchTrackedPull: (entry: PrStatusEntry | undefined) => TrackedThread<'pull'> | null;
export declare const useGitHubPrStatusStore: import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<SourceControlStatusStore>, "persist" | "setState"> & {
    setState(partial: Partial<SourceControlStatusStore> | SourceControlStatusStore | ((state: SourceControlStatusStore) => Partial<SourceControlStatusStore> | SourceControlStatusStore), replace?: false | undefined): unknown;
    setState(state: SourceControlStatusStore | ((state: SourceControlStatusStore) => SourceControlStatusStore), replace: true): unknown;
    persist: {
        setOptions: (options: Partial<import("zustand/middleware").PersistOptions<SourceControlStatusStore, {
            entries: {
                [k: string]: PersistedPrStatusEntry;
            };
        }, unknown>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: SourceControlStatusStore) => void) => () => void;
        onFinishHydration: (fn: (state: SourceControlStatusStore) => void) => () => void;
        getOptions: () => Partial<import("zustand/middleware").PersistOptions<SourceControlStatusStore, {
            entries: {
                [k: string]: PersistedPrStatusEntry;
            };
        }, unknown>>;
    };
}>;
export type PrVisualSummary = {
    provider: SourceControlProvider | null;
    number: number;
    visualState: string;
    prState: string;
    draft: boolean;
    title: string | null;
    url: string | null;
    base: string | null;
    head: string | null;
    checks: {
        state: string;
        total: number;
        success: number;
        failure: number;
        pending: number;
    } | null;
    canMerge: boolean | null;
    mergeableState: string | null;
    repo: {
        owner: string;
        repo: string;
    } | null;
};
export declare const useFreshestSourceControlVisualSummaryForBranch: (directory: string | null, branch: string | null) => PrVisualSummary | null;
/**
 * The badge of a change request linked from another host (a GitLab merge
 * request), from its live summary: the same colour and status rule GitHub
 * PRs follow, so orange means the same thing everywhere.
 */
export declare const getLinkedChangeRequestVisualSummary: (cacheKey: string, link: LinkedGitHubPullRequest, summary: GitHubPullRequestLiveSummary, identity: SourceControlIdentity) => PrVisualSummary | null;
/**
 * The open pull and merge requests of these entries, as the items the server
 * should follow. Read as one stable value so a row re-renders only when the
 * set of followed requests changes.
 */
export declare const useBranchTrackedPulls: (keys: readonly string[]) => TrackedThread<'pull'>[];
export {};
