/**
 * What the reference picker has already fetched, shared across opens.
 *
 * Switching the picker's tab or filter, or opening it again, shows the list
 * it showed last time at once; a list older than `FRESH_MS` is refreshed in
 * the background and replaced when the answer arrives. A failed refresh keeps
 * what was shown and reports the error next to it: a failure never reads as
 * an empty list.
 *
 * Keys carry everything that changes the answer (runtime, account, project,
 * kind, filter, search text). What a key holds can still go out of date on
 * the host: `revalidateReferences` makes the lists and values on screen check
 * their age again, for a surface that stays mounted while nobody looks at it.
 */
import type { GitHubReferencesAcrossSkip } from '@/lib/api/types';
/** A folder a list over several repositories could not read, and why. */
export type ListSkip = {
    directory: string;
    reason: GitHubReferencesAcrossSkip;
};
export type ListPage<T> = {
    kind: 'page';
    items: T[];
    cursor: string | null;
    hasMore: boolean;
    skipped?: ListSkip[];
}
/** The source answered but cannot list: not connected, or no repo. */
 | {
    kind: 'unavailable';
    reason: 'disconnected' | 'no-repo';
};
export type CachedList<T> = {
    /** `loading` only until the first answer; a refresh keeps the last one. */
    status: 'loading' | 'ready' | 'unavailable' | 'error';
    unavailable: 'disconnected' | 'no-repo' | null;
    items: T[];
    hasMore: boolean;
    refreshing: boolean;
    loadingMore: boolean;
    /** The last failure, first page or a later one; cleared by the next success. */
    error: string | null;
    /** Folders the latest page of a list over several repositories left out; empty otherwise. */
    skipped: ListSkip[];
};
export type CachedValue<T> = {
    status: 'idle';
} | {
    status: 'loading';
} | {
    status: 'ready';
    value: T;
} | {
    status: 'error';
    error: string;
};
type PageFetcher<T> = (cursor: string | null) => Promise<ListPage<T>>;
type Listener = () => void;
export type ListCache<T> = {
    /** Show what `key` has and fetch it when missing or stale; settles when that fetch does, or at once when none starts. */
    ensure: (key: string, fetchPage: PageFetcher<T>, options?: {
        force?: boolean;
    }) => Promise<void>;
    loadMore: (key: string) => void;
    read: (key: string) => CachedList<T> | null;
    subscribe: (key: string, listener: Listener) => () => void;
    clear: () => void;
};
/** `now` is the clock freshness is measured on; tests pass their own. */
export declare function createListCache<T>(limit?: number, now?: () => number): ListCache<T>;
export type ValueCache<T> = {
    /**
     * The value for `key`, fetched once and again when stale; one request at
     * a time. `force` asks again even when fresh, after any request already
     * running, so an answer from before a change never wins over one after it.
     */
    ensure: (key: string, fetch: () => Promise<T>, options?: {
        force?: boolean;
    }) => Promise<T>;
    /**
     * Every key of `keys` that is missing or stale, asked together: one
     * `fetch` per `batchSize` of them. `fetch` answers each key it was given;
     * a key it leaves out ends as an error, like a failed request.
     */
    ensureMany: (keys: string[], fetch: (keys: string[]) => Promise<ReadonlyMap<string, T>>, batchSize: number) => void;
    read: (key: string) => CachedValue<T> | null;
    subscribe: (key: string, listener: Listener) => () => void;
    /** Changes on every write; a snapshot for readers of several keys at once. */
    version: () => number;
    clear: () => void;
};
export declare function createValueCache<T>(limit?: number, now?: () => number): ValueCache<T>;
/** Lists and values on screen older than `FRESH_MS` are read again; fresh ones stay as they are. */
export declare function revalidateReferences(): void;
/** Changes on every `revalidateReferences`; an effect that fetches lists it among its dependencies. */
export declare function useReferenceRevalidation(): number;
/**
 * The cached list for `key`, refreshed when stale. A null key shows nothing
 * and fetches nothing.
 */
export declare function useCachedList<T>(cache: ListCache<T>, key: string | null, fetchPage: PageFetcher<T>): CachedList<T> & {
    loadMore: () => void;
    retry: () => Promise<void>;
};
/**
 * The cached value for `key`, fetched on first use. A null key stays idle.
 * With `fetchNow` false it shows what the cache already has and asks nothing,
 * so a caller can wait before asking without hiding a known answer.
 */
export declare function useCachedValue<T>(cache: ValueCache<T>, key: string | null, fetch: () => Promise<T>, fetchNow?: boolean): CachedValue<T>;
export {};
