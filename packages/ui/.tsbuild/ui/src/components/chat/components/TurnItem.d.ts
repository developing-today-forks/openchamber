import React from 'react';
import type { ChatMessageEntry, Turn } from '../lib/turns/types';
interface TurnItemProps {
    turn: Turn;
    renderMessage: (message: ChatMessageEntry) => React.ReactNode;
    assistantContent?: React.ReactNode;
    /** Set when this turn's real model differs from the one before it (round-robin, failover, or a manual switch). */
    modelChange?: {
        from: string;
        to: string;
    };
}
declare const _default: React.NamedExoticComponent<TurnItemProps>;
export default _default;
