import React from 'react';
interface DirtyBranchSwitchDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    targetBranch: string;
    changedFileCount: number;
    /**
     * Commit every uncommitted change with this message — pushing the commit
     * first when the user opted in — then perform the checkout.
     */
    onCommitAndSwitch: (message: string, pushAfter: boolean) => Promise<void>;
    /** Produce an AI commit message for the current changes, same as the commit panel. */
    onGenerateMessage: () => Promise<string>;
    /** Revert every uncommitted change, then perform the checkout. */
    onRevertAndSwitch: () => Promise<void>;
}
/**
 * Switching branches with uncommitted changes is blocked so a checkout can
 * never silently carry, conflict with, or drop the user's work. The user
 * resolves the working tree with one explicit choice: commit and switch
 * (message written, generated on demand, or generated automatically when the
 * field is left empty — same pipeline as the commit panel), or revert and
 * switch. Cancel leaves everything untouched for a fully manual flow.
 */
export declare const DirtyBranchSwitchDialog: React.FC<DirtyBranchSwitchDialogProps>;
export {};
