import type { EditPermissionMode } from "./types/sessionTypes";
interface ContextUsage {
    totalTokens: number;
    percentage: number;
    contextLimit: number;
    outputLimit?: number;
    normalizedOutput?: number;
    thresholdLimit: number;
    lastMessageId?: string;
}
interface ContextState {
    sessionModelSelections: Map<string, {
        providerId: string;
        modelId: string;
    }>;
    sessionAgentSelections: Map<string, string>;
    sessionAgentModelSelections: Map<string, Map<string, {
        providerId: string;
        modelId: string;
    }>>;
    sessionAgentModelVariantSelections: Map<string, Map<string, Map<string, string | null>>>;
    currentAgentContext: Map<string, string>;
    sessionContextUsage: Map<string, ContextUsage>;
    sessionAgentEditModes: Map<string, Map<string, EditPermissionMode>>;
    hasHydrated: boolean;
}
interface ContextActions {
    saveSessionModelSelection: (sessionId: string, providerId: string, modelId: string) => void;
    getSessionModelSelection: (sessionId: string) => {
        providerId: string;
        modelId: string;
    } | null;
    saveSessionAgentSelection: (sessionId: string, agentName: string) => void;
    getSessionAgentSelection: (sessionId: string) => string | null;
    saveAgentModelForSession: (sessionId: string, agentName: string, providerId: string, modelId: string) => void;
    getAgentModelForSession: (sessionId: string, agentName: string) => {
        providerId: string;
        modelId: string;
    } | null;
    saveAgentModelVariantForSession: (sessionId: string, agentName: string, providerId: string, modelId: string, variant: string | null | undefined) => void;
    getAgentModelVariantForSession: (sessionId: string, agentName: string, providerId: string, modelId: string) => string | null | undefined;
    getContextUsage: (sessionId: string, contextLimit: number, outputLimit: number, messages: Map<string, {
        info: any;
        parts: any[];
    }[]>) => ContextUsage | null;
    updateSessionContextUsage: (sessionId: string, contextLimit: number, outputLimit: number, messages: Map<string, {
        info: any;
        parts: any[];
    }[]>) => void;
    initializeSessionContextUsage: (sessionId: string, contextLimit: number, outputLimit: number, messages: Map<string, {
        info: any;
        parts: any[];
    }[]>) => void;
    pollForTokenUpdates: (sessionId: string, messageId: string, messages: Map<string, {
        info: any;
        parts: any[];
    }[]>, maxAttempts?: number) => void;
    getCurrentAgent: (sessionId: string) => string | undefined;
    getSessionAgentEditMode: (sessionId: string, agentName: string | undefined, defaultMode?: EditPermissionMode) => EditPermissionMode;
    toggleSessionAgentEditMode: (sessionId: string, agentName: string | undefined, defaultMode?: EditPermissionMode) => void;
    setSessionAgentEditMode: (sessionId: string, agentName: string | undefined, mode: EditPermissionMode, defaultMode?: EditPermissionMode) => void;
}
type ContextStore = ContextState & ContextActions;
export declare const useContextStore: import("zustand").UseBoundStore<Omit<Omit<import("zustand").StoreApi<ContextStore>, "devtools" | "setState"> & {
    setState(partial: Partial<ContextStore> | ((state: ContextStore) => Partial<ContextStore> | ContextStore) | ContextStore, replace?: false | undefined, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): void;
    setState(state: ((state: ContextStore) => ContextStore) | ContextStore, replace: true, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): void;
    devtools: {
        cleanup: () => void;
    };
}, "persist" | "setState"> & {
    setState(partial: Partial<ContextStore> | ((state: ContextStore) => Partial<ContextStore> | ContextStore) | ContextStore, replace?: false | undefined, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): unknown;
    setState(state: ((state: ContextStore) => ContextStore) | ContextStore, replace: true, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): unknown;
    persist: {
        setOptions: (options: Partial<import("zustand/middleware").PersistOptions<ContextStore, unknown, unknown>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: ContextStore) => void) => () => void;
        onFinishHydration: (fn: (state: ContextStore) => void) => () => void;
        getOptions: () => Partial<import("zustand/middleware").PersistOptions<ContextStore, unknown, unknown>>;
    };
}>;
export {};
