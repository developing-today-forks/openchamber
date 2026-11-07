import type { Message, Part } from '@/lib/opencode/model';
export declare const isHiddenUserMessage: (entry: {
    info: Message;
    parts: Part[];
} | null | undefined) => boolean;
