import type { FileDiffMetadata } from '@pierre/diffs';
/**
 * The same diff with whitespace-only line changes turned into context, as
 * `git diff -w` would show it. Each side keeps its own text, line numbers do
 * not move, and hunks are recut around the changes that remain, so a hunk
 * that only re-indented code disappears. Returns the input object when no
 * line changed by whitespace alone.
 */
export declare const hideWhitespaceChanges: (fileDiff: FileDiffMetadata) => FileDiffMetadata;
