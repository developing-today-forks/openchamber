import React from 'react';
import { type MessageQueueTarget, type QueuedMessage } from '@/stores/messageQueueStore';
interface QueuedMessagesStripProps {
    target: MessageQueueTarget | null;
    /** The message was taken from the queue in full; the composer restores it. */
    onEditMessage: (message: QueuedMessage) => void;
    onSendMessage: (messageId: string) => void;
}
/**
 * Messages waiting for the running turn, as a top row of the composer next to
 * the background commands. One message is its own row; several collapse into
 * a count that expands in place into a reorderable list.
 */
export declare const QueuedMessagesStrip: React.MemoExoticComponent<({ target, onEditMessage, onSendMessage }: QueuedMessagesStripProps) => import("react/jsx-runtime").JSX.Element | null>;
export {};
