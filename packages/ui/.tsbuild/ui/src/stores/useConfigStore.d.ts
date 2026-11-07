import type { StoreApi, UseBoundStore } from "zustand";
import { type Provider, type Model, type Agent, type Config } from "@/lib/opencode/model";
import type { CatalogKind } from "@/lib/opencode/events";
import { type ProjectConfigError } from "@/lib/opencode/configError";
import type { ModelMetadata } from "@/types";
import { type VoiceApiKeyKind, type VoiceApiKeyState } from "@/lib/voiceKeysApi";
import { type PullRequestWorktreeMode, type WorktreeStartFrom, type WorktreeStartFromOverrides, type WorktreeStartPlace } from "@/lib/worktrees/worktreeStartSource";
export declare const MODELS_DEV_CATALOG_MAX_BYTES: number;
type ProviderModel = Model;
/**
 * OpenCode v2 reports providers and models as two flat lists. Every selection
 * path in this store works provider-first, so the loader regroups the catalog's
 * models under their provider and the rest of the store keeps that shape.
 */
type ProviderWithModelList = Provider & {
    models: Model[];
};
/**
 * An `openchamber/auto` selection that this server cannot honour. Auto is a
 * valid choice only while the server says routing is available and ready;
 * a selection saved under another build (or before the token was removed)
 * must not be kept, or the sentinel would be sent to OpenCode as a model.
 * Unknown readiness (settings or the routing state not loaded yet) keeps the
 * selection, so a real Auto choice survives startup.
 */
export declare const isStaleAutoSelection: (providerId?: string | null, modelId?: string | null) => boolean;
export declare const fetchModelsDevMetadata: () => Promise<Map<string, ModelMetadata>>;
/**
 * Called for every catalog event with the directory it names (`null` for a
 * server-wide one such as a credential change).
 */
export declare const markConfigCatalogStale: (kind: CatalogKind, directory: string | null) => void;
interface DirectoryScopedConfig {
    providersLoaded?: boolean;
    agentsLoaded?: boolean;
    providers: ProviderWithModelList[];
    agents: Agent[];
    currentProviderId: string;
    currentModelId: string;
    currentVariant?: string | undefined;
    currentVariantSelection?: CurrentVariantSelection;
    currentAgentName: string | undefined;
    selectedProviderId: string;
    agentModelSelections: {
        [agentName: string]: {
            providerId: string;
            modelId: string;
        };
    };
    defaultProviders: {
        [key: string]: string;
    };
    opencodeDefaultAgent?: string;
    opencodeDefaultModel?: string;
    selectionSource?: "auto" | "manual";
    agentSelectionSource?: "auto" | "manual";
}
/**
 * The thinking-effort selection, split into what the user picked and what
 * applies when they picked nothing:
 *
 * - `override: string`    an effort chosen in the picker
 * - `override: null`      "Default" chosen in the picker — send no effort
 * - `override: undefined` nothing chosen — the inherited default applies
 *
 * `null` and `undefined` are not interchangeable: collapsing them makes the
 * "Default" entry unpickable, because the settings default silently takes
 * effect again and the next assistant reply echoes it back as an explicit
 * choice.
 */
type CurrentVariantSelection = {
    override: string | null | undefined;
    inherited: string | undefined;
};
interface ConfigStore {
    activeDirectoryKey: string;
    directoryScoped: Record<string, DirectoryScopedConfig>;
    configRuntimeKey: string;
    providers: ProviderWithModelList[];
    agents: Agent[];
    providersLoaded: boolean;
    agentsLoaded: boolean;
    currentProviderId: string;
    currentModelId: string;
    currentVariant: string | undefined;
    currentVariantSelection: CurrentVariantSelection;
    currentAgentName: string | undefined;
    selectedProviderId: string;
    agentModelSelections: {
        [agentName: string]: {
            providerId: string;
            modelId: string;
        };
    };
    defaultProviders: {
        [key: string]: string;
    };
    selectionSource: "auto" | "manual";
    agentSelectionSource: "auto" | "manual";
    isConnected: boolean;
    hasEverConnected: boolean;
    connectionPhase: "connecting" | "connected" | "reconnecting";
    lastDisconnectReason: string | null;
    /** Why the last initializeApp attempt did not finish. Runtime-only; cleared on success. */
    lastInitFailure: InitFailure | null;
    /** Projects whose OpenCode config OpenCode refused to load, keyed by config-directory key. Runtime-only. */
    projectConfigErrors: Record<string, ProjectConfigError>;
    isInitialized: boolean;
    modelsMetadata: Map<string, ModelMetadata>;
    settingsDefaultModel: string | undefined;
    settingsDefaultsLoaded: boolean;
    settingsDefaultVariant: string | undefined;
    settingsDefaultAgent: string | undefined;
    opencodeDefaultAgent: string | undefined;
    opencodeDefaultModel: string | undefined;
    settingsAutoCreateWorktree: boolean;
    settingsWorktreeStartFrom: WorktreeStartFrom;
    settingsWorktreeStartFromOverrides: WorktreeStartFromOverrides;
    settingsPullRequestWorktree: PullRequestWorktreeMode;
    settingsWorktreeBranchTemplate: string;
    settingsPullRequestBranchTemplate: string;
    settingsGitmojiEnabled: boolean;
    settingsDefaultFileViewerPreview: boolean;
    settingsZenModel: string | undefined;
    settingsMessageStreamTransport: 'auto' | 'ws' | 'sse';
    voiceProvider: 'browser' | 'local' | 'openai' | 'openai-compatible' | 'say';
    setVoiceProvider: (provider: 'browser' | 'local' | 'openai' | 'openai-compatible' | 'say') => void;
    speechRate: number;
    speechPitch: number;
    speechVolume: number;
    sayVoice: string;
    browserVoice: string;
    localTtsVoiceId: number;
    /** Local TTS model the chosen voice belongs to (catalog id). */
    localTtsModelId: string;
    /** Local and macOS voices follow the language of the text being read. */
    ttsFollowTextLanguage: boolean;
    openaiVoice: string;
    /** Which voice API keys the server holds; the keys never reach the browser. */
    voiceApiKeys: VoiceApiKeyState;
    openaiCompatibleUrl: string;
    openaiCompatibleVoice: string;
    openaiCompatibleTtsModel: string;
    dictationEnabled: boolean;
    sttProvider: 'local' | 'openai-compatible';
    sttServerUrl: string;
    sttModel: string;
    sttLocalModel: string;
    sttLanguage: string;
    showMessageTTSButtons: boolean;
    ttsInputMode: 'sanitized' | 'raw' | 'summarized';
    ttsChunkedMode: boolean;
    summarizeMessageTTS: boolean;
    summarizeVoiceConversation: boolean;
    summarizeCharacterThreshold: number;
    summarizeMaxLength: number;
    setSpeechRate: (rate: number) => void;
    setSpeechPitch: (pitch: number) => void;
    setSpeechVolume: (volume: number) => void;
    setSayVoice: (voice: string) => void;
    setBrowserVoice: (voice: string) => void;
    setLocalTtsVoiceId: (voiceId: number) => void;
    setLocalTtsModelId: (modelId: string) => void;
    setTtsFollowTextLanguage: (enabled: boolean) => void;
    setOpenaiVoice: (voice: string) => void;
    /** Store (string) or remove (null) one voice key on the server. Resolves false when the server refused. */
    setVoiceApiKey: (kind: VoiceApiKeyKind, apiKey: string | null) => Promise<boolean>;
    /**
     * Read which keys the server holds, moving any a previous build left in
     * the browser first. Once per runtime unless `force` (the Settings page).
     */
    refreshVoiceApiKeys: (options?: {
        force?: boolean;
    }) => Promise<void>;
    setOpenaiCompatibleUrl: (url: string) => void;
    setOpenaiCompatibleVoice: (voice: string) => void;
    setOpenaiCompatibleTtsModel: (model: string) => void;
    setDictationEnabled: (enabled: boolean) => void;
    setSttProvider: (provider: 'local' | 'openai-compatible') => void;
    setSttServerUrl: (url: string) => void;
    setSttModel: (model: string) => void;
    setSttLocalModel: (model: string) => void;
    setSttLanguage: (lang: string) => void;
    setShowMessageTTSButtons: (show: boolean) => void;
    setTtsInputMode: (mode: 'sanitized' | 'raw' | 'summarized') => void;
    setTtsChunkedMode: (enabled: boolean) => void;
    setSummarizeMessageTTS: (enabled: boolean) => void;
    setSummarizeVoiceConversation: (enabled: boolean) => void;
    setSummarizeCharacterThreshold: (threshold: number) => void;
    setSummarizeMaxLength: (maxLength: number) => void;
    activateDirectory: (directory: string | null | undefined, options?: {
        preserveManualModel?: boolean;
    }) => Promise<void>;
    /** `fresh`: a request already in flight started before the caller's reason to reload, so it cannot answer it. */
    loadProviders: (options?: {
        directory?: string | null;
        source?: string;
        fresh?: boolean;
    }) => Promise<void>;
    loadSessionDefaults: () => Promise<boolean>;
    /** `fresh`: a request already in flight started before the caller's reason to reload, so it cannot answer it. */
    loadAgents: (options?: {
        directory?: string | null;
        source?: string;
        fresh?: boolean;
    }) => Promise<boolean>;
    invalidateModelMetadataCache: () => void;
    invalidateProviderCache: (directory?: string | null) => void;
    setProvider: (providerId: string) => void;
    setModel: (modelId: string) => void;
    setCurrentVariant: (variant: string | undefined) => void;
    setCurrentVariantOverride: (override: string | null | undefined, inherited: string | undefined) => void;
    cycleCurrentVariant: () => string | undefined;
    getCurrentModelVariants: () => string[];
    /** The effort the active project or Settings configures for this model; `undefined` for any model that is not a configured default. */
    getDefaultVariantForModel: (providerId: string, modelId: string) => string | undefined;
    /**
     * `keepModel` switches the agent alone. It is for following a switch the
     * session already made: OpenCode keeps a session on its own model when the
     * agent changes, so resolving the agent's model would show one the session
     * does not run on (and would replace Auto).
     */
    setAgent: (agentName: string | undefined, options?: {
        keepModel?: boolean;
    }) => void;
    applyDefaultModelAgentSelection: (options?: {
        projectDefaultAgent?: string;
        projectDefaultModel?: string;
        projectDefaultVariant?: string;
    }) => void;
    /** Replaces an `openchamber/auto` selection this server cannot honour with the default model. */
    dropStaleAutoSelection: () => void;
    applyOpenCodeConfigDefaults: (directory?: string | null, source?: string, config?: Config) => void;
    setSelectedProvider: (providerId: string) => void;
    setSettingsDefaultModel: (model: string | undefined) => void;
    setSettingsDefaultVariant: (variant: string | undefined) => void;
    setSettingsDefaultAgent: (agent: string | undefined) => void;
    setSettingsAutoCreateWorktree: (enabled: boolean) => void;
    setSettingsWorktreeStartFrom: (startFrom: WorktreeStartFrom) => void;
    /** `null` makes the place follow the default again. */
    setSettingsWorktreeStartFromOverride: (place: WorktreeStartPlace, startFrom: WorktreeStartFrom | null) => void;
    setSettingsPullRequestWorktree: (mode: PullRequestWorktreeMode) => void;
    setSettingsWorktreeBranchTemplate: (template: string) => void;
    setSettingsPullRequestBranchTemplate: (template: string) => void;
    setSettingsGitmojiEnabled: (enabled: boolean) => void;
    setSettingsDefaultFileViewerPreview: (enabled: boolean) => void;
    setSettingsZenModel: (model: string | undefined) => void;
    setSettingsMessageStreamTransport: (transport: 'auto' | 'ws' | 'sse') => void;
    getResolvedGitGenerationModel: () => {
        providerId: string;
        modelId: string;
    } | null;
    saveAgentModelSelection: (agentName: string, providerId: string, modelId: string) => void;
    getAgentModelSelection: (agentName: string) => {
        providerId: string;
        modelId: string;
    } | null;
    probeConnection: (options?: {
        timeoutMs?: number;
    }) => Promise<boolean>;
    checkConnection: () => Promise<boolean>;
    initializeApp: () => Promise<void>;
    getCurrentProvider: () => ProviderWithModelList | undefined;
    getCurrentModel: () => ProviderModel | undefined;
    getCurrentAgent: () => Agent | undefined;
    getModelMetadata: (providerId: string, modelId: string) => ModelMetadata | undefined;
    getVisibleAgents: () => Agent[];
}
declare global {
    interface Window {
        __zustand_config_store__?: UseBoundStore<StoreApi<ConfigStore>>;
    }
}
/** The startup step that failed, with the underlying error text when one exists. */
export type InitFailure = {
    step: 'serverUnreachable' | 'openCodeUnavailable' | 'loadAgents' | 'unexpected';
    message: string | null;
};
export declare const invalidateConfigAgentsLoad: (directory?: string | null) => void;
/**
 * Providers of one project. Returns a stored array, so components can select it
 * directly and re-render only when that project's list is replaced.
 *
 * Settings pages browse a project the app is not on; everything else wants the
 * active one, which is what a missing directory resolves to, as in
 * `loadProviders`. Settings has none when no project is added, and nothing
 * loads a catalog without a directory.
 */
export declare const selectProvidersForDirectory: (state: Pick<ConfigStore, "providers" | "directoryScoped" | "activeDirectoryKey">, directory?: string | null) => ProviderWithModelList[];
export declare const selectConfigAgentsForDirectory: (state: Pick<ConfigStore, 'agents' | 'directoryScoped' | 'activeDirectoryKey'>, directory?: string | null) => Agent[];
/**
 * A model as any loaded catalog lists it: the active directory's first, then
 * the snapshots of the others. For display only. A directory OpenCode is still
 * starting answers with a partial catalog for a second or two, and the
 * composer keeps the name it already knows meanwhile instead of a raw id.
 * Selection, variants and validation stay on the active catalog.
 */
export declare const selectKnownCatalogModel: (state: Pick<ConfigStore, 'providers' | 'directoryScoped'>, providerId: string, modelId: string) => ProviderModel | undefined;
/** An agent as any loaded catalog lists it; the display counterpart of `selectKnownCatalogModel`. */
export declare const selectKnownAgent: (state: Pick<ConfigStore, 'agents' | 'directoryScoped'>, name: string) => Agent | undefined;
export declare const selectCatalogLoadedForDirectory: (state: Pick<ConfigStore, 'agentsLoaded' | 'providersLoaded' | 'directoryScoped' | 'activeDirectoryKey'>, resource: 'models' | 'agents', directory?: string | null) => boolean;
export declare const useConfigStore: UseBoundStore<Omit<Omit<StoreApi<ConfigStore>, "devtools" | "setState"> & {
    setState(partial: ConfigStore | Partial<ConfigStore> | ((state: ConfigStore) => ConfigStore | Partial<ConfigStore>), replace?: false | undefined, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): void;
    setState(state: ConfigStore | ((state: ConfigStore) => ConfigStore), replace: true, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): void;
    devtools: {
        cleanup: () => void;
    };
}, "persist" | "setState"> & {
    setState(partial: ConfigStore | Partial<ConfigStore> | ((state: ConfigStore) => ConfigStore | Partial<ConfigStore>), replace?: false | undefined, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): unknown;
    setState(state: ConfigStore | ((state: ConfigStore) => ConfigStore), replace: true, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): unknown;
    persist: {
        setOptions: (options: Partial<import("zustand/middleware").PersistOptions<ConfigStore, unknown, unknown>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: ConfigStore) => void) => () => void;
        onFinishHydration: (fn: (state: ConfigStore) => void) => () => void;
        getOptions: () => Partial<import("zustand/middleware").PersistOptions<ConfigStore, unknown, unknown>>;
    };
}>;
export {};
