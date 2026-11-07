import React from 'react';
import { type LegendListRef } from '@legendapp/list/react';
import type { ChatMessageEntry } from './lib/turns/types';
import type { StreamPhase } from './message/types';
import { type MessageViewportAnchor, type ViewportAnchorAlignment } from './lib/scroll/messageViewportAnchor';
type TimelineScrollContainerProps = {
    className?: string;
    style?: React.CSSProperties;
    tabIndex?: number;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    'data-scrollbar'?: string;
    'data-scroll-shadow'?: string;
};
interface MessageListProps {
    sessionKey: string;
    messages: ChatMessageEntry[];
    sessionIsWorking?: boolean;
    activeStreamingMessageId?: string | null;
    activeStreamingPhase?: StreamPhase | null;
    retryOverlay?: {
        sessionId: string;
        message: string;
        confirmedAt?: number;
        fallbackTimestamp?: number;
    } | null;
    isLoadingOlder: boolean;
    scrollToBottom?: () => void;
    directory?: string;
    registerList?: (list: LegendListRef | null) => void;
    endPinningReleased?: boolean;
    composerOverlayHeight?: number;
    onIsAtEndChange?: (isAtEnd: boolean) => void;
    onListMetricsChange?: (metrics: {
        readonly footerSize: number;
    }) => void;
    onTimelineDataChange?: () => void;
    listHeader?: React.ReactNode;
    listFooter?: React.ReactNode;
    scrollContainerProps?: TimelineScrollContainerProps;
}
export interface MessageListHandle {
    scrollToTurnId: (turnId: string, options?: {
        behavior?: ScrollBehavior;
    }) => boolean;
    scrollToMessageId: (messageId: string, options?: {
        behavior?: ScrollBehavior;
    }) => boolean;
    captureViewportAnchor: () => MessageViewportAnchor | null;
    restoreViewportAnchor: (anchor: MessageViewportAnchor) => boolean;
    alignViewportAnchor: (anchor: MessageViewportAnchor) => ViewportAnchorAlignment;
    holdViewportAnchor: (anchor: {
        messageId: string;
        offsetTop: number;
    }) => void;
    isHistoryVirtualized: () => boolean;
    scrollToBottom: () => void;
}
declare const _default: React.NamedExoticComponent<MessageListProps & React.RefAttributes<MessageListHandle>>;
export default _default;
