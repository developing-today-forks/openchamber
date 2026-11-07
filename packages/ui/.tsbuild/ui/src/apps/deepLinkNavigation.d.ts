import { type SessionsFilter, type ViewTarget } from './deepLinks';
/**
 * Navigation layer for {@link DeepLinkIntent}s — the only place that knows how to *apply* a
 * deep link. Producers (notification taps, widget `widgetURL`, Live Activities) feed intents
 * in via {@link useDeepLinkSource}; the surfaces that can satisfy them register imperative
 * handlers via {@link useDeepLinkHandlers}. Session/new-session navigation goes straight to
 * the session store (always available), so those resolve even before the shell has mounted.
 *
 * Intents that arrive before the app is ready (cold launch from a tap/widget) or before their
 * handler is registered are stashed in a module-level holder that survives the connect flow
 * and SyncProvider remount, then applied as soon as the app becomes ready / the handler
 * appears. Only the most recent intent is kept (newest wins) — a burst of taps shouldn't queue.
 */
interface DeepLinkHandlers {
    /** Open the sessions sheet, optionally pre-filtered (filter support is best-effort for now). */
    openSessions?: (filter?: SessionsFilter) => void;
    /** Open a non-session surface (files / mcp / instances / update). */
    openView?: (target: ViewTarget) => void;
    /** Open the Changes surface, optionally jumping straight to a file diff. */
    openChanges?: (options?: {
        path?: string;
        staged?: boolean;
    }) => void;
    /** Open Settings, optionally at a specific section. */
    openSettings?: (section?: string) => void;
}
/**
 * Register the surfaces that can satisfy shell-scoped intents (sessions/settings/views/changes).
 * Call from the component that owns those panels; the handlers are torn down on unmount.
 * Registering also flushes any pending intent that was waiting for these handlers.
 */
export declare const useDeepLinkHandlers: (next: DeepLinkHandlers) => void;
/**
 * Single native entry point for deep links. Subscribes to the custom URL scheme
 * (`App.appUrlOpen` — widgets, Live Activities, external links), notification taps
 * (`pushNotificationActionPerformed`) and iOS Shortcuts requests, normalising each into an
 * intent. The listeners are registered UNCONDITIONALLY so a cold-launch tap/open isn't lost
 * while the app is still connecting; intents stash until `ready` (connected + initialized).
 */
export declare const useDeepLinkSource: (options: {
    ready: boolean;
}) => void;
export {};
