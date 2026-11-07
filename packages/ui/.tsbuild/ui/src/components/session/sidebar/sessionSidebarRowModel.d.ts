import type { Session } from '@/lib/opencode/model';
import type { SessionRowLines } from '@/stores/useSessionDisplayStore';
import type { SessionFolder, SessionFoldersMap } from '@/stores/useSessionFoldersStore';
import type { GroupSearchData, SessionGroup, SessionNode } from './types';
import type { ProjectSection } from './projects/sessionProjectRender';
import { type BlockingBadgeSessionScope } from './sessions/sessionNodeItemUtils';
import type { SessionRowOrderEntry } from './sessions/sessionRowOrder';
import { type SessionTreeGuide } from './sessions/sessionTreeGeometry';
import { type MultiRunIndex, type MultiRunSummary } from '@/lib/multirun/runs';
import { type SidebarAttentionZoneKey, type SidebarSectionKey, type SidebarZoneKey, type TimelineChatsPlacement } from '@/stores/sidebarLayout';
export type SessionSidebarActivityItem = {
    node: SessionNode;
    blockingBadgeSessionScopes?: readonly BlockingBadgeSessionScope[];
    projectId: string | null;
    groupDirectory: string | null;
    secondaryMeta: {
        projectLabel?: string | null;
        branchLabel?: string | null;
    } | null;
    getSecondaryMeta?: (sessionId: string) => SessionSidebarActivityItem['secondaryMeta'];
    /** Search matches in the session's whole tree, for zone rows whose node drops its children. */
    searchMatchCount?: number;
};
/**
 * Zones with a header of their own: Chats, Pinned, In work, the attention
 * zones, `all`, the List view's heading over the projects when Chats are
 * among them, or over its one combined list, and `timeline`, the List view's
 * one list of every project's sessions when it sorts them by time.
 */
export type SessionSidebarActivityKey = SidebarZoneKey | 'all' | 'timeline';
/** Activity sections; the display menu's Collapse all / Expand all drive them with the projects. */
export declare const SIDEBAR_ACTIVITY_KEYS: readonly SessionSidebarActivityKey[];
export type SessionSidebarRenderContext = 'project' | 'timeline' | 'timeline-mixed' | 'timeline-by-time' | 'mixed-compact' | 'mixed-flat' | 'timeline-chat' | 'tree-chat';
/**
 * Rows that keep the tree's geometry and its slot left of the title, which
 * shows the live state: everything in Tree but the detailed zone rows. List
 * rows are flat and show the state on the right.
 */
export declare const hasTreeSlotContext: (context: SessionSidebarRenderContext) => boolean;
/** Rows that render through `SessionTimelineRowBody` with two or three lines. */
export declare const isMultiLineTimelineContext: (context: SessionSidebarRenderContext) => boolean;
/** Zone rows, where sessions of every project mix. */
export declare const isMixedZoneContext: (context: SessionSidebarRenderContext) => boolean;
export type SessionSidebarViewMode = 'projects' | 'timeline';
/** How the List view lays out project sessions: under their project, or in one list by time. */
export type SessionSidebarListGrouping = 'project' | 'time';
export type SessionSidebarGroupStatus = {
    state: 'ready' | 'loading' | 'load-failed' | 'initialization-failed' | 'permission-denied';
    directory: string | null;
    canGrantAccess: boolean;
};
export type SessionSidebarOwnerAuthority = {
    scopeKeys: readonly string[];
    complete: boolean;
};
type RowBase = {
    key: string;
    estimateSize: number;
    treeGuides?: readonly SessionTreeGuide[];
};
export type SessionSidebarRow = (RowBase & {
    kind: 'activity-header';
    activityKey: SessionSidebarActivityKey;
    collapsed: boolean;
    forceExpanded: boolean;
    count?: number;
}) | (RowBase & {
    kind: 'project-header';
    section: ProjectSection;
    collapsed: boolean;
    forceExpanded: boolean;
}) | (RowBase & {
    kind: 'group-header';
    group: SessionGroup;
    groupKey: string;
    projectId: string | null;
    collapsed: boolean;
    forceExpanded: boolean;
    empty: boolean;
    allSessions: readonly Session[];
}) | (RowBase & {
    kind: 'folder-header';
    depth: number;
    group: SessionGroup;
    folder: SessionFolder;
    displayName: string;
    scopeKey: string;
    scopeDirectory: string | null;
    ownerKey: string | null;
    nodes: readonly SessionNode[];
    activityNodes: readonly SessionNode[];
    projectId: string | null;
    archived: boolean;
    collapsed: boolean;
    forceExpanded: boolean;
    empty: boolean;
    deleteSessions: readonly Session[];
    subFolderCount: number;
    dropEnabled: boolean;
}) | (RowBase & {
    kind: 'session';
    node: SessionNode;
    blockingBadgeSessionScopes?: readonly BlockingBadgeSessionScope[];
    depth: number;
    projectId: string | null;
    groupDirectory: string | null;
    ownerKey: string | null;
    selectionScopeKey: string | null;
    archived: boolean;
    renderContext: SessionSidebarRenderContext;
    secondaryMeta: SessionSidebarActivityItem['secondaryMeta'];
}) | (RowBase & {
    kind: 'run';
    run: MultiRunSummary;
    depth: number;
    laneNodes: readonly SessionNode[];
    blockingSessionIds: readonly string[];
    projectId: string | null;
    projectLabel: string | null;
    groupDirectory: string | null;
    renderContext: SessionSidebarRenderContext;
    expansionKey: string;
    expanded: boolean;
    forceExpanded: boolean;
}) | (RowBase & {
    kind: 'empty';
    emptyKind: 'sidebar' | 'search' | 'archived';
    depth?: number;
}) | (RowBase & {
    kind: 'status';
    status: SessionSidebarGroupStatus;
    group: SessionGroup;
    groupKey: string;
    depth?: number;
    flat?: boolean;
}) | (RowBase & {
    kind: 'show-control';
    control: 'more' | 'fewer';
    containerKey: string;
    currentCount: number;
    increment: number;
    depth?: number;
    flat?: boolean;
});
export type SessionSidebarStickyHeader = {
    rowIndex: number;
    kind: 'activity' | 'project';
    id: string;
};
export type SessionSidebarFolderTarget = {
    rowKey: string;
    scopeKey: string;
    folderId: string;
    ownerKey: string;
    enabled: boolean;
};
/** The first header of a section, which dragging a section header sorts by. */
export type SessionSidebarSectionHeader = {
    key: SidebarSectionKey;
    rowKey: string;
    dragId: string;
};
/** A top-level session row in drawn order, with the list it sits in. */
export type SessionSidebarNavigationEntry = {
    sessionId: string;
    directory: string | null;
    containerKey: string;
};
export type SessionSidebarRowModel = {
    rows: readonly SessionSidebarRow[];
    sectionHeaders: readonly SessionSidebarSectionHeader[];
    navigationEntries: readonly SessionSidebarNavigationEntry[];
    selectionEntries: readonly SessionRowOrderEntry[];
    selectionDescendantIds: readonly string[];
    rowIndexByKey: ReadonlyMap<string, number>;
    stickyHeaders: readonly SessionSidebarStickyHeader[];
    folderDropTargets: readonly SessionSidebarFolderTarget[];
    folderAuthorityByOwner: ReadonlyMap<string, SessionSidebarOwnerAuthority>;
    sessionById: ReadonlyMap<string, Session>;
    searchMatchCount: number;
};
export type SessionSidebarRowModelArgs = {
    mode: 'normal' | 'search';
    /**
     * Projects renders the project/worktree tree. Timeline renders one header
     * per project over a flat, lifecycle-ordered list of its non-archived root
     * sessions, with no worktree groups or folders.
     */
    viewMode?: SessionSidebarViewMode;
    /**
     * Timeline only. `time` replaces the project headers with one list of
     * every project's sessions under a single zone header, in lifecycle order
     * with no reveal limit; sessions listed in Pinned or In work leave it.
     */
    listGrouping?: SessionSidebarListGrouping;
    sections: readonly ProjectSection[];
    authoritativeSections: readonly ProjectSection[];
    chatGroup: SessionGroup | null;
    /** Every non-archived root project session with its project, in lifecycle order. */
    timelineItems?: readonly SessionSidebarActivityItem[];
    /**
     * Pinned sessions and sessions in work, already ordered and
     * search-filtered. Each zone renders as its own block at the top, and its
     * sessions stay under their project too. Search lists each of them once,
     * in its zone.
     */
    pinnedItems?: readonly SessionSidebarActivityItem[];
    workItems?: readonly SessionSidebarActivityItem[];
    /** Sessions the attention zones pulled out by their live state, ordered and search-filtered. */
    attentionItems?: ReadonlyMap<SidebarAttentionZoneKey, readonly SessionSidebarActivityItem[]>;
    /** Every session listed in a zone. */
    zoneSessionIds?: ReadonlySet<string>;
    /** The order sections are drawn in; the classic order without it. */
    sectionOrder?: readonly SidebarSectionKey[];
    /**
     * The List view's layout. Chats as a group sit among the projects at
     * `chatsGroupIndex`; without project groups, `timelineItems` already holds
     * the chats that join the one combined list.
     */
    timelineLayout?: {
        chats: TimelineChatsPlacement;
        projectGroups: boolean;
        compactRows: boolean;
        chatsGroupIndex: number;
    };
    /** Pinned and In work rows in the Tree view: two lines with branch, PR and model when set, one otherwise. */
    zoneRowLines?: SessionRowLines;
    /** Chats rows: two lines when set, one otherwise; Tree Chats keep their tree slot either way. */
    chatsRowLines?: SessionRowLines;
    /** Session rows inside Tree projects: two lines when set, one otherwise; the rows keep the tree either way. */
    projectRowLines?: SessionRowLines;
    foldersMap: SessionFoldersMap;
    groupSearchDataByGroup: WeakMap<SessionGroup, GroupSearchData>;
    normalizedQuery: string;
    collapsedProjects: ReadonlySet<string>;
    collapsedGroups: ReadonlySet<string>;
    collapsedFolders: ReadonlySet<string>;
    collapsedActivities: ReadonlySet<string>;
    expandedParents: ReadonlySet<string>;
    visibleCountByContainer: ReadonlyMap<string, number>;
    pinnedSessionIds: ReadonlySet<string>;
    sessionOrderIndex: ReadonlyMap<string, number>;
    groupStatusByKey: ReadonlyMap<string, SessionSidebarGroupStatus>;
    folderAuthorityByOwner: ReadonlyMap<string, SessionSidebarOwnerAuthority>;
    activeProjectId: string | null;
    singleProjectMode: boolean;
    singleProjectId: string | null;
    showOnlyMainWorkspace: boolean;
    hideDirectoryControls: boolean;
    sessionBatchSize?: number;
    /** Active multi-runs; their member sessions collapse into one run row per container. */
    runIndex?: MultiRunIndex;
};
export declare const runExpansionKey: (renderContext: SessionSidebarRenderContext, runKey: string) => string;
/**
 * How many sessions of search-filtered trees a group reports as matches: for
 * a `ses_` id query the exact id only, otherwise every session the search
 * kept. Group search data and the row model both count with this, so taking
 * trees out of a group takes exactly their share out of its count.
 */
export declare const countSessionSearchMatches: (nodes: readonly SessionNode[], normalizedQuery: string) => number;
/** The sortable id of a zone header. */
export declare const sectionDragId: (key: SessionSidebarActivityKey) => string;
/** Show more / Show fewer state of a project's session list in the timeline. */
export declare const timelineProjectContainerKey: (projectId: string) => string;
export declare const resolveSessionSidebarStickyHeader: (stickyHeaders: readonly SessionSidebarStickyHeader[], firstVisibleIndex: number) => SessionSidebarStickyHeader | null;
export declare const buildSessionSidebarRowModel: (args: SessionSidebarRowModelArgs) => SessionSidebarRowModel;
export {};
