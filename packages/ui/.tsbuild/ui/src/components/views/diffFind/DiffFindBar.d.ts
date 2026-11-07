import React from 'react';
/** The bar's root carries this attribute, so the surface can tell its input from other fields. */
export declare const DIFF_FIND_BAR_ATTR = "data-diff-find-bar";
export type DiffFindBarProps = {
    /** The current search text. The bar is controlled; the parent owns the state. */
    query: string;
    onQueryChange: (query: string) => void;
    /** Number of matches found so far across the changeset. */
    total: number;
    /** Zero-based index of the active match, or 0 when there is none. */
    currentIndex: number;
    /**
     * True while files in the changeset are still being read, so `total` will
     * keep growing. Shown as a `+` after the total.
     */
    isSearching: boolean;
    /** Files whose read failed; their matches are missing from `total`. */
    failedCount?: number;
    onNext: () => void;
    onPrevious: () => void;
    onClose: () => void;
    /**
     * Bumped by the parent each time the find shortcut fires. Any value above
     * zero re-focuses and re-selects the query, so pressing the shortcut again
     * while the bar is already open returns the reader to the input.
     */
    focusNonce?: number;
    /** Layout overrides for the floating bar (position, offsets). */
    className?: string;
};
/**
 * The find bar for the diff view, floating over the changeset like the
 * Markdown preview's search bar. It is a controlled component: the parent owns
 * the query and the match list, and this widget only renders the query, the
 * count and the navigation controls.
 *
 * `isSearching` says the changeset is still being read, so the count is not
 * final yet: the total reads `12+` until the last file is in. A `+` keeps the
 * controls still, where a spinner appearing and leaving beside the count moved
 * the arrows on every search.
 */
export declare const DiffFindBar: React.FC<DiffFindBarProps>;
