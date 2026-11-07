/**
 * The word under `offset` in `lineText`, expanded to word-character
 * boundaries. `offset` is a position in a diff row's own text — the same space
 * `DiffFindMatch.spanStart` uses. Returns null when the offset is out of range
 * or lands on a non-word character (whitespace or punctuation).
 */
export declare const findWordAtOffset: (lineText: string, offset: number) => {
    word: string;
    spanStart: number;
} | null;
