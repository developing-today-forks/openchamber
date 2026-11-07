/**
 * A selection made inside a sandboxed page frame (`openchamber_render`). The
 * app cannot read it, so the frame reports it and the selection menu of the
 * page picks it up (`frameSelections` on TextSelectionMenu). It travels as a
 * DOM event from the frame element, so only the menu whose container holds
 * that frame hears it.
 */
import type { ChatQuoteAnchor } from '@/lib/chatQuoteAnchor';
export interface FrameRect {
    top: number;
    left: number;
    width: number;
    height: number;
}
export interface FrameSelection {
    /** Empty when the selection is gone. */
    text: string;
    /** The selection's box in the frame's own viewport. */
    rect: FrameRect;
    /** The selection as a quote anchor in the page's own text; set by the frame's owner. */
    anchor?: ChatQuoteAnchor;
    /**
     * Drops the selection in the page and tells the menu it is gone. The menu
     * calls it whenever it stops tracking this selection, so the page does not
     * keep a highlight the menu no longer answers to.
     */
    clear?: () => void;
    /** On an empty selection: close the menu even while a comment is open (another page took over). */
    dismiss?: boolean;
}
export declare function dispatchFrameSelection(frame: HTMLElement, selection: FrameSelection): void;
/** Listens for frame selections inside `container`; the listener gets the frame that reported. */
export declare function onFrameSelection(container: HTMLElement, listener: (selection: FrameSelection, frame: HTMLElement) => void): () => void;
/** A box in the frame's own viewport, in app viewport coordinates from the frame's current position. */
export declare function frameRectInApp(frame: HTMLElement, rect: FrameRect): DOMRect;
