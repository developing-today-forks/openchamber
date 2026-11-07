import type { MessageHistoryValue } from './composer/state/useMessageHistory';
import type { InputHistoryScope } from '@/lib/inputHistoryScope';
import { type InputHistoryEntry, type InputHistoryIdentity, type InputHistorySubmission } from '@/stores/useInputHistoryStore';
import type { AttachedFile } from '@/stores/types/sessionTypes';
import type { TranscriptPrompt } from '@/sync/user-message-history';
type HistoryQueuedMessage = {
    content: string;
    attachments?: readonly AttachedFile[];
};
type BuildHistorySubmissionsArgs = {
    inputMode: 'normal' | 'shell';
    queuedMessages: readonly HistoryQueuedMessage[];
    composerText: string;
    composerAttachments: readonly AttachedFile[];
    includeComposer: boolean;
};
export declare function buildChatInputHistorySubmissions({ inputMode, queuedMessages, composerText, composerAttachments, includeComposer, }: BuildHistorySubmissionsArgs): InputHistorySubmission[] | undefined;
export declare function mapInputHistoryEntriesToValues(entries: readonly InputHistoryEntry[]): Array<MessageHistoryValue<AttachedFile>>;
/**
 * Session-scoped recall: the visible transcript's prompts (so sessions older
 * than the persisted store still recall) merged with the persisted bucket
 * (attachments, and prompts a revert hid from the transcript), oldest first.
 * A prompt present in both collapses to the persisted entry.
 */
export declare function mergeSessionInputHistory(transcript: readonly TranscriptPrompt[], entries: readonly InputHistoryEntry[]): Array<MessageHistoryValue<AttachedFile>>;
export declare function buildInputHistoryNavigatorIdentity(scope: InputHistoryScope, identity: InputHistoryIdentity | null): string;
export {};
