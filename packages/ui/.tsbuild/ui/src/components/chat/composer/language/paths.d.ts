/**
 * `~path` — a path written for the reader, not for the machine.
 *
 * `@path` attaches a file: it resolves against the project, searches, and rides
 * along with the message. Often that is not what is wanted. Explaining where
 * something lives, or naming a file in another repository, should not silently
 * attach it — but it should still stand out from prose, because a path buried
 * in a sentence is hard to read.
 *
 * `~` marks exactly that: **highlighting without attachment**. It is inert by
 * design, so nothing here feeds the autocomplete or the send path.
 *
 * @see mentions.ts for `@`, which does attach.
 */
import type { HighlightRange } from '../../composerHighlight';
export interface PathToken {
    /** Offset of the `~`. */
    start: number;
    /** Offset just past the path. */
    end: number;
    /** The path without its `~`. */
    path: string;
}
/**
 * Find every `~path` in `text`.
 *
 * Deliberately blind to `~~strikethrough~~` and to `~~~` code fences: the scan
 * stops at `~`, so a doubled marker yields nothing to highlight and the fence
 * tokenizer keeps its own text.
 */
export declare function scanPaths(text: string): PathToken[];
/** Path tokens as highlight ranges. */
export declare function pathHighlightRanges(text: string): HighlightRange[];
