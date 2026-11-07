import type { LinearAuthStatus, RuntimeAPIs } from '@/lib/api/types';
type LinearAuthStatusWithError = LinearAuthStatus & {
    error?: string;
};
type LinearAuthStore = {
    status: LinearAuthStatusWithError | null;
    isLoading: boolean;
    hasChecked: boolean;
    setStatus: (status: LinearAuthStatusWithError | null) => void;
    refreshStatus: (runtimeLinear?: RuntimeAPIs['linear'], options?: {
        force?: boolean;
    }) => Promise<LinearAuthStatusWithError | null>;
    /**
     * Linear is authenticated on the OpenChamber instance, not in the browser, so
     * this status belongs to whichever instance is connected. Switching instances
     * must drop it — otherwise the previous instance's login stays on screen and
     * its issue surfaces remain usable against a runtime that has no Linear at all.
     */
    resetForRuntimeSwitch: () => void;
};
export declare const useLinearAuthStore: import("zustand").UseBoundStore<import("zustand").StoreApi<LinearAuthStore>>;
export {};
