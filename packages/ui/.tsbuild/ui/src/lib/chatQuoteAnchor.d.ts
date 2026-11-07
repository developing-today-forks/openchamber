/**
 * Anchors a chat quote to the rendered text of the message it came from, so
 * the quoted fragment can be found again after the message re-renders, scrolls
 * out of the virtualized list and back, or the page reloads.
 *
 * Offsets count characters of the root's text stream: the concatenated data of
 * every descendant Text node in document order (what `textContent` and
 * `Range.toString()` both produce). An offset alone is not trusted; the quote
 * is re-found by its text, disambiguated by the characters around it.
 */
import { z } from 'zod';
export type ChatQuoteAnchor = {
    /** The quoted fragment exactly as it appears in the text stream. */
    text: string;
    /** Up to CONTEXT_LENGTH characters before and after the fragment. */
    prefix: string;
    suffix: string;
    /** Stream offset at capture time; a tie-breaker, not a position. */
    start: number;
    /**
     * Set when the text lives in a page the agent showed (`openchamber_render`)
     * instead of the message's own text: the stream is then that page's body,
     * measured and re-found inside its frame. Anchors without it are unchanged.
     */
    page?: {
        partId: string;
    };
};
export declare const chatQuoteAnchorSchema: z.ZodObject<{
    text: z.ZodString;
    prefix: z.ZodString;
    suffix: z.ZodString;
    start: z.ZodNumber;
    page: z.ZodOptional<z.ZodObject<{
        partId: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
export declare function findChatQuoteRoot(scope: ParentNode, messageId: string): Element | null;
export declare function captureChatQuoteAnchor(root: Element, range: Range): ChatQuoteAnchor | null;
/**
 * Where the anchor's text sits in `stream`, or null when it is gone or cannot
 * be told apart from other copies of the same text.
 */
export declare function locateChatQuote(stream: string, anchor: ChatQuoteAnchor): number | null;
/** A live Range over the anchored fragment in `root`, or null when not found. */
export declare function resolveChatQuoteAnchor(root: Element, anchor: ChatQuoteAnchor): Range | null;
/** Anchor for a quote sent before anchors existed: its text, found only if unique. */
export declare function legacyChatQuoteAnchor(quote: string): ChatQuoteAnchor;
