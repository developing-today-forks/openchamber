import React from 'react';
import { type MessageViewportAnchor, type ViewportAnchorAlignment } from '@/components/chat/lib/scroll/messageViewportAnchor';
import type { TimelineRevealGate } from '@/components/chat/timelineRevealGate';
import { type TimelineListMeasurementState } from '@/components/chat/lib/scroll/timelineScrollAnchoring';
export interface TimelineListHandle {
    getState: () => TimelineListMeasurementState & {
        readonly scroll: number;
        readonly contentLength?: number;
        readonly listen?: (listenerType: 'totalSize', callback: (value: number) => void) => () => void;
    };
    getScrollableNode: () => HTMLElement | null;
    scrollToEnd: (options?: {
        animated?: boolean;
    }) => unknown;
    scrollToOffset: (params: {
        offset: number;
        animated?: boolean;
    }) => unknown;
    scrollToIndex: (params: {
        index: number;
        animated?: boolean;
        viewPosition?: number;
        viewOffset?: number;
    }) => unknown;
}
export type LinkedMessageState = 'exists' | 'missing' | 'unknown';
interface TimelineAnchorHandle {
    alignViewportAnchor: (anchor: MessageViewportAnchor) => ViewportAnchorAlignment;
}
interface UseChatTimelineScrollOptions {
    currentSessionId: string | null;
    currentSessionKey: string | null;
    composerOverlayHeight: number;
    messageListRef: React.RefObject<TimelineAnchorHandle | null>;
    loadHistoryUntilMessage?: (messageId: string, maxBatches: number) => Promise<boolean>;
    checkLinkedMessage?: (messageId: string) => Promise<LinkedMessageState>;
    onLinkedMessageMissing?: () => void;
    sessionIsWorking: boolean;
    revealGate?: TimelineRevealGate | null;
    onActiveTurnChange?: (turnId: string | null) => void;
}
interface UseChatTimelineScrollResult {
    scrollRef: React.RefObject<HTMLDivElement | null>;
    scrollNode: HTMLDivElement | null;
    isPinned: boolean;
    registerList: (list: TimelineListHandle | null) => void;
    onIsAtEndChange: (isAtEnd: boolean) => void;
    onListMetricsChange: (metrics: {
        readonly footerSize: number;
    }) => void;
    onManualNavigation: () => void;
    onTimelineDataChange: () => void;
    showScrollButton: boolean;
    /** A real gesture took the scroll; flips back on any explicit opt-in. */
    userOwnsScroll: boolean;
    /**
     * The viewport sits within the re-arm band of the content end, measured
     * from the scroll position on every scroll event rather than from the
     * list's at-end transitions (which follow logic may swallow). For
     * chrome that mirrors the reader's actual position, like the recap hint.
     * False while the scroll-to-bottom pill is offered: the measurement
     * runs only on scroll, so growth below a reader the follow stopped for
     * (the turn footer arriving) left it true under the pill.
     */
    viewportAtEnd: boolean;
    /**
     * The viewport is within LOAD_OLDER_REACH_VIEWPORTS of the content's
     * start, where the "Load older" button above the rows is in reach.
     */
    nearContentStart: boolean;
    isFollowingProgrammatically: boolean;
    goToBottom: (mode?: 'instant' | 'smooth') => void;
    scrollToBottomOnSend: () => void;
    restoreSnapshot: () => Promise<boolean>;
}
export declare const useChatTimelineScroll: ({ currentSessionId, currentSessionKey, composerOverlayHeight, messageListRef, loadHistoryUntilMessage, checkLinkedMessage, onLinkedMessageMissing, sessionIsWorking, revealGate, onActiveTurnChange, }: UseChatTimelineScrollOptions) => UseChatTimelineScrollResult;
export {};
