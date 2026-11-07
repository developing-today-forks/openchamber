/**
 * The create dialog of an isolated space (journey step 1): its name, where it
 * runs, what code it starts from, its network, and model access given up front. Opened from the
 * new-session draft picker, the one entry point; never mounted in VS Code (decision 16).
 *
 * Opening it is the user acting in the feature's own screen, so it checks the places now
 * (decision 19); nothing checks them earlier to decide whether to offer the entry. With one place
 * the dialog names it; with another machine set up in Settings it offers the choice, and under
 * the machine says that the keys granted below are stored there (the maintainer's call of 2026-10-12).
 */
import React from 'react';
type NewSpaceDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    project: {
        id: string;
        path: string;
    };
};
export declare const NewSpaceDialog: React.FC<NewSpaceDialogProps>;
export {};
