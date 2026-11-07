import type { GitAPI } from '@/lib/api/types';
export type BranchIntegrationTarget = {
    kind: 'local';
    branch: string;
    label: string;
} | {
    kind: 'remote';
    branch: string;
    destinationRef: string;
    label: string;
    remote: string;
    sourceRef: string;
};
export type BranchIntegrationRemoteBranch = Extract<BranchIntegrationTarget, {
    kind: 'remote';
}>;
export declare const createRemoteBranchIntegrationTargets: (remoteNames: string[], branchLabels: string[]) => BranchIntegrationRemoteBranch[];
export declare const resolveBranchIntegrationRef: ({ directory, git, runPlannedFetch, target, }: {
    directory: string;
    git: Pick<GitAPI, 'getGitLog'>;
    runPlannedFetch: (target: Extract<BranchIntegrationTarget, {
        kind: 'remote';
    }>) => Promise<void>;
    target: BranchIntegrationTarget;
}) => Promise<string>;
