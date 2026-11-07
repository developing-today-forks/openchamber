import React from 'react';
type RepositoryConfigurationDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    directory: string;
};
/**
 * What a repository needs beyond its identity.
 *
 * The identity carries the account, the transport and the signature, and the
 * panel names it on its own button, so this holds only what an identity does
 * not say: which of the repository's other addresses that identity may answer
 * for, and the separate grants submodules and Git LFS need. Starting over is
 * choosing the System identity.
 */
export declare const RepositoryConfigurationDialog: React.FC<RepositoryConfigurationDialogProps>;
export {};
