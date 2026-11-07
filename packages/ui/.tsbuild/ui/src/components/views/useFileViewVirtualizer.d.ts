import { Virtualizer } from '@pierre/diffs';
/**
 * Owns one pierre `Virtualizer` bound to a scrolling container.
 *
 * The instance is created on first render (the constructor does no DOM work)
 * so a `<PierreFile>` mounted inside a `VirtualizerContext.Provider` already
 * picks the virtualized path on mount. pierre queues `connect()` calls made
 * before `setup()` and flushes them once the real scroller element is bound.
 *
 * The scroller passed to `setScroller` must be the actual scrolling element:
 * pierre reads `scrollTop`/`scrollHeight`/client height and applies its scroll
 * fix on that element.
 */
export declare function useFileViewVirtualizer(): {
    virtualizer: Virtualizer;
    setScroller: (node: HTMLElement | null) => void;
};
export type FileViewVirtualizer = ReturnType<typeof useFileViewVirtualizer>;
