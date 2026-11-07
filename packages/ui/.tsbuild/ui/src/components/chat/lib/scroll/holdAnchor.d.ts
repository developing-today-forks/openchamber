export declare const CHAT_SCROLLER_SELECTOR = "[data-scrollbar=\"chat\"]";
/**
 * Keeps `element` at viewport position `top` across a size change of its row,
 * such as a batch of messages mounting above it. The list measures the changed
 * row after this commit and, anchored to a visible row it can have cached from
 * before the reader scrolled into this turn, may move the viewport by the same
 * amount a second time. Observed after the list's own measurement, the resize
 * check puts the element back before that frame paints; the frame checks cover
 * a later correction. Touch, pointer or key input ends the hold at once.
 */
export declare const holdAnchor: (scroller: Element, element: Element, top: number) => (() => void);
