import React from 'react';
import type { ChatMessageEntry } from '../lib/turns/types';
interface TurnMessageWindowProps {
    turnId: string;
    messages: ChatMessageEntry[];
    renderMessage: (message: ChatMessageEntry) => React.ReactNode;
}
/**
 * A turn's assistant messages, with the rows of a long turn outside its
 * window held behind spacers until they come near the viewport (see
 * turnMessageWindow). Mounting a batch above the reader keeps the message
 * they were looking at still.
 */
export declare function TurnMessageWindow({ turnId, messages, renderMessage }: TurnMessageWindowProps): import("react/jsx-runtime").JSX.Element;
export {};
