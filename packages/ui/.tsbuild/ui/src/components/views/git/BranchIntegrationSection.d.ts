import React from 'react';
import type { BranchIntegrationRemoteBranch, BranchIntegrationTarget } from './branchIntegration';
export interface OperationLogEntry {
    message: string;
    status: 'pending' | 'running' | 'done' | 'error';
    timestamp: number;
}
interface BranchIntegrationSectionProps {
    currentBranch: string | null | undefined;
    localBranches: string[];
    remoteBranches: BranchIntegrationRemoteBranch[];
    onMerge: (target: BranchIntegrationTarget) => void;
    onRebase: (target: BranchIntegrationTarget) => void;
    disabled?: boolean;
    isOperating?: boolean;
    operationLogs?: OperationLogEntry[];
    onOperationComplete?: () => void;
    /**
     * 'dialog' renders its own trigger button + dialog, 'inline' renders a
     * titled section, 'bare' renders just the form body for embedding in an
     * externally-owned dialog.
     */
    mode?: 'dialog' | 'inline' | 'bare';
    defaultTargetBranch?: string;
}
export declare const BranchIntegrationSection: React.FC<BranchIntegrationSectionProps>;
export {};
