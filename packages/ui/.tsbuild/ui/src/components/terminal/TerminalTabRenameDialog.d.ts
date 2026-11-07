import React from 'react';
type TerminalTabRenameDialogProps = {
    /** The label being edited; null keeps the dialog closed. */
    currentLabel: string | null;
    onRename: (label: string) => void;
    onClose: () => void;
};
export declare const TerminalTabRenameDialog: React.FC<TerminalTabRenameDialogProps>;
export {};
