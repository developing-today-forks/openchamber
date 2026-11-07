/**
 * Authoritative desktop boot outcome types and UI-facing resolver.
 *
 * The Rust backend computes a `DesktopBootOutcome` at startup and injects
 * it as `window.__OPENCHAMBER_DESKTOP_BOOT_OUTCOME__`. This module provides
 * pure functions to read that outcome and derive the minimal UI state
 * needed for the loading/chooser/recovery/main decision.
 */
/**
 * Structured boot outcome type.
 *
 * Instead of 8 magic string kinds, we use a structured type that clearly
 * separates the target (local/remote/null) from the status (ok/not-configured/error).
 *
 * This makes it easier to add new states without updating multiple files and
 * allows UI to reason about outcomes with simple status checks.
 */
type DesktopBootAvailability = {
    localAvailable?: boolean;
};
export type DesktopBootOutcome = ({
    target: 'local';
    status: 'ok';
    sshStartupFallbackHostId?: string;
} & DesktopBootAvailability) | ({
    target: 'remote';
    status: 'ok';
    hostId: string;
    url: string;
} & DesktopBootAvailability) | ({
    target: null;
    status: 'not-configured';
} & DesktopBootAvailability) | ({
    target: 'local';
    status: 'unreachable';
} & DesktopBootAvailability) | ({
    target: 'remote';
    status: 'unreachable';
    hostId: string;
    url: string;
} & DesktopBootAvailability) | ({
    target: 'remote';
    status: 'incompatible';
    hostId: string;
    url: string;
} & DesktopBootAvailability) | ({
    target: 'remote';
    status: 'wrong-service';
    hostId: string;
    url: string;
} & DesktopBootAvailability) | ({
    target: 'remote';
    status: 'missing';
    hostId: string;
} & DesktopBootAvailability);
export type DesktopBootView = ({
    screen: 'main';
} & DesktopBootAvailability) | ({
    screen: 'main';
    hostId: string;
    url: string;
} & DesktopBootAvailability) | ({
    screen: 'chooser';
} & DesktopBootAvailability) | ({
    screen: 'recovery';
    variant: 'local-unavailable';
} & DesktopBootAvailability) | ({
    screen: 'recovery';
    variant: 'remote-unreachable';
    hostId: string;
    url: string;
} & DesktopBootAvailability) | ({
    screen: 'recovery';
    variant: 'remote-incompatible';
    hostId: string;
    url: string;
} & DesktopBootAvailability) | ({
    screen: 'recovery';
    variant: 'remote-wrong-service';
    hostId: string;
    url: string;
} & DesktopBootAvailability) | ({
    screen: 'recovery';
    variant: 'remote-missing';
    hostId: string;
} & DesktopBootAvailability);
export type DesktopBootViewInput = {
    isDesktopShell: boolean;
    bootOutcome: DesktopBootOutcome | null;
};
/**
 * Derive the minimal UI view from the injected boot outcome.
 *
 * Returns `null` when not in desktop shell, when the outcome is not yet
 * known, or when the injected payload is malformed.
 */
export declare function resolveDesktopBootView(input: DesktopBootViewInput): DesktopBootView | null;
export type BootInjectionStatus = 'not-injected' | 'malformed' | 'valid';
export type InitialLoadingState = {
    isDesktopShell: boolean;
    bootOutcomeKnown: boolean;
};
export type DesktopBootFlowRestartInput = {
    isDesktopShell: boolean;
    isDesktopLocalOriginActive: boolean;
};
/**
 * Whether the initial loading screen can be dismissed.
 *
 * The app shell and composer are usable before OpenCode is ready, so the
 * splash never waits for app initialization. Desktop shells still wait until
 * the native host injects a valid boot outcome, which decides between the main
 * view, the first-launch chooser, and recovery.
 */
export declare function canDismissInitialLoading(state: InitialLoadingState): boolean;
/**
 * Boot/recovery UI can render in the desktop startup window before the local
 * desktop HTTP origin is active. In that state, same-origin reloads and
 * `/api/*` requests cannot recover the app, so callers must restart desktop.
 */
export declare function shouldRestartDesktopBootFlow(input: DesktopBootFlowRestartInput): boolean;
/**
 * Read the boot outcome injected by the native desktop host.
 * Returns `null` when not in desktop, when the outcome has not been set yet,
 * or when the injected payload is malformed.
 */
export declare function getInjectedBootOutcome(): DesktopBootOutcome | null;
/**
 * Check the injection status of the desktop boot outcome.
 *
 * Distinguishes three states:
 * - `'not-injected'`: the global is absent or null (keep waiting)
 * - `'malformed'`: the global is present but failed validation (deterministic failure)
 * - `'valid'`: the global is present and passes validation
 */
export declare function getBootInjectionStatus(): BootInjectionStatus;
export {};
