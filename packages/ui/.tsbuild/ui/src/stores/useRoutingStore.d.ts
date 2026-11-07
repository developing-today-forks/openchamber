import { type ClassifierSource, type CustomEndpointInput, type RoutingConfig, type RoutingHeldPermission, type RoutingJevSource, type RoutingState } from '@/lib/routing/routingApi';
interface RoutingDecision {
    sessionId: string;
    at: number;
    category: string | null;
    confidence: number;
    reason: 'routed' | 'low-confidence' | 'unknown-category' | 'error' | 'not-ready';
    providerID?: string;
    modelID?: string;
    variant?: string | null;
    agent?: string | null;
    error?: string;
}
interface RoutingStoreState extends RoutingState {
    loaded: boolean;
    loadError: string | null;
    decisions: Record<string, RoutingDecision>;
    held: Record<string, RoutingHeldPermission>;
    load: () => Promise<void>;
    resetForRuntime: () => void;
    applyState: (state: RoutingState) => void;
    applyAvailability: (state: {
        available: boolean;
        autoReady: boolean;
        jevAvailable: boolean;
        tokenPresent: boolean;
        jevSource: RoutingJevSource;
    }) => void;
    recordDecision: (decision: RoutingDecision) => void;
    holdPermission: (held: RoutingHeldPermission) => void;
    releasePermission: (permissionId: string) => void;
    saveConfig: (config: RoutingConfig) => Promise<void>;
    setToken: (token: string) => Promise<void>;
    clearToken: () => Promise<void>;
    setClassifierSource: (source: ClassifierSource) => Promise<void>;
    setCustomEndpoint: (endpoint: CustomEndpointInput) => Promise<void>;
    clearCustomEndpoint: () => Promise<void>;
}
export declare const useRoutingStore: import("zustand").UseBoundStore<import("zustand").StoreApi<RoutingStoreState>>;
/** Whether the composer may offer the Auto row right now. */
export declare const selectAutoReady: (state: RoutingStoreState) => boolean;
/** Whether the safety net can be offered: this runtime has a server and a classification provider answers. */
export declare const selectSafetyNetAvailable: (state: RoutingStoreState) => boolean;
export {};
