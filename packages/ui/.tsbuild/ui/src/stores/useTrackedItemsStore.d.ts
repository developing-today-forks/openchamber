import type { GitHubIssueLiveSummary, LinearIssueLiveSummary } from '@/lib/api/types';
import { type TrackedItemState, type TrackedLinearIssue, type TrackedThread } from '@/lib/trackedItems/model';
import { type PrVisualSummary } from './useGitHubPrStatusStore';
type TrackedItemsStore = {
    /** What the server last said about each followed item, by runtime and item key. */
    records: Record<string, TrackedItemState>;
    /**
     * Applies records the server sent. A record older than the one held (an
     * interest answer racing a pushed change) is ignored.
     */
    apply: (runtimeKey: string, records: ReadonlyArray<{
        key: string;
        record: TrackedItemState;
    }>) => void;
};
export declare const useTrackedItemsStore: import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<TrackedItemsStore>, "persist" | "setState"> & {
    setState(partial: Partial<TrackedItemsStore> | TrackedItemsStore | ((state: TrackedItemsStore) => Partial<TrackedItemsStore> | TrackedItemsStore), replace?: false | undefined): unknown;
    setState(state: TrackedItemsStore | ((state: TrackedItemsStore) => TrackedItemsStore), replace: true): unknown;
    persist: {
        setOptions: (options: Partial<import("zustand/middleware").PersistOptions<TrackedItemsStore, {
            records: {
                [k: string]: TrackedItemState;
            };
        }, unknown>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: TrackedItemsStore) => void) => () => void;
        onFinishHydration: (fn: (state: TrackedItemsStore) => void) => () => void;
        getOptions: () => Partial<import("zustand/middleware").PersistOptions<TrackedItemsStore, {
            records: {
                [k: string]: TrackedItemState;
            };
        }, unknown>>;
    };
}>;
/** Live state of each GitHub or GitLab issue, in order; null until known. */
export declare const useTrackedIssueStates: (items: ReadonlyArray<TrackedThread<'issue'>>) => Array<GitHubIssueLiveSummary | null>;
/** Live state of each Linear issue, in order; null until known. */
export declare const useTrackedLinearStates: (items: ReadonlyArray<TrackedLinearIssue>) => Array<LinearIssueLiveSummary | null>;
/**
 * Badges of linked pull and merge requests, in order: the same colour and
 * status rule as a branch's PR. Null for one whose state is not known yet.
 */
export declare const useTrackedPullVisualSummaries: (links: ReadonlyArray<{
    item: TrackedThread<'pull'>;
    url: string;
    title: string;
}>) => Array<PrVisualSummary | null>;
export {};
