export declare const MAX_TRUSTED_SCHEMES = 64;
interface AppLinkTrustState {
    /** Application deep-link schemes (obsidian, vscode, ...) the user chose to always allow. */
    trustedSchemes: string[];
    trustScheme: (scheme: string) => void;
    removeTrustedScheme: (scheme: string) => void;
    isSchemeTrusted: (scheme: string) => boolean;
}
/**
 * Per-device trust for application deep links rendered in chat. Security
 * decisions do not roam, so this persists locally through the shared safe
 * storage rather than server-synced settings.
 */
export declare const useAppLinkTrustStore: import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<AppLinkTrustState>, "persist" | "setState"> & {
    setState(partial: AppLinkTrustState | Partial<AppLinkTrustState> | ((state: AppLinkTrustState) => AppLinkTrustState | Partial<AppLinkTrustState>), replace?: false | undefined): unknown;
    setState(state: AppLinkTrustState | ((state: AppLinkTrustState) => AppLinkTrustState), replace: true): unknown;
    persist: {
        setOptions: (options: Partial<import("zustand/middleware").PersistOptions<AppLinkTrustState, unknown, unknown>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: AppLinkTrustState) => void) => () => void;
        onFinishHydration: (fn: (state: AppLinkTrustState) => void) => () => void;
        getOptions: () => Partial<import("zustand/middleware").PersistOptions<AppLinkTrustState, unknown, unknown>>;
    };
}>;
export {};
