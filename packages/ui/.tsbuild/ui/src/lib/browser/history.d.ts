export type BrowserHistoryEntry = {
    readonly url: string;
    readonly title: string;
    readonly lastVisitedAt: number;
};
/** Enough to cover a project's real addresses without becoming a list nobody reads. */
export declare const MAX_HISTORY_ENTRIES = 50;
/**
 * The stored form of an address.
 *
 * Returns '' for anything that is not a page worth remembering. `about:blank`
 * is the view's resting state, and a data URL is a document with no address to
 * return to.
 */
export declare const historyUrl: (value: string) => string;
/**
 * Records a visit, newest first.
 *
 * Revisiting an address moves it up rather than adding a second copy — the list
 * is places, not events. A visit with no title keeps the title already known,
 * because a page often reports its address before it reports its name.
 */
export declare const recordVisit: (entries: readonly BrowserHistoryEntry[], visit: {
    url: string;
    title?: string;
    at: number;
}) => BrowserHistoryEntry[];
export declare const forgetVisit: (entries: readonly BrowserHistoryEntry[], url: string) => BrowserHistoryEntry[];
/**
 * Suggests addresses for what has been typed so far.
 *
 * An empty query offers the most recent addresses, which is what an empty
 * address bar is asking for. A query matches anywhere in the address or title,
 * since a port or a path fragment is often all anyone remembers.
 */
export declare const suggestFromHistory: (entries: readonly BrowserHistoryEntry[], query: string, limit?: number) => BrowserHistoryEntry[];
