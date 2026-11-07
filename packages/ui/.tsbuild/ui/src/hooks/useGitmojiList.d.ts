type GitmojiEntry = {
    emoji: string;
    code: string;
    description: string;
};
export declare const GITMOJI_FETCH_TIMEOUT_MS = 10000;
export declare const GITMOJI_CATALOG_MAX_BYTES: number;
export declare const fetchGitmojiList: () => Promise<GitmojiEntry[]>;
type UseGitmojiListResult = {
    gitmojis: GitmojiEntry[];
    isLoading: boolean;
    ensureLoaded: () => Promise<GitmojiEntry[]>;
};
/**
 * Returns the gitmoji emoji catalog, hydrated from a local cache and
 * stale-while-revalidated from the upstream JSON.
 *
 * - When `enabled` is false, the hook returns an empty list and skips all IO.
 * - The first call hydrates synchronously from localStorage (no network
 *   round-trip on warm starts).
 * - If the cache is missing or stale, a single background fetch is fired and
 *   deduped across concurrent hook instances.
 * - Callers can invoke `ensureLoaded()` to await the next settled value when
 *   they need the list synchronously (e.g. auto-suggest on commit subject).
 */
export declare const useGitmojiList: (enabled: boolean) => UseGitmojiListResult;
export {};
