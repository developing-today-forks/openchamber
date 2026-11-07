export type DisplayModel = Record<string, unknown> & {
    id?: unknown;
    /** v2 provider API name; equals `id` except for derived entries such as Fast models. */
    modelID?: unknown;
    name?: unknown;
};
export type DisplayProvider = {
    models?: DisplayModel[] | Record<string, DisplayModel | undefined>;
} | null | undefined;
type ModelDisplayOptions = {
    fallbackLabel?: string;
    maxLength?: number;
};
export declare const humanizeModelId: (modelId: string | null | undefined) => string;
export declare const getModelDisplayName: (model: DisplayModel | null | undefined, fallbackModelId?: string | null, options?: ModelDisplayOptions) => string;
export declare const getProviderModelDisplayName: (provider: DisplayProvider, modelId: string | null | undefined, options?: ModelDisplayOptions) => string;
export {};
