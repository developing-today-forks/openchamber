import React from 'react';
import type { ChatMessageEntry } from '../lib/turns/types';
import type { MessageListHandle } from '../MessageList';
import { type TurnWindowModel } from '../lib/turns/windowTurns';
import type { TurnHistorySignals } from '../lib/turns/historySignals';
import { type SessionHistoryMeta } from '@/stores/types/sessionTypes';
type ViewportAnchor = {
    messageId: string;
    offsetTop: number;
};
interface UseChatTimelineControllerOptions {
    sessionId: string | null;
    sessionKey: string | null;
    messages: ChatMessageEntry[];
    historyMeta: SessionHistoryMeta | null;
    scrollRef: React.RefObject<HTMLDivElement | null>;
    messageListRef: React.RefObject<MessageListHandle | null>;
    loadMoreMessages: (sessionId: string, direction: 'up' | 'down') => Promise<void>;
    goToBottom: (mode?: 'instant' | 'smooth') => void;
    releaseAutoFollow: () => void;
    isPinned: boolean;
    showScrollButton: boolean;
}
export interface UseChatTimelineControllerResult {
    turnIds: string[];
    turnStart: number;
    renderedMessages: ChatMessageEntry[];
    historySignals: TurnHistorySignals;
    isLoadingOlder: boolean;
    pendingRevealWork: boolean;
    activeTurnId: string | null;
    showScrollToBottom: boolean;
    turnWindowModel: TurnWindowModel;
    loadEarlier: (options?: {
        userInitiated?: boolean;
    }) => Promise<void>;
    loadHistoryUntilMessage: (messageId: string, options: {
        maxBatches: number;
    }) => Promise<boolean>;
    revealBufferedTurns: () => Promise<boolean>;
    resumeToBottom: () => void;
    resumeToBottomInstant: () => Promise<void>;
    scrollToTurn: (turnId: string, options?: {
        behavior?: ScrollBehavior;
    }) => Promise<boolean>;
    scrollToMessage: (messageId: string, options?: {
        behavior?: ScrollBehavior;
    }) => Promise<boolean>;
    handleHistoryScroll: () => void;
    captureViewportAnchor: () => ViewportAnchor | null;
    restoreViewportAnchor: (anchor: ViewportAnchor) => boolean;
    handleActiveTurnChange: (turnId: string | null) => void;
}
export declare const isOlderHistoryPrependCommit: (input: {
    previousOldestId: string | null;
    previousNewestId: string | null;
    currentOldestId: string | null;
    currentNewestId: string | null;
}) => boolean;
export declare const useChatTimelineController: ({ sessionId, sessionKey, messages, historyMeta, scrollRef, messageListRef, loadMoreMessages, goToBottom, releaseAutoFollow, isPinned, showScrollButton, }: UseChatTimelineControllerOptions) => UseChatTimelineControllerResult;
export {};
