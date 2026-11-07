export interface FuzzySearchOptions {
    threshold?: number;
    distance?: number;
    ignoreLocation?: boolean;
    preferSubstring?: boolean;
}
export declare function matchesFuzzyQuery(target: string, query: string, options?: FuzzySearchOptions): boolean;
/**
 * Score-sorted fuzzy ranking. Strict (low threshold), prioritizes substring
 * matches (especially prefix matches), and returns the top N.
 *
 * Use this for command-palette-style result ranking where order matters more
 * than recall.
 */
export declare function scoreByFuzzyQuery<T>(items: T[], query: string, getText: (item: T) => string, options?: {
    limit?: number;
    threshold?: number;
    noFuzzy?: boolean;
}): {
    item: T;
    score: number;
}[];
export interface RankByQueryOptions {
    limit?: number;
    /** Typo-tolerant Fuse fallback for single-token queries (default true). */
    fuzzy?: boolean;
}
/**
 * The canonical dropdown matcher: every whitespace-separated query token must
 * match somewhere in the item's fields (any order, punctuation-insensitive),
 * and results come back ordered by relevance — exact/prefix matches first,
 * then word-boundary and substring matches, original order breaking ties.
 * Single-token queries additionally fall back to typo-tolerant fuzzy matching.
 *
 * Use this for every searchable dropdown (projects, agents, branches, models)
 * instead of ad hoc `toLowerCase().includes` filters, so matching quality and
 * ordering stay consistent across pickers.
 */
export declare function rankByQuery<T>(items: readonly T[], query: string, getTexts: (item: T) => ReadonlyArray<string | null | undefined>, options?: RankByQueryOptions): T[];
/**
 * Boolean companion to `rankByQuery` for lists that keep their own grouping or
 * order: every token must match one of the fields, punctuation-insensitive,
 * without the fuzzy fallback.
 */
export declare function matchesRankQuery(texts: ReadonlyArray<string | null | undefined>, query: string): boolean;
