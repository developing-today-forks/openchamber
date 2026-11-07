import React from 'react';
import type { ProjectSortOrder, WorktreeSortOrder } from '@/stores/useSessionDisplayStore';
import type { SessionGroup } from '../types';
import { type SessionSidebarRowModel } from '../sessionSidebarRowModel';
import type { SidebarLayout } from '@/stores/sidebarLayout';
import { type SessionGroupSectionProps } from './SessionGroupSection';
import type { ProjectSection } from './sessionProjectRender';
type SessionProjectScrollerState = Pick<SessionGroupSectionProps, 'editingId' | 'openSidebarMenuKey' | 'setOpenSidebarMenuKey'> & {
    visibleSessionCountByGroup: Map<string, number>;
    collapsedActivityKeys: Set<string>;
    setCollapsedActivityKeys: React.Dispatch<React.SetStateAction<Set<string>>>;
    visibleActivityCountByKey: Map<string, number>;
    setVisibleActivityCountByKey: React.Dispatch<React.SetStateAction<Map<string, number>>>;
};
type GroupProps = Pick<SessionGroupSectionProps, 'hasSessionSearchQuery' | 'normalizedSessionSearchQuery' | 'groupSearchDataByGroup' | 'collapsedGroups' | 'hideDirectoryControls' | 'mobileVariant' | 'alwaysShowActions' | 'activeProjectId' | 'notifyOnSubtasks' | 'expandedParents' | 'editTitle' | 'editingRowKey' | 'folderRename' | 'setFolderRenameDraft' | 'clearFolderRename' | 'setEditingId' | 'setEditingRowKey' | 'setEditTitle' | 'toggleParent' | 'allowReselect' | 'onSessionSelected' | 'resetSessionSearch' | 'deleteSessionConfirm' | 'setDeleteSessionConfirm' | 'startFolderRename' | 'startSessionWorktreeMenuLoad'> & {
    pinnedSessionIds: Set<string>;
    sessionOrderIndex: Map<string, number>;
};
type GroupActions = Pick<SessionGroupSectionProps, 'showMoreGroupSessions' | 'resetGroupSessionLimit' | 'setActiveProjectIdOnly' | 'setSessionSwitcherOpen' | 'openNewSessionDraft' | 'onToggleCollapsedGroup'>;
type SessionProjectScrollerModel = {
    rowModel: SessionSidebarRowModel;
    /** The section order a dragged section header is saved into. */
    sidebarLayout: Pick<SidebarLayout, 'sectionOrder'>;
    /** Section headers can be dragged to reorder the sections (not in VS Code). */
    sectionDragEnabled: boolean;
    sectionsForRender: ProjectSection[];
    projectSections: ProjectSection[];
    singleProjectMode: boolean;
    emptyState: React.ReactNode;
    searchEmptyState: React.ReactNode;
    projectRepoStatus: Map<string, boolean | null>;
    state: SessionProjectScrollerState;
    groupProps: GroupProps;
};
type View = {
    homeDirectory: string | null;
    hasSessionSearchQuery: boolean;
    hideDirectoryControls: boolean;
    mobileVariant: boolean;
    alwaysShowActions: boolean;
    projectSortOrder: ProjectSortOrder;
    worktreeSortOrder: WorktreeSortOrder;
};
type Actions = {
    group: GroupActions;
    toggleProject: (id: string) => void;
    setActiveProjectIdOnly: (id: string) => void;
    setSessionSwitcherOpen: (open: boolean) => void;
    openNewSessionDraft: (options?: {
        selectedProjectId?: string | null;
        directoryOverride?: string | null;
        preserveDirectoryOverride?: boolean;
        targetFolderId?: string;
        target?: 'chat' | 'project';
    }) => void;
    openNewWorktreeDialog: () => void;
    openWorktreesPage: (id: string) => void;
    openProjectEditDialog: (id: string) => void;
    removeProject: (id: string) => void;
    reorderProjects: (fromIndex: number, toIndex: number) => void;
    setGroupOrderByProject: React.Dispatch<React.SetStateAction<Map<string, string[]>>>;
    renderProjectStatusIndicator?: (projectId: string, groups: SessionGroup[]) => React.ReactNode;
    setSingleProjectId: (id: string) => void;
};
type Props = {
    model: SessionProjectScrollerModel;
    view: View;
    actions: Actions;
};
declare function SessionProjectScrollerComponent({ model, view, actions }: Props): React.ReactNode;
export declare const SessionProjectScroller: React.MemoExoticComponent<typeof SessionProjectScrollerComponent>;
export {};
