/**
 * Client for the sentence-driven routing rules (`/api/model-routes/rules`,
 * `/interpret`, `/settings`, `/wait`, `/local`). The server decides what a
 * sentence means and stores the rules where OpenCode reads them; this module
 * only speaks HTTP and parses the answers.
 */
import { z } from 'zod';
declare const ruleSchema: z.ZodObject<{
    id: z.ZodString;
    action: z.ZodEnum<{
        "allow-over-budget": "allow-over-budget";
        avoid: "avoid";
        prefer: "prefer";
    }>;
    providers: z.ZodArray<z.ZodString>;
    models: z.ZodArray<z.ZodString>;
    fixed: z.ZodBoolean;
    factor: z.ZodOptional<z.ZodNumber>;
    until: z.ZodNumber;
    text: z.ZodString;
    summary: z.ZodString;
    source: z.ZodEnum<{
        interpreter: "interpreter";
        user: "user";
    }>;
    createdAt: z.ZodNumber;
    origin: z.ZodOptional<z.ZodObject<{
        key: z.ZodString;
        option: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type RouteRule = z.infer<typeof ruleSchema>;
declare const interpretResultSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    status: z.ZodLiteral<"applied">;
    stage: z.ZodString;
    confidence: z.ZodString;
    summary: z.ZodString;
    rules: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        action: z.ZodEnum<{
            "allow-over-budget": "allow-over-budget";
            avoid: "avoid";
            prefer: "prefer";
        }>;
        providers: z.ZodArray<z.ZodString>;
        models: z.ZodArray<z.ZodString>;
        fixed: z.ZodBoolean;
        factor: z.ZodOptional<z.ZodNumber>;
        until: z.ZodNumber;
        text: z.ZodString;
        summary: z.ZodString;
        source: z.ZodEnum<{
            interpreter: "interpreter";
            user: "user";
        }>;
        createdAt: z.ZodNumber;
        origin: z.ZodOptional<z.ZodObject<{
            key: z.ZodString;
            option: z.ZodString;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
}, z.core.$strip>, z.ZodObject<{
    status: z.ZodLiteral<"clarify">;
    key: z.ZodString;
    question: z.ZodString;
    options: z.ZodArray<z.ZodString>;
}, z.core.$strip>, z.ZodObject<{
    status: z.ZodLiteral<"unknown">;
    reason: z.ZodString;
}, z.core.$strip>], "status">;
export type InterpretResult = z.infer<typeof interpretResultSchema>;
declare const settingsSchema: z.ZodObject<{
    stages: z.ZodObject<{
        keywords: z.ZodBoolean;
        local: z.ZodBoolean;
        external: z.ZodBoolean;
    }, z.core.$strip>;
    learnAfter: z.ZodNumber;
    waitPercentile: z.ZodNumber;
    waitMinSamples: z.ZodNumber;
}, z.core.$strip>;
export type RouteRulesSettings = z.infer<typeof settingsSchema>;
declare const localModelSchema: z.ZodObject<{
    label: z.ZodString;
    bytes: z.ZodNumber;
    installed: z.ZodBoolean;
    downloadedBytes: z.ZodNumber;
    downloading: z.ZodBoolean;
    error: z.ZodNullable<z.ZodString>;
}, z.core.$strip>;
export type LocalModelStatus = z.infer<typeof localModelSchema>;
declare const waitSchema: z.ZodObject<{
    active: z.ZodNullable<z.ZodObject<{
        until: z.ZodNumber;
        remainingMs: z.ZodNumber;
    }, z.core.$strip>>;
    expectedMs: z.ZodNullable<z.ZodNumber>;
    basis: z.ZodString;
    samples: z.ZodNumber;
    reason: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type WaitEstimate = z.infer<typeof waitSchema>;
interface RoutingContext {
    providers: string[];
    models: Array<{
        id: string;
        providerID: string;
    }>;
}
export declare const routingContextFromProviders: (providers: ReadonlyArray<{
    id: string;
    models: ReadonlyArray<{
        id: string;
    }>;
}>) => RoutingContext;
export declare const fetchRouteRules: () => Promise<RouteRule[]>;
export declare const interpretRoute: (text: string, context: RoutingContext) => Promise<InterpretResult>;
export declare const answerRouteQuestion: (text: string, context: RoutingContext, key: string, label: string) => Promise<InterpretResult>;
export declare const undoRouteRule: (id: string) => Promise<RouteRule[]>;
export declare const fetchRouteSettings: () => Promise<RouteRulesSettings>;
export declare const saveRouteSettings: (settings: RouteRulesSettings) => Promise<RouteRulesSettings>;
export declare const fetchWaitEstimate: (providerID: string, modelID: string) => Promise<WaitEstimate>;
export declare const fetchLocalModel: () => Promise<LocalModelStatus>;
export declare const downloadLocalModel: () => Promise<LocalModelStatus>;
export {};
