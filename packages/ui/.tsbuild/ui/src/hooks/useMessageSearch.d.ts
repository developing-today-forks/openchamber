import { type MessageSearchHit, type MessageSearchIndexStatus, type MessageSearchRole } from '@/lib/messageSearch';
type MessageSearchState = {
    status: 'idle';
} | {
    status: 'too-short';
} | {
    status: 'unavailable';
} | {
    status: 'loading';
    hits: MessageSearchHit[];
} | {
    status: 'ready';
    hits: MessageSearchHit[];
    next: string | null;
    index: MessageSearchIndexStatus | null;
    loadingMore: boolean;
} | {
    status: 'error';
    hits: MessageSearchHit[];
};
type MessageSearchOptions = {
    query: string;
    enabled: boolean;
    limit: number;
    sessionId?: string | null;
    directories?: readonly string[];
    role?: MessageSearchRole | null;
    includeReasoning?: boolean;
    order?: 'asc' | 'desc';
};
/**
 * One search at a time: a new query or filter aborts the request in flight,
 * and an answer to anything but the current request is dropped. The hits of
 * the previous query stay visible while the next one loads, so the list does
 * not flash empty between keystrokes.
 */
export declare const useMessageSearch: ({ query, enabled, limit, sessionId, directories, role, includeReasoning, order }: MessageSearchOptions) => {
    state: MessageSearchState;
    loadMore: () => void;
};
export {};
