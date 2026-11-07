/**
 * Client for the plan store (`/api/routing/plans`): the subscriptions and
 * quota windows the user keeps, the cost tier of each model, what each pool is
 * for, and the notes about how usage has felt. The server writes OpenCode's
 * data directory, where the `plan_info` and `route_usage` tools read the same
 * records. This module speaks HTTP and parses what comes back.
 */
import { z } from 'zod';
export declare const PLAN_COVERAGE: readonly ['subscription', 'credits', 'metered', 'free', 'trial'];
export declare const PLAN_TIERS: readonly ['cheap', 'standard', 'frontier'];
export declare const PLAN_UNITS: readonly ['requests', 'messages', 'tokens', 'usd', 'percent', 'other'];
export declare const PLAN_STATUSES: readonly ['active', 'expired', 'cancelled', 'unknown'];
export declare const PLAN_PERIODS: readonly ['monthly', 'yearly', 'once'];
export declare const NOTE_KINDS: readonly ['experience', 'expectation', 'plan-change', 'correction', 'other'];
export type PlanCoverage = (typeof PLAN_COVERAGE)[number];
export type PlanTier = (typeof PLAN_TIERS)[number];
export type PlanUnit = (typeof PLAN_UNITS)[number];
export type PlanStatus = (typeof PLAN_STATUSES)[number];
export type PlanPeriod = (typeof PLAN_PERIODS)[number];
export type NoteKind = (typeof NOTE_KINDS)[number];
declare const quotaWindowSchema: z.ZodObject<{
    name: z.ZodString;
    unit: z.ZodEnum<{
        messages: "messages";
        other: "other";
        percent: "percent";
        requests: "requests";
        tokens: "tokens";
        usd: "usd";
    }>;
    limit: z.ZodOptional<z.ZodNumber>;
    windowHours: z.ZodOptional<z.ZodNumber>;
    resetRule: z.ZodOptional<z.ZodString>;
    resetAt: z.ZodOptional<z.ZodString>;
    note: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare const feeSchema: z.ZodObject<{
    amount: z.ZodNumber;
    currency: z.ZodString;
    period: z.ZodEnum<{
        monthly: "monthly";
        once: "once";
        yearly: "yearly";
    }>;
    renewsOn: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare const planSchema: z.ZodObject<{
    id: z.ZodString;
    providerID: z.ZodString;
    label: z.ZodString;
    plan: z.ZodOptional<z.ZodString>;
    coverage: z.ZodEnum<{
        credits: "credits";
        free: "free";
        metered: "metered";
        subscription: "subscription";
        trial: "trial";
    }>;
    fee: z.ZodOptional<z.ZodObject<{
        amount: z.ZodNumber;
        currency: z.ZodString;
        period: z.ZodEnum<{
            monthly: "monthly";
            once: "once";
            yearly: "yearly";
        }>;
        renewsOn: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    quotas: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        unit: z.ZodEnum<{
            messages: "messages";
            other: "other";
            percent: "percent";
            requests: "requests";
            tokens: "tokens";
            usd: "usd";
        }>;
        limit: z.ZodOptional<z.ZodNumber>;
        windowHours: z.ZodOptional<z.ZodNumber>;
        resetRule: z.ZodOptional<z.ZodString>;
        resetAt: z.ZodOptional<z.ZodString>;
        note: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    expiresOn: z.ZodOptional<z.ZodString>;
    status: z.ZodEnum<{
        active: "active";
        cancelled: "cancelled";
        expired: "expired";
        unknown: "unknown";
    }>;
    verifiedAt: z.ZodOptional<z.ZodString>;
    verifiedFrom: z.ZodOptional<z.ZodString>;
    howToCheck: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, z.core.$strip>;
export type PlanRecord = z.infer<typeof planSchema>;
export type QuotaWindow = z.infer<typeof quotaWindowSchema>;
export type PlanFee = z.infer<typeof feeSchema>;
declare const modelTierSchema: z.ZodObject<{
    tier: z.ZodEnum<{
        cheap: "cheap";
        frontier: "frontier";
        standard: "standard";
    }>;
    coveredBy: z.ZodOptional<z.ZodArray<z.ZodString>>;
    note: z.ZodOptional<z.ZodString>;
    updatedAt: z.ZodString;
}, z.core.$strip>;
declare const poolPurposeSchema: z.ZodObject<{
    tier: z.ZodOptional<z.ZodEnum<{
        cheap: "cheap";
        frontier: "frontier";
        standard: "standard";
    }>>;
    purpose: z.ZodOptional<z.ZodString>;
    updatedAt: z.ZodString;
}, z.core.$strip>;
declare const planNoteSchema: z.ZodObject<{
    id: z.ZodString;
    at: z.ZodString;
    kind: z.ZodEnum<{
        correction: "correction";
        expectation: "expectation";
        experience: "experience";
        other: "other";
        "plan-change": "plan-change";
    }>;
    text: z.ZodString;
    source: z.ZodEnum<{
        model: "model";
        ui: "ui";
        user: "user";
    }>;
    providerID: z.ZodOptional<z.ZodString>;
    planID: z.ZodOptional<z.ZodString>;
    modelID: z.ZodOptional<z.ZodString>;
    poolID: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type PlanNote = z.infer<typeof planNoteSchema>;
type ModelTier = z.infer<typeof modelTierSchema>;
type PoolPurpose = z.infer<typeof poolPurposeSchema>;
declare const planStateSchema: z.ZodObject<{
    plans: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        providerID: z.ZodString;
        label: z.ZodString;
        plan: z.ZodOptional<z.ZodString>;
        coverage: z.ZodEnum<{
            credits: "credits";
            free: "free";
            metered: "metered";
            subscription: "subscription";
            trial: "trial";
        }>;
        fee: z.ZodOptional<z.ZodObject<{
            amount: z.ZodNumber;
            currency: z.ZodString;
            period: z.ZodEnum<{
                monthly: "monthly";
                once: "once";
                yearly: "yearly";
            }>;
            renewsOn: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>;
        quotas: z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            unit: z.ZodEnum<{
                messages: "messages";
                other: "other";
                percent: "percent";
                requests: "requests";
                tokens: "tokens";
                usd: "usd";
            }>;
            limit: z.ZodOptional<z.ZodNumber>;
            windowHours: z.ZodOptional<z.ZodNumber>;
            resetRule: z.ZodOptional<z.ZodString>;
            resetAt: z.ZodOptional<z.ZodString>;
            note: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>;
        expiresOn: z.ZodOptional<z.ZodString>;
        status: z.ZodEnum<{
            active: "active";
            cancelled: "cancelled";
            expired: "expired";
            unknown: "unknown";
        }>;
        verifiedAt: z.ZodOptional<z.ZodString>;
        verifiedFrom: z.ZodOptional<z.ZodString>;
        howToCheck: z.ZodOptional<z.ZodString>;
        notes: z.ZodOptional<z.ZodString>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, z.core.$strip>>;
    models: z.ZodRecord<z.ZodString, z.ZodObject<{
        tier: z.ZodEnum<{
            cheap: "cheap";
            frontier: "frontier";
            standard: "standard";
        }>;
        coveredBy: z.ZodOptional<z.ZodArray<z.ZodString>>;
        note: z.ZodOptional<z.ZodString>;
        updatedAt: z.ZodString;
    }, z.core.$strip>>;
    pools: z.ZodRecord<z.ZodString, z.ZodObject<{
        tier: z.ZodOptional<z.ZodEnum<{
            cheap: "cheap";
            frontier: "frontier";
            standard: "standard";
        }>>;
        purpose: z.ZodOptional<z.ZodString>;
        updatedAt: z.ZodString;
    }, z.core.$strip>>;
    notes: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        at: z.ZodString;
        kind: z.ZodEnum<{
            correction: "correction";
            expectation: "expectation";
            experience: "experience";
            other: "other";
            "plan-change": "plan-change";
        }>;
        text: z.ZodString;
        source: z.ZodEnum<{
            model: "model";
            ui: "ui";
            user: "user";
        }>;
        providerID: z.ZodOptional<z.ZodString>;
        planID: z.ZodOptional<z.ZodString>;
        modelID: z.ZodOptional<z.ZodString>;
        poolID: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    skippedNotes: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export type PlanState = z.infer<typeof planStateSchema>;
export declare const fetchPlanState: () => Promise<PlanState>;
/** Creates or updates a plan. A field set to null is cleared on the server; a field left out is kept. */
export declare const savePlanRecord: (plan: Record<string, unknown>) => Promise<PlanRecord>;
export declare const saveModelTier: (input: {
    model: string;
    tier?: PlanTier;
    coveredBy?: string[] | null;
    note?: string | null;
}) => Promise<ModelTier>;
export declare const savePoolPurpose: (input: {
    id: string;
    tier?: PlanTier | null;
    purpose?: string | null;
}) => Promise<PoolPurpose>;
export declare const addPlanNote: (input: {
    text: string;
    kind: NoteKind;
    providerID?: string;
    planID?: string;
    modelID?: string;
    poolID?: string;
}) => Promise<PlanNote>;
export {};
