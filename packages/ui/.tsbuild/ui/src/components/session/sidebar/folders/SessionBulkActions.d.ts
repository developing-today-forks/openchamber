import React from 'react';
type Props = {
    getFolderScopesForProject: (projectId: string) => readonly {
        scopeKey: string;
        directory: string | null;
    }[];
    isInlineEditing: boolean;
    startFolderRename: (scopeKey: string, folder: {
        id: string;
        name: string;
    }) => void;
};
/** Owns the sidebar selection projection and its destructive confirmation. */
export declare function SessionBulkActions({ getFolderScopesForProject, isInlineEditing, startFolderRename }: Props): React.ReactNode;
export {};
