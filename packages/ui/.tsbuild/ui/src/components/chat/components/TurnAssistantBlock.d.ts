import React from 'react';
import type { ChatMessageEntry } from '../lib/turns/types';
interface TurnAssistantBlockProps {
    turnId: string;
    assistantMessages: ChatMessageEntry[];
    renderMessage: (message: ChatMessageEntry) => React.ReactNode;
}
declare const _default: React.NamedExoticComponent<TurnAssistantBlockProps>;
export default _default;
