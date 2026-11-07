import { runtimeFetch } from './runtime-fetch';
type UpdateTarget = {
    owner: 'electron';
    version: string;
} | {
    owner: 'package-manager';
};
type InstallResult = {
    success: true;
    autoRestart: boolean;
    target: UpdateTarget;
} | {
    success: false;
    error?: string;
};
type AppliedResult = {
    status: 'applied';
} | {
    status: 'timeout';
} | {
    status: 'failed';
    error: string;
};
export declare function installWebUpdate(fetchUpdate?: typeof runtimeFetch): Promise<InstallResult>;
export declare function waitForUpdateApplied(target: UpdateTarget, previousVersion?: string, { fetchUpdate, maxWaitMs, intervalMs }?: {
    fetchUpdate?: typeof runtimeFetch | undefined;
    intervalMs?: number | undefined;
    maxWaitMs?: number | undefined;
}): Promise<AppliedResult>;
export {};
