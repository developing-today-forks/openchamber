/**
 * Highlights for chat quotes inside the transcript, painted with the CSS
 * Custom Highlight API so the rendered markdown is never touched.
 *
 * - Marks: every quote waiting in the composer's context chips stays softly
 *   highlighted in its message, so the reader sees where they left off. The
 *   mark the user hovers in the chip preview is drawn stronger.
 * - Reveal: clicking a quote (a chip entry, or a sent quote card) scrolls to
 *   its message and briefly flashes the fragment.
 * - Popover: hovering a mark (desktop) or tapping it (touch) opens its
 *   comment with edit and remove, acting on the draft through the publisher.
 *
 * The column owns a store (`hooks/chatQuoteHighlightStore.ts`) that publishers
 * write to, and renders `ChatQuoteHighlightLayer`, which subscribes to it and holds
 * all hover, popover and scroll-follow state. Highlight activity therefore
 * re-renders only the layer, never the chat column.
 *
 * Ranges are re-resolved from their anchors whenever a marked message
 * re-renders or remounts in the virtualized list. Runtimes without
 * `CSS.highlights` get the scroll without the highlight.
 *
 * A quote taken inside a page the agent showed (`openchamber_render`) has a
 * `page` in its anchor and lives in the page's frame, out of reach here. Its
 * marks, reveal and clicks go through `pageQuoteBridge.ts` to the frame, which
 * paints, scrolls and hit-tests in the page. Its popover opens on click only:
 * the pointer over a frame is invisible to the app.
 */
import React from 'react';
import type { ChatQuoteHighlightStore } from '../hooks/chatQuoteHighlightStore';
interface ChatQuoteHighlightLayerProps {
    store: ChatQuoteHighlightStore;
    scrollNode: HTMLElement | null;
    scrollToMessage: (messageId: string, options?: {
        behavior?: ScrollBehavior;
    }) => Promise<boolean>;
}
export declare const ChatQuoteHighlightLayer: React.MemoExoticComponent<({ store, scrollNode, scrollToMessage, }: ChatQuoteHighlightLayerProps) => import("react/jsx-runtime").JSX.Element | null>;
export {};
