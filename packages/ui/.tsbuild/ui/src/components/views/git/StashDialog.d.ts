import React from 'react';
interface StashDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    operation: 'merge' | 'rebase';
    targetBranch: string;
    onConfirm: (restoreAfter: boolean) => Promise<void>;
}
export declare const StashDialog: React.FC<StashDialogProps>;
export {};
