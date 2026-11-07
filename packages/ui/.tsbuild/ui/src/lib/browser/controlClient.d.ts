import { type BrowserControlRequestContext } from '@/lib/openchamberEvents';
/** Where a tab belongs; fixed for the tab's lifetime. */
type BrowserTabOwnership = {
    /** The project the tab is in, keyed as the context panel keys it. */
    readonly directory: string;
    /** The session whose agent opened the tab; null for a tab the user opened. */
    readonly ownerSessionId: string | null;
};
/** Implemented by the mounted browser pane. */
type BrowserController = BrowserTabOwnership & {
    /** The browser tab this view belongs to; the id agents pass as `tabId`. */
    readonly tabId: string;
    /** What the tab shows now, for the tab list in snapshots. */
    readonly describe: () => {
        title: string;
        url: string;
    };
    /** Runs one action and resolves with its JSON-serializable result. */
    readonly run: (action: string, parameters: Record<string, unknown>) => Promise<unknown>;
};
/** A browser tab whose page has not been loaded, registered by the panel. */
type SleepingBrowserTab = BrowserTabOwnership & {
    readonly tabId: string;
    /** What the tab showed when it was last loaded, from its saved state. */
    readonly describe: () => {
        title: string;
        url: string;
    };
    /** Loads the tab; its view then registers itself as a controller. */
    readonly wake: () => void;
};
/**
 * Opens a URL in a new background tab for the calling session, in that
 * session's project, and returns the tab's id, or null when this client has
 * nowhere to open one.
 */
type BrowserOpener = (url: string, context: BrowserControlRequestContext) => string | null;
/**
 * Closes a browser tab in the panel. Registered by the panel, because closing
 * is panel state: no page view can remove its own tab. Returns whether a tab
 * was actually closed.
 */
type BrowserCloser = (directory: string, tabId: string) => boolean;
/**
 * Registers a tab's mounted browser view under its tab id. Unregistering only
 * removes the entry when it still points at the caller, so a stale unmount
 * cannot detach the same tab's newer view.
 */
export declare const registerBrowserController: (controller: BrowserController) => (() => void);
/**
 * Registers a tab that has no view yet. Unregistering follows the same rule as
 * `registerBrowserController`.
 */
export declare const registerSleepingBrowserTab: (tab: SleepingBrowserTab) => (() => void);
/**
 * The project on screen, and the browser tab the user is looking at there.
 * A null tab keeps the last one, so switching to a file tab and back does
 * not lose it; a tab left behind in another project no longer counts.
 */
export declare const setShownBrowserTab: (directory: string, tabId: string | null) => void;
/** Registers the app-level fallback that can open a browser tab on demand. */
export declare const registerBrowserOpener: (open: BrowserOpener) => (() => void);
/**
 * Registers the panel's ability to close a browser tab. Only a tab the calling
 * session opened is ever passed here, so the panel just performs the close.
 */
export declare const registerBrowserCloser: (close: BrowserCloser) => (() => void);
export {};
