/** Why a provider is effectively off (#218): the toggleable list, or a source Settings cannot change. */
export type ProviderOffReason = 'disabled' | 'policy' | 'allowlist';
/** The effective off state: every provider OpenCode refuses, with its binding reason. */
export interface ProviderOffState {
    offProviders: string[];
    offReasons: Record<string, ProviderOffReason>;
}
/** Subscribes to refreshed off-state reads landing; returns the unsubscribe. */
export declare const subscribeProviderOffState: (listener: () => void) => (() => void);
/** The last list read from the current runtime, or `null` when there is none. */
export declare const peekDisabledProviders: () => string[] | null;
/** The last effective off state read from the current runtime, or `null` when there is none. */
export declare const peekProviderOffState: () => ProviderOffState | null;
/** Keeps a list the caller just read or wrote, so later reads reuse it. */
export declare const rememberDisabledProviders: (providers: string[] | null) => void;
/**
 * Reads the list again and keeps it. A read started earlier never replaces
 * one started later, and a Settings write (rememberDisabledProviders)
 * advances the same generation, so a slow first read cannot bring back the
 * state from before a Settings change either. Throws when the list cannot
 * be read; a failed read is never an empty list.
 */
export declare const loadDisabledProviders: () => Promise<string[] | null>;
/**
 * Reads the effective off state again (through the same generation guard as
 * the list read) and keeps it. Answers `null` where the runtime has no
 * OpenChamber server to ask.
 */
export declare const loadProviderOffState: () => Promise<ProviderOffState | null>;
/**
 * The current runtime's list, reading it once when no read has landed yet.
 * Callers that arrive while that read runs share it. A failure answers
 * `null`, the caller keeps the providers it has, and the failure is not
 * kept: the next caller reads again.
 */
export declare const ensureDisabledProviders: () => Promise<string[] | null>;
/**
 * Reads the list once the app has started, so the first catalog a picker
 * shows is already filtered. A failure is left for the next catalog load
 * or Settings visit to retry.
 */
export declare const prefetchDisabledProviders: () => void;
/** Turns a provider off or back on; answers with the new list. */
export declare const setProviderDisabled: (providerId: string, disabled: boolean) => Promise<string[]>;
