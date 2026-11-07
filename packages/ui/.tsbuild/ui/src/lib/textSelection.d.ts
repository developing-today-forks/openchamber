/**
 * True when the document has a non-collapsed text selection that touches
 * `container`. Click handlers use it to tell a plain click from the click the
 * browser still dispatches after a drag or multi-click selected text inside the
 * element, so the selection can be copied instead of activating the element.
 */
export declare const hasTextSelectionInside: (container: {
    contains: (node: Node | null) => boolean;
} | null | undefined) => boolean;
