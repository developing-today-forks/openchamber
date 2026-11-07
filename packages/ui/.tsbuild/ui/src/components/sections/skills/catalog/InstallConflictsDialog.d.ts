import React from 'react';
export type SkillConflict = {
    skillName: string;
    scope: 'user' | 'project';
    source?: 'opencode' | 'agents';
};
export type ConflictDecision = 'skip' | 'overwrite';
interface InstallConflictsDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    conflicts: SkillConflict[];
    onConfirm: (decisions: Record<string, ConflictDecision>) => void;
}
export declare const InstallConflictsDialog: React.FC<InstallConflictsDialogProps>;
export {};
