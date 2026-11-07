export type ContextWindowLimits = {
    /** 0 when unknown; the readouts then fall back to their own default. */
    context: number;
    output: number;
};
type AnsweringMessage = {
    role?: string;
    providerID?: string;
    modelID?: string;
};
/**
 * `provider/model` of the newest assistant message, or null before the first
 * answer. Reduced to a string so a store selector can return it and only
 * notify when the answering model changes, not on every streamed part.
 */
export declare const findAnsweringModelKey: (messages: readonly AnsweringMessage[]) => string | null;
type SessionModelLike = {
    model?: {
        providerID: string;
        id: string;
    };
};
/**
 * `provider/model` the session record runs on, or null. OpenCode 2.x keeps
 * the model on the session: a manual switch and an Auto-routed turn both land
 * here before any answer exists, so it is the authority the readouts measure
 * against first.
 */
export declare const findSessionModelKey: (session: SessionModelLike | undefined) => string | null;
type ProviderModelLike = {
    id: string;
    limit?: {
        context?: number;
        output?: number;
    };
};
type ProviderLike = {
    id: string;
    models: readonly ProviderModelLike[];
};
/**
 * Limits of the model behind a key produced by `findAnsweringModelKey`, read
 * from OpenCode's provider list — the same source the composer model and the
 * context overview use. The models.dev catalog can disagree with it (it lists
 * a 1M window for a model OpenCode serves with 400K), and the readouts must
 * not switch catalogs just because Auto is selected.
 */
export declare const limitsForAnsweringModel: (answeringModelKey: string | null, providers: readonly ProviderLike[]) => ContextWindowLimits;
export {};
