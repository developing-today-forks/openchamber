import { z } from 'zod';
export declare const MATCH_START = "\uE000";
export declare const MATCH_END = "\uE001";
export declare const MIN_QUERY_TERM_LENGTH = 3;
declare const hitSchema: z.ZodObject<{
    id: z.ZodString;
    sessionId: z.ZodString;
    role: z.ZodEnum<{
        assistant: "assistant";
        reasoning: "reasoning";
        user: "user";
    }>;
    createdAt: z.ZodNumber;
    sessionTitle: z.ZodString;
    directory: z.ZodString;
    snippet: z.ZodString;
}, z.core.$strip>;
declare const indexSchema: z.ZodNullable<z.ZodObject<{
    backfill: z.ZodObject<{
        state: z.ZodEnum<{
            done: "done";
            idle: "idle";
            running: "running";
        }>;
        total: z.ZodNumber;
        done: z.ZodNumber;
    }, z.core.$strip>;
    sessions: z.ZodNumber;
    messages: z.ZodNumber;
}, z.core.$strip>>;
export type MessageSearchHit = z.infer<typeof hitSchema>;
export type MessageSearchRole = MessageSearchHit['role'];
export type MessageSearchIndexStatus = NonNullable<z.infer<typeof indexSchema>>;
type MessageSearchResult = {
    status: 'ok';
    hits: MessageSearchHit[];
    next: string | null;
    index: MessageSearchIndexStatus | null;
} | {
    status: 'query-too-short';
}
/** This server keeps no index (no SQLite builtin, or a server without the route). */
 | {
    status: 'unavailable';
};
type MessageSearchRequest = {
    query: string;
    sessionId?: string | null;
    directories?: readonly string[];
    role?: MessageSearchRole | null;
    /** False leaves reasoning hits out, e.g. while the reader hides reasoning. */
    includeReasoning?: boolean;
    order?: 'asc' | 'desc';
    before?: string | null;
    limit: number;
    signal?: AbortSignal;
};
/** True when the query has a word the index can look up (3+ characters). */
export declare const isSearchableQuery: (query: string) => boolean;
/**
 * Asks the server. A failed request throws: it is not an empty result, and a
 * caller showing "nothing found" for a network error would be lying.
 */
export declare const searchMessages: (request: MessageSearchRequest) => Promise<MessageSearchResult>;
declare const statusSchema: z.ZodObject<{
    state: z.ZodEnum<{
        failed: "failed";
        off: "off";
        on: "on";
        unsupported: "unsupported";
    }>;
    sizeBytes: z.ZodNumber;
    index: z.ZodNullable<z.ZodObject<{
        backfill: z.ZodObject<{
            state: z.ZodEnum<{
                done: "done";
                idle: "idle";
                running: "running";
            }>;
            total: z.ZodNumber;
            done: z.ZodNumber;
        }, z.core.$strip>;
        sessions: z.ZodNumber;
        messages: z.ZodNumber;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type MessageSearchServerStatus = z.infer<typeof statusSchema>;
/** Whether this server keeps an index right now, how big it is, how far indexing got. */
export declare const readMessageSearchStatus: (signal?: AbortSignal) => Promise<MessageSearchServerStatus>;
/** Deletes the index file; while search is on the server starts a new one at once. */
export declare const deleteMessageSearchIndex: () => Promise<MessageSearchServerStatus>;
type SnippetSegment = {
    text: string;
    match: boolean;
};
/** A snippet as plain-text runs, the matched ones flagged. */
export declare const splitSnippet: (snippet: string) => SnippetSegment[];
export {};
