import { z } from 'zod';
export declare const gitIdentityProfileIdSchema: z.ZodString;
/**
 * How an identity's transfers authenticate.
 *
 * `account` is the connected account's own credential over HTTPS — whether that
 * credential came from OAuth or from a personal access token is a property of
 * the account, not a separate choice. `ssh` names a managed key, and can still
 * carry an account so issues and change requests know whose they are.
 */
declare const gitIdentityTransportSchema: z.ZodEnum<{
    account: "account";
    anonymous: "anonymous";
    ssh: "ssh";
    system: "system";
}>;
export type GitIdentityTransport = z.infer<typeof gitIdentityTransportSchema>;
/**
 * One identity is an account, a transport and a signature.
 *
 * Repositories choose one of these instead of assembling the three separately,
 * so the same answer is given once and shown by name.
 */
export declare const gitIdentityProfileSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    userName: z.ZodString;
    userEmail: z.ZodString;
    account: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        provider: z.ZodEnum<{
            github: "github";
            gitlab: "gitlab";
        }>;
        instance: z.ZodString;
        accountId: z.ZodString;
    }, z.core.$strict>>>;
    transport: z.ZodOptional<z.ZodEnum<{
        account: "account";
        anonymous: "anonymous";
        ssh: "ssh";
        system: "system";
    }>>;
    sshCredentialId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    signCommits: z.ZodOptional<z.ZodBoolean>;
    signingKey: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    color: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    icon: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strict>;
export type GitIdentityProfile = z.infer<typeof gitIdentityProfileSchema>;
/**
 * How an identity authenticates, for identities written before they said so.
 *
 * Signature-only identities name no credential, which is exactly what System
 * Git means, so that is what they resolve to.
 */
export declare const identityTransport: (profile: Pick<GitIdentityProfile, 'transport'> | null | undefined) => GitIdentityTransport;
export declare const gitIdentityProfilesSchema: z.ZodArray<z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    userName: z.ZodString;
    userEmail: z.ZodString;
    account: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        provider: z.ZodEnum<{
            github: "github";
            gitlab: "gitlab";
        }>;
        instance: z.ZodString;
        accountId: z.ZodString;
    }, z.core.$strict>>>;
    transport: z.ZodOptional<z.ZodEnum<{
        account: "account";
        anonymous: "anonymous";
        ssh: "ssh";
        system: "system";
    }>>;
    sshCredentialId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    signCommits: z.ZodOptional<z.ZodBoolean>;
    signingKey: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    color: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    icon: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strict>>;
export declare const gitIdentitySummarySchema: z.ZodObject<{
    userName: z.ZodNullable<z.ZodString>;
    userEmail: z.ZodNullable<z.ZodString>;
}, z.core.$strict>;
export type GitIdentitySummary = z.infer<typeof gitIdentitySummarySchema>;
export declare const gitIdentityMutationResultSchema: z.ZodObject<{
    success: z.ZodBoolean;
    profile: z.ZodNullable<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        userName: z.ZodString;
        userEmail: z.ZodString;
        account: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            provider: z.ZodEnum<{
                github: "github";
                gitlab: "gitlab";
            }>;
            instance: z.ZodString;
            accountId: z.ZodString;
        }, z.core.$strict>>>;
        transport: z.ZodOptional<z.ZodEnum<{
            account: "account";
            anonymous: "anonymous";
            ssh: "ssh";
            system: "system";
        }>>;
        sshCredentialId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        signCommits: z.ZodOptional<z.ZodBoolean>;
        signingKey: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        color: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        icon: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strict>>;
}, z.core.$strict>;
/**
 * Whether an identity is complete: a signature and a way to push and pull.
 * Only the account transport needs an account; the machine's own Git, a
 * managed key and anonymous reads need none. An identity from an earlier
 * release is a signature that pushes with the machine's own Git, which is
 * complete.
 */
export declare const isCompleteIdentity: (profile: Pick<GitIdentityProfile, 'account' | 'transport' | 'sshCredentialId' | 'userName' | 'userEmail'>) => boolean;
export {};
