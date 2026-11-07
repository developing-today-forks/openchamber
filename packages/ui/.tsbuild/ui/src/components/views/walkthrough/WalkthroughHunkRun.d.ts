import { type DiffFindWordRequest, type PierreDiffViewerHandle } from '@/components/views/PierreDiffViewer';
import type { WalkthroughHunk } from '@/lib/walkthrough/types';
interface WalkthroughHunkRunProps {
    path: string;
    hunks: WalkthroughHunk[];
    renderSideBySide: boolean;
    wrapLines: boolean;
    /** Find identity of this run; absent when the run is not searchable. */
    runKey?: string;
    /** Find-in-walkthrough: register this run's rendered viewer handle. */
    registerFindViewerRef?: (runKey: string, handle: PierreDiffViewerHandle | null) => void;
    /** Find-in-walkthrough: a modifier-click on a word, tagged with this run. */
    onFindWordRequest?: (runKey: string, request: DiffFindWordRequest) => void;
}
/**
 * One file's contribution to a stop. Consecutive hunks are merged back into a
 * single patch so the reader sees continuous code rather than a stack of
 * one-hunk cards.
 *
 * Inline comments are on: a review you cannot annotate is a reader, not a tool.
 * They work here because the merged patch keeps the original `@@` headers, so
 * the line numbers a comment captures are the file's real ones and not offsets
 * into an excerpt.
 */
export declare const WalkthroughHunkRun: import("react").MemoExoticComponent<({ path, hunks, renderSideBySide, wrapLines, runKey, registerFindViewerRef, onFindWordRequest, }: WalkthroughHunkRunProps) => import("react/jsx-runtime").JSX.Element | null>;
export {};
