import React from 'react';
interface EdgeSwipeOptions {
    /** Swipe that started at the left edge and travelled right. */
    onLeftEdgeSwipe?: () => void;
    /** Swipe that started at the right edge and travelled left. */
    onRightEdgeSwipe?: () => void;
    /** Defaults to on. Flipping it re-attaches the listeners, which is what a
        drawer needs: its element only exists (or only matters) while open. */
    enabled?: boolean;
}
export declare const useEdgeSwipe: (ref: React.RefObject<HTMLElement | null>, options: EdgeSwipeOptions) => void;
export {};
