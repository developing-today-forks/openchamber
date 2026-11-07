/**
 * Mirrors the horizontal scroll of each code column Pierre renders inside
 * `container` (two in a split diff, one in a unified one) into a track inside
 * `bar`, which the caller keeps sticky at the bottom of the scrolling panel.
 *
 * Sizes are read only in ResizeObserver callbacks, after the browser's own
 * layout, so vertical scrolling and row virtualization cost nothing here.
 * Structure is followed with child-list observers on the host, its shadow
 * root, the `pre` and each column; the rows Pierre swaps while scrolling sit
 * one level deeper and are not observed.
 */
export declare const bindStickyScrollbar: (container: HTMLElement, bar: HTMLElement) => (() => void);
