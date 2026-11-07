import type { ChatMessageEntry } from './types';
interface RetryOverlayInput {
    sessionId: string | null;
    message: string;
    confirmedAt?: number;
    fallbackTimestamp: number;
}
export declare const applyRetryOverlay: (messages: ChatMessageEntry[], input: RetryOverlayInput) => ChatMessageEntry[];
export {};
