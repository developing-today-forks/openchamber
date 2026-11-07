import React from 'react';
import { type Message, type Part } from '@/lib/opencode/model';
import type { StreamPhase } from './message/types';
import type { TurnGroupingContext } from './lib/turns/types';
import type { ReviewTransferDirection } from '@/lib/reviewFlow';
interface ChatMessageProps {
    message: {
        info: Message;
        parts: Part[];
    };
    nextMessage?: {
        info: Message;
        parts: Part[];
    };
    scrollToBottom?: () => void;
    turnGroupingContext?: TurnGroupingContext;
    assistantHeaderMessageId?: string;
    isInActiveTurn?: boolean;
    activeStreamingPhase?: StreamPhase | null;
    animateUserOnMount?: boolean;
    onUserAnimationConsumed?: (messageId: string) => void;
    reviewTransferDirection?: ReviewTransferDirection | null;
}
declare const _default: React.NamedExoticComponent<ChatMessageProps>;
export default _default;
