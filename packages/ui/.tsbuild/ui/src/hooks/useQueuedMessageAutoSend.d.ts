import { type MessageQueueTarget, type QueuedMessage } from '@/stores/messageQueueStore';
type SessionStatusType = 'idle' | 'busy' | 'retry';
export type QueuedAutoSendFailure = {
    messageId: string;
    failures: number;
    nextAttemptAt: number;
};
export declare const getQueuedAutoSendRetryDelayMs: (failures: number) => number;
export declare const isQueuedAutoSendBackedOff: (failure: QueuedAutoSendFailure | undefined, messageId: string, now: number) => boolean;
export declare const createQueuedAutoSendRetryScheduler: (onWake: () => void, now?: () => number, scheduleTimeout?: (callback: () => void, delay: number) => ReturnType<typeof setTimeout>, cancelTimeout?: (timer: ReturnType<typeof setTimeout>) => void) => {
    schedule(retryAt: number): void;
    dispose(): void;
};
export declare const buildQueuedAutoSendPayload: (queue: QueuedMessage[]) => {
    queuedMessageId: string;
    historySubmissions: import("@/stores/useInputHistoryStore").InputHistorySubmission[];
    primaryText: string;
    primaryAttachments: import("@/sync/session-ui-store").AttachedFile[];
    agentMentionName: string | undefined;
    additionalParts: import("@/components/chat/composer/submit/buildOutgoingMessage").OutgoingPart[];
    sendConfig: import("@/stores/messageQueueStore").QueuedMessageSendConfig | undefined;
    goal: import("@/stores/messageQueueStore").QueuedMessageGoal | null;
} | null;
type QueuedAutoSendPayload = NonNullable<ReturnType<typeof buildQueuedAutoSendPayload>>;
type ResolvedQueuedSendConfig = {
    providerID: string;
    modelID: string;
    agent?: string;
    variant?: string;
};
export declare const sendQueuedAutoSendPayload: (target: MessageQueueTarget, payload: QueuedAutoSendPayload, resolved: ResolvedQueuedSendConfig) => Promise<void>;
export declare const shouldDispatchQueuedAutoSend: (previousStatusType: SessionStatusType | undefined, currentStatusType: SessionStatusType, hasQueuedItems?: boolean) => boolean;
/**
 * Resolve the live status the queue gate should honor for a session.
 *
 * The server's `/session/status` map only lists busy/retry sessions — idle
 * sessions are absent — so a missing entry means "idle per the snapshot", not
 * "no information". A missed busy event therefore leaves no entry while a turn
 * is still streaming. The trailing in-flight assistant message is the live
 * evidence of that running turn: treat it as busy so the queue never dispatches
 * into it (mirrors `useSessionActivity`'s fallback). The entry becomes idle the
 * moment the message completes or an idle status event lands. This reads the
 * directory child store directly so both the effect-loop gate and the
 * dispatch-time re-check agree.
 */
export declare const resolveQueuedSessionStatusType: (sessionId: string, directory: string) => SessionStatusType;
export declare function useQueuedMessageAutoSend(enabledOrOptions?: boolean | {
    enabled?: boolean;
}): void;
export {};
