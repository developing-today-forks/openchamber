import type { Message, Part } from "@/lib/opencode/model";
type MessageRecord = {
    info: Message;
    parts: Part[];
};
/**
 * A persisted running form tool without a matching pending-request record
 * is the cold-start recovery signal. Only inspect the current turn so an old,
 * stale tool cannot trigger network work after the user has continued chatting.
 */
export declare function hasActiveFormToolInCurrentTurn(messages: readonly MessageRecord[]): boolean;
export declare function recoverPendingFormWithRetry(recover: () => Promise<boolean>, options?: {
    isCancelled?: () => boolean;
    sleep?: (delayMs: number) => Promise<void>;
}): Promise<boolean>;
export {};
