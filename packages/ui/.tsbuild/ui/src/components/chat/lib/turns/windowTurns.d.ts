import type { ChatMessageEntry } from './types';
export interface TurnWindowModel {
    turnIds: string[];
    turnMessageStartIndexes: number[];
    turnIndexById: Map<string, number>;
    messageToTurnId: Map<string, string>;
    messageToTurnIndex: Map<string, number>;
    turnCount: number;
}
export declare const updateTurnWindowModelIncremental: (previousModel: TurnWindowModel | null, previousMessages: ChatMessageEntry[] | null, nextMessages: ChatMessageEntry[]) => TurnWindowModel | null;
export declare const buildTurnWindowModel: (messages: ChatMessageEntry[]) => TurnWindowModel;
