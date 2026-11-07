import type { FileDiffMetadata } from '@pierre/diffs';
export type DiffFindSide = 'additions' | 'deletions';
export interface DiffFindMatch {
    filePath: string;
    side: DiffFindSide;
    /** 1-based line number on that side, matching the library's own numbering. */
    lineNumber: number;
    /** 0-based offset and length of the match inside the line text. */
    spanStart: number;
    spanLength: number;
}
/**
 * All matches of `query` across the rendered rows of a single file diff, in
 * reading order: hunks first, then lines, and within a change block deletions
 * before additions. `query` is matched verbatim — callers decide whether to
 * trim.
 *
 * Rows are layout-aware. Inline (unified) renders one row per context line,
 * carrying the additions line number, so a context match is emitted once with
 * `side: 'additions'`. Side-by-side renders a context line twice, once per
 * side, so both sides are emitted. Change-block rows are independent in either
 * layout and always keep their own side.
 */
export declare const findMatchesInFileDiff: (fileDiff: FileDiffMetadata, filePath: string, query: string, options: {
    caseSensitive?: boolean;
    layout: 'inline' | 'side-by-side';
}) => DiffFindMatch[];
