export type HighlightResultCacheOptions = {
    maxEntries: number;
    maxBytes: number;
};
/** UTF-16 storage estimate for a JS string (chars × 2). Avoids TextEncoder allocs. */
export declare const utf16Bytes: (value: string) => number;
/**
 * Short stable fingerprint for cache keys: length + two independent 32-bit
 * multiplicative hashes (~64 bits of key space).
 *
 * These caches are content-addressed and global, so a collision does not merely
 * mis-color a block — the cache returns a *different* block's rendered HTML and
 * the user is shown source they never wrote. One 32-bit hash is not enough for
 * that failure mode: a few thousand same-length entries reach a birthday
 * collision probability worth caring about, and the result would be
 * undiagnosable in the field. Two multiplies per character are free next to
 * Shiki tokenization.
 */
export declare const contentFingerprint: (value: string) => string;
/**
 * Running state of `contentFingerprint`, so text that only grows (a streamed
 * block) is hashed once per added character instead of once per render.
 */
export type FingerprintState = {
    readonly length: number;
    readonly h1: number;
    readonly h2: number;
};
export declare const EMPTY_FINGERPRINT: FingerprintState;
/** State after hashing `value.slice(from)` on top of `state`. */
export declare const extendFingerprint: (state: FingerprintState, value: string, from?: number) => FingerprintState;
export declare const fingerprintKey: (state: FingerprintState) => string;
/** Approximate byte cost of token-run lines without JSON.stringify. */
export declare const estimateTokenRunsBytes: (lines: ReadonlyArray<ReadonlyArray<readonly [number, string, number]>>) => number;
export declare class HighlightResultCache<T> {
    private readonly maxEntries;
    private readonly maxBytes;
    private readonly map;
    private totalBytes;
    constructor(options: HighlightResultCacheOptions);
    get size(): number;
    get bytes(): number;
    get(key: string): T | undefined;
    set(key: string, value: T, bytes: number): void;
    clear(): void;
}
