import React from 'react';
import type { Session } from '@/lib/opencode/model';
export type DeleteSessionConfirmState = {
    session: Session;
    descendantCount: number;
    descendantIds: string[];
    archivedBucket: boolean;
} | null;
export declare function SessionDeleteConfirmDialog(props: {
    value: DeleteSessionConfirmState;
    setValue: (next: DeleteSessionConfirmState) => void;
    showDeletionDialog: boolean;
    setShowDeletionDialog: (next: boolean) => void;
    onConfirm: () => Promise<void> | void;
}): React.ReactNode;
export type BulkDeleteSessionsConfirmState = {
    sessionIds: string[];
    sessionCount: number;
    archivedBucket: boolean;
} | null;
export declare function BulkSessionDeleteConfirmDialog(props: {
    value: BulkDeleteSessionsConfirmState;
    setValue: (next: BulkDeleteSessionsConfirmState) => void;
    showDeletionDialog: boolean;
    setShowDeletionDialog: (next: boolean) => void;
    onConfirm: () => Promise<void> | void;
}): React.ReactNode;
export type DeleteFolderConfirmState = {
    scopeKey: string;
    folderId: string;
    folderName: string;
    subFolderCount: number;
    sessionCount: number;
} | null;
export declare function FolderDeleteConfirmDialog(props: {
    value: DeleteFolderConfirmState;
    setValue: (next: DeleteFolderConfirmState) => void;
    onConfirm: () => void;
}): React.ReactNode;
