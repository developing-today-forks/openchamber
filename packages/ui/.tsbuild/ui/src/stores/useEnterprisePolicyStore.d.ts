/**
 * Projection of the enterprise policy the connected runtime enforces
 * (`packages/web/server/lib/enterprise-mode.js`, read by the web server and by
 * the VS Code extension host alike). The runtime is authoritative and refuses
 * what the policy forbids; this store only lets Settings hide those ways in
 * and say who decided. Nothing here is persisted.
 */
import { z } from 'zod';
declare const enterprisePolicySchema: z.ZodObject<{
    enterpriseMode: z.ZodBoolean;
    source: z.ZodNullable<z.ZodEnum<{
        environment: "environment";
        "policy-file": "policy-file";
    }>>;
    organization: z.ZodNullable<z.ZodString>;
    policyError: z.ZodNullable<z.ZodString>;
    networkAccessBlocked: z.ZodDefault<z.ZodBoolean>;
    opencodeBinary: z.ZodDefault<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
type EnterprisePolicy = z.infer<typeof enterprisePolicySchema>;
interface EnterprisePolicyStoreState extends EnterprisePolicy {
    load: () => Promise<void>;
    resetForRuntime: () => void;
}
export declare const useEnterprisePolicyStore: import("zustand").UseBoundStore<import("zustand").StoreApi<EnterprisePolicyStoreState>>;
/**
 * Whether enterprise mode keeps Jev off: on, and no administrator's endpoint
 * answers. Pages that only configure Jev have nothing to offer then.
 */
export declare const useJevBlockedByEnterprise: () => boolean;
/** Whether enterprise mode is on for the connected runtime, also on servers that report it only through routing. */
export declare const useEnterpriseMode: () => boolean;
export {};
