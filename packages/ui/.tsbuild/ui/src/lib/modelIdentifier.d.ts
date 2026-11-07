export interface ParsedModelIdentifier {
    providerId: string;
    modelId: string;
}
export declare const parseModelIdentifier: (value: string | undefined) => ParsedModelIdentifier | null;
/**
 * A model reference as OpenCode 2 stores it in config: `providerID/modelID`
 * with an optional `#variant` suffix. The split/join pair mirrors
 * `parseModelSelection`/`formatModelSelection` in the server's `config-v2.js`
 * so the Settings UI and the config writer agree on one spelling.
 */
interface ModelSelection {
    providerID: string;
    modelID: string;
    variant?: string;
}
export declare const parseModelSelection: (model: string | null | undefined, variant?: string | null) => ModelSelection | null;
export declare const formatModelSelection: (selection: ModelSelection | null | undefined) => string | null;
export {};
