import { z } from 'zod';
import type { Model } from '@/lib/opencode/model';
import type { CustomProviderIcon } from '@/lib/customProviderIcons';
/**
 * Custom provider form helpers.
 * Mirrors OpenCode web UI validation and request construction so a provider
 * can be defined from Settings without code changes.
 */
/**
 * OpenCode 2 names a provider's SDK in `package`, and an AI SDK package carries
 * the `aisdk:` prefix. `@ai-sdk/openai-compatible` is the default because that
 * is what a self-hosted OpenAI-shaped endpoint needs.
 */
export declare const CUSTOM_PROVIDER_PROTOCOLS: {
    readonly 'openai-chat': 'aisdk:@ai-sdk/openai-compatible';
    readonly 'openai-responses': 'aisdk:@ai-sdk/openai';
    readonly 'anthropic-messages': 'aisdk:@ai-sdk/anthropic';
};
export type CustomProviderProtocol = keyof typeof CUSTOM_PROVIDER_PROTOCOLS;
export type CustomProviderPackage = (typeof CUSTOM_PROVIDER_PROTOCOLS)[CustomProviderProtocol];
export declare const CUSTOM_PROVIDER_ID = "__custom_provider__";
export type CustomProviderTranslator = (key: string, vars?: Record<string, string | number | boolean>) => string;
/** One reasoning level as OpenCode stores it: an id plus the request change. */
type ModelVariantConfig = Model['variants'][number];
/** What one reasoning level changes on the request. */
export type ModelVariantOverlay = Omit<ModelVariantConfig, 'id'>;
export type ModelRow = {
    row: string;
    id: string;
    name: string;
    contextWindow: string;
    maxOutputTokens: string;
    inputCapabilities: string[];
    outputCapabilities: string[];
    tools: boolean;
    /**
     * Whether the capabilities above are known (saved config, discovery, or the
     * user's own edit). Unknown ones are not written, so a save never replaces
     * what OpenCode knows about the model with a text-only default.
     */
    capabilitiesKnown: boolean;
    metadataSource?: 'provider-api' | 'models.dev' | 'manual';
    /** Comma-separated reasoning levels, e.g. "low, medium, high". */
    variants: string;
    /**
     * Levels loaded from the saved config, kept verbatim so a hand-written
     * overlay survives an edit. Emptied when the protocol changes; undefined
     * only for rows the user added in this form.
     */
    savedVariants?: Record<string, ModelVariantOverlay>;
};
export type HeaderRow = {
    row: string;
    key: string;
    value: string;
};
export type CustomProviderFormState = {
    providerID: string;
    name: string;
    /** Null keeps the provider's own logo or the generic fallback. */
    icon: CustomProviderIcon | null;
    protocol: CustomProviderProtocol;
    baseURL: string;
    apiKey: string;
    models: ModelRow[];
    headers: HeaderRow[];
};
export type FieldErrors = {
    providerID?: string;
    name?: string;
    baseURL?: string;
    apiKey?: string;
};
export type ModelFieldErrors = {
    id?: string;
    name?: string;
    contextWindow?: string;
    maxOutputTokens?: string;
};
export type HeaderFieldErrors = {
    key?: string;
    value?: string;
};
export type CustomProviderConfig = {
    package: CustomProviderPackage;
    name: string;
    env?: string[];
    settings: {
        baseURL: string;
    };
    headers?: Record<string, string>;
    models: Record<string, CustomProviderModelConfig>;
};
export type CustomProviderModelConfig = {
    modelID: string;
    name: string;
    variants?: ModelVariantConfig[];
    limit?: {
        context?: number;
        output?: number;
    };
    capabilities?: {
        tools: boolean;
        input: string[];
        output: string[];
    };
};
export type CustomProviderPersistPlan = {
    providerID: string;
    name: string;
    icon: CustomProviderIcon | null;
    /** Literal API key stored as an OpenCode credential after the config write; omitted when using {env:VAR} or empty. */
    apiKey?: string;
    /** Edit without a new key or env: the provider keeps the credential OpenCode already holds. */
    keepsStoredCredential?: boolean;
    config: CustomProviderConfig;
};
export type ValidateCustomProviderInput = {
    form: CustomProviderFormState;
    t: CustomProviderTranslator;
    existingProviderIDs: ReadonlySet<string>;
    disabledProviders?: readonly string[];
    /** When editing this provider id, treat it as an allowed update target. */
    editingProviderID?: string;
    /**
     * When true, empty apiKey is allowed because auth.json already has a credential
     * (edit path). Still requires env or key when false.
     */
    allowExistingAuth?: boolean;
};
export type ValidateCustomProviderResult = {
    err: FieldErrors;
    models: ModelFieldErrors[];
    headers: HeaderFieldErrors[];
    result?: CustomProviderPersistPlan;
};
export type ProviderLikeForCustomForm = {
    id: string;
    name?: string;
    env?: string[];
    /** v2 spelling. */
    package?: string;
    settings?: Record<string, unknown> | null;
    headers?: Record<string, string> | null;
    /** v1 spelling, still read from older config entries. */
    options?: Record<string, unknown> | null;
    models?: Array<{
        id?: string;
        modelID?: string;
        name?: string;
        package?: string;
        api?: {
            npm?: string;
        };
        variants?: readonly ModelVariantConfig[];
        limit?: {
            context?: number;
            output?: number;
        };
        capabilities?: {
            tools?: boolean;
            input?: string[];
            output?: string[];
        };
    }> | Record<string, unknown>;
};
export declare const createModelRow: () => ModelRow;
declare const discoveredModelSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    limit: z.ZodOptional<z.ZodObject<{
        context: z.ZodOptional<z.ZodNumber>;
        output: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>>;
    capabilities: z.ZodOptional<z.ZodObject<{
        tools: z.ZodBoolean;
        input: z.ZodArray<z.ZodString>;
        output: z.ZodArray<z.ZodString>;
    }, z.core.$strip>>;
    metadata: z.ZodOptional<z.ZodObject<{
        providerID: z.ZodString;
        modelID: z.ZodString;
        name: z.ZodOptional<z.ZodString>;
        limit: z.ZodOptional<z.ZodObject<{
            context: z.ZodOptional<z.ZodNumber>;
            output: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>>;
        capabilities: z.ZodOptional<z.ZodObject<{
            tools: z.ZodBoolean;
            input: z.ZodArray<z.ZodString>;
            output: z.ZodArray<z.ZodString>;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
/** What `POST /api/provider/discover-models` answers on success. */
export declare const modelDiscoveryResponseSchema: z.ZodObject<{
    models: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        limit: z.ZodOptional<z.ZodObject<{
            context: z.ZodOptional<z.ZodNumber>;
            output: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>>;
        capabilities: z.ZodOptional<z.ZodObject<{
            tools: z.ZodBoolean;
            input: z.ZodArray<z.ZodString>;
            output: z.ZodArray<z.ZodString>;
        }, z.core.$strip>>;
        metadata: z.ZodOptional<z.ZodObject<{
            providerID: z.ZodString;
            modelID: z.ZodString;
            name: z.ZodOptional<z.ZodString>;
            limit: z.ZodOptional<z.ZodObject<{
                context: z.ZodOptional<z.ZodNumber>;
                output: z.ZodOptional<z.ZodNumber>;
            }, z.core.$strip>>;
            capabilities: z.ZodOptional<z.ZodObject<{
                tools: z.ZodBoolean;
                input: z.ZodArray<z.ZodString>;
                output: z.ZodArray<z.ZodString>;
            }, z.core.$strip>>;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
/** What it answers on failure. */
export declare const modelDiscoveryErrorSchema: z.ZodObject<{
    error: z.ZodString;
}, z.core.$strip>;
export type DiscoveredModel = z.infer<typeof discoveredModelSchema>;
/**
 * A form row for one discovered model. The provider's own numbers win over
 * models.dev field by field; a model nothing describes defaults to text in,
 * text out, with tool calls.
 */
export declare const modelRowFromDiscovery: (model: DiscoveredModel) => ModelRow;
export declare const createHeaderRow: () => HeaderRow;
export declare const createEmptyCustomProviderForm: () => CustomProviderFormState;
export declare function isCustomOpenAICompatibleProvider(provider: ProviderLikeForCustomForm): boolean;
export type ProviderConfigSourcesLike = {
    user?: {
        exists?: boolean;
    };
    project?: {
        exists?: boolean;
    };
    custom?: {
        exists?: boolean;
    };
};
export type ProviderConfigScope = 'user' | 'project' | 'custom';
/**
 * True when a provider both looks OpenAI-compatible-custom and is defined in a
 * user/project/custom OpenCode config layer. Catalog-only providers often share
 * the same npm/baseURL signals and must not get Edit / config overrides.
 */
export declare function isConfigDefinedCustomProvider(provider: ProviderLikeForCustomForm, sources: ProviderConfigSourcesLike | null | undefined): boolean;
/**
 * Effective writable config layer for a provider, matching OpenCode merge
 * precedence: custom > project > user.
 */
export declare function resolveProviderConfigScope(sources: ProviderConfigSourcesLike | null | undefined): ProviderConfigScope;
export declare function providerToCustomFormState(provider: ProviderLikeForCustomForm): CustomProviderFormState;
export declare const storedProviderEntrySchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    package: z.ZodOptional<z.ZodString>;
    env: z.ZodOptional<z.ZodArray<z.ZodString>>;
    settings: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    models: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
        modelID: z.ZodOptional<z.ZodString>;
        name: z.ZodOptional<z.ZodString>;
        package: z.ZodOptional<z.ZodString>;
        variants: z.ZodOptional<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            settings: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
            body: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, z.core.$strip>>>;
        limit: z.ZodOptional<z.ZodObject<{
            context: z.ZodOptional<z.ZodNumber>;
            output: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>>;
        capabilities: z.ZodOptional<z.ZodObject<{
            tools: z.ZodOptional<z.ZodBoolean>;
            input: z.ZodOptional<z.ZodArray<z.ZodString>>;
            output: z.ZodOptional<z.ZodArray<z.ZodString>>;
        }, z.core.$strip>>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
/**
 * The provider entry as written in the OpenCode config file, returned by
 * `/api/provider/:id/source` in v2 shape. Unlike the live provider it keeps
 * `env` and carries only the reasoning levels the user wrote.
 */
export type StoredProviderEntry = z.infer<typeof storedProviderEntrySchema>;
/**
 * Edit form state for a config-defined provider. The stored entry is the
 * source of truth; the live provider only fills the name, protocol, base URL,
 * or models when the entry leaves them out (inherited from elsewhere). Live reasoning levels are never
 * loaded: OpenCode generates them, and saving them back would write levels the
 * user never configured. Without a stored entry, live models load without
 * levels, so a save leaves the models' stored levels as they are.
 */
export declare function providerToEditFormState(live: ProviderLikeForCustomForm, stored: StoredProviderEntry | null, icon?: CustomProviderIcon | null): CustomProviderFormState;
/**
 * Validates form input and builds the auth + OpenCode provider config payloads.
 */
export declare function validateCustomProvider(input: ValidateCustomProviderInput): ValidateCustomProviderResult;
/**
 * Builds the `integration.connect.key` request body when a literal API key is
 * present. OpenCode v2 stores provider keys as integration credentials; there
 * is no `auth.json` to write any more. A custom provider has no catalog entry,
 * so OpenCode registers its key method only once the provider is in config:
 * send this after the config write (see `storeKeyAfterConfigWrite`).
 */
export declare function buildIntegrationKeyRequest(plan: CustomProviderPersistPlan): {
    integrationID: string;
    key: string;
} | null;
/**
 * Builds the OpenChamber provider upsert request body (config persistence).
 * `scope` selects the OpenCode config layer (user/project/custom). Create
 * defaults to user; edit must pass the provider's effective existing layer.
 */
export declare function buildProviderUpsertRequest(plan: CustomProviderPersistPlan, options?: {
    scope?: ProviderConfigScope;
}): {
    providerID: string;
    config: CustomProviderConfig;
    scope: ProviderConfigScope;
    hasCredential: boolean;
};
/**
 * Stores a custom provider's key right after its config was written. OpenCode
 * picks the config up from its file watcher, and until then it rejects the key
 * with "Integration not found"; only that rejection is retried, briefly.
 */
export declare function storeKeyAfterConfigWrite(connectKey: () => Promise<unknown>, wait?: (ms: number) => Promise<void>): Promise<void>;
export {};
