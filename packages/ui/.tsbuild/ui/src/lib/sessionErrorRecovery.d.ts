import { z } from 'zod';
import type { Message, ModelSelection } from '@/lib/opencode/model';
export declare const MODEL_ROUTE_PROVIDER_ID = "opencode-route";
declare const routeSettingsSchema: z.ZodObject<{
    opencodeRoute: z.ZodOptional<z.ZodObject<{
        targets: z.ZodOptional<z.ZodArray<z.ZodAny>>;
    }, z.core.$loose>>;
}, z.core.$loose>;
type CatalogModel = {
    id: string;
    settings?: z.infer<typeof routeSettingsSchema>;
};
type CatalogProvider = {
    id: string;
    models?: CatalogModel[];
};
/** The concrete and nested targets OpenCode compiled into a routed catalog model. */
export declare const getModelPoolTargets: (providers: readonly CatalogProvider[], providerID: string, modelID: string) => ModelSelection[];
/**
 * Advance in the pool's configured order from the concrete model that just
 * failed. If the failed attempt is not known, try the second configured target
 * (the first fallback); a one-target pool has no next choice.
 */
export declare const nextModelPoolTarget: (targets: readonly ModelSelection[], failedModel?: Pick<ModelSelection, 'providerID' | 'id'> | null) => ModelSelection | null;
/** The prompt associated with an error anchor, or the latest prompt for a session-level notice. */
export declare const recoveryUserMessage: (messages: readonly Message[], anchorMessageID?: string) => Extract<Message, {
    role: 'user';
}> | null;
/** The error anchor's model is the best clue; a previous reply is the fallback for a no-reply error. */
export declare const modelForRecoveryAnchor: (messages: readonly Message[], anchorMessageID: string | undefined, userMessageID: string) => Pick<ModelSelection, 'providerID' | 'id'> | null;
export {};
