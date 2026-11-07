import type { PullRequestSource } from '@/lib/diff/pullRequestDiff';
import type { ChangeRequest, SourceControlReadContext } from '@/lib/source-control/types';
import type { PageResult } from '@/lib/source-control/types';
/** Forgets every shared list; for scenarios that must start from nothing. */
export declare const forgetSharedPullRequestLists: () => void;
/**
 * Folds one page of pull requests into what the picker already shows. A
 * project the server could not read keeps the records it showed before rather
 * than reading as having none; the page still says which ones failed.
 */
export declare const mergePullRequestPage: (shown: ChangeRequest[], result: PageResult<ChangeRequest>, appending: boolean) => {
    prs: ChangeRequest[];
    incompleteProjectIds: string[];
};
/**
 * Lists and remembers the pull request a comparison reviews. Every read goes
 * through the checkout's bound GitHub or GitLab context, so the list and the branch's
 * own pull request come from the account and repository the binding grants,
 * never from whichever account happens to be active.
 */
export declare function usePullRequestComparison(directory: string | null, branch: string | null, readContext: SourceControlReadContext | null, enabled: boolean, preferredSource?: PullRequestSource): {
    enabled: boolean;
    readContext: SourceControlReadContext | null;
    /** The host the change requests come from, for wording and numbering. */
    provider: import("@/lib/source-control/types").SourceControlProvider | null;
    selectedSource: {
        kind: 'pr';
        number: number;
        sourceRepo?: {
            owner: string;
            repo: string;
        };
    } | null;
    prs: ChangeRequest[];
    query: string;
    setQuery: import("react").Dispatch<import("react").SetStateAction<string>>;
    loading: boolean;
    loadingMore: boolean;
    hasMore: boolean;
    /** Projects whose pull requests failed to load; non-empty means the list is partial. */
    incompleteProjectIds: string[];
    error: string | null;
    /** Reads the list again now: retry and refresh buttons. */
    refresh: () => Promise<void>;
    /** Opening the picker: shows what is known and reads again only when stale. */
    revalidate: () => Promise<void>;
    loadMore: () => Promise<void>;
    select: (pr: ChangeRequest) => void;
};
