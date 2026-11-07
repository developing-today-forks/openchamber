/** The last list read from the current runtime, or `null` when there is none. */
export declare const peekDisabledProviders: () => string[] | null;
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
