import React from 'react';
interface StashesDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    directory: string | null;
    hasUncommittedChanges: boolean;
    hasStagedChanges?: boolean;
    uncommittedFileCount: number;
    onChanged?: (change?: {
        affectsIndex?: boolean;
    }) => void | Promise<void>;
}
export declare const StashesDialog: React.FC<StashesDialogProps>;
export {};
