/**
 * Settings → Web search state: the providers OpenCode offers, the `websearch`
 * config choice, how each provider's optional key is supplied, and the plugin
 * providers that are offered once connected.
 *
 * OpenCode owns all three. The store reads them on demand (the page asks, and
 * `catalogRefresh` re-reads after `websearch.updated`, `config.updated` or a
 * credential change once the page has asked at least once). A failed read
 * never replaces a good snapshot of the same scope with an empty one.
 */
import { type WebSearchConnectAnswer, type WebSearchProvider, type WebSearchProviderAccess, type WebSearchSelection } from '@/lib/opencode/websearch';
export type WebSearchSnapshot = {
    scope: string;
    providers: WebSearchProvider[];
    selection: WebSearchSelection;
    /** `null` when the integration list could not be read: key status unknown, not "no key". */
    access: Record<string, WebSearchProviderAccess> | null;
    /**
     * Plugin providers that join `providers` once connected. Empty when the
     * integration list could not be read (`access` is `null` then).
     */
    connectable: WebSearchProvider[];
    /**
     * The project config whose `websearch` overrides what Settings writes, so a
     * choice here would snap back. `null` when none, or when the check failed
     * (unknown is treated as "not overridden" so the page stays usable).
     */
    projectOverride: string | null;
};
type WebSearchState = {
    kind: 'idle';
} | {
    kind: 'loading';
    scope: string;
} | {
    kind: 'ready';
    snapshot: WebSearchSnapshot;
} | {
    kind: 'failed';
    scope: string;
};
type WebSearchStore = {
    state: WebSearchState;
    load: () => Promise<void>;
    /** Resolves `false` when the write failed; the previous choice is restored. */
    setSelection: (selection: WebSearchSelection) => Promise<boolean>;
    /** Connects with the provider's own method: `key` is ignored by a form-only method. */
    saveKey: (providerId: string, input: {
        key: string;
        answer: WebSearchConnectAnswer;
    }) => Promise<boolean>;
    removeKey: (providerId: string) => Promise<boolean>;
};
export declare const getWebSearchScopeKey: () => string;
export declare const useWebSearchStore: import("zustand").UseBoundStore<import("zustand").StoreApi<WebSearchStore>>;
/** Re-read after a catalog event, but only once something asked for the data. */
export declare const refreshWebSearchIfLoaded: () => Promise<void>;
export {};
