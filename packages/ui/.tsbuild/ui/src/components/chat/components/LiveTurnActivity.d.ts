import React from 'react';
import type { ChatMessageEntry, TurnRecord } from '../lib/turns/types';
interface LiveTurnActivityProps {
    turn: TurnRecord;
    hasLaterAssistant: boolean;
    expanded: boolean;
    onToggle: () => void;
    renderMessage: (message: ChatMessageEntry) => React.ReactNode;
}
export declare function LiveTurnActivity({ turn, hasLaterAssistant, expanded, onToggle, renderMessage }: LiveTurnActivityProps): import("react/jsx-runtime").JSX.Element;
export {};
