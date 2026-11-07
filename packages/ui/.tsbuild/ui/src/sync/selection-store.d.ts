/**
 * Selection Store — per-session model, agent, and variant selections.
 * Extracted from session-ui-store for subscription isolation.
 */
type ModelSelection = {
    providerId: string;
    modelId: string;
};
type LastUsedProvider = {
    providerID: string;
    modelID: string;
};
type VariantSelections = Map<string, Map<string, Map<string, string | null>>>;
type SelectionState = {
    sessionModelSelections: Map<string, ModelSelection>;
    sessionAgentSelections: Map<string, string>;
    /** The agent OpenCode's session record held when the composer last followed it. */
    sessionFollowedAgents: Map<string, string>;
    /** The model (`provider/model#variant`) the session record held when the composer last reconciled with it. */
    sessionFollowedModels: Map<string, string>;
    sessionAgentModelSelections: Map<string, Map<string, ModelSelection>>;
    agentModelVariantSelections: VariantSelections;
    lastUsedProvider: LastUsedProvider | null;
    saveSessionModelSelection: (sessionId: string, providerId: string, modelId: string) => void;
    getSessionModelSelection: (sessionId: string) => {
        providerId: string;
        modelId: string;
    } | null;
    saveSessionAgentSelection: (sessionId: string, agentName: string) => void;
    getSessionAgentSelection: (sessionId: string) => string | null;
    /**
     * Reconciles the composer with the agent on OpenCode's session record.
     * Returns true, and selects `agent` for the session, only when the record
     * holds a different agent than the one last followed (or none was followed
     * yet): the session switched since the composer last looked, so that newer
     * switch wins. An unchanged record returns false and leaves a picker choice
     * made after it in place.
     */
    followSessionAgent: (sessionId: string, agent: string) => boolean;
    /**
     * Whether the session record's model differs from the one last reconciled:
     * a switch made since (another client, a plugin) that outranks a model
     * picked here. With nothing reconciled yet there is no evidence of a switch,
     * so a pick that disagrees with the record keeps winning, as before.
     */
    isSessionModelSwitched: (sessionId: string, model: string) => boolean;
    markSessionModelFollowed: (sessionId: string, model: string) => void;
    saveAgentModelForSession: (sessionId: string, agentName: string, providerId: string, modelId: string) => void;
    getAgentModelForSession: (sessionId: string, agentName: string) => {
        providerId: string;
        modelId: string;
    } | null;
    clearSessionSelections: (sessionId: string) => void;
    /**
     * `variant` is the effort chosen for this agent/model in this session:
     * a name, `null` for an explicit "Default" (send no effort), or `undefined`
     * to forget the choice so the inherited default applies again.
     */
    saveAgentModelVariantForSession: (sessionId: string, agentName: string, providerId: string, modelId: string, variant: string | null | undefined) => void;
    getAgentModelVariantForSession: (sessionId: string, agentName: string, providerId: string, modelId: string) => string | null | undefined;
};
export declare const useSelectionStore: import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<SelectionState>, "persist" | "setState"> & {
    setState(partial: Partial<SelectionState> | SelectionState | ((state: SelectionState) => Partial<SelectionState> | SelectionState), replace?: false | undefined): unknown;
    setState(state: SelectionState | ((state: SelectionState) => SelectionState), replace: true): unknown;
    persist: {
        setOptions: (options: Partial<import("zustand/middleware").PersistOptions<SelectionState, unknown, unknown>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: SelectionState) => void) => () => void;
        onFinishHydration: (fn: (state: SelectionState) => void) => () => void;
        getOptions: () => Partial<import("zustand/middleware").PersistOptions<SelectionState, unknown, unknown>>;
    };
}>;
export {};
