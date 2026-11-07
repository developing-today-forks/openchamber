/**
 * The settings registry: one table that names every OpenChamber setting, who
 * owns it (`scope`), how a value is parsed at the boundary, and where the UI
 * keeps its live copy.
 *
 * Everything else about settings derives from this table: the `DesktopSettings`
 * type, the boundary sanitizer, the per-runtime mirror, the store apply step,
 * the store-subscribing auto-save, and — through the generated JSON snapshot
 * (`settings-registry.json`, see `registry-snapshot.ts`) — the server's and the
 * VS Code bridge's key lists. A key that is not here does not persist.
 *
 * Scopes (see `DOCUMENTATION.md` in this folder):
 * - `instance`: a fact about the machine the server runs on. Never synced.
 * - `profile`: the person's preference. Synced to every client of the
 *   instance; a few are stored per surface kind (`perSurface`).
 * - `device`: state of this install/surface. Fields that still cross the wire
 *   today are listed here so Phase 2 can stop them deliberately; fields that
 *   only ever lived in the local store are in `LOCAL_DEVICE_KEYS`.
 */
import type { ProjectEntry, TerminalShell } from '@/lib/api/types';
import type { DesktopWindowControlsPosition, DesktopWindowControlsStyle } from '@/lib/desktop';
import type { DraftStarterRef } from '@/lib/draftStarters';
import { type MonoFontOption, type UiFontOption } from '@/lib/fontOptions';
import { type AgentTerminalsPlacement, type FileEditorKeymap, type LargeTextPasteBehavior } from '@/stores/useUIStore';
import { type ManagedRemoteTunnelPreset, type ModelRef, type NotificationTemplates, type SettingsRawDocument, type SkillCatalogConfig, type UsageModelGroups } from './parsers';
type SettingsScope = 'instance' | 'profile' | 'device';
export type SettingsSurface = 'web' | 'desktop' | 'vscode' | 'mobile';
/**
 * The siblings a field's `write` may consult in the same parsed snapshot. Named
 * explicitly (not `DesktopSettings`) so the registry's type does not refer to
 * itself through the bindings; extend it when another field needs a sibling.
 */
type SettingsSiblingView = {
    readonly draftStartersCraftGoalAdded?: boolean;
    readonly draftStartersScheduleTaskAdded?: boolean;
    readonly workStatusHiddenSectionsExplicit?: boolean;
};
/**
 * How the UI keeps a live copy of a field, when it keeps one at all. Method
 * syntax on purpose: it keeps `SettingsFieldSpec<T>` assignable to
 * `SettingsFieldSpec<unknown>`, which is what the generic loops below iterate.
 */
type SettingsUiBinding<T> = {
    read(): T | undefined;
    write(value: T, snapshot: SettingsSiblingView): void;
    /** Send changes of the backing store to the server (store-subscribing auto-save). */
    autoSave: boolean;
};
type SettingsFieldSpec<T> = {
    scope: SettingsScope;
    parse(value: unknown, raw: SettingsRawDocument): T | undefined;
    ui?: SettingsUiBinding<T>;
    /** Profile fields the owner chose to store per surface kind (change on a phone stays on phones). */
    perSurface?: true;
    /** Surfaces that have this field; absent means all. */
    surfaces?: readonly SettingsSurface[];
    /** Workspace pointers: adopted only on a bootstrap-grade sync (see `SettingsSyncedDetail`). */
    adopt?: 'bootstrap-only';
    /** Computed by the writer from other fields; never edited directly. */
    derived?: true;
    /** Accepted on write, never returned by a read. */
    secret?: true;
    /** Emitted by the server for this build/process; never accepted on a write, never persisted. */
    computed?: true;
};
export declare const SETTINGS_REGISTRY: {
    readonly themeId: SettingsFieldSpec<string>;
    readonly useSystemTheme: SettingsFieldSpec<boolean>;
    readonly themeVariant: SettingsFieldSpec<"dark" | "light">;
    readonly lightThemeId: SettingsFieldSpec<string>;
    readonly darkThemeId: SettingsFieldSpec<string>;
    readonly locale: SettingsFieldSpec<"ar" | "de" | "en" | "es" | "fr" | "he" | "ja" | "ko" | "nl" | "pl" | "pt-BR" | "tr" | "uk" | "zh-CN" | "zh-TW">;
    readonly lastDirectory: SettingsFieldSpec<string>;
    readonly homeDirectory: SettingsFieldSpec<string>;
    readonly opencodeBinary: SettingsFieldSpec<string>;
    readonly projects: SettingsFieldSpec<ProjectEntry[]>;
    readonly activeProjectId: SettingsFieldSpec<string>;
    readonly securityScopedBookmarks: SettingsFieldSpec<string[]>;
    readonly pinnedDirectories: SettingsFieldSpec<string[]>;
    readonly desktopLanAccessEnabled: SettingsFieldSpec<boolean>;
    readonly desktopKeepAwakeEnabled: SettingsFieldSpec<boolean>;
    readonly desktopMinimizeToTrayEnabled: SettingsFieldSpec<boolean>;
    readonly desktopMacMenuBarEnabled: SettingsFieldSpec<boolean>;
    readonly desktopLinuxNativeFrame: SettingsFieldSpec<boolean>;
    readonly desktopUiPassword: SettingsFieldSpec<string>;
    readonly hasDesktopUiPassword: SettingsFieldSpec<boolean>;
    readonly desktopLanAccessActive: SettingsFieldSpec<boolean>;
    readonly desktopLanAccessBlockedReason: SettingsFieldSpec<string>;
    readonly githubClientId: SettingsFieldSpec<string>;
    readonly githubScopes: SettingsFieldSpec<string>;
    readonly gitlabClientId: SettingsFieldSpec<string>;
    readonly skillCatalogs: SettingsFieldSpec<SkillCatalogConfig[]>;
    readonly defaultGitIdentityId: SettingsFieldSpec<string>;
    readonly permissionAutoAccept: SettingsFieldSpec<{
        sessions: Record<string, "ask" | "auto" | "safety" | boolean>;
        revision: number;
    }>;
    readonly permissionDefaultMode: SettingsFieldSpec<"ask" | "auto" | "safety">;
    readonly messageSearchEnabled: SettingsFieldSpec<boolean>;
    readonly messageSearchReasoningEnabled: SettingsFieldSpec<boolean>;
    readonly modelChoiceRecordingEnabled: SettingsFieldSpec<boolean>;
    readonly agentControlToolEnabled: SettingsFieldSpec<boolean>;
    readonly agentScheduleToolEnabled: SettingsFieldSpec<boolean>;
    readonly agentWebToolEnabled: SettingsFieldSpec<boolean>;
    readonly browserProvider: SettingsFieldSpec<string>;
    readonly agentNotifyToolEnabled: SettingsFieldSpec<boolean>;
    readonly agentRenderToolEnabled: SettingsFieldSpec<boolean>;
    readonly agentToolsCodeMode: SettingsFieldSpec<boolean>;
    readonly agentMemoryToolEnabled: SettingsFieldSpec<boolean>;
    readonly agentKnowledgeToolEnabled: SettingsFieldSpec<boolean>;
    readonly isolatedSpacesEnabled: SettingsFieldSpec<boolean>;
    readonly isolatedSpacesIdleStop: SettingsFieldSpec<{
        enabled: boolean;
        hours: number;
    }>;
    readonly isolatedSpacesSshHost: SettingsFieldSpec<string>;
    readonly agentMemoryFeatureAvailable: SettingsFieldSpec<boolean>;
    readonly routingFeatureAvailable: SettingsFieldSpec<boolean>;
    readonly managedToolsApplyLive: SettingsFieldSpec<boolean>;
    readonly openCodeUpdateToastDismissedVersion: SettingsFieldSpec<string>;
    readonly autoDeleteEnabled: SettingsFieldSpec<boolean>;
    readonly autoDeleteAfterDays: SettingsFieldSpec<number>;
    readonly sessionRetentionOnlyArchived: SettingsFieldSpec<boolean>;
    readonly sessionRetentionAction: SettingsFieldSpec<import("@/stores/useUIStore").SessionRetentionAction>;
    readonly mergedWorktreeCleanupEnabled: SettingsFieldSpec<boolean>;
    readonly terminalShell: SettingsFieldSpec<TerminalShell>;
    readonly terminalLoginShells: SettingsFieldSpec<TerminalShell[]>;
    readonly openInAppId: SettingsFieldSpec<string>;
    readonly scheduledTasksMaxRunDurationMs: SettingsFieldSpec<number>;
    readonly dictationEnabled: SettingsFieldSpec<boolean>;
    readonly sttProvider: SettingsFieldSpec<"local" | "openai-compatible">;
    readonly sttServerUrl: SettingsFieldSpec<string>;
    readonly sttModel: SettingsFieldSpec<string>;
    readonly sttLocalModel: SettingsFieldSpec<string>;
    readonly sttLanguage: SettingsFieldSpec<string>;
    readonly tunnelProvider: SettingsFieldSpec<string>;
    readonly tunnelMode: SettingsFieldSpec<"managed-local" | "managed-remote" | "quick">;
    readonly tunnelBootstrapTtlMs: SettingsFieldSpec<number | null>;
    readonly tunnelSessionTtlMs: SettingsFieldSpec<number>;
    readonly managedLocalTunnelConfigPath: SettingsFieldSpec<string | null>;
    readonly managedRemoteTunnelHostname: SettingsFieldSpec<string>;
    readonly managedRemoteTunnelToken: SettingsFieldSpec<string | null>;
    readonly hasManagedRemoteTunnelToken: SettingsFieldSpec<boolean>;
    readonly managedRemoteTunnelPresets: SettingsFieldSpec<ManagedRemoteTunnelPreset[]>;
    readonly managedRemoteTunnelSelectedPresetId: SettingsFieldSpec<string>;
    readonly managedRemoteTunnelPresetTokens: SettingsFieldSpec<Record<string, string>>;
    readonly sidebarProjectDisplayMode: SettingsFieldSpec<"all" | "single">;
    readonly sidebarViewMode: SettingsFieldSpec<import("@/stores/useSessionDisplayStore").SidebarViewMode>;
    readonly sidebarListSessionGrouping: SettingsFieldSpec<"project" | "time">;
    readonly sidebarProjectSortOrder: SettingsFieldSpec<import("@/stores/useSessionDisplayStore").ProjectSortOrder>;
    readonly sidebarWorktreeSortOrder: SettingsFieldSpec<import("@/stores/useSessionDisplayStore").WorktreeSortOrder>;
    readonly sidebarShowChatsSection: SettingsFieldSpec<boolean>;
    readonly sidebarShowWorkSection: SettingsFieldSpec<boolean>;
    readonly sidebarShowPinnedSection: SettingsFieldSpec<boolean>;
    readonly sidebarSessionRowDisplay: SettingsFieldSpec<import("@/stores/useSessionDisplayStore").SessionRowDisplay>;
    readonly sidebarLayout: SettingsFieldSpec<import("@/stores/sidebarLayout").SidebarLayout>;
    readonly workStatusSectionOrder: SettingsFieldSpec<import("@/components/chat/work-status/sections").WorkStatusPanelSectionId[]>;
    readonly workStatusPanelEnabled: SettingsFieldSpec<boolean>;
    readonly workStatusHiddenSections: SettingsFieldSpec<string[]>;
    readonly workStatusHiddenSectionsExplicit: SettingsFieldSpec<boolean>;
    readonly showReasoningTraces: SettingsFieldSpec<boolean>;
    readonly streamingAutoFollowEnabled: SettingsFieldSpec<boolean>;
    readonly collapsibleThinkingBlocks: SettingsFieldSpec<boolean>;
    readonly expandReasoningWhileStreaming: SettingsFieldSpec<boolean>;
    readonly showTextJustificationActivity: SettingsFieldSpec<boolean>;
    /** Legacy chat mode that `activityRenderMode` absorbs at parse time. */
    readonly chatRenderMode: SettingsFieldSpec<"live" | "sorted">;
    readonly activityRenderMode: SettingsFieldSpec<"collapsed" | "summary">;
    readonly mermaidRenderingMode: SettingsFieldSpec<"ascii" | "svg">;
    readonly userMessageRenderingMode: SettingsFieldSpec<"markdown" | "plain">;
    readonly collapsibleUserMessages: SettingsFieldSpec<boolean>;
    readonly stickyUserHeader: SettingsFieldSpec<boolean>;
    readonly promptNavigatorEnabled: SettingsFieldSpec<boolean>;
    readonly wideChatLayoutEnabled: SettingsFieldSpec<boolean>;
    readonly showSplitAssistantMessageActions: SettingsFieldSpec<boolean>;
    readonly showToolFileIcons: SettingsFieldSpec<boolean>;
    readonly codeBlockLineWrap: SettingsFieldSpec<boolean>;
    readonly tableCellWrap: SettingsFieldSpec<boolean>;
    readonly copyMessagesAsPlainText: SettingsFieldSpec<boolean>;
    readonly showTurnChangedFiles: SettingsFieldSpec<boolean>;
    readonly toolJsonViewMode: SettingsFieldSpec<"formatted" | "raw" | "summary">;
    readonly timeFormatPreference: SettingsFieldSpec<import("@/stores/useUIStore").TimeFormatPreference>;
    readonly weekStartPreference: SettingsFieldSpec<"auto" | "monday" | "sunday">;
    readonly messageStreamTransport: SettingsFieldSpec<"auto" | "sse" | "ws">;
    readonly diffLayoutPreference: SettingsFieldSpec<"dynamic" | "inline" | "side-by-side">;
    readonly diffWrapLines: SettingsFieldSpec<boolean>;
    readonly diffHideWhitespace: SettingsFieldSpec<boolean>;
    readonly gitChangesViewMode: SettingsFieldSpec<"flat" | "tree">;
    readonly gitmojiEnabled: SettingsFieldSpec<boolean>;
    readonly defaultFileViewerPreview: SettingsFieldSpec<boolean>;
    readonly directoryShowHidden: SettingsFieldSpec<boolean>;
    readonly filesViewShowGitignored: SettingsFieldSpec<boolean>;
    readonly fileEditorKeymap: SettingsFieldSpec<FileEditorKeymap>;
    readonly fileEditorVimMappings: SettingsFieldSpec<string>;
    readonly autoSaveEnabled: SettingsFieldSpec<boolean>;
    readonly confirmFileTreeMove: SettingsFieldSpec<boolean>;
    readonly fileTreeSide: SettingsFieldSpec<"left" | "right">;
    readonly layoutAnimations: SettingsFieldSpec<boolean>;
    readonly openLinksInBrowserPanel: SettingsFieldSpec<boolean>;
    readonly liveBrowserTabLimit: SettingsFieldSpec<number>;
    readonly openTrackerLinksOnBoard: SettingsFieldSpec<boolean>;
    readonly autoCreateWorktree: SettingsFieldSpec<boolean>;
    readonly worktreeStartFrom: SettingsFieldSpec<"project-root" | "remote-default">;
    readonly worktreeStartFromOverrides: SettingsFieldSpec<Partial<Record<"agent" | "autoCreate" | "dialog" | "handoff" | "parallel" | "quick", "project-root" | "remote-default">>>;
    readonly pullRequestWorktree: SettingsFieldSpec<"branch-off" | "check-out">;
    readonly worktreeBranchTemplate: SettingsFieldSpec<string>;
    readonly pullRequestBranchTemplate: SettingsFieldSpec<string>;
    readonly sessionTabsEnabled: SettingsFieldSpec<boolean>;
    readonly allowPromptingSubagentSessions: SettingsFieldSpec<boolean>;
    readonly inputSpellcheckEnabled: SettingsFieldSpec<boolean>;
    readonly enterToSend: SettingsFieldSpec<boolean>;
    readonly enterToSendConfigured: SettingsFieldSpec<boolean>;
    readonly persistChatDraft: SettingsFieldSpec<boolean>;
    readonly largeTextPasteBehavior: SettingsFieldSpec<LargeTextPasteBehavior>;
    readonly agentTerminalsPlacement: SettingsFieldSpec<AgentTerminalsPlacement>;
    readonly savePastedImagesAsFiles: SettingsFieldSpec<boolean>;
    readonly followUpBehavior: SettingsFieldSpec<"queue" | "steer">;
    /** Legacy boolean that `followUpBehavior` absorbs at parse time. */
    readonly queueModeEnabled: SettingsFieldSpec<boolean>;
    readonly inputHistoryScope: SettingsFieldSpec<"global" | "session">;
    readonly inputHistoryLimit: SettingsFieldSpec<number>;
    readonly draftStarters: SettingsFieldSpec<DraftStarterRef[]>;
    readonly draftStartersVisible: SettingsFieldSpec<boolean>;
    readonly draftStartersCraftGoalAdded: SettingsFieldSpec<boolean>;
    readonly draftStartersScheduleTaskAdded: SettingsFieldSpec<boolean>;
    readonly fontSize: SettingsFieldSpec<number>;
    readonly terminalFontSize: SettingsFieldSpec<number>;
    readonly editorFontSize: SettingsFieldSpec<number>;
    readonly uiFont: SettingsFieldSpec<UiFontOption>;
    readonly monoFont: SettingsFieldSpec<MonoFontOption>;
    readonly customUiFont: SettingsFieldSpec<string>;
    readonly customMonoFont: SettingsFieldSpec<string>;
    readonly padding: SettingsFieldSpec<number>;
    readonly cornerRadius: SettingsFieldSpec<number>;
    readonly shortcutOverrides: SettingsFieldSpec<Record<string, string>>;
    readonly defaultModel: SettingsFieldSpec<string>;
    readonly defaultVariant: SettingsFieldSpec<string>;
    readonly defaultAgent: SettingsFieldSpec<string>;
    readonly smallModelUseDefault: SettingsFieldSpec<boolean>;
    readonly smallModelOverride: SettingsFieldSpec<string>;
    readonly walkthroughModelOverride: SettingsFieldSpec<string>;
    readonly zenModel: SettingsFieldSpec<string>;
    readonly favoriteModels: SettingsFieldSpec<ModelRef[]>;
    readonly hiddenModels: SettingsFieldSpec<ModelRef[]>;
    readonly collapsedModelProviders: SettingsFieldSpec<string[]>;
    readonly customProviderIcons: SettingsFieldSpec<Record<string, "ai" | "cloud" | "code" | "database" | "server" | "terminal">>;
    readonly recentModels: SettingsFieldSpec<ModelRef[]>;
    readonly lastSelectedModel: SettingsFieldSpec<string | undefined>;
    readonly recentAgents: SettingsFieldSpec<string[]>;
    readonly favoriteAgents: SettingsFieldSpec<string[]>;
    readonly recentEfforts: SettingsFieldSpec<Record<string, string[]>>;
    readonly providerOrder: SettingsFieldSpec<string[]>;
    readonly sessionRecapEnabled: SettingsFieldSpec<boolean>;
    readonly sessionSuggestionEnabled: SettingsFieldSpec<boolean>;
    readonly sessionWorkEnabled: SettingsFieldSpec<boolean>;
    readonly sessionReviewOfferEnabled: SettingsFieldSpec<boolean>;
    readonly activeRunModelChangeBehavior: SettingsFieldSpec<import("@/stores/useUIStore").ActiveRunModelChangeBehavior>;
    readonly sessionGoalEnabled: SettingsFieldSpec<boolean>;
    readonly sessionGoalChecker: SettingsFieldSpec<import("@/stores/useUIStore").SessionGoalChecker>;
    readonly sessionGoalMaxAutoTurns: SettingsFieldSpec<number>;
    readonly sessionGoalDefaultBudgetEnabled: SettingsFieldSpec<boolean>;
    readonly sessionGoalDefaultBudget: SettingsFieldSpec<number>;
    readonly sessionGoalWriterEnabled: SettingsFieldSpec<boolean>;
    readonly sessionGoalWriterModel: SettingsFieldSpec<string>;
    readonly sessionGoalWriterVariant: SettingsFieldSpec<string>;
    readonly sessionGoalWriterRememberChoice: SettingsFieldSpec<boolean>;
    readonly sessionGoalObjectiveCharLimit: SettingsFieldSpec<number>;
    readonly sessionGoalCheckObjectiveCharLimit: SettingsFieldSpec<number>;
    readonly sessionGoalWriterReview: SettingsFieldSpec<boolean>;
    readonly sessionGoalWriterSendMode: SettingsFieldSpec<import("@/stores/useUIStore").SessionGoalWriterSendMode>;
    readonly sessionGoalRewriteAll: SettingsFieldSpec<boolean>;
    readonly sessionGoalAutoCreate: SettingsFieldSpec<import("@/stores/useUIStore").SessionGoalAutoCreate>;
    readonly summarizeLastMessage: SettingsFieldSpec<boolean>;
    readonly summaryThreshold: SettingsFieldSpec<number>;
    readonly summaryLength: SettingsFieldSpec<number>;
    readonly maxLastMessageLength: SettingsFieldSpec<number>;
    readonly showDeletionDialog: SettingsFieldSpec<boolean>;
    readonly nativeNotificationsEnabled: SettingsFieldSpec<boolean>;
    readonly notificationMode: SettingsFieldSpec<"always" | "hidden-only">;
    readonly notifyOnSubtasks: SettingsFieldSpec<boolean>;
    readonly notifyOnCompletion: SettingsFieldSpec<boolean>;
    readonly notifyOnError: SettingsFieldSpec<boolean>;
    readonly notifyOnQuestion: SettingsFieldSpec<boolean>;
    readonly notificationTemplates: SettingsFieldSpec<NotificationTemplates>;
    readonly showOpenCodeUpdateNotifications: SettingsFieldSpec<boolean>;
    readonly reportUsage: SettingsFieldSpec<boolean>;
    readonly usageDisplayMode: SettingsFieldSpec<"remaining" | "usage">;
    readonly usageDropdownProviders: SettingsFieldSpec<string[]>;
    readonly usageSelectedModels: SettingsFieldSpec<Record<string, string[]>>;
    readonly usageCollapsedFamilies: SettingsFieldSpec<Record<string, string[]>>;
    readonly usageExpandedFamilies: SettingsFieldSpec<Record<string, string[]>>;
    readonly usageModelGroups: SettingsFieldSpec<UsageModelGroups>;
    readonly globalBehaviorPrompt: SettingsFieldSpec<string>;
    readonly responseStyleEnabled: SettingsFieldSpec<boolean>;
    readonly responseStylePreset: SettingsFieldSpec<"concise" | "custom" | "detailed" | "matchEnergy" | "mentor" | "noFiller" | "pushback" | "warmPeer">;
    readonly responseStyleCustomInstructions: SettingsFieldSpec<string>;
    readonly pwaAppName: SettingsFieldSpec<string>;
    readonly pwaOrientation: SettingsFieldSpec<"landscape" | "portrait" | "system">;
    readonly mobileKeyboardMode: SettingsFieldSpec<import("@/lib/mobileKeyboardMode").MobileKeyboardMode>;
    readonly desktopWindowControlsPosition: SettingsFieldSpec<DesktopWindowControlsPosition>;
    readonly desktopWindowControlsStyle: SettingsFieldSpec<DesktopWindowControlsStyle>;
    readonly inputBarOffset: SettingsFieldSpec<number>;
};
type SettingsKey = keyof typeof SETTINGS_REGISTRY;
type FieldValue<S> = S extends SettingsFieldSpec<infer T> ? T : never;
/** The shared settings document as every client sees it: every registry key, optional. */
export type DesktopSettings = {
    -readonly [K in SettingsKey]?: FieldValue<(typeof SETTINGS_REGISTRY)[K]>;
};
/**
 * Device state that only ever lived in `useUIStore`'s persisted slice. Listed
 * so the registry accounts for every persisted key; none of these crosses the
 * wire, so they carry no parser. `globalDraftStarters` is the store's name for
 * the `draftStarters` field and is therefore not here.
 */
export declare const LOCAL_DEVICE_KEYS: readonly ['theme', 'isSidebarOpen', 'sidebarWidth', 'contextPanelByDirectory', 'contextRailOrder', 'contextRailHiddenSurfaces', 'mobileWorkspaceTabOrder', 'mobileWorkspaceHiddenTabs', 'contextSurfaceZones', 'contextEditorTreeVisible', 'contextEditorVisible', 'contextEditorTreeWidth', 'workStatusExpandedSections', 'messageQueueExpanded', 'workStatusScrollTop', 'isSessionSwitcherOpen', 'sidebarSection', 'settingsPage', 'settingsHasOpenedOnce', 'settingsProjectsSelectedId', 'settingsRemoteInstancesSelectedId', 'isSessionCreateDialogOpen', 'autoDeleteLastRunAt', 'messageLimit', 'walkthroughTocWidth', 'diffFileListMode', 'diffFileTreeWidth', 'showTerminalQuickKeysOnDesktop', 'dockBadgeEnabled', 'alwaysShowScrollbars', 'agentMemoryViewedAt', 'projectContextSidebarWidth', 'agentTerminalNames'];
/**
 * Instance facts the Electron main process writes straight into
 * `settings.json` (`mutateSettingsRoot`). The server keeps them when merging
 * and never accepts them from a client; no client reads them.
 * `desktopSplashColors` arrives over the window-theme IPC and replaces the
 * flat `splash*` keys older builds wrote through the settings document.
 */
export declare const DESKTOP_SHELL_KEYS: readonly ['desktopSplashColors', 'desktopHosts', 'desktopDefaultHostId', 'desktopInstallId', 'desktopLocalPort', 'desktopSshInstances', 'desktopWindowState'];
export declare const SETTINGS_KEYS: SettingsKey[];
/** Keys whose value belongs to this install and therefore never goes to the server. */
export declare const isDeviceSettingsKey: (key: SettingsKey) => boolean;
/** Keys the client may send to the server: not computed, not this install's device state. */
export declare const isWritableSettingsKey: (key: SettingsKey) => boolean;
export declare const parseSettingsDocument: (payload: unknown) => DesktopSettings | null;
/**
 * Copy the fields a snapshot carries into their live stores. A field the
 * snapshot omits is left alone ("missing is not default"); a field whose
 * store already holds the value is not written again.
 */
export declare const applySettingsToStores: (snapshot: DesktopSettings) => void;
/** Keys whose backing store the auto-save watches. */
export declare const AUTO_SAVE_KEYS: ("activeProjectId" | "activeRunModelChangeBehavior" | "activityRenderMode" | "agentControlToolEnabled" | "agentKnowledgeToolEnabled" | "agentMemoryFeatureAvailable" | "agentMemoryToolEnabled" | "agentNotifyToolEnabled" | "agentRenderToolEnabled" | "agentScheduleToolEnabled" | "agentTerminalsPlacement" | "agentToolsCodeMode" | "agentWebToolEnabled" | "allowPromptingSubagentSessions" | "autoCreateWorktree" | "autoDeleteAfterDays" | "autoDeleteEnabled" | "autoSaveEnabled" | "browserProvider" | "chatRenderMode" | "codeBlockLineWrap" | "collapsedModelProviders" | "collapsibleThinkingBlocks" | "collapsibleUserMessages" | "confirmFileTreeMove" | "copyMessagesAsPlainText" | "cornerRadius" | "customMonoFont" | "customProviderIcons" | "customUiFont" | "darkThemeId" | "defaultAgent" | "defaultFileViewerPreview" | "defaultGitIdentityId" | "defaultModel" | "defaultVariant" | "desktopKeepAwakeEnabled" | "desktopLanAccessActive" | "desktopLanAccessBlockedReason" | "desktopLanAccessEnabled" | "desktopLinuxNativeFrame" | "desktopMacMenuBarEnabled" | "desktopMinimizeToTrayEnabled" | "desktopUiPassword" | "desktopWindowControlsPosition" | "desktopWindowControlsStyle" | "dictationEnabled" | "diffHideWhitespace" | "diffLayoutPreference" | "diffWrapLines" | "directoryShowHidden" | "draftStarters" | "draftStartersCraftGoalAdded" | "draftStartersScheduleTaskAdded" | "draftStartersVisible" | "editorFontSize" | "enterToSend" | "enterToSendConfigured" | "expandReasoningWhileStreaming" | "favoriteAgents" | "favoriteModels" | "fileEditorKeymap" | "fileEditorVimMappings" | "fileTreeSide" | "filesViewShowGitignored" | "followUpBehavior" | "fontSize" | "gitChangesViewMode" | "githubClientId" | "githubScopes" | "gitlabClientId" | "gitmojiEnabled" | "globalBehaviorPrompt" | "hasDesktopUiPassword" | "hasManagedRemoteTunnelToken" | "hiddenModels" | "homeDirectory" | "inputBarOffset" | "inputHistoryLimit" | "inputHistoryScope" | "inputSpellcheckEnabled" | "isolatedSpacesEnabled" | "isolatedSpacesIdleStop" | "isolatedSpacesSshHost" | "largeTextPasteBehavior" | "lastDirectory" | "lastSelectedModel" | "layoutAnimations" | "lightThemeId" | "liveBrowserTabLimit" | "locale" | "managedLocalTunnelConfigPath" | "managedRemoteTunnelHostname" | "managedRemoteTunnelPresetTokens" | "managedRemoteTunnelPresets" | "managedRemoteTunnelSelectedPresetId" | "managedRemoteTunnelToken" | "managedToolsApplyLive" | "maxLastMessageLength" | "mergedWorktreeCleanupEnabled" | "mermaidRenderingMode" | "messageSearchEnabled" | "messageSearchReasoningEnabled" | "messageStreamTransport" | "mobileKeyboardMode" | "modelChoiceRecordingEnabled" | "monoFont" | "nativeNotificationsEnabled" | "notificationMode" | "notificationTemplates" | "notifyOnCompletion" | "notifyOnError" | "notifyOnQuestion" | "notifyOnSubtasks" | "openCodeUpdateToastDismissedVersion" | "openInAppId" | "openLinksInBrowserPanel" | "openTrackerLinksOnBoard" | "opencodeBinary" | "padding" | "permissionAutoAccept" | "permissionDefaultMode" | "persistChatDraft" | "pinnedDirectories" | "projects" | "promptNavigatorEnabled" | "providerOrder" | "pullRequestBranchTemplate" | "pullRequestWorktree" | "pwaAppName" | "pwaOrientation" | "queueModeEnabled" | "recentAgents" | "recentEfforts" | "recentModels" | "reportUsage" | "responseStyleCustomInstructions" | "responseStyleEnabled" | "responseStylePreset" | "routingFeatureAvailable" | "savePastedImagesAsFiles" | "scheduledTasksMaxRunDurationMs" | "securityScopedBookmarks" | "sessionGoalAutoCreate" | "sessionGoalCheckObjectiveCharLimit" | "sessionGoalChecker" | "sessionGoalDefaultBudget" | "sessionGoalDefaultBudgetEnabled" | "sessionGoalEnabled" | "sessionGoalMaxAutoTurns" | "sessionGoalObjectiveCharLimit" | "sessionGoalRewriteAll" | "sessionGoalWriterEnabled" | "sessionGoalWriterModel" | "sessionGoalWriterRememberChoice" | "sessionGoalWriterReview" | "sessionGoalWriterSendMode" | "sessionGoalWriterVariant" | "sessionRecapEnabled" | "sessionRetentionAction" | "sessionRetentionOnlyArchived" | "sessionReviewOfferEnabled" | "sessionSuggestionEnabled" | "sessionTabsEnabled" | "sessionWorkEnabled" | "shortcutOverrides" | "showDeletionDialog" | "showOpenCodeUpdateNotifications" | "showReasoningTraces" | "showSplitAssistantMessageActions" | "showTextJustificationActivity" | "showToolFileIcons" | "showTurnChangedFiles" | "sidebarLayout" | "sidebarListSessionGrouping" | "sidebarProjectDisplayMode" | "sidebarProjectSortOrder" | "sidebarSessionRowDisplay" | "sidebarShowChatsSection" | "sidebarShowPinnedSection" | "sidebarShowWorkSection" | "sidebarViewMode" | "sidebarWorktreeSortOrder" | "skillCatalogs" | "smallModelOverride" | "smallModelUseDefault" | "stickyUserHeader" | "streamingAutoFollowEnabled" | "sttLanguage" | "sttLocalModel" | "sttModel" | "sttProvider" | "sttServerUrl" | "summarizeLastMessage" | "summaryLength" | "summaryThreshold" | "tableCellWrap" | "terminalFontSize" | "terminalLoginShells" | "terminalShell" | "themeId" | "themeVariant" | "timeFormatPreference" | "toolJsonViewMode" | "tunnelBootstrapTtlMs" | "tunnelMode" | "tunnelProvider" | "tunnelSessionTtlMs" | "uiFont" | "usageCollapsedFamilies" | "usageDisplayMode" | "usageDropdownProviders" | "usageExpandedFamilies" | "usageModelGroups" | "usageSelectedModels" | "useSystemTheme" | "userMessageRenderingMode" | "walkthroughModelOverride" | "weekStartPreference" | "wideChatLayoutEnabled" | "workStatusHiddenSections" | "workStatusHiddenSectionsExplicit" | "workStatusPanelEnabled" | "workStatusSectionOrder" | "worktreeBranchTemplate" | "worktreeStartFrom" | "worktreeStartFromOverrides" | "zenModel")[];
/** Current store values for the auto-saved keys (undefined for unset). */
export declare const readAutoSaveSnapshot: () => DesktopSettings;
/** Keys the per-runtime browser mirror carries: everything the server owns for the user, minus secrets and computed flags. */
export declare const MIRRORED_KEYS: ("activeProjectId" | "activeRunModelChangeBehavior" | "activityRenderMode" | "agentControlToolEnabled" | "agentKnowledgeToolEnabled" | "agentMemoryFeatureAvailable" | "agentMemoryToolEnabled" | "agentNotifyToolEnabled" | "agentRenderToolEnabled" | "agentScheduleToolEnabled" | "agentTerminalsPlacement" | "agentToolsCodeMode" | "agentWebToolEnabled" | "allowPromptingSubagentSessions" | "autoCreateWorktree" | "autoDeleteAfterDays" | "autoDeleteEnabled" | "autoSaveEnabled" | "browserProvider" | "chatRenderMode" | "codeBlockLineWrap" | "collapsedModelProviders" | "collapsibleThinkingBlocks" | "collapsibleUserMessages" | "confirmFileTreeMove" | "copyMessagesAsPlainText" | "cornerRadius" | "customMonoFont" | "customProviderIcons" | "customUiFont" | "darkThemeId" | "defaultAgent" | "defaultFileViewerPreview" | "defaultGitIdentityId" | "defaultModel" | "defaultVariant" | "desktopKeepAwakeEnabled" | "desktopLanAccessActive" | "desktopLanAccessBlockedReason" | "desktopLanAccessEnabled" | "desktopLinuxNativeFrame" | "desktopMacMenuBarEnabled" | "desktopMinimizeToTrayEnabled" | "desktopUiPassword" | "desktopWindowControlsPosition" | "desktopWindowControlsStyle" | "dictationEnabled" | "diffHideWhitespace" | "diffLayoutPreference" | "diffWrapLines" | "directoryShowHidden" | "draftStarters" | "draftStartersCraftGoalAdded" | "draftStartersScheduleTaskAdded" | "draftStartersVisible" | "editorFontSize" | "enterToSend" | "enterToSendConfigured" | "expandReasoningWhileStreaming" | "favoriteAgents" | "favoriteModels" | "fileEditorKeymap" | "fileEditorVimMappings" | "fileTreeSide" | "filesViewShowGitignored" | "followUpBehavior" | "fontSize" | "gitChangesViewMode" | "githubClientId" | "githubScopes" | "gitlabClientId" | "gitmojiEnabled" | "globalBehaviorPrompt" | "hasDesktopUiPassword" | "hasManagedRemoteTunnelToken" | "hiddenModels" | "homeDirectory" | "inputBarOffset" | "inputHistoryLimit" | "inputHistoryScope" | "inputSpellcheckEnabled" | "isolatedSpacesEnabled" | "isolatedSpacesIdleStop" | "isolatedSpacesSshHost" | "largeTextPasteBehavior" | "lastDirectory" | "lastSelectedModel" | "layoutAnimations" | "lightThemeId" | "liveBrowserTabLimit" | "locale" | "managedLocalTunnelConfigPath" | "managedRemoteTunnelHostname" | "managedRemoteTunnelPresetTokens" | "managedRemoteTunnelPresets" | "managedRemoteTunnelSelectedPresetId" | "managedRemoteTunnelToken" | "managedToolsApplyLive" | "maxLastMessageLength" | "mergedWorktreeCleanupEnabled" | "mermaidRenderingMode" | "messageSearchEnabled" | "messageSearchReasoningEnabled" | "messageStreamTransport" | "mobileKeyboardMode" | "modelChoiceRecordingEnabled" | "monoFont" | "nativeNotificationsEnabled" | "notificationMode" | "notificationTemplates" | "notifyOnCompletion" | "notifyOnError" | "notifyOnQuestion" | "notifyOnSubtasks" | "openCodeUpdateToastDismissedVersion" | "openInAppId" | "openLinksInBrowserPanel" | "openTrackerLinksOnBoard" | "opencodeBinary" | "padding" | "permissionAutoAccept" | "permissionDefaultMode" | "persistChatDraft" | "pinnedDirectories" | "projects" | "promptNavigatorEnabled" | "providerOrder" | "pullRequestBranchTemplate" | "pullRequestWorktree" | "pwaAppName" | "pwaOrientation" | "queueModeEnabled" | "recentAgents" | "recentEfforts" | "recentModels" | "reportUsage" | "responseStyleCustomInstructions" | "responseStyleEnabled" | "responseStylePreset" | "routingFeatureAvailable" | "savePastedImagesAsFiles" | "scheduledTasksMaxRunDurationMs" | "securityScopedBookmarks" | "sessionGoalAutoCreate" | "sessionGoalCheckObjectiveCharLimit" | "sessionGoalChecker" | "sessionGoalDefaultBudget" | "sessionGoalDefaultBudgetEnabled" | "sessionGoalEnabled" | "sessionGoalMaxAutoTurns" | "sessionGoalObjectiveCharLimit" | "sessionGoalRewriteAll" | "sessionGoalWriterEnabled" | "sessionGoalWriterModel" | "sessionGoalWriterRememberChoice" | "sessionGoalWriterReview" | "sessionGoalWriterSendMode" | "sessionGoalWriterVariant" | "sessionRecapEnabled" | "sessionRetentionAction" | "sessionRetentionOnlyArchived" | "sessionReviewOfferEnabled" | "sessionSuggestionEnabled" | "sessionTabsEnabled" | "sessionWorkEnabled" | "shortcutOverrides" | "showDeletionDialog" | "showOpenCodeUpdateNotifications" | "showReasoningTraces" | "showSplitAssistantMessageActions" | "showTextJustificationActivity" | "showToolFileIcons" | "showTurnChangedFiles" | "sidebarLayout" | "sidebarListSessionGrouping" | "sidebarProjectDisplayMode" | "sidebarProjectSortOrder" | "sidebarSessionRowDisplay" | "sidebarShowChatsSection" | "sidebarShowPinnedSection" | "sidebarShowWorkSection" | "sidebarViewMode" | "sidebarWorktreeSortOrder" | "skillCatalogs" | "smallModelOverride" | "smallModelUseDefault" | "stickyUserHeader" | "streamingAutoFollowEnabled" | "sttLanguage" | "sttLocalModel" | "sttModel" | "sttProvider" | "sttServerUrl" | "summarizeLastMessage" | "summaryLength" | "summaryThreshold" | "tableCellWrap" | "terminalFontSize" | "terminalLoginShells" | "terminalShell" | "themeId" | "themeVariant" | "timeFormatPreference" | "toolJsonViewMode" | "tunnelBootstrapTtlMs" | "tunnelMode" | "tunnelProvider" | "tunnelSessionTtlMs" | "uiFont" | "usageCollapsedFamilies" | "usageDisplayMode" | "usageDropdownProviders" | "usageExpandedFamilies" | "usageModelGroups" | "usageSelectedModels" | "useSystemTheme" | "userMessageRenderingMode" | "walkthroughModelOverride" | "weekStartPreference" | "wideChatLayoutEnabled" | "workStatusHiddenSections" | "workStatusHiddenSectionsExplicit" | "workStatusPanelEnabled" | "workStatusSectionOrder" | "worktreeBranchTemplate" | "worktreeStartFrom" | "worktreeStartFromOverrides" | "zenModel")[];
/** Shape of one field in the generated JSON snapshot the server and the VS Code bridge consume. */
type SettingsRegistrySnapshotField = {
    scope: SettingsScope;
    perSurface?: true;
    surfaces?: readonly SettingsSurface[];
    adopt?: 'bootstrap-only';
    derived?: true;
    secret?: true;
    computed?: true;
    /** Lives only in the local store; never crosses the wire. */
    local?: true;
    /** Written by the desktop shell straight into the file; never by a client. */
    owner?: 'desktop-shell';
};
type SettingsRegistrySnapshot = {
    version: 1;
    fields: Record<string, SettingsRegistrySnapshotField>;
};
export declare const buildSettingsRegistrySnapshot: () => SettingsRegistrySnapshot;
export {};
