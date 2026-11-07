/**
 * The Auto routing sentinel. The composer sends it as an ordinary model; the
 * OpenChamber server replaces it with a real model before OpenCode sees the
 * request. It is never a provider OpenCode knows about.
 */
export declare const AUTO_PROVIDER_ID = "openchamber";
export declare const AUTO_MODEL_ID = "auto";
export declare const isAutoModel: (providerId: string | null | undefined, modelId: string | null | undefined) => boolean;
