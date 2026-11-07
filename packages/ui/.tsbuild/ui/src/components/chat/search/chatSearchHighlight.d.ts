/** The query's words the index can match: the same split the server makes. */
export declare const toHighlightTerms: (query: string) => string[];
/**
 * Every occurrence of the terms in one message's searchable text. Matches are
 * found within a text node; a word split across formatting is not painted.
 */
export declare const findTermRanges: (messageRoot: Element, terms: readonly string[]) => Range[];
export declare const paintSearchHighlights: (all: Range[], current: Range[]) => void;
