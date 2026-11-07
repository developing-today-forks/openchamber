import type { Walkthrough, WalkthroughChapter, WalkthroughHunk, WalkthroughResult, WalkthroughStop } from './types';
/**
 * Flattens a walkthrough plus the current hunk index into the ordered stream
 * the view renders: every stop with its resolved hunks, followed by everything
 * the walkthrough did not cover.
 *
 * Resolution is pure id matching — the server owns hunk identity, so a stop
 * whose hunks are missing is not a bug to paper over, it is a stop whose code
 * has changed.
 */
export interface WalkthroughStopView {
    stop: WalkthroughStop;
    chapter: WalkthroughChapter;
    chapterIndex: number;
    /** Global 1-based position, used for the stepper and keyboard navigation. */
    position: number;
    hunks: WalkthroughHunk[];
    /** Anchors that no longer resolve: their code changed or was removed. */
    missingHunkIds: string[];
    isStale: boolean;
}
export interface WalkthroughView {
    walkthrough: Walkthrough;
    stops: WalkthroughStopView[];
    chapters: Array<{
        chapter: WalkthroughChapter;
        stops: WalkthroughStopView[];
    }>;
    /** Current hunks no stop covers. Never dropped — rendered as a collapsed tail. */
    uncoveredHunks: WalkthroughHunk[];
    staleStopCount: number;
    isStale: boolean;
}
export declare const buildWalkthroughView: (result: WalkthroughResult | null) => WalkthroughView | null;
/**
 * Files touched by a set of hunks, in first-appearance order, with their
 * per-file totals. Used for the table of contents rows.
 */
export declare const summarizeHunkFiles: (hunks: WalkthroughHunk[]) => Array<{
    path: string;
    added: number;
    deleted: number;
}>;
/**
 * Consecutive hunks from the same file are rendered as one diff block so the
 * reader sees continuous code instead of a stack of one-hunk cards.
 */
export declare const groupHunksByFile: (hunks: WalkthroughHunk[]) => Array<{
    path: string;
    hunks: WalkthroughHunk[];
}>;
/**
 * Merge a file's hunk patches back into one patch so a run renders as a single
 * diff. All hunks in a run share a file header, so only the first one's header
 * is kept.
 */
export declare const mergeRunPatch: (hunks: WalkthroughHunk[]) => string;
