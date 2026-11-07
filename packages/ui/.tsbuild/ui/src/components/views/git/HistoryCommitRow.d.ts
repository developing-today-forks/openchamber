import React from 'react';
import type { GitLogEntry, CommitFileEntry } from '@/lib/api/types';
import type { LanedCommit } from './gitGraph';
interface HistoryCommitRowProps {
    entry: GitLogEntry;
    mode?: 'history' | 'graph';
    laned?: LanedCommit;
    totalLanes?: number;
    isExpanded: boolean;
    onToggle: () => void;
    files: CommitFileEntry[];
    isLoadingFiles: boolean;
    onCopyHash: (hash: string) => void;
    directory: string | undefined;
    onConflict?: (result: {
        conflict: boolean;
        conflictFiles?: string[];
        operation: 'cherry-pick' | 'revert' | 'merge' | 'rebase';
    }) => void;
    onActionSuccess?: () => void;
}
export declare const HistoryCommitRow: React.MemoExoticComponent<({ entry, mode, laned, totalLanes, isExpanded, onToggle, files, isLoadingFiles, onCopyHash, directory, onConflict, onActionSuccess, }: HistoryCommitRowProps) => import("react/jsx-runtime").JSX.Element>;
export {};
