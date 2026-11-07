import React from 'react';
import type { GitLogEntry, CommitFileEntry } from '@/lib/api/types';
interface HistorySectionProps {
    mode?: 'history' | 'graph';
    log: {
        all: GitLogEntry[];
    } | null;
    isLogLoading: boolean;
    logMaxCount: number;
    onLogMaxCountChange: (count: number) => void;
    expandedCommitHashes: Set<string>;
    onToggleCommit: (hash: string) => void;
    commitFilesMap: Map<string, CommitFileEntry[]>;
    loadingCommitHashes: Set<string>;
    onCopyHash: (hash: string) => void;
    directory: string | undefined;
    showHeader?: boolean;
    contentMaxHeightClassName?: string;
    branchDivider?: {
        insertBeforeIndex: number;
        branchName: string;
        direction: 'up' | 'down';
    } | null;
    onConflict?: (result: {
        conflict: boolean;
        conflictFiles?: string[];
        operation: 'cherry-pick' | 'revert' | 'merge' | 'rebase';
    }) => void;
    onActionSuccess?: () => void;
}
export declare const HistorySection: React.FC<HistorySectionProps>;
export {};
