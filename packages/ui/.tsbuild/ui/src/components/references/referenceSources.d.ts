/**
 * Where the picker's lists and previews come from, one cache per kind of
 * answer. Cache keys carry the runtime, the account and the project, so a
 * different account or host never sees another one's list.
 *
 * Repository items are read with the project's read context: the account its
 * binding names, or the current account of the host for a repository nobody
 * bound, the same one the Git view reads with. A GitLab project lists through
 * the same rows and preview as a GitHub one (`gitlabReferences.ts`).
 */
import type { GitHubPullStatus, GitHubReference, GitHubReferenceDetail, RepositoryReferenceFilter, GitHubReferenceKind, LinearAPI, LinearIssue, LinearIssueSummary, SourceControlIdentity, SourceControlProvider, SourceControlReadContext } from '@/lib/api/types';
import { type AcrossContexts, type AcrossReference } from './acrossRepositories';
import { type CachedValue } from './referenceCache';
import type { LinearReferenceFilter } from './referencePickerItems';
export type ReferenceSourceStatus = 'ready' | 'disconnected' | 'unsupported';
/** The hosts every remote is recognised on, whether or not an account there is connected. */
export declare const BUILT_IN_SOURCE_CONTROL_IDENTITIES: readonly SourceControlIdentity[];
/**
 * The host whose account reads the project: its read context's, else the host
 * its remotes point at, GitHub first. Known even while no account there works,
 * so a surface can name GitLab and ask for that account instead of GitHub's.
 * Null while the binding loads or when the project lives on neither.
 */
export declare function useRepositoryHost(directory: string | null): SourceControlIdentity | null;
/**
 * Where a project's issues and change requests live: its host's provider, or
 * `none` once its remotes are read and none is on a supported host. While
 * they load, the provider remembered for the project answers, so a switcher
 * does not change shape on every visit. Null without a project.
 */
export declare function useRepositoryHostProvider(directory: string | null): SourceControlProvider | 'none' | null;
/**
 * The read context a project's issues and change requests come from, once its
 * binding has been read: GitHub's when the project has one, else GitLab's.
 * Null while the binding or an account on one of its hosts is still loading,
 * and `missing` when no account can read it: no remote on a supported host, or
 * none of its hosts has a working account.
 */
export declare function useGitHubReadContext(directory: string | null): SourceControlReadContext | 'missing' | null;
/**
 * The host a project's items come from.
 *
 * Read contexts name it once the binding and the accounts have both loaded,
 * but either can still be loading, and a binding nobody watches goes stale
 * with no contexts. The project's remotes say where it lives in all of those
 * moments, so they answer meanwhile; GitHub only when nothing says otherwise.
 * GitHub wins over GitLab when a project has both, as the read context does.
 */
export declare function useRepositoryReferenceProvider(directory: string | null): SourceControlProvider;
/**
 * Whether the project's issues and change requests can be listed. A project
 * that lives on GitHub or GitLab but no account there can read it is
 * disconnected, and so is a project with no remote at all while no account is
 * connected anywhere.
 */
export declare function useGitHubSourceStatus(directory: string | null): ReferenceSourceStatus;
export declare function useLinearSourceStatus(): ReferenceSourceStatus;
export declare function useGitHubReferenceList(options: {
    enabled: boolean;
    directory: string | null;
    kind: GitHubReferenceKind;
    filter: RepositoryReferenceFilter;
    query: string;
}): import("./referenceCache").CachedList<GitHubReference> & {
    loadMore: () => void;
    retry: () => Promise<void>;
};
/**
 * Issues or PRs of every GitHub repository under a project folder, one request
 * per page (`githubReferencesAcross`). Waits until every folder's context is
 * known, and its key carries the set of contexts asked, so a change in it
 * lists again. Folders on GitLab or without a context are not asked; those the
 * answer skipped come back as `skipped`. `contexts` is what the list was built from.
 */
export declare function useGitHubAcrossReferenceList(options: {
    enabled: boolean;
    directories: readonly string[];
    kind: GitHubReferenceKind;
    filter: RepositoryReferenceFilter;
    query: string;
}): {
    status: 'loading' | 'ready' | 'unavailable' | 'error';
    unavailable: 'disconnected' | 'no-repo' | null;
    hasMore: boolean;
    refreshing: boolean;
    loadingMore: boolean;
    error: string | null;
    skipped: import("./referenceCache").ListSkip[];
    loadMore: () => void;
    retry: () => Promise<void>;
    items: AcrossReference[];
    contexts: AcrossContexts;
};
export declare function useLinearReferenceList(options: {
    enabled: boolean;
    filter: LinearReferenceFilter;
    query: string;
    /** One team's issues; every team's when absent. */
    teamId?: string | null;
}): import("./referenceCache").CachedList<LinearIssueSummary> & {
    loadMore: () => void;
    retry: () => Promise<void>;
};
/**
 * Comments of the previewed issue or PR, and a PR's size and review. A cached
 * answer shows at once; GitHub is asked only once `settled` says the
 * highlight stopped on the item.
 */
export declare function useGitHubReferenceDetail(directory: string | null, reference: GitHubReference | null, settled: boolean): {
    detail: CachedValue<GitHubReferenceDetail>;
    refresh: () => Promise<void>;
};
/** Forgets every PR's checks and mergeability, so the lists showing them ask again: the board's refresh. */
export declare const forgetGitHubPullStatuses: () => void;
/**
 * Checks and mergeability of the open PRs a list shows. GitHub only: a GitLab
 * project's items, issues and closed PRs ask nothing and answer `idle`. A ready
 * null is a PR GitHub could not resolve.
 */
export declare function useGitHubPullStatuses(directory: string | null, references: readonly GitHubReference[]): (reference: GitHubReference) => CachedValue<GitHubPullStatus | null>;
/** The same for a list across repositories: each PR is asked through the context of the folder it came from. */
export declare function useGitHubPullStatusesAcross(contexts: AcrossContexts, items: readonly AcrossReference[]): (reference: GitHubReference, directory: string | null) => CachedValue<GitHubPullStatus | null>;
/**
 * A Linear issue with its description and comments, from the same cache the
 * preview fills: attaching an issue that was previewed asks Linear nothing.
 */
export declare function readLinearIssueDetail(linear: LinearAPI, issueId: string): Promise<LinearIssue>;
/** The previewed Linear issue's description and comments; asked once `settled`, like GitHub's. */
export declare function useLinearIssueDetail(issueId: string | null, settled: boolean): {
    detail: CachedValue<LinearIssue>;
    refresh: () => Promise<void>;
};
