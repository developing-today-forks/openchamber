import type { ChatMessageEntry } from './types';
/** The text parts of every assistant message of a turn except the last, in order. */
export declare const earlierAssistantText: (assistantMessages: readonly ChatMessageEntry[]) => string[];
