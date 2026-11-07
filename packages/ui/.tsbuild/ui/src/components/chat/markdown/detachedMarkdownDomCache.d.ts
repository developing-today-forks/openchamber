export type DetachedMarkdownDomKey = {
    scope: string;
    id: string;
    locale: string;
    directory: string;
};
export type DetachedMarkdownDom = DetachedMarkdownDomKey & {
    fragment: DocumentFragment;
};
export type DetachedMarkdownDomCacheStats = {
    sessions: number;
    entries: number;
};
type DetachedMarkdownDomCacheLimits = {
    maxSessions: number;
    maxEntriesPerSession: number;
};
export declare class DetachedMarkdownDomCache {
    private readonly maxSessions;
    private readonly maxEntriesPerSession;
    private readonly sessions;
    constructor(limits?: DetachedMarkdownDomCacheLimits);
    store(entry: DetachedMarkdownDom): void;
    take(key: DetachedMarkdownDomKey): DocumentFragment | null;
    clear(): void;
    stats(): DetachedMarkdownDomCacheStats;
    private refreshSession;
    private removeOldestEntry;
    private removeOldestSession;
}
export declare const detachedMarkdownDomCache: DetachedMarkdownDomCache;
export {};
