import React from 'react';
interface AddCatalogDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    catalogId?: string | null;
}
export declare const AddCatalogDialog: React.FC<AddCatalogDialogProps>;
export {};
