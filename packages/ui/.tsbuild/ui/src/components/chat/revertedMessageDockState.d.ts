import type { Part, SyntheticMessage, UserMessage } from '@/lib/opencode/model';
import type { State } from '@/sync/types';
type RevertedMessageRecord = {
    /** A prompt, or a background subagent run report (it stands where a prompt would). */
    message: UserMessage | SyntheticMessage;
    parts: Part[];
};
export type RevertedMessageDockState = {
    revertMessageID?: string;
    records: RevertedMessageRecord[];
};
export declare const EMPTY_REVERTED_MESSAGE_DOCK_STATE: RevertedMessageDockState;
export declare const buildRevertedMessageDockState: (state: Pick<State, 'session' | 'message' | 'part'>, sessionId: string | null, previous?: RevertedMessageDockState) => RevertedMessageDockState;
export {};
