import { z } from 'zod';
/**
 * Environment variables for what the server starts: the managed OpenCode,
 * Git, the terminal and command execution (`/api/environment`). Values can
 * be API tokens, so they stay on the server; the UI learns only the names
 * and can set or remove a value, never read it back. Not available in VS Code,
 * which runs no OpenChamber server.
 */
/** Same rule as the server: an environment identifier. */
export declare const ENVIRONMENT_VARIABLE_NAME_PATTERN: RegExp;
declare const vaultReadSchema: z.ZodObject<{
    state: z.ZodEnum<{
        failed: "failed";
        resolved: "resolved";
    }>;
    reason: z.ZodCatch<z.ZodOptional<z.ZodEnum<{
        empty: "empty";
        "op-not-installed": "op-not-installed";
        "op-read-failed": "op-read-failed";
        timeout: "timeout";
    }>>>;
}, z.core.$strip>;
declare const userEnvironmentSchema: z.ZodObject<{
    names: z.ZodArray<z.ZodString>;
    references: z.ZodPipe<z.ZodCatch<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>>, z.ZodTransform<Record<string, string>, Record<string, string> | undefined>>;
    vault: z.ZodPipe<z.ZodCatch<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
        state: z.ZodEnum<{
            failed: "failed";
            resolved: "resolved";
        }>;
        reason: z.ZodCatch<z.ZodOptional<z.ZodEnum<{
            empty: "empty";
            "op-not-installed": "op-not-installed";
            "op-read-failed": "op-read-failed";
            timeout: "timeout";
        }>>>;
    }, z.core.$strip>>>>, z.ZodTransform<Record<string, {
        state: "failed" | "resolved";
        reason?: "empty" | "op-not-installed" | "op-read-failed" | "timeout" | undefined;
    }>, Record<string, {
        state: "failed" | "resolved";
        reason?: "empty" | "op-not-installed" | "op-read-failed" | "timeout" | undefined;
    }> | undefined>>;
}, z.core.$strip>;
declare const commandStatusSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    state: z.ZodLiteral<"applied">;
    count: z.ZodNumber;
}, z.core.$strip>, z.ZodObject<{
    state: z.ZodLiteral<"failed">;
    reason: z.ZodString;
    exitCode: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
}, z.core.$strip>], "state">;
declare const projectEnvironmentSchema: z.ZodObject<{
    names: z.ZodArray<z.ZodString>;
    command: z.ZodNullable<z.ZodString>;
    status: z.ZodNullable<z.ZodDiscriminatedUnion<[z.ZodObject<{
        state: z.ZodLiteral<"applied">;
        count: z.ZodNumber;
    }, z.core.$strip>, z.ZodObject<{
        state: z.ZodLiteral<"failed">;
        reason: z.ZodString;
        exitCode: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    }, z.core.$strip>], "state">>;
    references: z.ZodPipe<z.ZodCatch<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>>, z.ZodTransform<Record<string, string>, Record<string, string> | undefined>>;
    vault: z.ZodPipe<z.ZodCatch<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
        state: z.ZodEnum<{
            failed: "failed";
            resolved: "resolved";
        }>;
        reason: z.ZodCatch<z.ZodOptional<z.ZodEnum<{
            empty: "empty";
            "op-not-installed": "op-not-installed";
            "op-read-failed": "op-read-failed";
            timeout: "timeout";
        }>>>;
    }, z.core.$strip>>>>, z.ZodTransform<Record<string, {
        state: "failed" | "resolved";
        reason?: "empty" | "op-not-installed" | "op-read-failed" | "timeout" | undefined;
    }>, Record<string, {
        state: "failed" | "resolved";
        reason?: "empty" | "op-not-installed" | "op-read-failed" | "timeout" | undefined;
    }> | undefined>>;
}, z.core.$strip>;
export type UserEnvironment = z.infer<typeof userEnvironmentSchema>;
export type EnvironmentVaultRead = z.infer<typeof vaultReadSchema>;
export type ProjectEnvironment = z.infer<typeof projectEnvironmentSchema>;
export type EnvironmentCommandStatus = z.infer<typeof commandStatusSchema>;
/** A string sets the variable, null removes it. */
export type EnvironmentVariablesPatch = Record<string, string | null>;
type EnvironmentUpdate = {
    variables?: EnvironmentVariablesPatch;
    command?: string | null;
};
export declare const fetchUserEnvironment: () => Promise<UserEnvironment>;
export declare const updateUserEnvironment: (variables: EnvironmentVariablesPatch) => Promise<UserEnvironment>;
export declare const fetchProjectEnvironment: (projectId: string) => Promise<ProjectEnvironment>;
export declare const updateProjectEnvironment: (projectId: string, patch: EnvironmentUpdate) => Promise<ProjectEnvironment>;
/** Runs the project's environment command now and answers its outcome. */
export declare const reloadProjectEnvironment: (projectId: string) => Promise<ProjectEnvironment>;
export {};
