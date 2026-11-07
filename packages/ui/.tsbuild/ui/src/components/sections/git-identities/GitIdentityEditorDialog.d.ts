import React from 'react';
interface GitIdentityEditorDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    /** Profile ID to edit, 'new' for creation, or null */
    profileId: string | null;
}
export declare const GitIdentityEditorDialog: React.FC<GitIdentityEditorDialogProps>;
export {};
