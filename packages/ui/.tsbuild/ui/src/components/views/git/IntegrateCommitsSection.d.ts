import * as React from 'react';
import type { WorktreeMetadata } from '@/types/worktree';
export declare const IntegrateCommitsSection: React.FC<{
    repoRoot: string;
    sourceBranch: string;
    worktreeMetadata: WorktreeMetadata;
    localBranches: string[];
    defaultTargetBranch: string;
    refreshKey?: number;
    onRefresh?: () => void;
    /** Hide the built-in section heading when a dialog already provides one. */
    showHeader?: boolean;
}>;
