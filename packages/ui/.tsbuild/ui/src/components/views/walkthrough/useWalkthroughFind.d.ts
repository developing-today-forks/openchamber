import { type RefObject } from 'react';
import type { WalkthroughView } from '@/lib/walkthrough/model';
interface UseWalkthroughFindOptions {
    view: WalkthroughView | null;
    renderSideBySide: boolean;
    visible: boolean;
    rootRef: RefObject<HTMLElement | null>;
    /** Make a stop the active one and scroll to it. */
    selectStop: (stopId: string) => void;
    /** Make a stop the active one where it is. */
    markStopActive: (stopId: string) => void;
}
/**
 * Find across a walkthrough. Every run is a search source: one file's
 * consecutive hunks inside one stop. Two stops that touch one file are two runs
 * with two keys, so their partial diffs never collide. A run parses lazily, so
 * a closed bar costs nothing; the layout is part of the source set, so a toggle
 * re-runs matching.
 */
export declare const useWalkthroughFind: ({ view, renderSideBySide, visible, rootRef, selectStop, markStopActive }: UseWalkthroughFindOptions) => {
    registerViewer: (key: string, handle: import("../PierreDiffViewer").PierreDiffViewerHandle | null) => void;
    openOnWord: (key: string, request: import("../PierreDiffViewer").DiffFindWordRequest) => void;
    focusNonce: number;
    find: import("@/components/views/diffFind/useDiffFind").UseDiffFindResult;
    uncoveredOpenRequest: number;
};
export {};
