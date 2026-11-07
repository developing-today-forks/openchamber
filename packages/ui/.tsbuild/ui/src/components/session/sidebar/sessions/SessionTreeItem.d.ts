import React from 'react';
import type { SessionNodeItemProps } from './SessionNodeItem';
import type { SessionNode } from '../types';
import type { SessionSidebarRenderContext } from '../sessionSidebarRowModel';
import type { SessionNodeRenderExtras } from './sessionNodeItemUtils';
import { type DeleteSessionConfirmState } from './useSessionActions';
type Context = {
    groupDirectory?: string | null;
    projectId?: string | null;
    folderOwnerKey?: string | null;
    selectionScopeKey?: string | null;
    archivedBucket?: boolean;
    secondaryMeta?: {
        projectLabel?: string | null;
        branchLabel?: string | null;
        inSpace?: boolean;
    } | null;
    renderContext?: SessionSidebarRenderContext;
    rowKey?: string;
    dragKey?: string;
};
type SessionTreeItemRenderProps = Context & Pick<SessionNodeItemProps, 'expandedParents' | 'hasSessionSearchQuery' | 'normalizedSessionSearchQuery' | 'notifyOnSubtasks' | 'editingId' | 'editingRowKey' | 'editTitle' | 'openSidebarMenuKey' | 'mobileVariant' | 'alwaysShowActions'> & {
    node: SessionNode;
    pinnedSessionIds: Set<string>;
    depth?: number;
    renderExtras?: SessionNodeRenderExtras;
};
export type SessionTreeItemProps = SessionTreeItemRenderProps & Pick<SessionNodeItemProps, 'setEditingId' | 'setEditingRowKey' | 'setEditTitle' | 'toggleParent' | 'setOpenSidebarMenuKey' | 'startSessionWorktreeMenuLoad'> & {
    allowReselect: boolean;
    onSessionSelected?: (sessionId: string) => void;
    resetSessionSearch: () => void;
    deleteSessionConfirm: DeleteSessionConfirmState;
    setDeleteSessionConfirm: (value: DeleteSessionConfirmState) => void;
    startFolderRename: (scopeKey: string, folder: {
        id: string;
        name: string;
    }) => void;
    renderChildren?: boolean;
};
declare function SessionTreeItemComponent({ node, depth, groupDirectory, projectId, folderOwnerKey, selectionScopeKey, archivedBucket, secondaryMeta, renderContext, rowKey, dragKey, renderExtras, pinnedSessionIds, expandedParents, hasSessionSearchQuery, normalizedSessionSearchQuery, notifyOnSubtasks, editingId, editingRowKey, setEditingId, setEditingRowKey, editTitle, setEditTitle, toggleParent, openSidebarMenuKey, setOpenSidebarMenuKey, allowReselect, onSessionSelected, resetSessionSearch, deleteSessionConfirm, setDeleteSessionConfirm, startFolderRename, startSessionWorktreeMenuLoad, mobileVariant, alwaysShowActions, renderChildren, }: SessionTreeItemProps): React.ReactNode;
export declare const SessionTreeItem: React.MemoExoticComponent<typeof SessionTreeItemComponent>;
export {};
