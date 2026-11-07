/**
 * Client for the OpenChamber model-pool routes (`/api/model-routes`). The
 * server owns the OpenCode config file; this module speaks HTTP and parses
 * what comes back. A 404 means the build has no model pools at all and is
 * reported as `available: false`, never as an empty map.
 */
import { z } from 'zod';
import { type ScheduleListValue } from '@/lib/routing/scheduleSchema';
export declare const AUTONOMY_LEVELS: readonly ['fixed', 'rules', 'adaptive', 'predictive', 'agent'];
export type AutonomyLevel = (typeof AUTONOMY_LEVELS)[number];
declare const targetSchema: z.ZodUnion<readonly [z.ZodString, z.ZodObject<{
    model: z.ZodString;
    defaultVariant: z.ZodOptional<z.ZodString>;
    variants: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    until: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>]>;
export declare const POOL_DESCRIPTION_MAX_LENGTH = 200;
export declare const POOL_DETAILS_MAX_LENGTH = 2000;
declare const modelRouteSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodCatch<z.ZodOptional<z.ZodString>>;
    details: z.ZodCatch<z.ZodOptional<z.ZodString>>;
    targets: z.ZodArray<z.ZodUnion<readonly [z.ZodString, z.ZodObject<{
        model: z.ZodString;
        defaultVariant: z.ZodOptional<z.ZodString>;
        variants: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        until: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>]>>;
    autonomy: z.ZodOptional<z.ZodEnum<{
        adaptive: "adaptive";
        agent: "agent";
        fixed: "fixed";
        predictive: "predictive";
        rules: "rules";
    }>>;
    selection: z.ZodOptional<z.ZodEnum<{
        ordered: "ordered";
        "round-robin": "round-robin";
        weighted: "weighted";
    }>>;
    weights: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
    attempts: z.ZodOptional<z.ZodNumber>;
    hedgeAfterMs: z.ZodOptional<z.ZodNumber>;
    health: z.ZodOptional<z.ZodObject<{
        firstTokenTimeoutMs: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodLiteral<false>]>>;
        maxResponseTimeMs: z.ZodOptional<z.ZodNumber>;
        minOutputTokensPerSecond: z.ZodOptional<z.ZodNumber>;
        sampleWindow: z.ZodOptional<z.ZodNumber>;
        slowThreshold: z.ZodOptional<z.ZodNumber>;
        cooldownMs: z.ZodOptional<z.ZodNumber>;
        quotaCooldownMs: z.ZodOptional<z.ZodNumber>;
    }, z.core.$loose>>;
    budgets: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
        requestsPerMinute: z.ZodOptional<z.ZodNumber>;
        requestsPerDay: z.ZodOptional<z.ZodNumber>;
        tokensPerMinute: z.ZodOptional<z.ZodNumber>;
        tokensPerDay: z.ZodOptional<z.ZodNumber>;
        softLimit: z.ZodOptional<z.ZodNumber>;
    }, z.core.$loose>>>;
    schedules: z.ZodOptional<z.ZodJSONSchema>;
}, z.core.$loose>;
export type ModelRoute = z.infer<typeof modelRouteSchema>;
export type ModelRouteTarget = z.infer<typeof targetSchema>;
declare const modelRouteTuningSchema: z.ZodObject<{
    enabled: z.ZodOptional<z.ZodBoolean>;
    intervalMinutes: z.ZodOptional<z.ZodNumber>;
    windowHours: z.ZodOptional<z.ZodNumber>;
}, z.core.$loose>;
export type ModelRouteTuning = z.infer<typeof modelRouteTuningSchema>;
declare const modelRoutesStateSchema: z.ZodObject<{
    routes: z.ZodRecord<z.ZodString, z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        description: z.ZodCatch<z.ZodOptional<z.ZodString>>;
        details: z.ZodCatch<z.ZodOptional<z.ZodString>>;
        targets: z.ZodArray<z.ZodUnion<readonly [z.ZodString, z.ZodObject<{
            model: z.ZodString;
            defaultVariant: z.ZodOptional<z.ZodString>;
            variants: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
            until: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>]>>;
        autonomy: z.ZodOptional<z.ZodEnum<{
            adaptive: "adaptive";
            agent: "agent";
            fixed: "fixed";
            predictive: "predictive";
            rules: "rules";
        }>>;
        selection: z.ZodOptional<z.ZodEnum<{
            ordered: "ordered";
            "round-robin": "round-robin";
            weighted: "weighted";
        }>>;
        weights: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
        attempts: z.ZodOptional<z.ZodNumber>;
        hedgeAfterMs: z.ZodOptional<z.ZodNumber>;
        health: z.ZodOptional<z.ZodObject<{
            firstTokenTimeoutMs: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodLiteral<false>]>>;
            maxResponseTimeMs: z.ZodOptional<z.ZodNumber>;
            minOutputTokensPerSecond: z.ZodOptional<z.ZodNumber>;
            sampleWindow: z.ZodOptional<z.ZodNumber>;
            slowThreshold: z.ZodOptional<z.ZodNumber>;
            cooldownMs: z.ZodOptional<z.ZodNumber>;
            quotaCooldownMs: z.ZodOptional<z.ZodNumber>;
        }, z.core.$loose>>;
        budgets: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
            requestsPerMinute: z.ZodOptional<z.ZodNumber>;
            requestsPerDay: z.ZodOptional<z.ZodNumber>;
            tokensPerMinute: z.ZodOptional<z.ZodNumber>;
            tokensPerDay: z.ZodOptional<z.ZodNumber>;
            softLimit: z.ZodOptional<z.ZodNumber>;
        }, z.core.$loose>>>;
        schedules: z.ZodOptional<z.ZodJSONSchema>;
    }, z.core.$loose>>;
    tuning: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        enabled: z.ZodOptional<z.ZodBoolean>;
        intervalMinutes: z.ZodOptional<z.ZodNumber>;
        windowHours: z.ZodOptional<z.ZodNumber>;
    }, z.core.$loose>>>;
    schedules: z.ZodOptional<z.ZodNullable<z.ZodJSONSchema>>;
    otherRoutes: z.ZodOptional<z.ZodArray<z.ZodObject<{
        path: z.ZodString;
        routes: z.ZodRecord<z.ZodString, z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            description: z.ZodCatch<z.ZodOptional<z.ZodString>>;
            details: z.ZodCatch<z.ZodOptional<z.ZodString>>;
            targets: z.ZodArray<z.ZodUnion<readonly [z.ZodString, z.ZodObject<{
                model: z.ZodString;
                defaultVariant: z.ZodOptional<z.ZodString>;
                variants: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
                until: z.ZodOptional<z.ZodNumber>;
            }, z.core.$strip>]>>;
            autonomy: z.ZodOptional<z.ZodEnum<{
                adaptive: "adaptive";
                agent: "agent";
                fixed: "fixed";
                predictive: "predictive";
                rules: "rules";
            }>>;
            selection: z.ZodOptional<z.ZodEnum<{
                ordered: "ordered";
                "round-robin": "round-robin";
                weighted: "weighted";
            }>>;
            weights: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
            attempts: z.ZodOptional<z.ZodNumber>;
            hedgeAfterMs: z.ZodOptional<z.ZodNumber>;
            health: z.ZodOptional<z.ZodObject<{
                firstTokenTimeoutMs: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodLiteral<false>]>>;
                maxResponseTimeMs: z.ZodOptional<z.ZodNumber>;
                minOutputTokensPerSecond: z.ZodOptional<z.ZodNumber>;
                sampleWindow: z.ZodOptional<z.ZodNumber>;
                slowThreshold: z.ZodOptional<z.ZodNumber>;
                cooldownMs: z.ZodOptional<z.ZodNumber>;
                quotaCooldownMs: z.ZodOptional<z.ZodNumber>;
            }, z.core.$loose>>;
            budgets: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                requestsPerMinute: z.ZodOptional<z.ZodNumber>;
                requestsPerDay: z.ZodOptional<z.ZodNumber>;
                tokensPerMinute: z.ZodOptional<z.ZodNumber>;
                tokensPerDay: z.ZodOptional<z.ZodNumber>;
                softLimit: z.ZodOptional<z.ZodNumber>;
            }, z.core.$loose>>>;
            schedules: z.ZodOptional<z.ZodJSONSchema>;
        }, z.core.$loose>>;
    }, z.core.$strip>>>;
    otherSchedules: z.ZodOptional<z.ZodArray<z.ZodObject<{
        path: z.ZodString;
        schedules: z.ZodJSONSchema;
    }, z.core.$strip>>>;
    path: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
type ModelRoutesState = z.infer<typeof modelRoutesStateSchema> & {
    available: boolean;
};
export declare const fetchModelRoutes: (directory?: string | null) => Promise<ModelRoutesState>;
export declare const saveModelRoutes: (routes: Record<string, ModelRoute>) => Promise<ModelRoutesState>;
/** Saves the automatic-review settings; null removes them so OpenCode's defaults apply. */
export declare const saveModelRouteTuning: (tuning: ModelRouteTuning | null) => Promise<ModelRoutesState>;
/** Saves the schedules that apply across pools; null removes the list from the config. */
export declare const saveModelRouteSchedules: (schedules: ScheduleListValue | null, directory?: string | null) => Promise<ModelRoutesState>;
declare const routeTargetStatsSchema: z.ZodObject<{
    providerID: z.ZodString;
    modelID: z.ZodString;
    attempts: z.ZodNumber;
    failures: z.ZodNumber;
    timeouts: z.ZodNumber;
    avgFirstTokenMs: z.ZodNullable<z.ZodNumber>;
    avgTokensPerSecond: z.ZodNullable<z.ZodNumber>;
    lastAttempt: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
}, z.core.$strip>;
declare const routeErrorSchema: z.ZodObject<{
    providerID: z.ZodString;
    modelID: z.ZodString;
    tag: z.ZodNullable<z.ZodString>;
    code: z.ZodNullable<z.ZodString>;
    status: z.ZodNullable<z.ZodNumber>;
    count: z.ZodNumber;
    lastTime: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    lastMessage: z.ZodNullable<z.ZodString>;
}, z.core.$strip>;
declare const hedgeAccuracySchema: z.ZodObject<{
    providerID: z.ZodString;
    modelID: z.ZodString;
    hedges: z.ZodNumber;
    wins: z.ZodNumber;
}, z.core.$strip>;
declare const routeStatsSchema: z.ZodObject<{
    available: z.ZodBoolean;
    reason: z.ZodOptional<z.ZodString>;
    windowHours: z.ZodOptional<z.ZodNumber>;
    targets: z.ZodOptional<z.ZodArray<z.ZodObject<{
        providerID: z.ZodString;
        modelID: z.ZodString;
        attempts: z.ZodNumber;
        failures: z.ZodNumber;
        timeouts: z.ZodNumber;
        avgFirstTokenMs: z.ZodNullable<z.ZodNumber>;
        avgTokensPerSecond: z.ZodNullable<z.ZodNumber>;
        lastAttempt: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    }, z.core.$strip>>>;
    errors: z.ZodOptional<z.ZodArray<z.ZodObject<{
        providerID: z.ZodString;
        modelID: z.ZodString;
        tag: z.ZodNullable<z.ZodString>;
        code: z.ZodNullable<z.ZodString>;
        status: z.ZodNullable<z.ZodNumber>;
        count: z.ZodNumber;
        lastTime: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        lastMessage: z.ZodNullable<z.ZodString>;
    }, z.core.$strip>>>;
    hedges: z.ZodOptional<z.ZodArray<z.ZodObject<{
        providerID: z.ZodString;
        modelID: z.ZodString;
        hedges: z.ZodNumber;
        wins: z.ZodNumber;
    }, z.core.$strip>>>;
}, z.core.$strip>;
export type RouteTargetStats = z.infer<typeof routeTargetStatsSchema>;
export type RouteErrorGroup = z.infer<typeof routeErrorSchema>;
export type HedgeAccuracy = z.infer<typeof hedgeAccuracySchema>;
type RouteStats = z.infer<typeof routeStatsSchema>;
export declare const fetchRouteStats: (hours?: number) => Promise<RouteStats>;
declare const messageAttributionSchema: z.ZodObject<{
    providerID: z.ZodString;
    modelID: z.ZodString;
    variant: z.ZodNullable<z.ZodString>;
    routeID: z.ZodNullable<z.ZodString>;
    selection: z.ZodNullable<z.ZodObject<{
        mode: z.ZodString;
        reason: z.ZodString;
    }, z.core.$strip>>;
    failover: z.ZodNullable<z.ZodObject<{
        providerID: z.ZodString;
        modelID: z.ZodString;
        variant: z.ZodNullable<z.ZodString>;
        errorTag: z.ZodNullable<z.ZodString>;
        errorMessage: z.ZodNullable<z.ZodString>;
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const messageModelAttributionResponseSchema: z.ZodObject<{
    available: z.ZodBoolean;
    reason: z.ZodOptional<z.ZodString>;
    messages: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
        providerID: z.ZodString;
        modelID: z.ZodString;
        variant: z.ZodNullable<z.ZodString>;
        routeID: z.ZodNullable<z.ZodString>;
        selection: z.ZodNullable<z.ZodObject<{
            mode: z.ZodString;
            reason: z.ZodString;
        }, z.core.$strip>>;
        failover: z.ZodNullable<z.ZodObject<{
            providerID: z.ZodString;
            modelID: z.ZodString;
            variant: z.ZodNullable<z.ZodString>;
            errorTag: z.ZodNullable<z.ZodString>;
            errorMessage: z.ZodNullable<z.ZodString>;
        }, z.core.$strip>>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
export type MessageModelAttribution = z.infer<typeof messageAttributionSchema>;
type MessageModelAttributionResponse = z.infer<typeof messageModelAttributionResponseSchema>;
/** Per-assistant-message pool/selection/failover attribution for one session, from OpenCode's routing tables. */
export declare const fetchMessageModelAttribution: (sessionID: string) => Promise<MessageModelAttributionResponse>;
export {};
