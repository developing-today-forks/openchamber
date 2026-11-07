import { z } from 'zod';
import type { GitAPI, GitNetworkOperation, GitNetworkOperationPlan, GitNetworkOperationRequest } from '@/lib/api/types';
import type { GitOperationRead } from '@/lib/boundGitNetworkOperation';
/**
 * The step results a successful sync may carry: the fetch ran, and the pull
 * and the push each either ran or had nothing to do (`skipped`: nothing came
 * in, or the remote already held the commit).
 */
export declare const isCompleteSyncSuccess: (steps: GitNetworkOperation['stepResults']) => boolean;
declare const referenceSchema: z.ZodObject<{
    runtimeKey: z.ZodString;
    runtimeIdentity: z.ZodObject<{
        id: z.ZodString;
        platform: z.ZodEnum<{
            desktop: "desktop";
            vscode: "vscode";
            web: "web";
        }>;
    }, z.core.$strict>;
    repositoryId: z.ZodNullable<z.ZodString>;
    operationId: z.ZodString;
    operation: z.ZodEnum<{
        "checkout-hydration": "checkout-hydration";
        clone: "clone";
        "delete-remote-branch": "delete-remote-branch";
        fetch: "fetch";
        pull: "pull";
        push: "push";
        sync: "sync";
    }>;
    targetDigest: z.ZodString;
    durableTargetDigest: z.ZodOptional<z.ZodString>;
}, z.core.$strict>;
export type PendingGitReference = z.infer<typeof referenceSchema>;
type RecoveryStorage = Pick<Storage, 'getItem' | 'setItem'>;
type RecoverySnapshot = {
    ready: boolean;
    references: PendingGitReference[];
    problem: 'storage' | 'capacity' | null;
};
export declare class PendingGitOperationError extends Error {
    readonly reason: 'storage' | 'capacity' | 'pending';
    readonly references: PendingGitReference[];
    constructor(reason: 'storage' | 'capacity' | 'pending', references?: PendingGitReference[]);
}
export declare const createGitOperationRecoveryOwner: (storage: () => RecoveryStorage) => {
    subscribe: (listener: () => void) => () => void;
    getSnapshot: () => RecoverySnapshot;
    runtimeKey: (value: string) => Promise<string>;
    hydrate: () => void;
    assertWritable: () => void;
    plan: (git: Pick<GitAPI, 'planNetworkOperation'>, request: GitNetworkOperationRequest, runtimeKey: string, isCurrent: () => boolean) => Promise<GitNetworkOperationPlan>;
    remember: (runtimeKey: string, operation: GitNetworkOperationPlan) => Promise<void>;
    complete: (read: GitOperationRead, isCurrent?: () => boolean) => Promise<void>;
    reconcile: (reference: PendingGitReference, git: Pick<GitAPI, 'getNetworkOperation'>, runtimeKey: string, isCurrent: () => boolean) => Promise<GitOperationRead | null>;
};
export declare const gitOperationRecoveryOwner: {
    subscribe: (listener: () => void) => () => void;
    getSnapshot: () => RecoverySnapshot;
    runtimeKey: (value: string) => Promise<string>;
    hydrate: () => void;
    assertWritable: () => void;
    plan: (git: Pick<GitAPI, 'planNetworkOperation'>, request: GitNetworkOperationRequest, runtimeKey: string, isCurrent: () => boolean) => Promise<GitNetworkOperationPlan>;
    remember: (runtimeKey: string, operation: GitNetworkOperationPlan) => Promise<void>;
    complete: (read: GitOperationRead, isCurrent?: () => boolean) => Promise<void>;
    reconcile: (reference: PendingGitReference, git: Pick<GitAPI, 'getNetworkOperation'>, runtimeKey: string, isCurrent: () => boolean) => Promise<GitOperationRead | null>;
};
export {};
