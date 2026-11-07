import React from 'react';
interface ConflictDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    conflictFiles?: string[];
    directory: string;
    operation: 'merge' | 'rebase';
    onAbort: () => void;
    onClearState?: () => void;
    onNavigatedToChat?: () => void;
}
export declare const ConflictDialog: React.FC<ConflictDialogProps>;
export {};
