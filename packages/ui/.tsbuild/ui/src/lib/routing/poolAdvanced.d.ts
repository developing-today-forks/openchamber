import { type AutonomyLevel, type ModelRoute, type ModelRouteTarget, type ModelRouteTuning } from '@/lib/routing/modelRoutesApi';
/** The model a budget or weight is keyed by: the target without its `#variant` suffix. */
export declare const targetReference: (target: ModelRouteTarget) => string;
/** A pattern such as `openai/*` names several models, so it cannot carry its own budget or weight. */
export declare const isConcreteTarget: (target: ModelRouteTarget) => boolean;
/** Blank or non-numeric form input means the setting is unset. */
/** The select's default entry stands for no value, so it clears the field; any other entry is the value. */
export declare const pickedValue: (picked: string) => string | undefined;
/** The autonomy select's default entry clears the level; each listed level stands for itself. */
export declare const pickedAutonomy: (picked: string) => AutonomyLevel | undefined;
export declare const parseFormNumber: (value: string) => number | undefined;
/** Sets or removes one key; an undefined value removes it so OpenCode's default applies again. */
export declare const withOptional: (record: object | undefined, key: string, value: unknown) => Record<string, unknown>;
/** An object with no keys left is removed entirely rather than saved as `{}`. */
export declare const pruneEmpty: <T extends object>(record: T) => T | undefined;
export declare const setRouteField: (route: ModelRoute, key: keyof ModelRoute, value: unknown) => ModelRoute;
/** Writes one field of a per-target map (budgets or weights), dropping the map when it empties. */
export declare const setTargetEntry: <T extends object>(map: Record<string, T> | undefined, reference: string, entry: T | undefined) => Record<string, T> | undefined;
export type TargetOptions = {
    defaultVariant?: string;
    variants?: Record<string, string>;
    until?: number;
};
export declare const targetLabel: (target: ModelRouteTarget) => string;
export declare const targetUntil: (target: ModelRouteTarget) => number | undefined;
export declare const targetOptions: (target: ModelRouteTarget) => TargetOptions;
/** A target with no options stays a plain string so the saved config keeps its short form. */
export declare const withTargetOptions: (target: ModelRouteTarget, options: TargetOptions) => ModelRouteTarget;
/** The route id a target points at when it is another pool, or null for a model. */
export declare const routeReferenceID: (target: ModelRouteTarget) => string | null;
export declare const routeReference: (routeID: string) => string;
/** An epoch-millisecond instant as the local value a datetime-local input expects. */
export declare const epochToLocalInput: (epoch: number | undefined) => string;
/** The automatic-review settings to save, or null when every field is back at its default. */
export declare const tuningToSave: (tuning: ModelRouteTuning) => ModelRouteTuning | null;
/**
 * Whether a weight key names a target, as the server reads it: the target's
 * reference, or a concrete model that a `*` target matches. Mirrors
 * `keyNamesTarget` in `packages/web/server/lib/routing/model-routes.js`.
 */
export declare const weightNamesTarget: (key: string, target: ModelRouteTarget) => boolean;
/** Drops the weights of targets the route no longer has, so a removed or edited target cannot block the save. */
export declare const withoutAbsentWeights: (route: ModelRoute) => ModelRoute;
