import type { PullRequestSource } from '@/lib/diff/pullRequestDiff';
interface PullRequestSelection {
    source: PullRequestSource;
    handoff: PullRequestSource | null;
}
interface PullRequestSelectionState {
    selections: Map<string, PullRequestSelection>;
    /** A pull request another surface asked Changes to show, per directory. */
    diffRequests: Map<string, PullRequestSource>;
    /**
     * The repository the phone's Changes shows, per folder that is not one
     * itself, in place of the Git selection: the one a requested PR belongs to,
     * until the next request for that folder or a repository picked there.
     */
    changesRepositories: Map<string, string>;
    select: (key: string, source: PullRequestSource) => void;
    acceptHandoff: (key: string, source: PullRequestSource) => void;
    /** Each call is a new request, so asking for the same PR again shows it again. */
    requestDiff: (directory: string, source: PullRequestSource, repository?: string | null) => void;
    clearChangesRepository: (directory: string) => void;
    /** Drops `source` once Changes has taken it, so it never comes back on another branch. */
    settleDiffRequest: (directory: string, source: PullRequestSource) => void;
}
export declare const usePullRequestSelectionStore: import("zustand").UseBoundStore<import("zustand").StoreApi<PullRequestSelectionState>>;
export {};
