import type { Message, Part } from "@/lib/opencode/model";
export type OptimisticItem = {
    message: Message;
    parts: Part[];
};
export type MessagePage = {
    session: Message[];
    part: {
        id: string;
        part: Part[];
    }[];
    cursor?: string;
    complete: boolean;
};
export declare function mergeOptimisticPage(page: MessagePage, items: OptimisticItem[]): {
    session: Message[];
    part: {
        id: string;
        part: Part[];
    }[];
    cursor?: string;
    complete: boolean;
    confirmed: string[];
};
/** Merge two chronologically sorted message arrays by identity, deduplicating.
 *  Preserves existing references for items that already exist — avoids
 *  unnecessary React re-renders when prepending older history. */
export declare function mergeMessages<T extends Message>(existingMessages: readonly T[], incomingMessages: readonly T[]): T[];
