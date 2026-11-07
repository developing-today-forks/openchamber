import React from 'react';
import type { SortableDragHandleProps } from './sortableItems';
import type { GroupSearchData, SessionGroup } from '../types';
import { type SessionTreeItemProps } from '../sessions/SessionTreeItem';
export type SessionGroupSectionProps = {
    group: SessionGroup;
    groupKey: string;
    projectId?: string | null;
    hideGroupLabel?: boolean;
    renderBody?: boolean;
    /** Nothing to list under the header: it shows no chevron and does not toggle. */
    isEmpty?: boolean;
    hasSessionSearchQuery: boolean;
    normalizedSessionSearchQuery: string;
    groupSearchDataByGroup: WeakMap<SessionGroup, GroupSearchData>;
    visibleSessionCount?: number;
    sessionBatchSize?: number;
    collapsedGroups: Set<string>;
    hideDirectoryControls: boolean;
    showMoreGroupSessions: (groupKey: string, currentVisibleCount: number, increment?: number) => void;
    resetGroupSessionLimit: (groupKey: string) => void;
    mobileVariant: boolean;
    alwaysShowActions: boolean;
    activeProjectId: string | null;
    setActiveProjectIdOnly: (id: string) => void;
    setSessionSwitcherOpen: (open: boolean) => void;
    openNewSessionDraft: (options?: {
        selectedProjectId?: string | null;
        directoryOverride?: string | null;
        preserveDirectoryOverride?: boolean;
        targetFolderId?: string;
        target?: 'chat' | 'project';
    }) => void;
    pinnedSessionIds: Set<string>;
    sessionOrderIndex: Map<string, number>;
    notifyOnSubtasks: boolean;
    expandedParents: Set<string>;
    editingId: string | null;
    editingRowKey: string | null;
    editTitle: string;
    openSidebarMenuKey: string | null;
    onToggleCollapsedGroup: (groupKey: string) => void;
    dragHandleProps?: SortableDragHandleProps | null;
    compactBodyPadding?: boolean;
    /**
     * Optional scroll container ref threaded from the outer ScrollableOverlay.
     * When provided, the virtualization effect can resolve the scrolling
     * ancestor synchronously and skip the getComputedStyle walk on every
     * render of an expanded archived bucket.
     */
    folderRename: {
        scopeKey: string;
        folderId: string;
        draft: string;
    } | null;
    setFolderRenameDraft: (draft: string) => void;
    clearFolderRename: () => void;
} & Pick<SessionTreeItemProps, 'setEditingId' | 'setEditingRowKey' | 'setEditTitle' | 'toggleParent' | 'setOpenSidebarMenuKey' | 'allowReselect' | 'onSessionSelected' | 'resetSessionSearch' | 'deleteSessionConfirm' | 'setDeleteSessionConfirm' | 'startFolderRename' | 'startSessionWorktreeMenuLoad'>;
declare function SessionGroupSectionBase(props: SessionGroupSectionProps): React.ReactNode;
export declare const SessionGroupSection: React.MemoExoticComponent<typeof SessionGroupSectionBase>;
export {};
