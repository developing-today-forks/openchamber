import type { Message } from '@/lib/opencode/model';
export declare const MAX_SEEN_MESSAGE_IDS = 2000;
export declare const FRESHNESS_WINDOW_MS = 5000;
export declare class MessageFreshnessDetector {
    private static instance;
    private sessionStartTimes;
    private seenMessageIds;
    private constructor();
    static getInstance(): MessageFreshnessDetector;
    recordSessionStart(sessionId: string): void;
    getSessionStartTime(sessionId: string): number | undefined;
    private recordSeenMessage;
    shouldAnimateMessage(message: Message, sessionId: string): boolean;
    clearSession(sessionId: string): void;
    hasSessionTiming(sessionId: string): boolean;
    hasBeenAnimated(messageId: string): boolean;
    markMessageAsAnimated(messageId: string): void;
    clearAll(): void;
    getDebugInfo(): {
        sessionStartTimes: Map<string, number>;
        seenMessageIds: Set<string>;
    };
}
