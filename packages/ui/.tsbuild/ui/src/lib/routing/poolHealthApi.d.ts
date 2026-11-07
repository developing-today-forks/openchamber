/**
 * Client for pool health (`/api/model-routes/health`, `/api/model-routes/plan-links`):
 * how many sessions are on each pool target right now, and, for a target
 * linked to a plan, a rough projection against that plan's quota window. Read
 * `packages/web/server/lib/routing/pool-health.js` for what the numbers mean
 * and why they are an estimate, not a meter.
 */
import { z } from 'zod';
declare const targetHealthSchema: z.ZodObject<{
    ref: z.ZodString;
    activeSessions: z.ZodNullable<z.ZodNumber>;
    plan: z.ZodNullable<z.ZodObject<{
        id: z.ZodString;
        label: z.ZodString;
        providerID: z.ZodString;
        siblingRefs: z.ZodArray<z.ZodString>;
        projection: z.ZodNullable<z.ZodObject<{
            quotaName: z.ZodString;
            unit: z.ZodEnum<{
                messages: "messages";
                requests: "requests";
                tokens: "tokens";
            }>;
            limit: z.ZodNumber;
            windowHours: z.ZodNumber;
            projected: z.ZodNumber;
            source: z.ZodEnum<{
                "provider-reading": "provider-reading";
                "traffic-estimate": "traffic-estimate";
            }>;
            ratio: z.ZodNumber;
            status: z.ZodEnum<{
                ok: "ok";
                over: "over";
                warn: "warn";
            }>;
        }, z.core.$strip>>;
        unprojectedQuotas: z.ZodArray<z.ZodObject<{
            quotaName: z.ZodString;
            unit: z.ZodEnum<{
                other: "other";
                percent: "percent";
                usd: "usd";
            }>;
            reason: z.ZodEnum<{
                "needs-pricing": "needs-pricing";
                "needs-provider-meter": "needs-provider-meter";
                "unsupported-unit": "unsupported-unit";
            }>;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
    missingPlanID: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    blastRadius: z.ZodBoolean;
    suggestion: z.ZodNullable<z.ZodLiteral<"lower-weight">>;
}, z.core.$strip>;
declare const poolHealthStateSchema: z.ZodObject<{
    available: z.ZodBoolean;
    statsAvailable: z.ZodOptional<z.ZodBoolean>;
    statsReason: z.ZodOptional<z.ZodString>;
    planError: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    linksError: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    generatedAt: z.ZodOptional<z.ZodNumber>;
    pools: z.ZodRecord<z.ZodString, z.ZodObject<{
        selection: z.ZodString;
        targets: z.ZodArray<z.ZodObject<{
            ref: z.ZodString;
            activeSessions: z.ZodNullable<z.ZodNumber>;
            plan: z.ZodNullable<z.ZodObject<{
                id: z.ZodString;
                label: z.ZodString;
                providerID: z.ZodString;
                siblingRefs: z.ZodArray<z.ZodString>;
                projection: z.ZodNullable<z.ZodObject<{
                    quotaName: z.ZodString;
                    unit: z.ZodEnum<{
                        messages: "messages";
                        requests: "requests";
                        tokens: "tokens";
                    }>;
                    limit: z.ZodNumber;
                    windowHours: z.ZodNumber;
                    projected: z.ZodNumber;
                    source: z.ZodEnum<{
                        "provider-reading": "provider-reading";
                        "traffic-estimate": "traffic-estimate";
                    }>;
                    ratio: z.ZodNumber;
                    status: z.ZodEnum<{
                        ok: "ok";
                        over: "over";
                        warn: "warn";
                    }>;
                }, z.core.$strip>>;
                unprojectedQuotas: z.ZodArray<z.ZodObject<{
                    quotaName: z.ZodString;
                    unit: z.ZodEnum<{
                        other: "other";
                        percent: "percent";
                        usd: "usd";
                    }>;
                    reason: z.ZodEnum<{
                        "needs-pricing": "needs-pricing";
                        "needs-provider-meter": "needs-provider-meter";
                        "unsupported-unit": "unsupported-unit";
                    }>;
                }, z.core.$strip>>;
            }, z.core.$strip>>;
            missingPlanID: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            blastRadius: z.ZodBoolean;
            suggestion: z.ZodNullable<z.ZodLiteral<"lower-weight">>;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type PoolTargetHealth = z.infer<typeof targetHealthSchema>;
export type PoolHealthState = z.infer<typeof poolHealthStateSchema>;
export declare const fetchPoolHealth: () => Promise<PoolHealthState>;
declare const linksSchema: z.ZodObject<{
    version: z.ZodLiteral<1>;
    links: z.ZodRecord<z.ZodString, z.ZodString>;
}, z.core.$strip>;
type PoolPlanLinks = z.infer<typeof linksSchema>;
/** Links `target` (a `provider/model` reference) to `planID`, or clears the link when `planID` is null. */
export declare const savePoolPlanLink: (target: string, planID: string | null) => Promise<PoolPlanLinks>;
export {};
