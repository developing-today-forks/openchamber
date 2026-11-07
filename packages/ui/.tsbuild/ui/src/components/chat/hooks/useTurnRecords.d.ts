import type { ChatMessageEntry, TurnProjectionResult } from '../lib/turns/types';
interface UseTurnRecordsOptions {
    sessionKey?: string;
    showTurnChangedFiles: boolean;
}
interface TurnRecordsResult {
    projection: TurnProjectionResult;
    staticTurns: TurnProjectionResult['turns'];
    streamingTurn: TurnProjectionResult['turns'][number] | undefined;
}
export declare const useTurnRecords: (messages: ChatMessageEntry[], options: UseTurnRecordsOptions) => TurnRecordsResult;
export {};
