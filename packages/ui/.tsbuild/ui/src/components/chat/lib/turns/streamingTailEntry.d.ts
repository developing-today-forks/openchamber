import type { Part } from '@/lib/opencode/model';
import type { ChatMessageEntry, TurnRecord } from './types';
export type StreamingTailEntry = {
    kind: 'ungrouped';
    key: string;
    message: ChatMessageEntry;
    nextMessage?: ChatMessageEntry;
} | {
    kind: 'turn';
    key: string;
    turn: TurnRecord;
    isLastTurn: boolean;
};
type BuildLiveStreamingEntryOptions = {
    livePartsByMessageId: Readonly<Record<string, Part[]>>;
    showTurnChangedFiles: boolean;
    mergeHiddenUserTurns?: boolean;
};
export declare const buildLiveStreamingEntry: <TEntry extends StreamingTailEntry>(entry: TEntry, options: BuildLiveStreamingEntryOptions) => TEntry;
export {};
