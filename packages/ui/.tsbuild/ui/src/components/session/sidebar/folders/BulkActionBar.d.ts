import React from 'react';
import type { SessionFolder } from '@/stores/useSessionFoldersStore';
type Props = {
    selectedCount: number;
    scopeKey: string | null;
    scopeFolders: SessionFolder[];
    archivedBucket: boolean;
    onMoveToFolder: (folderId: string) => void;
    onCreateFolderAndMove: () => void;
    onRemoveFromFolder: () => void;
    canRemoveFromFolder: boolean;
    onRestore: () => void;
    onArchive: () => void;
    onDelete: () => void;
    onDone: () => void;
};
export declare const BulkActionBar: React.FC<Props>;
export {};
