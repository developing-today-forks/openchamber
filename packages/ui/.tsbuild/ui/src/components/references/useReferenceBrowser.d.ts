/**
 * The list and preview state behind the reference picker and the issues and
 * PRs board: the GitHub tab and filter, the search, the highlighted row and
 * the details of the item it rests on. Each surface lays these parts out and
 * adds what it does with an item: the picker checks and attaches, the board
 * acts on the previewed one.
 */
import * as React from 'react';
import type { GitHubPullStatus, GitHubReference, GitHubReferenceKind, RepositoryReferenceFilter } from '@/lib/api/types';
import type { CachedValue } from './referenceCache';
import { type LinearReferenceFilter, type ReferencePickerItem, type ReferencePickerSource } from './referencePickerItems';
export declare const IDLE_PULL_STATUS: CachedValue<GitHubPullStatus | null>;
export declare const readyValue: <T>(state: CachedValue<T | null>) => T | null;
export type ReferenceBrowserOptions = {
    source: ReferencePickerSource;
    /** The project GitHub or GitLab items come from. */
    directory: string | null;
    /**
     * Set to list the GitHub issues and PRs of these folders (the repositories
     * under `directory`) together instead of `directory`'s own; each item then
     * carries the folder it belongs to.
     */
    directories?: readonly string[] | null;
    isMobile: boolean;
    /** Tab to open GitHub on; the last used one otherwise. */
    initialGitHubKind?: GitHubReferenceKind;
    /** One Linear team's issues; every team's when absent. */
    linearTeamId?: string | null;
    /** Items kept outside the list (the picker's checked ones) that can still be previewed. */
    retainedItems?: ReadonlyMap<string, ReferencePickerItem>;
    /** One item another surface asked to show, read on its own: it can be highlighted while the list does not hold it. */
    pinnedItem?: ReferencePickerItem | null;
};
export declare function useReferenceBrowser({ source, directory, directories, isMobile, initialGitHubKind, linearTeamId, retainedItems, pinnedItem, }: ReferenceBrowserOptions): {
    source: ReferencePickerSource;
    directory: string | null;
    across: boolean;
    leftOut: import("./acrossRepositories").AcrossExclusion[];
    isMobile: boolean;
    isGitLab: boolean;
    sourceStatus: import("./referenceSources").ReferenceSourceStatus;
    githubKind: GitHubReferenceKind;
    githubFilter: RepositoryReferenceFilter;
    linearFilter: LinearReferenceFilter;
    query: string;
    debouncedQuery: string;
    setQuery: (value: string) => void;
    selectGitHubKind: (kind: GitHubReferenceKind) => void;
    selectGitHubFilter: (patch: Partial<RepositoryReferenceFilter>) => void;
    selectLinearFilter: (patch: Partial<LinearReferenceFilter>) => void;
    list: (import("./referenceCache").CachedList<import("@/lib/api/types").LinearIssueSummary> & {
        loadMore: () => void;
        retry: () => Promise<void>;
    }) | (import("./referenceCache").CachedList<GitHubReference> & {
        loadMore: () => void;
        retry: () => Promise<void>;
    });
    items: ReferencePickerItem[];
    pullStatusOf: (reference: GitHubReference, itemFolder?: string) => CachedValue<GitHubPullStatus | null>;
    effectiveHighlightKey: string | null;
    highlightedItem: ReferencePickerItem | null;
    previewKey: string | null;
    previewItem: ReferencePickerItem | null;
    mobilePreviewKey: string | null;
    closeMobilePreview: () => void;
    linearDetail: CachedValue<import("@/lib/api/types").LinearIssue>;
    githubDetail: CachedValue<import("@/lib/api/types").GitHubReferenceDetail>;
    refreshGithubDetail: () => Promise<void>;
    now: number;
    searchRef: React.RefObject<HTMLInputElement | null>;
    handleNavigationKey: (event: React.KeyboardEvent<HTMLInputElement>) => boolean;
    showItem: (key: string) => void;
    openItem: (item: ReferencePickerItem) => void;
};
export type ReferenceBrowser = ReturnType<typeof useReferenceBrowser>;
