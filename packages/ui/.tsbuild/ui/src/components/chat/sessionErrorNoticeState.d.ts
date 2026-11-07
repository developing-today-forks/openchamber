import type { Message, StructuredError } from '@/lib/opencode/model';
export type LastMessageState = {
    role: Message['role'];
    timestamp: number;
    hasError: boolean;
} | null;
/**
 * A store message as SessionErrorNotice reads it.
 *
 * Only an assistant message finishes a turn, so only its `time.completed`
 * counts. Every other role — a prompt, or any of v2's plumbing records — is
 * timed by its creation. Reading a non-assistant record's time as a completion
 * made every fresh send look unanswered since the epoch and flashed the
 * no-reply notice whenever the server acknowledged slower than a frame.
 */
export declare const readLastMessageState: (last: Message | null | undefined) => LastMessageState;
/**
 * The error OpenCode recorded for the session's last turn (2.0.27+): the
 * newest `idle` record after the last prompt or reply decides, and only a
 * `failed` one carries an error. Older OpenCode records the outcome alone.
 */
export declare const findRecordedTurnError: (messages: readonly Message[] | undefined) => StructuredError | null;
type RecheckScheduler = {
    setTimeout: (callback: () => void, ms: number) => number;
    clearTimeout: (handle: number) => void;
};
/**
 * Runs `refetch` once per offset in `delays` until cancelled, and calls
 * `onSettled` after each read finishes, whether it succeeded or failed. A read
 * that settles after cancellation reports nothing, so a read started for an
 * old prompt or session cannot affect the current one.
 */
export declare const scheduleUnansweredRechecks: (refetch: () => Promise<void>, scheduler: RecheckScheduler, onSettled?: () => void, delays?: readonly number[]) => (() => void);
export {};
