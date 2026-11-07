import type { Message, Part } from '@/lib/opencode/model';
import type { TurnGroupingContext } from '../lib/turns/types';
type MessageRecord = {
    info: Message;
    parts: Part[];
};
export declare const areRenderRelevantPartsEqual: (left: Part[], right: Part[]) => boolean;
export declare const areRenderRelevantMessagesEqual: (left: MessageRecord, right: MessageRecord) => boolean;
export declare const areOptionalRenderRelevantMessagesEqual: (left?: MessageRecord, right?: MessageRecord) => boolean;
export declare const areRelevantTurnGroupingContextsEqual: (left: TurnGroupingContext | undefined, right: TurnGroupingContext | undefined, messageId: string, isUserMessage: boolean) => boolean;
export {};
