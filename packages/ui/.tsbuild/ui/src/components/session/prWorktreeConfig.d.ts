import type { GitBranchDetails, SourceControlReadContext } from '@/lib/api/types';
/**
 * What a PR worktree needs to know about its change request: a provider
 * change request, or a reference-picker item mapped to the same fields.
 */
export type PrWorktreeSource = {
    number: number;
    head: string;
    headSha?: string;
    headLabel?: string;
    headProject?: {
        owner: string;
    } | null;
    project: {
        id: string;
        owner: string;
        name: string;
    };
};
export declare const resolvePrWorktreeConfig: (changeRequest: PrWorktreeSource, context: SourceControlReadContext, branches: Record<string, GitBranchDetails>) => {
    existingBranch: string;
    expectedRevision: string;
    changeRequestSource: {
        context: SourceControlReadContext;
        project: {
            id: string;
            owner: string;
            name: string;
        };
        number: number;
        expectedHeadSha: string;
        requestedRemoteName: string;
    };
    sourceLabel: string;
};
