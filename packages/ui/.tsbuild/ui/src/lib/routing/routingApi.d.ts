/**
 * Client for the OpenChamber routing routes. The server owns the
 * configuration and the Jev key (`packages/web/server/lib/routing`); this
 * module speaks HTTP and parses what comes back.
 *
 * Every function throws on failure. A 404 means the build has no routing at
 * all and is reported as `available: false`, never as an empty config.
 */
import { z } from 'zod';
declare const routingCategorySchema: z.ZodObject<{
    id: z.ZodString;
    builtin: z.ZodBoolean;
    enabled: z.ZodBoolean;
    name: z.ZodString;
    description: z.ZodString;
    model: z.ZodNullable<z.ZodObject<{
        providerID: z.ZodString;
        modelID: z.ZodString;
    }, z.core.$strip>>;
    variant: z.ZodNullable<z.ZodString>;
    agent: z.ZodNullable<z.ZodString>;
}, z.core.$strip>;
declare const routingConfigSchema: z.ZodObject<{
    enabled: z.ZodBoolean;
    fallback: z.ZodNullable<z.ZodObject<{
        model: z.ZodObject<{
            providerID: z.ZodString;
            modelID: z.ZodString;
        }, z.core.$strip>;
        variant: z.ZodNullable<z.ZodString>;
    }, z.core.$strip>>;
    minConfidence: z.ZodNumber;
    preserveCache: z.ZodOptional<z.ZodBoolean>;
    safetyNet: z.ZodObject<{
        enabled: z.ZodBoolean;
        threshold: z.ZodNumber;
    }, z.core.$strip>;
    stickiness: z.ZodOptional<z.ZodObject<{
        enabled: z.ZodBoolean;
        enterTurns: z.ZodNumber;
        exitTurns: z.ZodNumber;
        strongConfidence: z.ZodNumber;
    }, z.core.$strip>>;
    categories: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        builtin: z.ZodBoolean;
        enabled: z.ZodBoolean;
        name: z.ZodString;
        description: z.ZodString;
        model: z.ZodNullable<z.ZodObject<{
            providerID: z.ZodString;
            modelID: z.ZodString;
        }, z.core.$strip>>;
        variant: z.ZodNullable<z.ZodString>;
        agent: z.ZodNullable<z.ZodString>;
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const heldPermissionSchema: z.ZodObject<{
    permissionId: z.ZodString;
    score: z.ZodNumber;
    kind: z.ZodNullable<z.ZodString>;
}, z.core.$strip>;
/** Which Jev endpoint the server is calling: the user's TypeSafe key, or zen. */
declare const jevSourceSchema: z.ZodEnum<{
    typesafe: "typesafe";
    "zen-free": "zen-free";
}>;
/** A classification provider: which service answers Jev requests, or `off` for none. */
declare const classifierSourceSchema: z.ZodEnum<{
    custom: "custom";
    off: "off";
    openrouter: "openrouter";
    typesafe: "typesafe";
    vercel: "vercel";
    "zen-key": "zen-key";
    "zen-promo": "zen-promo";
}>;
/**
 * `/api/routing` as this build reads it, from any server version. Servers from
 * before the classifier pick send neither `jevAvailable` nor `classifier`; Jev
 * always answered there, through the free zen model. `classifier` is the
 * three-source view kept for v2.0.2 clients (null once OpenRouter, Vercel or a
 * custom endpoint is involved); `classification` is the full picture and wins
 * when present.
 */
export declare const routingStateSchema: z.ZodPipe<z.ZodObject<{
    available: z.ZodBoolean;
    autoReady: z.ZodBoolean;
    jevAvailable: z.ZodDefault<z.ZodBoolean>;
    tokenPresent: z.ZodBoolean;
    customEndpoint: z.ZodDefault<z.ZodNullable<z.ZodObject<{
        url: z.ZodString;
        model: z.ZodString;
        keyPresent: z.ZodBoolean;
        pinned: z.ZodDefault<z.ZodBoolean>;
    }, z.core.$strip>>>;
    enterpriseMode: z.ZodDefault<z.ZodBoolean>;
    jevSource: z.ZodEnum<{
        typesafe: "typesafe";
        "zen-free": "zen-free";
    }>;
    classifier: z.ZodDefault<z.ZodNullable<z.ZodObject<{
        selected: z.ZodCatch<z.ZodNullable<z.ZodEnum<{
            custom: "custom";
            off: "off";
            openrouter: "openrouter";
            typesafe: "typesafe";
            vercel: "vercel";
            "zen-key": "zen-key";
            "zen-promo": "zen-promo";
        }>>>;
        effective: z.ZodCatch<z.ZodNullable<z.ZodEnum<{
            custom: "custom";
            off: "off";
            openrouter: "openrouter";
            typesafe: "typesafe";
            vercel: "vercel";
            "zen-key": "zen-key";
            "zen-promo": "zen-promo";
        }>>>;
        sources: z.ZodPipe<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            usable: z.ZodBoolean;
        }, z.core.$strip>>, z.ZodTransform<{
            id: "custom" | "off" | "openrouter" | "typesafe" | "vercel" | "zen-key" | "zen-promo";
            usable: boolean;
        }[], {
            id: string;
            usable: boolean;
        }[]>>;
    }, z.core.$strip>>>;
    classification: z.ZodDefault<z.ZodNullable<z.ZodObject<{
        selected: z.ZodCatch<z.ZodNullable<z.ZodEnum<{
            custom: "custom";
            off: "off";
            openrouter: "openrouter";
            typesafe: "typesafe";
            vercel: "vercel";
            "zen-key": "zen-key";
            "zen-promo": "zen-promo";
        }>>>;
        effective: z.ZodCatch<z.ZodNullable<z.ZodEnum<{
            custom: "custom";
            off: "off";
            openrouter: "openrouter";
            typesafe: "typesafe";
            vercel: "vercel";
            "zen-key": "zen-key";
            "zen-promo": "zen-promo";
        }>>>;
        sources: z.ZodPipe<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            usable: z.ZodBoolean;
        }, z.core.$strip>>, z.ZodTransform<{
            id: "custom" | "off" | "openrouter" | "typesafe" | "vercel" | "zen-key" | "zen-promo";
            usable: boolean;
        }[], {
            id: string;
            usable: boolean;
        }[]>>;
    }, z.core.$strip>>>;
    config: z.ZodNullable<z.ZodObject<{
        enabled: z.ZodBoolean;
        fallback: z.ZodNullable<z.ZodObject<{
            model: z.ZodObject<{
                providerID: z.ZodString;
                modelID: z.ZodString;
            }, z.core.$strip>;
            variant: z.ZodNullable<z.ZodString>;
        }, z.core.$strip>>;
        minConfidence: z.ZodNumber;
        preserveCache: z.ZodOptional<z.ZodBoolean>;
        safetyNet: z.ZodObject<{
            enabled: z.ZodBoolean;
            threshold: z.ZodNumber;
        }, z.core.$strip>;
        stickiness: z.ZodOptional<z.ZodObject<{
            enabled: z.ZodBoolean;
            enterTurns: z.ZodNumber;
            exitTurns: z.ZodNumber;
            strongConfidence: z.ZodNumber;
        }, z.core.$strip>>;
        categories: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            builtin: z.ZodBoolean;
            enabled: z.ZodBoolean;
            name: z.ZodString;
            description: z.ZodString;
            model: z.ZodNullable<z.ZodObject<{
                providerID: z.ZodString;
                modelID: z.ZodString;
            }, z.core.$strip>>;
            variant: z.ZodNullable<z.ZodString>;
            agent: z.ZodNullable<z.ZodString>;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
    builtins: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        description: z.ZodString;
    }, z.core.$strip>>;
    heldPermissions: z.ZodOptional<z.ZodArray<z.ZodObject<{
        permissionId: z.ZodString;
        score: z.ZodNumber;
        kind: z.ZodNullable<z.ZodString>;
    }, z.core.$strip>>>;
}, z.core.$strip>, z.ZodTransform<{
    available: boolean;
    autoReady: boolean;
    jevAvailable: boolean;
    tokenPresent: boolean;
    customEndpoint: {
        url: string;
        model: string;
        keyPresent: boolean;
        pinned: boolean;
    } | null;
    enterpriseMode: boolean;
    jevSource: "typesafe" | "zen-free";
    config: {
        enabled: boolean;
        fallback: {
            model: {
                providerID: string;
                modelID: string;
            };
            variant: string | null;
        } | null;
        minConfidence: number;
        preserveCache?: boolean | undefined;
        safetyNet: {
            enabled: boolean;
            threshold: number;
        };
        stickiness?: {
            enabled: boolean;
            enterTurns: number;
            exitTurns: number;
            strongConfidence: number;
        } | undefined;
        categories: {
            id: string;
            builtin: boolean;
            enabled: boolean;
            name: string;
            description: string;
            model: {
                providerID: string;
                modelID: string;
            } | null;
            variant: string | null;
            agent: string | null;
        }[];
    } | null;
    builtins: {
        id: string;
        name: string;
        description: string;
    }[];
    heldPermissions?: {
        permissionId: string;
        score: number;
        kind: string | null;
    }[] | undefined;
    classifier: {
        selected: "custom" | "off" | "openrouter" | "typesafe" | "vercel" | "zen-key" | "zen-promo" | null;
        effective: "custom" | "off" | "openrouter" | "typesafe" | "vercel" | "zen-key" | "zen-promo" | null;
        sources: {
            id: "custom" | "off" | "openrouter" | "typesafe" | "vercel" | "zen-key" | "zen-promo";
            usable: boolean;
        }[];
    } | null;
}, {
    available: boolean;
    autoReady: boolean;
    jevAvailable: boolean;
    tokenPresent: boolean;
    customEndpoint: {
        url: string;
        model: string;
        keyPresent: boolean;
        pinned: boolean;
    } | null;
    enterpriseMode: boolean;
    jevSource: "typesafe" | "zen-free";
    classifier: {
        selected: "custom" | "off" | "openrouter" | "typesafe" | "vercel" | "zen-key" | "zen-promo" | null;
        effective: "custom" | "off" | "openrouter" | "typesafe" | "vercel" | "zen-key" | "zen-promo" | null;
        sources: {
            id: "custom" | "off" | "openrouter" | "typesafe" | "vercel" | "zen-key" | "zen-promo";
            usable: boolean;
        }[];
    } | null;
    classification: {
        selected: "custom" | "off" | "openrouter" | "typesafe" | "vercel" | "zen-key" | "zen-promo" | null;
        effective: "custom" | "off" | "openrouter" | "typesafe" | "vercel" | "zen-key" | "zen-promo" | null;
        sources: {
            id: "custom" | "off" | "openrouter" | "typesafe" | "vercel" | "zen-key" | "zen-promo";
            usable: boolean;
        }[];
    } | null;
    config: {
        enabled: boolean;
        fallback: {
            model: {
                providerID: string;
                modelID: string;
            };
            variant: string | null;
        } | null;
        minConfidence: number;
        preserveCache?: boolean | undefined;
        safetyNet: {
            enabled: boolean;
            threshold: number;
        };
        stickiness?: {
            enabled: boolean;
            enterTurns: number;
            exitTurns: number;
            strongConfidence: number;
        } | undefined;
        categories: {
            id: string;
            builtin: boolean;
            enabled: boolean;
            name: string;
            description: string;
            model: {
                providerID: string;
                modelID: string;
            } | null;
            variant: string | null;
            agent: string | null;
        }[];
    } | null;
    builtins: {
        id: string;
        name: string;
        description: string;
    }[];
    heldPermissions?: {
        permissionId: string;
        score: number;
        kind: string | null;
    }[] | undefined;
}>>;
export type RoutingCategory = z.infer<typeof routingCategorySchema>;
export type RoutingConfig = z.infer<typeof routingConfigSchema>;
export type RoutingHeldPermission = z.infer<typeof heldPermissionSchema>;
export type RoutingJevSource = z.infer<typeof jevSourceSchema>;
export type ClassifierSource = z.infer<typeof classifierSourceSchema>;
export type RoutingState = z.infer<typeof routingStateSchema>;
/**
 * What Settings saves for the custom endpoint. `key`: a string replaces the
 * saved key, null removes it, absent keeps it.
 */
export interface CustomEndpointInput {
    url: string;
    model: string;
    key?: string | null;
}
export declare const ROUTING_UNAVAILABLE: RoutingState;
export declare const fetchRoutingState: () => Promise<RoutingState>;
export declare const saveRoutingConfig: (config: RoutingConfig) => Promise<RoutingState>;
export declare const saveRoutingToken: (token: string) => Promise<RoutingState>;
export declare const clearRoutingToken: () => Promise<RoutingState>;
export declare const saveClassifierSource: (source: ClassifierSource) => Promise<RoutingState>;
export declare const saveCustomEndpoint: (endpoint: CustomEndpointInput) => Promise<RoutingState>;
export declare const clearCustomEndpoint: () => Promise<RoutingState>;
declare const classifierTestSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    ok: z.ZodLiteral<true>;
    source: z.ZodEnum<{
        custom: "custom";
        openrouter: "openrouter";
        typesafe: "typesafe";
        vercel: "vercel";
        "zen-key": "zen-key";
        "zen-promo": "zen-promo";
    }>;
    model: z.ZodString;
    ms: z.ZodNumber;
}, z.core.$strip>, z.ZodObject<{
    ok: z.ZodLiteral<false>;
    reason: z.ZodEnum<{
        http: "http";
        network: "network";
        timeout: "timeout";
        unavailable: "unavailable";
        unparsable: "unparsable";
    }>;
    source: z.ZodOptional<z.ZodEnum<{
        custom: "custom";
        openrouter: "openrouter";
        typesafe: "typesafe";
        vercel: "vercel";
        "zen-key": "zen-key";
        "zen-promo": "zen-promo";
    }>>;
    model: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodNumber>;
    message: z.ZodOptional<z.ZodString>;
}, z.core.$strip>], "ok">;
export type ClassifierTestResult = z.infer<typeof classifierTestSchema>;
/**
 * One Jev request through the provider answering now, or through `custom`
 * endpoint fields as typed (an empty key reuses the saved one). Saves nothing.
 */
export declare const parseClassifierTestResult: (payload: unknown) => ClassifierTestResult;
export declare const testClassifier: (custom?: CustomEndpointInput) => Promise<ClassifierTestResult>;
export {};
