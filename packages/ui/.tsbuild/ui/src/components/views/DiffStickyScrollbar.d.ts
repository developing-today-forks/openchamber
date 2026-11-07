import React from 'react';
/**
 * The horizontal scrollbar of a diff wider than its panel, kept at the bottom
 * of the visible part of the diff while the diff is taller than the panel
 * (#4850). Without it the code columns' own scrollbars sit after the last
 * line, so a mouse user scrolls the whole file down to scroll sideways. It
 * adds no scroll area of its own to the panel's vertical scrolling (#213).
 */
export declare const DiffStickyScrollbar: React.FC<{
    containerRef: React.RefObject<HTMLDivElement | null>;
}>;
