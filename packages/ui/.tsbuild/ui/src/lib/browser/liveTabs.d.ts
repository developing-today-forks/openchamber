/**
 * How many of the user's browser tabs keep their page loaded, across every
 * project. Each loaded tab is a Chromium process of its own, so the rest sleep:
 * the tab and its address stay, and the page loads again when shown.
 * Agent tabs are outside this count; they stay loaded for the session working them.
 */
export declare const LIVE_BROWSER_TABS_DEFAULT = 5;
export declare const LIVE_BROWSER_TABS_MIN = 1;
export declare const LIVE_BROWSER_TABS_MAX = 20;
export declare const clampLiveBrowserTabs: (value: number) => number;
/** Tab keys by last use, newest first, each key once. */
export declare const touchRecentBrowserTab: (recent: readonly string[], key: string) => readonly string[];
/** The user's tabs that keep their page: the `limit` most recently used of those still open. */
export declare const pickLiveBrowserTabs: (recent: readonly string[], openUserTabs: ReadonlySet<string>, limit: number) => ReadonlySet<string>;
