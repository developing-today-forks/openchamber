import type { SidebarSection } from '@/constants/sidebar';
import type { ShortcutCombo } from '@/lib/shortcuts';
import type { DraftStarterRef } from '@/lib/draftStarters';
import type { CustomProviderIcon } from '@/lib/customProviderIcons';
import { type MonoFontOption, type UiFontOption } from '@/lib/fontOptions';
import { type MobileKeyboardMode } from '@/lib/mobileKeyboardMode';
import type { TerminalShell } from '@/lib/api/types';
import type { PermissionMode } from './utils/permissionAutoAccept';
import { type ContextPanelMode } from '@/lib/surfaces/modes';
import { type MobileWorkspaceTab } from '@/lib/mobileWorkspaceTabs';
import { type ContextZone, type ContextZonePlacement, type MovedZoneViews } from '@/lib/workspace/zones';
import { type WorkStatusPanelSectionId } from '@/components/chat/work-status/sections';
export type PendingDiffScope = 'working' | 'staged' | 'turn' | 'branch' | 'commit' | 'pr';
export type { ContextPanelMode };
export declare const clampContextEditorTreeWidth: (width: number) => number;
type MermaidRenderingMode = 'svg' | 'ascii';
type UserMessageRenderingMode = 'markdown' | 'plain';
type ActivityRenderMode = 'collapsed' | 'summary';
export type SessionRetentionAction = 'archive' | 'delete';
export type TimeFormatPreference = 'auto' | '12h' | '24h';
type WeekStartPreference = 'auto' | 'sunday' | 'monday';
type DesktopWindowControlsPosition = 'left' | 'right';
type DesktopWindowControlsStyle = 'classic' | 'traffic-lights';
export type FileEditorKeymap = 'default' | 'vim';
export type LargeTextPasteBehavior = 'ask' | 'attach' | 'inline' | 'inline-double-paste';
export type AgentTerminalsPlacement = 'terminal-panel' | 'sidebar';
export type SessionGoalChecker = 'classifier' | 'small-model';
/** What an approved goal spec does on send: it rides along with the typed message, or it is the message. */
export type SessionGoalWriterSendMode = 'with-message' | 'goal-as-message';
/** Whether a session without a goal turns the next message into one: never, after review, or straight away. */
export type SessionGoalAutoCreate = 'off' | 'review' | 'auto';
export type ActiveRunModelChangeBehavior = 'next-message' | 'restart';
type ContextPanelTab = {
    id: string;
    mode: ContextPanelMode;
    targetPath: string | null;
    targetDirectory: string | null;
    dedupeKey: string;
    label: string | null;
    sessionTitleFallback: string | null;
    readOnly: boolean;
    stagedDiff: boolean;
    diffScope: PendingDiffScope | null;
    /** A file tab opened by a single click in the files tree. The next such
        click replaces it; opening the file any other way, editing it, or
        double-clicking keeps it. */
    preview: boolean;
    /** The session whose agent opened this browser tab; null for a tab the
        user opened. Agent actions that name no tab use their own session's tab
        and leave another session's alone. */
    ownerSessionId: string | null;
    touchedAt: number;
};
type ContextPanelTabDescriptor = {
    mode: ContextPanelMode;
    targetPath?: string | null;
    targetDirectory?: string | null;
    dedupeKey?: string | null;
    label?: string | null;
    sessionTitleFallback?: string | null;
    readOnly?: boolean;
    stagedDiff?: boolean;
    diffScope?: PendingDiffScope | null;
    preview?: boolean;
    ownerSessionId?: string | null;
};
type ContextPanelDirectoryState = {
    isOpen: boolean;
    expanded: boolean;
    tabs: ContextPanelTab[];
    activeTabId: string | null;
    /** The left and bottom zones. Every zone shows tabs of the surfaces placed in it. */
    zones: MovedZoneViews;
    widthByMode: Partial<Record<ContextPanelMode, number>>;
    /** The bottom zone's height per surface, px; unset opens at the default. */
    heightByMode: Partial<Record<ContextPanelMode, number>>;
    touchedAt: number;
};
type PendingFileNavigation = {
    path: string;
    line: number;
    column: number;
};
type EventStreamStatus = 'idle' | 'connecting' | 'connected' | 'reconnecting' | 'paused' | 'offline' | 'error';
export declare const normalizeContextPanelDirectoryKey: (value: string) => string;
/**
 * The Tracker surface's first tab: the checked-out branch's pull request, or
 * the form that creates it. It is always there and never closes; the items
 * opened beside it carry their link as `targetPath`.
 */
export declare const isTrackerBranchTab: (tab: {
    mode: ContextPanelMode;
    targetPath: string | null;
}) => boolean;
interface UIStore {
    theme: 'light' | 'dark' | 'system';
    /** Key of the multi-run whose overview replaces the chat area, if open. */
    runOverviewKey: string | null;
    /** One-shot request for the composer to enter parallel mode; the composer consumes it. */
    parallelComposerRequest: {
        id: number;
        prompt: string;
    } | null;
    isSidebarOpen: boolean;
    sidebarWidth: number;
    contextPanelByDirectory: Record<string, ContextPanelDirectoryState>;
    contextRailOrder: string[];
    /** Surface ids the user hid from the context rail; stored as the hidden set
        so surfaces added later appear for everyone. */
    contextRailHiddenSurfaces: string[];
    /** Order of the phone's workspace drawer tabs (lib/mobileWorkspaceTabs.ts). */
    mobileWorkspaceTabOrder: string[];
    /** Workspace drawer tabs the user hid; stored as the hidden set so tabs added later appear for everyone. */
    mobileWorkspaceHiddenTabs: string[];
    /** Surfaces the user moved off the right zone, per device (lib/workspace/zones.ts). */
    contextSurfaceZones: ContextZonePlacement;
    contextEditorTreeVisible: boolean;
    /** Which side of the file surface its tree column docks to. */
    fileTreeSide: 'left' | 'right';
    /** Whether the file surface shows its editor while files are open; hiding
        it leaves only the tree, with the file tabs kept open. */
    contextEditorVisible: boolean;
    contextEditorTreeWidth: number;
    /** Expanded collapsible sections of the in-chat work-status panel, by id. */
    workStatusExpandedSections: Record<string, boolean>;
    /**
     * Whether the queued-messages panel above the composer shows its list. One
     * preference for every session: the user opens or closes it once and it
     * stays that way across session switches and reloads.
     */
    messageQueueExpanded: boolean;
    /** Scroll offset of that panel, so it survives being unmounted. */
    workStatusScrollTop: number;
    /** Whether the in-chat work-status panel may render at all. */
    workStatusPanelEnabled: boolean;
    /**
     * Whether it is actually on screen right now — the switch can be on while
     * layout still refuses it (narrow chat, open context panel). Transient, never
     * persisted: it describes the current frame, not a preference. The header
     * and the git rail read it to stop repeating what the panel already shows.
     */
    workStatusPanelVisible: boolean;
    /** Layout can host the panel inline. Transient, like the one above. */
    workStatusPanelFits: boolean;
    /**
     * Shown over the chat because it does not fit beside it. Transient and never
     * persisted: it is a response to the current window, not a preference, and
     * the panel returns to its place as soon as there is room.
     */
    workStatusOverlayOpen: boolean;
    /**
     * Sections the user switched off. Hidden rather than visible ones are
     * stored, so a section added later appears without touching saved settings.
     * Persisted to server settings, not just this browser.
     */
    workStatusHiddenSections: string[];
    workStatusSectionOrder: WorkStatusPanelSectionId[];
    /** Explicitly chosen hidden-section state. False keeps the default opt-in seed. */
    workStatusHiddenSectionsExplicit: boolean;
    isSessionSwitcherOpen: boolean;
    isSessionDropdownOpen: boolean;
    pendingDiffFile: string | null;
    pendingDiffStaged: boolean;
    pendingDiffScope: PendingDiffScope | null;
    pendingFileNavigation: PendingFileNavigation | null;
    pendingFileFocusPath: string | null;
    isMobile: boolean;
    isCommandPaletteOpen: boolean;
    isHelpDialogOpen: boolean;
    isProjectActionsDialogOpen: boolean;
    isAboutDialogOpen: boolean;
    isOpenCodeStatusDialogOpen: boolean;
    openCodeStatusText: string;
    isSessionCreateDialogOpen: boolean;
    isScheduledTasksDialogOpen: boolean;
    isArchivePageOpen: boolean;
    /** The full-screen integrations catalog page, opened from the sidebar header. */
    isIntegrationsCatalogOpen: boolean;
    /** The query the Archive page opened with; empty for a plain open. */
    archivePageSearch: string;
    /** Grows on every open, so a page already on screen restarts with the new query. */
    archivePageOpenCount: number;
    isUsageStatsPageOpen: boolean;
    /** The issues and pull requests board. */
    isSourceBoardOpen: boolean;
    openGuestPageId: string | null;
    worktreesPageProjectId: string | null;
    /** The project whose isolated spaces fill the main area, opened from its menu in the sidebar. */
    spacesPageProjectId: string | null;
    isSettingsDialogOpen: boolean;
    isNewWorktreeDialogOpen: boolean;
    isModelSelectorOpen: boolean;
    sidebarSection: SidebarSection;
    settingsPage: string;
    settingsHasOpenedOnce: boolean;
    settingsProjectsSelectedId: string | null;
    /**
     * Project the Settings pages are looking at. `null` follows the app's active
     * project. Settings browses another project's configuration without moving
     * the chat, the session list or the file tree, so this is its own state and
     * not a second writer of the active project.
     */
    settingsProjectPath: string | null;
    /**
     * One-shot request to open Settings → Providers on the connect form (model
     * picker "add provider", settings search). The page consumes and clears it;
     * which provider the page shows is otherwise its own local state.
     */
    settingsProvidersConnectRequested: boolean;
    /** Set by links elsewhere in Settings; the Providers page opens Classification providers once and clears it. */
    settingsProvidersClassificationRequested: boolean;
    /** A provider another Settings page asked the Providers page to open; the page opens it once and clears it. */
    settingsProvidersOpenRequested: string | null;
    /**
     * A link inside Settings asking to open another page and, optionally, scroll
     * to one of its items the way a search result does. SettingsView consumes it.
     */
    settingsJumpRequest: {
        page: string;
        itemId: string | null;
    } | null;
    settingsRemoteInstancesSelectedId: string | null;
    eventStreamStatus: EventStreamStatus;
    eventStreamHint: string | null;
    showReasoningTraces: boolean;
    streamingAutoFollowEnabled: boolean;
    sessionRecapEnabled: boolean;
    sessionSuggestionEnabled: boolean;
    /** The "In work" sidebar block, the Track / Done actions, and sessions going in on a sent message. */
    sessionWorkEnabled: boolean;
    /** Let Jev offer an AI review or a walkthrough after a turn that changed the project. */
    sessionReviewOfferEnabled: boolean;
    sessionGoalEnabled: boolean;
    /** Who checks goal progress; the small model checks when no classification provider can. */
    sessionGoalChecker: SessionGoalChecker;
    /** Automatic continuations a goal may take before it stops for the user (1–200). */
    sessionGoalMaxAutoTurns: number;
    sessionGoalDefaultBudgetEnabled: boolean;
    sessionGoalDefaultBudget: number;
    /** A model writes the goal spec from the armed message (the composer's sparkle switch). */
    sessionGoalWriterEnabled: boolean;
    /** Show the written spec for approval before sending; off sends it straight away. */
    sessionGoalWriterReview: boolean;
    sessionGoalWriterSendMode: SessionGoalWriterSendMode;
    /** Every goal objective, from any entry point, goes through the goal writer. */
    sessionGoalRewriteAll: boolean;
    /** Whether a model pick during a run waits for the next prompt or restarts the current one. */
    activeRunModelChangeBehavior: ActiveRunModelChangeBehavior;
    sessionGoalAutoCreate: SessionGoalAutoCreate;
    /** The most characters a goal objective keeps; a longer one is condensed when saved. */
    sessionGoalObjectiveCharLimit: number;
    /** The most of an objective the progress check reads. */
    sessionGoalCheckObjectiveCharLimit: number;
    /** A writer model or effort chosen in a goal window becomes the Settings default. */
    sessionGoalWriterRememberChoice: boolean;
    collapsibleThinkingBlocks: boolean;
    /** A collapsible reasoning block opens while its model thinks. Off: it stays folded to its header. */
    expandReasoningWhileStreaming: boolean;
    activityRenderMode: ActivityRenderMode;
    showDeletionDialog: boolean;
    autoDeleteEnabled: boolean;
    /** Global file-editor autosave. Default true for backward compatibility. */
    autoSaveEnabled: boolean;
    /** Ask before a drag in the files tree moves a file or folder. */
    confirmFileTreeMove: boolean;
    /**
     * The session sidebar, the context zones and the work-status card animate
     * as they open and close. Off, they snap (`useLayoutAnimationMs`).
     */
    layoutAnimations: boolean;
    /** Plain clicks on links in chat open in the built-in browser panel (desktop only). */
    openLinksInBrowserPanel: boolean;
    /** How many of the user's browser tabs keep their page loaded, across projects (desktop only). */
    liveBrowserTabLimit: number;
    /** Plain clicks on issue, PR and Linear links in chat open them on the issues and PRs board. */
    openTrackerLinksOnBoard: boolean;
    autoDeleteAfterDays: number;
    sessionRetentionAction: SessionRetentionAction;
    sessionRetentionOnlyArchived: boolean;
    /** Archive a worktree's sessions and remove it once its PR is merged. Off by default. */
    mergedWorktreeCleanupEnabled: boolean;
    autoDeleteLastRunAt: number | null;
    messageLimit: number;
    fontSize: number;
    globalDraftStarters: DraftStarterRef[] | null;
    draftStartersVisible: boolean;
    terminalFontSize: number;
    terminalShell: TerminalShell;
    terminalLoginShells: TerminalShell[];
    editorFontSize: number;
    uiFont: UiFontOption;
    monoFont: MonoFontOption;
    /** Family names used when `uiFont` / `monoFont` is `custom`. */
    customUiFont: string;
    customMonoFont: string;
    padding: number;
    cornerRadius: number;
    inputBarOffset: number;
    mobileKeyboardMode: MobileKeyboardMode;
    favoriteModels: Array<{
        providerID: string;
        modelID: string;
    }>;
    hiddenModels: Array<{
        providerID: string;
        modelID: string;
    }>;
    providerOrder: string[];
    collapsedModelProviders: string[];
    customProviderIcons: Record<string, CustomProviderIcon>;
    recentModels: Array<{
        providerID: string;
        modelID: string;
    }>;
    /** `provider/model` last picked in a chat composer; a new session starts on it when nothing is configured. */
    lastSelectedModel: string | undefined;
    recentAgents: string[];
    /** Agents starred in the agent menu. While any of them is available, agent cycling (Tab) goes through those only. */
    favoriteAgents: string[];
    recentEfforts: Record<string, string[]>;
    diffLayoutPreference: 'dynamic' | 'inline' | 'side-by-side';
    diffFileLayout: Record<string, 'inline' | 'side-by-side'>;
    diffWrapLines: boolean;
    diffHideWhitespace: boolean;
    diffFileListMode: 'flat' | 'tree';
    /** Width of the diff view's file tree column, in pixels. */
    diffFileTreeWidth: number;
    /** Width of the walkthrough table of contents, in pixels. */
    walkthroughTocWidth: number;
    gitChangesViewMode: 'flat' | 'tree';
    toolJsonViewMode: 'summary' | 'formatted' | 'raw';
    isTimelineDialogOpen: boolean;
    isPromptNavigatorPanelOpen: boolean;
    isImagePreviewOpen: boolean;
    nativeNotificationsEnabled: boolean;
    notificationMode: 'always' | 'hidden-only';
    notifyOnSubtasks: boolean;
    dockBadgeEnabled: boolean;
    alwaysShowScrollbars: boolean;
    notifyOnCompletion: boolean;
    notifyOnError: boolean;
    notifyOnQuestion: boolean;
    notificationTemplates: {
        completion: {
            title: string;
            message: string;
        };
        error: {
            title: string;
            message: string;
        };
        question: {
            title: string;
            message: string;
        };
        subtask: {
            title: string;
            message: string;
        };
    };
    summarizeLastMessage: boolean;
    summaryThreshold: number;
    summaryLength: number;
    maxLastMessageLength: number;
    showTerminalQuickKeysOnDesktop: boolean;
    /** Header session tabs (web/desktop), opt-in. Off keeps the plain session title. */
    sessionTabsEnabled: boolean;
    persistChatDraft: boolean;
    showOpenCodeUpdateNotifications: boolean;
    agentControlToolEnabled: boolean;
    agentScheduleToolEnabled: boolean;
    agentWebToolEnabled: boolean;
    /** Full-text message search (server index). Opt-in: off keeps every part of it idle. */
    messageSearchEnabled: boolean;
    /** Also index the agent's reasoning. Opt-in: it can make the index much bigger. */
    messageSearchReasoningEnabled: boolean;
    /** Keep a local history of manual model and effort choices, for notes and Settings suggestions. On by default. */
    modelChoiceRecordingEnabled: boolean;
    /** Who answers the agent's browser actions: `builtin` (the in-app view) or an extension id. */
    browserProvider: string;
    agentMemoryToolEnabled: boolean;
    agentKnowledgeToolEnabled: boolean;
    agentNotifyToolEnabled: boolean;
    agentRenderToolEnabled: boolean;
    /** Whether OpenChamber's agent tools sit behind OpenCode's Code Mode instead of being direct tools. */
    agentToolsCodeMode: boolean;
    /** The isolated-spaces switch as saved; the server applies it at its next start. */
    isolatedSpacesEnabled: boolean;
    /** The permission mode the server writes onto each new top-level session. */
    permissionDefaultMode: PermissionMode;
    /**
     * Whether this build has agent memory at all. Server-owned and not
     * persisted: an unreleased feature must not come back from a stale cache.
     */
    agentMemoryFeatureAvailable: boolean;
    /**
     * Whether this build has Jev model routing. Server-owned and not persisted,
     * for the same reason as the memory flag.
     */
    routingFeatureAvailable: boolean;
    /**
     * Whether OpenChamber's tool switches reach the running OpenCode without a
     * restart. Server-owned and not persisted, like the flags above.
     */
    managedToolsApplyLive: boolean;
    /**
     * When the user last looked at each memory scope, keyed by scope. Drives the
     * new/changed badges; there is no stored review state.
     */
    agentMemoryViewedAt: Record<string, number>;
    /** Active tab of the project context panel (notes/todos/plans). */
    projectContextTab: string;
    /**
     * A saved plan an agent asked to show, waiting for the Project knowledge
     * panel of its project to open it in place. Not persisted.
     */
    projectKnowledgePlanRequest: {
        projectContextId: string;
        planId: string;
    } | null;
    inputSpellcheckEnabled: boolean;
    largeTextPasteBehavior: LargeTextPasteBehavior;
    agentTerminalsPlacement: AgentTerminalsPlacement;
    agentTerminalNames: Record<string, string>;
    enterToSend: boolean;
    enterToSendConfigured: boolean;
    wideChatLayoutEnabled: boolean;
    codeBlockLineWrap: boolean;
    tableCellWrap: boolean;
    copyMessagesAsPlainText: boolean;
    showToolFileIcons: boolean;
    showTurnChangedFiles: boolean;
    timeFormatPreference: TimeFormatPreference;
    weekStartPreference: WeekStartPreference;
    desktopWindowControlsPosition: DesktopWindowControlsPosition;
    desktopWindowControlsStyle: DesktopWindowControlsStyle;
    mermaidRenderingMode: MermaidRenderingMode;
    userMessageRenderingMode: UserMessageRenderingMode;
    collapsibleUserMessages: boolean;
    stickyUserHeader: boolean;
    promptNavigatorEnabled: boolean;
    showSplitAssistantMessageActions: boolean;
    allowPromptingSubagentSessions: boolean;
    savePastedImagesAsFiles: boolean;
    isExpandedInput: boolean;
    reportUsage: boolean;
    shortcutOverrides: Record<string, ShortcutCombo>;
    fileEditorKeymap: FileEditorKeymap;
    /** vimrc map lines applied whenever the file editor runs in Vim mode. */
    fileEditorVimMappings: string;
    setTheme: (theme: 'light' | 'dark' | 'system') => void;
    toggleSidebar: () => void;
    setSidebarOpen: (open: boolean) => void;
    setSidebarWidth: (width: number) => void;
    setContextRailOrder: (order: string[]) => void;
    toggleContextEditorTree: () => void;
    toggleContextEditor: () => void;
    setContextEditorTreeWidth: (width: number) => void;
    openContextSurface: (directory: string, mode: ContextPanelMode) => void;
    openContextPanelTab: (directory: string, tab: ContextPanelTabDescriptor, options?: {
        reveal?: boolean;
    }) => void;
    /**
     * Opens an issue, pull or merge request or Linear issue in the panel's
     * Tracker surface, one tab per item (`key` names the item, whatever page of
     * it the link opens). `targetDirectory` is the project it is read through.
     * Answers the tab's id.
     */
    openTrackerItem: (directory: string, item: {
        url: string;
        key: string;
        label: string;
        targetDirectory: string | null;
    }) => string | null;
    openContextDiff: (directory: string, filePath: string, staged?: boolean, scope?: PendingDiffScope | null) => void;
    /** `preview` opens it as the replaceable preview tab (a files-tree click). */
    openContextFile: (directory: string, filePath: string, options?: {
        preview?: boolean;
    }) => void;
    /** Turns a preview file tab into a regular one. */
    pinContextPanelTab: (directory: string, tabID: string) => void;
    openContextFileAtLine: (directory: string, filePath: string, line: number, column?: number, options?: {
        preview?: boolean;
    }) => void;
    openContextOverview: (directory: string) => void;
    openContextPreview: (directory: string, url: string) => void;
    openContextBrowser: (directory: string, url?: string, options?: {
        reveal?: boolean;
    }) => void;
    openNewContextBrowserTab: (directory: string) => void;
    /** A new background browser tab for an agent at `url`; returns its tab id, or null where there is no browser. */
    openAgentBrowserTab: (directory: string, url: string, ownerSessionId: string | null) => string | null;
    setContextPanelTabTargetPath: (directory: string, tabID: string, targetPath: string) => void;
    /**
     * Points file tabs and the editor's open files at or under `fromPath` at `toPath` after a move or
     * rename. `filesRoot` is the root the editor keeps them under when it is not `directory`: a draft
     * waiting for a space shows the space's files in its own panel.
     */
    moveContextFilePaths: (directory: string, fromPath: string, toPath: string, filesRoot?: string) => void;
    setActiveContextPanelTab: (directory: string, tabID: string) => void;
    reorderContextPanelTabs: (directory: string, activeTabID: string, overTabID: string) => void;
    closeContextPanelTab: (directory: string, tabID: string) => void;
    /** Closes the file tab showing `filePath`, as its close button does. */
    closeContextFile: (directory: string, filePath: string) => void;
    closeContextPanelTabs: (directory: string, tabIds: readonly string[]) => void;
    /** Closes the right zone. */
    closeContextPanel: (directory: string) => void;
    closeContextZone: (directory: string, zone: ContextZone) => void;
    /** One zone is expanded at a time; expanding one collapses the others. */
    toggleContextPanelExpanded: (directory: string, zone?: ContextZone) => void;
    setContextPanelWidth: (directory: string, mode: ContextPanelMode, width: number) => void;
    setContextPanelHeight: (directory: string, mode: ContextPanelMode, height: number) => void;
    /**
     * Places a surface in a zone for every project on this device. Where it is
     * on screen it goes along: the zone it left closes and the new one opens on it.
     */
    moveContextSurfaceToZone: (mode: ContextPanelMode, zone: ContextZone) => void;
    setWorkStatusSectionExpanded: (sectionId: string, expanded: boolean) => void;
    setMessageQueueExpanded: (expanded: boolean) => void;
    setWorkStatusScrollTop: (scrollTop: number) => void;
    setWorkStatusPanelEnabled: (enabled: boolean) => void;
    setWorkStatusPanelVisible: (visible: boolean) => void;
    setWorkStatusPanelFits: (fits: boolean) => void;
    setWorkStatusOverlayOpen: (open: boolean) => void;
    setWorkStatusSectionVisible: (sectionId: string, visible: boolean) => void;
    setWorkStatusHiddenSections: (sectionIds: string[]) => void;
    setWorkStatusSectionOrder: (sectionIds: readonly string[]) => void;
    setContextRailSurfaceVisible: (surfaceId: string, visible: boolean) => void;
    setContextRailHiddenSurfaces: (surfaceIds: string[]) => void;
    setMobileWorkspaceTabOrder: (order: readonly string[]) => void;
    setMobileWorkspaceTabVisible: (tab: MobileWorkspaceTab, visible: boolean) => void;
    setSessionSwitcherOpen: (open: boolean) => void;
    setSessionDropdownOpen: (open: boolean) => void;
    setPendingDiffFile: (filePath: string | null, staged?: boolean, scope?: PendingDiffScope | null) => void;
    setPendingFileNavigation: (navigation: PendingFileNavigation | null) => void;
    setPendingFileFocusPath: (path: string | null) => void;
    navigateToDiff: (filePath: string, staged?: boolean, scope?: PendingDiffScope | null) => void;
    consumePendingDiffFile: () => string | null;
    setIsMobile: (isMobile: boolean) => void;
    toggleCommandPalette: () => void;
    setCommandPaletteOpen: (open: boolean) => void;
    toggleHelpDialog: () => void;
    setHelpDialogOpen: (open: boolean) => void;
    setProjectActionsDialogOpen: (open: boolean) => void;
    setAboutDialogOpen: (open: boolean) => void;
    setOpenCodeStatusDialogOpen: (open: boolean) => void;
    setOpenCodeStatusText: (text: string) => void;
    setSessionCreateDialogOpen: (open: boolean) => void;
    setScheduledTasksDialogOpen: (open: boolean) => void;
    /** `search` fills the page's search field, for a sidebar search that found nothing. */
    setArchivePageOpen: (open: boolean, search?: string) => void;
    setIntegrationsCatalogOpen: (open: boolean) => void;
    setUsageStatsPageOpen: (open: boolean) => void;
    setSourceBoardOpen: (open: boolean) => void;
    setOpenGuestPage: (id: string | null) => void;
    setWorktreesPageProjectId: (projectId: string | null) => void;
    setSpacesPageProjectId: (projectId: string | null) => void;
    /** Close every full-page surface (Scheduled, Archive, Usage, Issues and PRs, Worktrees, Spaces, Multi-run). */
    closeMainSurfaces: () => void;
    setSettingsDialogOpen: (open: boolean) => void;
    setNewWorktreeDialogOpen: (open: boolean) => void;
    setModelSelectorOpen: (open: boolean) => void;
    applyTheme: () => void;
    setSidebarSection: (section: SidebarSection) => void;
    setSettingsPage: (slug: string) => void;
    setSettingsProjectsSelectedId: (projectId: string | null) => void;
    setSettingsProjectPath: (path: string | null) => void;
    setSettingsProvidersConnectRequested: (requested: boolean) => void;
    setSettingsProvidersClassificationRequested: (requested: boolean) => void;
    setSettingsProvidersOpenRequested: (providerId: string | null) => void;
    requestSettingsJump: (page: string, itemId?: string | null) => void;
    clearSettingsJumpRequest: () => void;
    setSettingsRemoteInstancesSelectedId: (instanceId: string | null) => void;
    setEventStreamStatus: (status: EventStreamStatus, hint?: string | null) => void;
    setShowReasoningTraces: (value: boolean) => void;
    setStreamingAutoFollowEnabled: (value: boolean) => void;
    setSessionRecapEnabled: (value: boolean) => void;
    setSessionSuggestionEnabled: (value: boolean) => void;
    setSessionWorkEnabled: (value: boolean) => void;
    setSessionReviewOfferEnabled: (value: boolean) => void;
    setSessionGoalEnabled: (value: boolean) => void;
    setSessionGoalChecker: (value: SessionGoalChecker) => void;
    setSessionGoalMaxAutoTurns: (value: number) => void;
    setSessionGoalDefaultBudgetEnabled: (value: boolean) => void;
    setSessionGoalDefaultBudget: (value: number) => void;
    setSessionGoalWriterEnabled: (value: boolean) => void;
    setSessionGoalWriterReview: (value: boolean) => void;
    setSessionGoalWriterSendMode: (value: SessionGoalWriterSendMode) => void;
    setSessionGoalRewriteAll: (value: boolean) => void;
    setActiveRunModelChangeBehavior: (value: ActiveRunModelChangeBehavior) => void;
    setSessionGoalAutoCreate: (value: SessionGoalAutoCreate) => void;
    setSessionGoalObjectiveCharLimit: (value: number) => void;
    setSessionGoalCheckObjectiveCharLimit: (value: number) => void;
    setSessionGoalWriterRememberChoice: (value: boolean) => void;
    setCollapsibleThinkingBlocks: (value: boolean) => void;
    setExpandReasoningWhileStreaming: (value: boolean) => void;
    setActivityRenderMode: (value: ActivityRenderMode) => void;
    setShowDeletionDialog: (value: boolean) => void;
    setAutoDeleteEnabled: (value: boolean) => void;
    setMergedWorktreeCleanupEnabled: (value: boolean) => void;
    setAutoSaveEnabled: (value: boolean) => void;
    setConfirmFileTreeMove: (value: boolean) => void;
    setLayoutAnimations: (value: boolean) => void;
    setOpenLinksInBrowserPanel: (value: boolean) => void;
    setLiveBrowserTabLimit: (value: number) => void;
    setOpenTrackerLinksOnBoard: (value: boolean) => void;
    setFileTreeSide: (side: 'left' | 'right') => void;
    setAutoDeleteAfterDays: (days: number) => void;
    setSessionRetentionAction: (value: SessionRetentionAction) => void;
    setSessionRetentionOnlyArchived: (value: boolean) => void;
    setAutoDeleteLastRunAt: (timestamp: number | null) => void;
    setMessageLimit: (value: number) => void;
    setFontSize: (size: number) => void;
    setGlobalDraftStarters: (refs: DraftStarterRef[]) => void;
    setDraftStartersVisible: (value: boolean) => void;
    setTerminalFontSize: (size: number) => void;
    setTerminalShell: (shell: TerminalShell) => void;
    setTerminalLoginShells: (shells: TerminalShell[]) => void;
    setEditorFontSize: (size: number) => void;
    setUiFont: (font: UiFontOption) => void;
    setMonoFont: (font: MonoFontOption) => void;
    setCustomUiFont: (family: string) => void;
    setCustomMonoFont: (family: string) => void;
    setPadding: (size: number) => void;
    setCornerRadius: (radius: number) => void;
    setInputBarOffset: (offset: number) => void;
    setMobileKeyboardMode: (mode: MobileKeyboardMode) => void;
    applyTypography: () => void;
    applyPadding: () => void;
    toggleFavoriteModel: (providerID: string, modelID: string) => void;
    reorderFavoriteModel: (activeProviderID: string, activeModelID: string, overProviderID: string, overModelID: string) => void;
    setProviderOrder: (orderedProviderIDs: string[]) => void;
    setCustomProviderIcon: (providerID: string, icon: CustomProviderIcon | null) => void;
    toggleHiddenModel: (providerID: string, modelID: string) => void;
    isHiddenModel: (providerID: string, modelID: string) => boolean;
    hideAllModels: (providerID: string, modelIDs: string[]) => void;
    showAllModels: (providerID: string) => void;
    toggleModelProviderCollapsed: (providerID: string) => void;
    setModelProvidersCollapsed: (providerIDs: string[], collapsed: boolean) => void;
    isFavoriteModel: (providerID: string, modelID: string) => boolean;
    addRecentModel: (providerID: string, modelID: string) => void;
    setLastSelectedModel: (providerID: string, modelID: string) => void;
    addRecentAgent: (agentName: string) => void;
    toggleFavoriteAgent: (agentName: string) => void;
    addRecentEffort: (providerID: string, modelID: string, variant: string | undefined) => void;
    setDiffLayoutPreference: (mode: 'dynamic' | 'inline' | 'side-by-side') => void;
    /** The layout setting for every diff, dropping the per-file choices (the Changes header toggle). */
    setDiffLayoutForAllFiles: (mode: 'inline' | 'side-by-side') => void;
    setDiffFileLayout: (filePath: string, mode: 'inline' | 'side-by-side') => void;
    setDiffWrapLines: (wrap: boolean) => void;
    setDiffHideWhitespace: (hide: boolean) => void;
    setDiffFileListMode: (mode: 'flat' | 'tree') => void;
    setDiffFileTreeWidth: (width: number) => void;
    setWalkthroughTocWidth: (width: number) => void;
    setGitChangesViewMode: (mode: 'flat' | 'tree') => void;
    setToolJsonViewMode: (mode: 'summary' | 'formatted' | 'raw') => void;
    setRunOverviewKey: (runKey: string | null) => void;
    setTimelineDialogOpen: (open: boolean) => void;
    setPromptNavigatorPanelOpen: (open: boolean) => void;
    togglePromptNavigatorPanel: () => void;
    setImagePreviewOpen: (open: boolean) => void;
    setNativeNotificationsEnabled: (value: boolean) => void;
    setNotificationMode: (mode: 'always' | 'hidden-only') => void;
    setShowTerminalQuickKeysOnDesktop: (value: boolean) => void;
    setSessionTabsEnabled: (value: boolean) => void;
    setNotifyOnSubtasks: (value: boolean) => void;
    setDockBadgeEnabled: (value: boolean) => void;
    setAlwaysShowScrollbars: (value: boolean) => void;
    setNotifyOnCompletion: (value: boolean) => void;
    setNotifyOnError: (value: boolean) => void;
    setNotifyOnQuestion: (value: boolean) => void;
    setNotificationTemplates: (templates: UIStore['notificationTemplates'] | ((current: UIStore['notificationTemplates']) => UIStore['notificationTemplates'])) => void;
    setSummarizeLastMessage: (value: boolean) => void;
    setSummaryThreshold: (value: number) => void;
    setSummaryLength: (value: number) => void;
    setMaxLastMessageLength: (value: number) => void;
    setPersistChatDraft: (value: boolean) => void;
    setShowOpenCodeUpdateNotifications: (value: boolean) => void;
    setAgentControlToolEnabled: (value: boolean) => void;
    setAgentScheduleToolEnabled: (value: boolean) => void;
    setAgentWebToolEnabled: (value: boolean) => void;
    setMessageSearchEnabled: (value: boolean) => void;
    setMessageSearchReasoningEnabled: (value: boolean) => void;
    setModelChoiceRecordingEnabled: (value: boolean) => void;
    setBrowserProvider: (value: string) => void;
    setAgentMemoryToolEnabled: (value: boolean) => void;
    setAgentKnowledgeToolEnabled: (value: boolean) => void;
    setAgentNotifyToolEnabled: (value: boolean) => void;
    setAgentRenderToolEnabled: (value: boolean) => void;
    setAgentToolsCodeMode: (value: boolean) => void;
    setIsolatedSpacesEnabled: (value: boolean) => void;
    setPermissionDefaultMode: (value: PermissionMode) => void;
    setAgentMemoryFeatureAvailable: (value: boolean) => void;
    setRoutingFeatureAvailable: (value: boolean) => void;
    setManagedToolsApplyLive: (value: boolean) => void;
    markAgentMemoryViewed: (key: string, viewedAt: number) => void;
    setProjectContextTab: (value: string) => void;
    openProjectKnowledgePlan: (directory: string, projectContextId: string, planId: string) => void;
    clearProjectKnowledgePlanRequest: () => void;
    setInputSpellcheckEnabled: (value: boolean) => void;
    setLargeTextPasteBehavior: (value: LargeTextPasteBehavior) => void;
    setAgentTerminalsPlacement: (value: AgentTerminalsPlacement) => void;
    setAgentTerminalName: (ptyID: string, name: string) => void;
    setEnterToSend: (value: boolean) => void;
    setEnterToSendConfigured: (value: boolean) => void;
    setWideChatLayoutEnabled: (value: boolean) => void;
    setCodeBlockLineWrap: (value: boolean) => void;
    setTableCellWrap: (value: boolean) => void;
    setCopyMessagesAsPlainText: (value: boolean) => void;
    setShowToolFileIcons: (value: boolean) => void;
    setShowTurnChangedFiles: (value: boolean) => void;
    setTimeFormatPreference: (value: TimeFormatPreference) => void;
    setWeekStartPreference: (value: WeekStartPreference) => void;
    setDesktopWindowControlsPosition: (value: DesktopWindowControlsPosition) => void;
    setDesktopWindowControlsStyle: (value: DesktopWindowControlsStyle) => void;
    setMermaidRenderingMode: (value: MermaidRenderingMode) => void;
    setUserMessageRenderingMode: (value: UserMessageRenderingMode) => void;
    setCollapsibleUserMessages: (value: boolean) => void;
    setStickyUserHeader: (value: boolean) => void;
    setPromptNavigatorEnabled: (value: boolean) => void;
    setShowSplitAssistantMessageActions: (value: boolean) => void;
    setAllowPromptingSubagentSessions: (value: boolean) => void;
    setSavePastedImagesAsFiles: (value: boolean) => void;
    viewPagerPage: 'left' | 'center' | 'right';
    setViewPagerPage: (page: 'left' | 'center' | 'right') => void;
    toggleExpandedInput: () => void;
    setExpandedInput: (value: boolean) => void;
    requestParallelComposer: (prompt?: string) => void;
    consumeParallelComposerRequest: (id: number) => void;
    setReportUsage: (value: boolean) => void;
    setShortcutOverride: (actionId: string, combo: ShortcutCombo) => void;
    clearShortcutOverride: (actionId: string) => void;
    resetAllShortcutOverrides: () => void;
    setFileEditorKeymap: (value: FileEditorKeymap) => void;
    setFileEditorVimMappings: (value: string) => void;
}
export declare const useUIStore: import("zustand").UseBoundStore<Omit<Omit<import("zustand").StoreApi<UIStore>, "devtools" | "setState"> & {
    setState(partial: Partial<UIStore> | UIStore | ((state: UIStore) => Partial<UIStore> | UIStore), replace?: false | undefined, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): void;
    setState(state: UIStore | ((state: UIStore) => UIStore), replace: true, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): void;
    devtools: {
        cleanup: () => void;
    };
}, "persist" | "setState"> & {
    setState(partial: Partial<UIStore> | UIStore | ((state: UIStore) => Partial<UIStore> | UIStore), replace?: false | undefined, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): unknown;
    setState(state: UIStore | ((state: UIStore) => UIStore), replace: true, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): unknown;
    persist: {
        setOptions: (options: Partial<import("zustand/middleware").PersistOptions<UIStore, unknown, unknown>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: UIStore) => void) => () => void;
        onFinishHydration: (fn: (state: UIStore) => void) => () => void;
        getOptions: () => Partial<import("zustand/middleware").PersistOptions<UIStore, unknown, unknown>>;
    };
}>;
