import type { ProviderResult, QuotaProviderId } from '@/types';
interface QuotaSettingsState {
    displayMode: 'usage' | 'remaining';
    dropdownProviderIds: QuotaProviderId[];
    selectedModels: Record<string, string[]>;
    expandedFamilies: Record<string, string[]>;
}
interface QuotaStore extends QuotaSettingsState {
    results: ProviderResult[];
    /** Instance whose quotas `results` describes, or `null` when nothing is loaded. */
    loadedRuntimeKey: string | null;
    selectedProviderId: QuotaProviderId | null;
    isLoading: boolean;
    isFetchingProvider: Record<string, boolean>;
    lastUpdated: number | null;
    error: string | null;
    /** Refresh failures are not authoritative provider configuration or usage. */
    refreshErrors: Partial<Record<QuotaProviderId, string>>;
    loadSettings: () => Promise<void>;
    fetchAllQuotas: () => Promise<void>;
    /** Resolves true when at least one provider answered — see `ensureLoadedForRuntime`. */
    fetchQuotas: (providerIds: QuotaProviderId[], options?: {
        invalidate?: boolean;
    }) => Promise<boolean>;
    /** Resolves true when the instance answered, false on a transport failure. */
    fetchProviderQuota: (providerId: QuotaProviderId, invalidate?: boolean) => Promise<boolean>;
    setSelectedProvider: (providerId: QuotaProviderId | null) => void;
    setDisplayMode: (mode: 'usage' | 'remaining') => void;
    setDropdownProviderIds: (providerIds: QuotaProviderId[]) => void;
    setSelectedModels: (providerId: string, modelNames: string[]) => void;
    toggleModelSelected: (providerId: string, modelName: string) => void;
    setExpandedFamilies: (providerId: string, familyIds: string[]) => void;
    toggleFamilyExpanded: (providerId: string, familyId: string) => void;
    applyDefaultSelections: (providerId: string, availableModels: string[]) => void;
    /**
     * Load settings and quotas once per instance, when that instance is ready.
     *
     * Providers report themselves as configured only after the instance can read
     * their credentials, which on a remote instance is not true the moment the UI
     * mounts. A fetch fired at mount therefore answers "nothing configured", and
     * because every provider then has a result, no consumer asks again until the
     * three-minute refresh — which is why Usage stayed missing from the
     * work-status panel until Settings -> Usage forced a fresh fetch.
     */
    ensureLoadedForRuntime: () => Promise<void>;
    resetForRuntimeSwitch: () => void;
}
export declare const useQuotaStore: import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<QuotaStore>, "devtools" | "setState"> & {
    setState(partial: Partial<QuotaStore> | QuotaStore | ((state: QuotaStore) => Partial<QuotaStore> | QuotaStore), replace?: false | undefined, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): void;
    setState(state: QuotaStore | ((state: QuotaStore) => QuotaStore), replace: true, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): void;
    devtools: {
        cleanup: () => void;
    };
}>;
export declare const useQuotaAutoRefresh: () => void;
export {};
