/**
 * The chat column's registry of chat-quote marks: the quotes waiting in the
 * composer's context chips, published there and read by
 * `message/ChatQuoteHighlightLayer.tsx`, which paints and hit-tests them. The
 * store lives outside React state so publishing, chip hover and popover
 * activity never re-render the chat column itself.
 */
import React from 'react';
import type { ChatQuoteAnchor } from '@/lib/chatQuoteAnchor';
export type ChatQuoteMark = {
    id: string;
    messageId: string;
    anchor: ChatQuoteAnchor;
    comment: string;
    updateComment: (text: string) => void;
    remove: () => void;
};
export interface ChatQuoteHighlightApi {
    /** Replace the marks one publisher (a composer's chips) contributes. */
    publishMarks: (publisher: string, marks: ChatQuoteMark[]) => void;
    /** Draw one mark stronger, or none. */
    focusMark: (markId: string | null) => void;
    /** Scroll to the quoted fragment and flash it. */
    reveal: (messageId: string, anchor: ChatQuoteAnchor) => void;
}
type Listener = () => void;
/** The column's mark registry; stable for the column's lifetime. */
export interface ChatQuoteHighlightStore extends ChatQuoteHighlightApi {
    subscribe: (listener: Listener) => () => void;
    getMarks: () => ChatQuoteMark[];
    getChipFocus: () => string | null;
    /** The layer that can scroll and flash registers here. */
    setRevealHandler: (handler: ChatQuoteHighlightApi['reveal'] | null) => void;
}
export declare function useChatQuoteHighlightStore(): ChatQuoteHighlightStore;
export declare const ChatQuoteHighlightContext: React.Context<ChatQuoteHighlightApi | null>;
export declare const useChatQuoteHighlightApi: () => ChatQuoteHighlightApi | null;
export {};
