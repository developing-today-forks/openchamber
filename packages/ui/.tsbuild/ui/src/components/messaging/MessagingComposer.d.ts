import React from 'react';
import type { MessagingWriteOutcome } from '@/stores/useMessagingStore';
/**
 * The field that writes a message: Enter sends, Shift+Enter starts a new line
 * (on a phone Return starts a line and the button sends), like the chat
 * composer. The text clears once OpenCode stored the message. When a topic's
 * write limit refuses it, the line under the field says why and offers to
 * send it anyway; limits are soft, so that always works.
 */
export declare const MessagingComposer: React.FC<{
    placeholder: string;
    onSend: (text: string, force: boolean) => Promise<MessagingWriteOutcome>;
    /** Controls before the send button, such as a delivery choice. */
    extraActions?: React.ReactNode;
    autoFocus?: boolean;
}>;
