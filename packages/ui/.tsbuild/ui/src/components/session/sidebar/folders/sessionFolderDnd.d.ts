import React from 'react';
type SessionFolderDropTarget = {
    folderId: string;
    scopeKey: string;
    ownerKey: string;
};
export declare const DraggableSessionRow: React.FC<{
    sessionId: string;
    dragKey?: string;
    ownerKey?: string | null;
    sessionDirectory: string | null;
    sessionTitle: string;
    archivedBucket?: boolean;
    children: React.ReactNode;
}>;
export declare const DroppableFolderWrapper: React.FC<{
    folderId: string;
    scopeKey: string;
    ownerKey: string | null;
    disabled?: boolean;
    children: (droppableRef: (node: HTMLElement | null) => void, isOver: boolean) => React.ReactNode;
}>;
export declare const SessionFolderDndScope: React.FC<{
    scopeKey: string | null;
    ownerKey?: string | null;
    hasFolders: boolean;
    onSessionDroppedOnFolder: (sessionId: string, target: SessionFolderDropTarget, sourceOwnerKey: string) => void;
    children: React.ReactNode;
}>;
export {};
