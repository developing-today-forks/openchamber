export interface RankedBranchGroups {
    matching: Array<{
        label: string;
        value: string;
        source: 'local' | 'remote';
    }>;
    otherLocal: string[];
    otherRemote: string[];
}
export declare function rankBranchesForQuery(args: {
    localBranches: string[];
    remoteBranches: string[];
    query: string;
}): RankedBranchGroups;
