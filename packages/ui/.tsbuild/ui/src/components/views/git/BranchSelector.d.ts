import React from 'react';
interface BranchInfo {
    ahead?: number;
    behind?: number;
}
interface BranchSelectorProps {
    currentBranch: string | null | undefined;
    localBranches: string[];
    remoteBranches: string[];
    branchInfo: Record<string, BranchInfo> | undefined;
    currentBranchAhead?: number;
    onCheckout: (branch: string) => void;
    onCreate: (name: string) => Promise<void>;
    disabled?: boolean;
    directory: string;
    /**
     * Shown above the branch list while the working tree has uncommitted
     * changes: selecting a branch will not switch directly but opens the
     * commit-or-revert resolution instead.
     */
    switchBlockedNotice?: string | null;
}
export declare const BranchSelector: React.FC<BranchSelectorProps>;
export {};
