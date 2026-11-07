import { z } from 'zod';
declare const openCodeCompatibilitySchema: z.ZodObject<{
    state: z.ZodEnum<{
        compatible: "compatible";
        incompatible: "incompatible";
        unavailable: "unavailable";
    }>;
    version: z.ZodNullable<z.ZodString>;
    installation: z.ZodEnum<{
        bundled: "bundled";
        external: "external";
        managed: "managed";
    }>;
    binary: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    minimumVersion: z.ZodOptional<z.ZodString>;
    canInstall: z.ZodBoolean;
}, z.core.$strip>;
export type OpenCodeCompatibility = z.infer<typeof openCodeCompatibilitySchema>;
export declare const fetchOpenCodeCompatibility: () => Promise<OpenCodeCompatibility>;
export declare const recoverOpenCode: (action?: 'install-v2' | 'reconnect') => Promise<{
    state: 'recovered';
} | {
    state: 'incompatible';
    compatibility: OpenCodeCompatibility;
}>;
export {};
