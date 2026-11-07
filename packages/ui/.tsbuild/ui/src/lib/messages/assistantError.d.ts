/**
 * What a turn's recorded error says in the transcript.
 *
 * Pressing Stop is not a send failure: OpenCode records the interruption on the
 * assistant message as an error, and the chat used to print that error through
 * the generic "failed to send message" branch. This module names the shapes
 * that mean "the user stopped this", so the transcript can say so, and it owns
 * every other reading of that error so the sentence a person sees is decided
 * in one place.
 */
import type { Message } from '@/lib/opencode/model';
export declare const STOPPED_TURN_MESSAGE = "The running turn was stopped before OpenCode could send the next message.";
export declare const isStoppedTurnError: (name: string | undefined, detail: string) => boolean;
type AssistantErrorNotice = {
    text: string;
};
/**
 * The sentence the transcript prints for a message's recorded error, or null
 * when the message carries none worth showing.
 */
export declare const assistantErrorNotice: (info: Message) => AssistantErrorNotice | null;
export {};
