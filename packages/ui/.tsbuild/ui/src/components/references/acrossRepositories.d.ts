/**
 * Listing issues and PRs across the repositories under a project folder: which
 * folders can be asked, which are left out and why, and how an item finds the
 * folder (and so the read context) it belongs to. Pure; the hooks in
 * `referenceSources.ts` feed it.
 */
import type { GitHubPullReference, GitHubReferencesOptions, GitHubReferencesAcrossResult, GitHubPullStatus, GitHubPullStatusesResult, GitHubReference, GitHubReferencesAcrossSkip, SourceControlReadContext } from '@/lib/api/types';
import type { ListPage, ListSkip, ValueCache } from './referenceCache';
import type { ReferencePickerItem } from './referencePickerItems';
/** An item of a list across repositories: the folder whose read context it belongs to comes with it. */
export type AcrossReference = GitHubReference & {
    directory: string;
};
/** A folder's read context: known, absent (`missing`: no account can read it), or still loading. */
export type ReadContextState = SourceControlReadContext | 'missing' | null;
/** Why a folder is not in the list. `gitlab` and `missing` are known before asking; the rest come with an answer. */
export type AcrossExclusionReason = 'gitlab' | 'missing' | GitHubReferencesAcrossSkip;
export type AcrossExclusion = {
    directory: string;
    reason: AcrossExclusionReason;
};
export type AcrossContexts = {
    /** Every folder's context is known; asking earlier would list a part and then the whole. */
    ready: boolean;
    /** The GitHub folders to ask, in folder order. */
    github: Array<{
        directory: string;
        context: SourceControlReadContext;
    }>;
    /** Folders that are not asked: on GitLab, or with no context that can read them. */
    excluded: AcrossExclusion[];
};
export declare const NO_ACROSS_CONTEXTS: AcrossContexts;
export declare function partitionAcrossContexts(folders: ReadonlyArray<{
    directory: string;
    state: ReadContextState;
}>): AcrossContexts;
/** The folders left out of a list: those never asked, then those the answer skipped. */
export declare function leftOutFolders(contexts: AcrossContexts, skipped: readonly ListSkip[]): AcrossExclusion[];
/** What a page of the search says about its folders, reduced to the ones it left out. */
export declare function skippedOf(repositories: GitHubReferencesAcrossResult['repositories']): ListSkip[];
/** The folder an item came from: its own in a list across repositories, else the list's. */
export declare function itemDirectory(item: ReferencePickerItem | null, fallback: string | null): string | null;
/** An open PR, draft or not: its preview shows checks, and a ready one is coloured by them. */
export declare const needsPullStatus: (reference: GitHubReference) => reference is GitHubPullReference;
/** One folder's open PRs and the context their checks are asked through. */
export type PullStatusGroup = {
    directory: string;
    context: SourceControlReadContext;
    pulls: GitHubPullReference[];
};
/** Listed open PRs grouped by the folder they came from; a folder without a GitHub context asks nothing. */
export declare function groupPullsByDirectory(items: ReadonlyArray<{
    reference: GitHubReference;
    directory: string;
}>, contexts: AcrossContexts): PullStatusGroup[];
/** A key per PR and head commit within its group's scope: a push asks again, a later page reuses earlier answers. */
export declare const pullStatusKey: (scope: string, pull: GitHubPullReference) => string;
/**
 * Asks each group's PR statuses through its own context, in batches. Groups are
 * asked independently: one that fails stores its error under its own keys and
 * leaves the others' answers alone.
 */
export declare function ensurePullStatuses(cache: ValueCache<GitHubPullStatus | null>, groups: readonly PullStatusGroup[], scopeOf: (group: PullStatusGroup) => string, ask: (context: SourceControlReadContext, pulls: GitHubPullReference[]) => Promise<GitHubPullStatusesResult>, batchSize: number): void;
/**
 * One page of the search across repositories, sent the contexts of the GitHub
 * folders. Without any, or where the runtime cannot search across repositories,
 * there is nothing to list. When no folder was read, the list fails if one
 * of them failed, and otherwise reads as disconnected or as having no
 * repository, never as an empty list.
 */
export declare function fetchAcrossPage(search: ((contexts: SourceControlReadContext[], options: GitHubReferencesOptions) => Promise<GitHubReferencesAcrossResult>) | undefined, github: AcrossContexts['github'], options: GitHubReferencesOptions): Promise<ListPage<AcrossReference>>;
