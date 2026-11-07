import React from 'react';
interface WorktreeBranchDisplayProps {
    currentBranch: string | null | undefined;
    onRename?: (oldName: string, newName: string) => Promise<void>;
    showEditButton?: boolean;
}
export declare const WorktreeBranchDisplay: React.FC<WorktreeBranchDisplayProps>;
export {};
