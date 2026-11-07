import React from 'react';
export type SortableTabsStripItem = {
    id: string;
    label: string;
    icon?: React.ReactNode;
    title?: string;
    closable?: boolean;
    closeLabel?: string;
    /** A replaceable preview tab; its label is italic, as in VS Code. */
    preview?: boolean;
    /** Dimmed folder shown before the label, telling apart files that share a
        name. Such a tab is never width-capped, so the folder stays whole. */
    labelFolder?: string;
};
type SortableTabsStripProps = {
    items: SortableTabsStripItem[];
    activeId: string | null;
    onSelect: (id: string) => void;
    onClose?: (id: string) => void;
    onReorder?: (activeId: string, overId: string) => void;
    onDoubleClickTab?: (id: string) => void;
    layoutMode?: 'scrollable' | 'fit';
    variant?: 'default' | 'active-pill' | 'animated';
    activePillInsetClassName?: string;
    activePillButtonClassName?: string;
    /** Active-pill height on desktop: `toolbar` is 28px like the toolbar
        controls, `form` is 32px like the inputs and selects of a form (Settings).
        Give the strip the matching height (`h-7` or `h-8`). Touch layouts keep
        their own larger size either way. */
    pillSize?: 'toolbar' | 'form';
    inactiveTabsIconOnly?: boolean;
    /** Every tab with an icon shows it alone, the active one too; the label
        stays its accessible name and tooltip. For a row short on width. */
    iconOnly?: boolean;
    animateActivePill?: boolean;
    /** Position the active-pill indicator with left/top instead of translate3d.
        Use when the strip lives inside an ancestor that transform-animates
        (e.g. a sliding mobile drawer): creating a composited layer mid-slide
        flickers in WKWebView. Tab-switch animation stays (layout transition). */
    nonCompositedIndicator?: boolean;
    /** Size the strip by its labels rather than its parent's width. The track's
        container query reads the parent, so a parent that sizes itself by its
        content (a toolbar row) would leave the strip no width at all. */
    intrinsicWidth?: boolean;
    /** Per-tab right-click context menu. Return the menu items for the given tab,
        or null/undefined to disable the context menu for that tab. */
    tabContextMenu?: (args: {
        id: string;
        index: number;
        isActive: boolean;
        allIds: string[];
        close: () => void;
    }) => React.ReactNode;
    className?: string;
    /**
     * A tab dragged out of the strip does something else than reorder (the
     * context panel moves its surface to another zone). Called when a drag
     * starts, with a test for "the pointer is outside the strip"; the returned
     * gesture decides on drop. A drop it takes skips the reorder.
     */
    onTabDragOut?: (id: string, isOutside: (point: {
        x: number;
        y: number;
    }) => boolean) => {
        finish: () => boolean;
        cancel: () => void;
    } | null;
};
export declare const SortableTabsStrip: React.FC<SortableTabsStripProps>;
export {};
