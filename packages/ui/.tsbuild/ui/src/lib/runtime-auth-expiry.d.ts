export type AuthSessionState = 'ok' | 'expired' | 'reauthenticating';
interface AuthSessionStore {
    state: AuthSessionState;
    /** Set only by the confirmed classifier or an explicit auth failure. */
    markExpired: () => void;
    markReauthenticating: () => void;
    markAuthenticated: () => void;
}
export declare const useAuthSessionStore: import("zustand").UseBoundStore<import("zustand").StoreApi<AuthSessionStore>>;
/**
 * Resolves once the session is usable again (immediately when it already is),
 * or when `signal` aborts. Live streams wait here instead of reconnecting:
 * while the session is expired every attempt is a guaranteed 401. The session
 * gate's login, or a probe proving the session alive, flips the state back to
 * 'ok' and releases every waiter at once.
 */
export declare const waitForAuthSession: (signal: AbortSignal) => Promise<void>;
/**
 * Called by runtimeFetch for every response. Cheap by design: everything but
 * a 401 on a classifiable path returns immediately.
 */
export declare const observeRuntimeAuthResponse: (url: string, status: number) => void;
/**
 * Revalidates the session when the tab regains visibility after a long
 * absence — the "laptop woke up, everything looks alive, first click fails"
 * case. One request per wake, nothing periodic.
 */
export declare const installAuthSessionFocusWatch: () => void;
export {};
