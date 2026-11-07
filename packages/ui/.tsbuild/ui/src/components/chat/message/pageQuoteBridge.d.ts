/**
 * Where the chat's quote highlights meet the pages the agent showed
 * (`openchamber_render`). A page's text is out of the chat's reach, so the
 * highlight layer (`ChatQuoteHighlightLayer.tsx`) cannot paint, hit-test or
 * scroll to a quote inside one; it hands the work to the page's frame through
 * this module instead:
 *
 * - marks: the layer publishes each page's marks, and the frame of that page
 *   posts them to the page whenever they change and when it loads;
 * - reveal: the layer asks the page's frame to scroll to and flash a quote;
 * - clicks: a frame reports a click on a painted mark (or on no mark), and the
 *   layer opens or closes the mark's popover.
 *
 * A page can be on screen twice (inline and full screen); the frame registered
 * last, the one in front, answers a reveal.
 */
import type { ChatQuoteAnchor } from '@/lib/chatQuoteAnchor';
import type { HtmlRenderMark } from './parts/htmlRender';
export interface PageFrameHandle {
    partId: string;
    /** Scroll to the quote in the page and flash it. */
    reveal: (anchor: ChatQuoteAnchor) => void;
    /** Drop the page's selection and tell the selection menu it is gone. */
    clearSelection: () => void;
}
export declare function registerPageFrame(handle: PageFrameHandle): () => void;
/** True when a frame of that page was there to take it. */
export declare function revealPageMark(partId: string, anchor: ChatQuoteAnchor): boolean;
/** One selection at a time: a selection in one page ends the others'. */
export declare function clearOtherPageSelections(except: PageFrameHandle): void;
/** Who publishes marks: one highlight layer per chat column, each with its own. */
export type PageMarksOwner = symbol;
/** Replace every page's marks that `owner` contributes. */
export declare function setPageMarks(owner: PageMarksOwner, byPart: Map<string, HtmlRenderMark[]>): void;
export declare function getPageMarks(partId: string): HtmlRenderMark[];
export declare function subscribePageMarks(partId: string, listener: () => void): () => void;
export interface PageMarkClick {
    partId: string;
    /** Empty for a click on no mark. */
    markId: string;
    /** The mark's box in the app's viewport, from the frame's current position. */
    measure: () => DOMRect;
    /** Where a popover for the mark must render to stay in front: the open full-screen dialog, if any. */
    portalTarget: HTMLElement | null;
}
export declare function onPageMarkClick(listener: (click: PageMarkClick) => void): () => void;
export declare function emitPageMarkClick(click: PageMarkClick): void;
