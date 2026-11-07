import React from 'react';
import type { SessionFolder } from '@/stores/useSessionFoldersStore';
import type { CollapsedActivityState } from './sidebar/sessions/collapsedActivityState';
interface SessionFolderItemProps<TSessionNode> {
    folder: SessionFolder;
    /**
     * Optional display label override. Flat folder rendering shows nested
     * folders at the top level with a "Parent / Child" path instead of
     * indentation.
     */
    displayName?: string;
    sessions: readonly TSessionNode[];
    /** Sub-folders that belong directly to this folder */
    subFolderItems?: React.ReactNode;
    isCollapsed: boolean;
    collapsedActivityState?: CollapsedActivityState;
    onToggle: () => void;
    onRename: (name: string) => void;
    onDelete: () => void;
    children?: React.ReactNode;
    renderBody?: boolean;
    groupDirectory?: string | null;
    projectId?: string | null;
    mobileVariant?: boolean;
    alwaysShowActions?: boolean;
    isRenaming?: boolean;
    renameDraft?: string;
    onRenameDraftChange?: (value: string) => void;
    onRenameSave?: () => void;
    onRenameCancel?: () => void;
    /** Ref callback from useDroppable – attach to folder header to make it a drop zone */
    droppableRef?: (node: HTMLElement | null) => void;
    /** Whether a draggable session is currently hovering over this folder */
    isDropTarget?: boolean;
    /** Create a new session scoped to this folder */
    onNewSession?: () => void;
    /** Tree level of the folder row: 0 right under the project, 1 under a worktree. */
    depth?: number;
    /** False for a folder with nothing in it: no chevron, and it does not toggle. */
    canExpand?: boolean;
    /** Hide folder action buttons (rename/delete/new) */
    hideActions?: boolean;
    /** Whether folder belongs to archived section */
    archivedBucket?: boolean;
}
export declare const SessionFolderItem: <TSessionNode>(props: SessionFolderItemProps<TSessionNode>) => React.ReactElement;
export {};
