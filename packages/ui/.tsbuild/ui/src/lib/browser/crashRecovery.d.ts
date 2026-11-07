/**
 * Recovery policy for a page whose renderer died.
 *
 * A `<webview>` runs the page in its own process, and that process can be lost
 * — out of memory, a hung tab killed by the system, a page that crashes itself.
 * Nothing else in the view's lifecycle reports it: no load fails and no
 * navigation happens, so without this the panel simply stays blank forever with
 * no way back other than closing the tab.
 *
 * Reloading is usually right, because most crashes are transient. Reloading
 * without limit is not: a page that crashes on load would be reloaded until the
 * machine gives up. So attempts are bounded within a window, and once they run
 * out the panel says so instead of trying again.
 *
 * The policy is a pure function of the previous state and the current time so
 * it can be reasoned about and tested without crashing a real renderer.
 */
export declare const CRASH_RECOVERY_WINDOW_MS = 30000;
export declare const CRASH_RECOVERY_MAX_ATTEMPTS = 3;
export declare const CRASH_RECOVERY_BASE_DELAY_MS = 250;
export type CrashRecoveryState = {
    readonly attempts: number;
    /** When the current window opened, or null before the first crash. */
    readonly windowStartedAt: number | null;
};
export declare const INITIAL_CRASH_RECOVERY_STATE: CrashRecoveryState;
type CrashRecoveryPlan = {
    /** How long to wait before reloading. */
    readonly delayMs: number;
    readonly state: CrashRecoveryState;
};
/**
 * Decides whether to reload after a crash, and how long to wait first.
 *
 * Returns null when the attempts in this window are spent — the caller should
 * then report the crash rather than retry. Each attempt waits longer than the
 * last, so a page that crashes immediately is not reloaded in a tight loop.
 */
export declare const planCrashRecovery: (state: CrashRecoveryState, now: number) => CrashRecoveryPlan | null;
export {};
