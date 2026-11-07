import type { AssistantMessage, Message, Part, SyntheticMessage } from '@/lib/opencode/model';
import { z } from 'zod';
type MessageRecord = {
    info: Message;
    parts: Part[];
};
type TitleTurn = {
    user: MessageRecord;
    /** Context items OpenChamber attached ahead of this prompt. */
    context: SyntheticMessage[];
    assistant: {
        info: AssistantMessage;
        parts: Part[];
    };
};
/**
 * Input is chronological. v2 messages carry no parent id, so a turn is a user
 * message plus the last assistant message before the next user message; the
 * synthetic messages that precede a prompt are its attached context.
 */
export declare function collectSessionTitleTurns(records: readonly MessageRecord[], revertMessageID?: string): TitleTurn[];
export declare function formatSessionTitleContext(turns: readonly TitleTurn[]): string;
export declare const generatedSessionTitleSchema: z.ZodPipe<z.ZodObject<{
    text: z.ZodString;
}, z.core.$strip>, z.ZodTransform<string, {
    text: string;
}>>;
export declare function generateSessionTitle(input: {
    turns: readonly TitleTurn[];
    currentTitle: string;
    directory: string;
    signal: AbortSignal;
}): Promise<string>;
export {};
