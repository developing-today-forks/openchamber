import type { Message, Part } from "@/lib/opencode/model";
import type { State } from './types';
type UserMessageHistoryRecord = {
    message: Message;
    parts: Part[];
};
/** One prompt the user sent in a session, as the visible transcript shows it. */
export type TranscriptPrompt = {
    text: string;
    /** `message.time.created`, milliseconds. */
    createdAt: number;
};
export type UserMessageHistorySnapshot = {
    sessionID: string;
    revertMessageID?: string;
    records: UserMessageHistoryRecord[];
    /** Oldest first. */
    history: TranscriptPrompt[];
};
export declare const EMPTY_USER_MESSAGE_HISTORY_SNAPSHOT: UserMessageHistorySnapshot;
/**
 * The user's prompts in a session, oldest first, limited to what the visible
 * transcript shows: messages at or after a revert marker are excluded. Returns
 * the previous snapshot when nothing relevant changed so subscribers can skip
 * work on assistant-only updates.
 */
export declare const buildUserMessageHistorySnapshot: (state: Pick<State, 'session' | 'message' | 'part'>, sessionID: string, previous?: UserMessageHistorySnapshot) => UserMessageHistorySnapshot;
export {};
