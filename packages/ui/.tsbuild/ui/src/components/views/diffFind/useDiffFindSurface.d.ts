import React from 'react';
import type { DiffFindWordRequest, PierreDiffViewerHandle } from '@/components/views/PierreDiffViewer';
import type { DiffFindMatch } from '@/lib/diff/diffFind';
import type { UseDiffFindResult } from './useDiffFind';
interface UseDiffFindSurfaceOptions {
    find: UseDiffFindResult;
    /** The surface is the one on screen; a hidden surface leaves Cmd/Ctrl+F alone. */
    visible: boolean;
    /** The surface's root, carrying `data-find-surface`: focus inside it belongs to it. */
    rootRef: React.RefObject<HTMLElement | null>;
    /**
     * Make the match's viewer exist and bring its section into view.
     * `viewerMounted` says the viewer is already there, so the line scroll
     * alone reaches the match.
     */
    reveal: (match: DiffFindMatch, viewerMounted: boolean) => void;
}
interface DiffFindSurface {
    /** Pass to each viewer under its source key (the match's `filePath`). */
    registerViewer: (key: string, handle: PierreDiffViewerHandle | null) => void;
    /** A Cmd/Ctrl-click on a word in the viewer registered under `key`. */
    openOnWord: (key: string, request: DiffFindWordRequest) => void;
    /** Bumped on every find shortcut or word click; the bar re-selects its query. */
    focusNonce: number;
}
/**
 * Connects one find state to the diff viewers of a surface (Changes, the
 * walkthrough): it paints the active file's matches and clears every other
 * viewer, brings the active match into view, opens the bar on Cmd/Ctrl+F
 * through the shortcut registry, and closes it on Escape.
 */
export declare const useDiffFindSurface: ({ find, visible, rootRef, reveal }: UseDiffFindSurfaceOptions) => DiffFindSurface;
export {};
