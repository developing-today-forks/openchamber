import React from 'react';
import type { GitMergeInProgress, GitRebaseInProgress } from '@/lib/api/types';
interface InProgressOperationBannerProps {
    mergeInProgress: GitMergeInProgress | null | undefined;
    rebaseInProgress: GitRebaseInProgress | null | undefined;
    onContinue: () => Promise<void>;
    onAbort: () => Promise<void>;
    onResolveWithAI?: () => void;
    conflictCount?: number;
    isLoading?: boolean;
}
export declare const InProgressOperationBanner: React.FC<InProgressOperationBannerProps>;
export {};
