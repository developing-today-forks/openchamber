/**
 * Overlay rectangles for a captured text selection.
 *
 * While a comment input owns focus the native selection is gone, so the
 * quoted fragment is repainted with these rects (styled by
 * `.oc-chat-comment-rect`). Raw Range.getClientRects() mixes block-container
 * boxes with text boxes and the translucent overlaps paint double-dark bands,
 * so rects are taken from the text nodes only and merged into one strip per
 * visual line, each stretched to its element's line-height the way the native
 * selection paints a line box.
 */
export declare const collectSelectionOverlayRects: (range: Range) => DOMRect[];
