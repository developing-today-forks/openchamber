import React from 'react';
import type { SessionTreeItemProps } from '../sessions/SessionTreeItem';
import type { WorktreeMetadata } from '@/types/worktree';
import type { SessionGroup } from '../types';
import type { useSessionProjectViewState } from '../projects/useSessionProjectViewState';
import type { SidebarViewMode } from '@/stores/useSessionDisplayStore';
type Project = {
    id: string;
    path: string;
    label?: string;
    normalizedPath: string;
    icon?: string;
    color?: string;
    iconImage?: {
        mime: string;
        updatedAt: number;
        source: 'custom' | 'auto';
    };
    iconBackground?: string;
    hiddenFromWork?: boolean;
    hiddenFromAllSessions?: boolean;
};
type SessionProjectCollectionProps = {
    topology: {
        projects: Project[];
        availableWorktreesByProject: Map<string, WorktreeMetadata[]>;
        knownDirectories: Set<string>;
        isVSCode: boolean;
        worktreeMetadata: Map<string, WorktreeMetadata>;
        gitBranches: Map<string, string | null>;
        projectRepoStatus: Map<string, boolean | null>;
        projectRootBranches: Map<string, string | null>;
        lastRepoStatus: boolean;
    };
    view: {
        isVisible: boolean;
        hasSessionSearchQuery: boolean;
        normalizedSessionSearchQuery: string;
        activeProjectId: string | null;
        showInlineArchived: boolean;
        useGroupedSections: boolean;
        homeDirectory: string | null;
        mobileVariant: boolean;
        hideDirectoryControls: boolean;
        showOnlyMainWorkspace: boolean;
        isDesktopShellRuntime: boolean;
        projectSortOrder: import('@/stores/useSessionDisplayStore').ProjectSortOrder;
        sidebarViewMode: SidebarViewMode;
        emptyState: React.ReactNode;
        searchEmptyState: React.ReactNode;
        isSessionsLoading: boolean;
        isWorktreeTopologyLoading: boolean;
        unresolvedWorktreeProjectPaths: ReadonlySet<string>;
        projectView: ReturnType<typeof useSessionProjectViewState>['state'];
        /**
         * The match count belongs in the sidebar header, which renders above this
         * list, while only the list knows what matched. Reported upwards rather
         * than recomputed there, so the number and the rows can never disagree.
         */
        onSearchMatchCountChange: (count: number) => void;
    };
    actions: {
        rowActions: {
            allowReselect: boolean;
            onSessionSelected?: (sessionId: string) => void;
            resetSessionSearch: () => void;
        };
        alwaysShowActions: boolean;
        notifyOnSubtasks: boolean;
        setActiveProjectIdOnly: (id: string) => void;
        setSessionSwitcherOpen: (open: boolean) => void;
        openNewSessionDraft: (options?: {
            selectedProjectId?: string | null;
            directoryOverride?: string | null;
            preserveDirectoryOverride?: boolean;
        }) => void;
        openNewWorktreeDialog: () => void;
        openWorktreesPage: (id: string) => void;
        openProjectEditDialog: (id: string) => void;
        removeProject: (id: string) => void;
        reorderProjects: (fromIndex: number, toIndex: number) => void;
        startSessionWorktreeMenuLoad: SessionTreeItemProps['startSessionWorktreeMenuLoad'];
        renderProjectStatusIndicator?: (projectId: string, groups: SessionGroup[]) => React.ReactNode;
        initialActiveSessionByProject: Map<string, string>;
        persistActiveSessionByProject: (value: Map<string, string>) => void;
        projectViewActions: Pick<ReturnType<typeof useSessionProjectViewState>['actions'], 'getOrderedGroups' | 'setGroupOrderByProject' | 'toggleGroup' | 'toggleProject' | 'setCollapsedActivities'>;
    };
};
/**
 * Built the first time the sidebar is shown and kept while it is closed, so
 * opening the sidebar again does not rebuild and re-measure the whole list in
 * the frame the toggle starts. The closed sidebar skips the list's rendering
 * (see `Sidebar`), and the work it feeds on pauses with `view.isVisible`.
 */
export declare const SessionProjectCollection: React.FC<SessionProjectCollectionProps>;
export {};
