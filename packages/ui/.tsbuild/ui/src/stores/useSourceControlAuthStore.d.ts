import type { SourceControlAPI, SourceControlAuthStatus, SourceControlIdentity, SourceControlReadContext } from '@/lib/api/types';
export declare const getSourceControlAuthKey: (identity: SourceControlIdentity) => string;
type SourceControlAuthEntry = {
    status: SourceControlAuthStatus | null;
    isLoading: boolean;
    hasChecked: boolean;
};
type SourceControlReadContextAuthState = {
    authChecked: boolean;
    connected: boolean;
};
export declare const getSourceControlReadContextAuthState: (entry: SourceControlAuthEntry | undefined, context: SourceControlReadContext) => SourceControlReadContextAuthState;
type SourceControlAuthStore = {
    identities: SourceControlIdentity[];
    identitiesLoaded: boolean;
    identitiesError: string | null;
    entries: Record<string, SourceControlAuthEntry>;
    refreshInstances: (sourceControl: Pick<SourceControlAPI, 'authInstances'>, options?: {
        force?: boolean;
    }) => Promise<SourceControlIdentity[]>;
    refreshAll: (sourceControl: Pick<SourceControlAPI, 'authInstances' | 'authStatus'>, options?: {
        force?: boolean;
    }) => Promise<void>;
    /**
     * Reads the accounts of the instances these identities name. An instance
     * whose last account was removed disappears from the configured list, so
     * `refreshAll` would never look at it again and an identity pointing into it
     * would look connected forever.
     */
    refreshIdentityAccounts: (sourceControl: Pick<SourceControlAPI, 'authStatus'>, identities: Array<SourceControlIdentity | null | undefined>) => Promise<void>;
    setStatus: (identity: SourceControlIdentity, status: SourceControlAuthStatus | null) => void;
    refreshStatus: (sourceControl: Pick<SourceControlAPI, 'authStatus'>, identity: SourceControlIdentity, options?: {
        force?: boolean;
    }) => Promise<SourceControlAuthStatus | null>;
    resetForRuntimeSwitch: () => void;
};
export declare const useSourceControlAuthStore: import("zustand").UseBoundStore<import("zustand").StoreApi<SourceControlAuthStore>>;
export declare const useSourceControlAuthEntry: (identity: SourceControlIdentity) => SourceControlAuthEntry | undefined;
/**
 * The credential IDs connected for a provider instance, or null when that
 * instance has not been read yet. Callers use it to tell an identity whose
 * account was disconnected from one whose accounts are simply not loaded. A
 * listed account an identity cannot answer with, such as the gh CLI login
 * while another GitHub account is active, is not connected.
 */
export declare const useConnectedAccountIds: () => ((identity: SourceControlIdentity) => string[] | null);
export {};
