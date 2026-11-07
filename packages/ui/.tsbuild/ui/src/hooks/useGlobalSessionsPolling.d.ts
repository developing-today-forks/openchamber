export declare const GLOBAL_SESSIONS_REFRESH_INTERVAL_MS = 45000;
type ScheduleTimeout = (callback: () => void, delay: number) => number;
type ClearTimeout = (timeoutId: number) => void;
/** Whether anyone can see the app, and a way to hear when they can again. */
type PollingVisibility = {
    isHidden: () => boolean;
    onVisible: (listener: () => void) => () => void;
};
/** Hears when OpenCode first answers, the moment a failed startup load can succeed. */
type SubscribeServerReady = (listener: () => void) => () => void;
export declare const startGlobalSessionsPolling: (initialLoad: () => Promise<boolean>, refresh: () => Promise<boolean>, scheduleTimeout?: ScheduleTimeout, clearScheduledTimeout?: ClearTimeout, visibility?: PollingVisibility, subscribeServerReady?: SubscribeServerReady) => (() => void);
/**
 * Owns the one global-session polling lifecycle for the main app runtime.
 * The timed refresh pauses while the document is hidden: live events keep
 * the list current, and a refresh that came due runs once it is visible.
 *
 * Each load is followed by the host status seed: unopened directories are
 * never bootstrapped, so a turn already running there when this client
 * started is only known to the host's cross-project map. The seed resolves
 * directories from the list just loaded, which is why it runs after it.
 */
export declare const useGlobalSessionsPolling: (enabled: boolean) => void;
export {};
