/**
 * Case-insensitive substring match ranges over a single text string, using
 * the same non-overlapping `String.prototype.indexOf` scan semantics as
 * standard find-in-page (e.g. "aaa" in "aaaa" yields a single [0,3]).
 */
export declare const findMatchRanges: (text: string, query: string) => Array<{
    start: number;
    end: number;
}>;
