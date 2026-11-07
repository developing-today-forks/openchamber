import type { Session } from '@/lib/opencode/model';
import type { SessionGroup, SessionNode, GroupSearchData } from '../types';
import type { WorktreeMetadata } from '@/types/worktree';
import type { SessionFoldersMap } from '@/stores/useSessionFoldersStore';
type ProjectItem = {
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
};
type ProjectSection = {
    project: ProjectItem;
    groups: SessionGroup[];
};
type Args = {
    normalizedProjects: ProjectItem[];
    getSessionsForProject: (projectId: string) => Session[];
    getArchivedSessionsForProject: (projectId: string) => Session[];
    availableWorktreesByProject: Map<string, WorktreeMetadata[]>;
    projectRepoStatus: Map<string, boolean | null>;
    projectRootBranches: Map<string, string | null>;
    gitBranches: ReadonlyMap<string, string | null>;
    /** The ranks `buildGroupedSessions` orders worktrees by; it reads them at call time. */
    sessionOrderRanks: ReadonlyMap<string, number>;
    lastRepoStatus: boolean;
    buildGroupedSessions: (sessions: Session[], projectRoot: string, availableWorktrees: WorktreeMetadata[], rootBranch: string | null, isRepo: boolean) => SessionGroup[];
    hasSessionSearchQuery: boolean;
    normalizedSessionSearchQuery: string;
    filterSessionNodesForSearch: (nodes: SessionNode[], query: string) => SessionNode[];
    buildGroupSearchText: (group: SessionGroup) => string;
    foldersMap: SessionFoldersMap;
    /**
     * Groups the sidebar renders outside any project section — today the managed
     * chats. They search like every other group: a group with no search data
     * renders its filtered nodes as an empty list, so leaving them out made every
     * chat vanish the moment a query was typed.
     */
    standaloneGroups: SessionGroup[];
};
export declare const useSessionSidebarSections: (args: Args) => {
    projectSections: ProjectSection[];
    visibleProjectSections: ProjectSection[];
    groupSearchDataByGroup: WeakMap<SessionGroup, GroupSearchData>;
    searchableProjectSections: ProjectSection[];
    sectionsForRender: ProjectSection[];
    flatSectionsForRender: ProjectSection[];
    searchMatchCount: number;
};
export {};
