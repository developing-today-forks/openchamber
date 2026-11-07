import { z } from 'zod';
import type { RuntimeAPIs } from '@/lib/api/types';
export type UpdateInfo = {
    available: boolean;
    version?: string;
    currentVersion: string;
    body?: string;
    date?: string;
    releaseUrl?: string;
    downloadUrl?: string;
    nextSuggestedCheckInSec?: number;
    packageManager?: string;
    updateCommand?: string;
    /**
     * The server cannot install this update itself. `service-manager`: run
     * `updateCommand` by hand. `manual-install`: no package manager installed
     * this copy, so the new version is installed the way this one was.
     * `desktop-host`: a desktop installed from a Linux package asks for the
     * administrator password on its own screen, so it updates only there.
     */
    installBlocked?: 'service-manager' | 'manual-install' | 'desktop-host';
};
export type UpdateProgress = {
    downloaded: number;
    total?: number;
};
export type { SkillCatalogConfig } from '@/lib/settings/parsers';
export type DesktopWindowControlsPosition = 'left' | 'right';
export type DesktopWindowControlsSide = 'left' | 'right';
export type DesktopWindowControlAction = 'close' | 'minimize' | 'maximize';
export type DesktopWindowControlsStyle = 'classic' | 'traffic-lights';
export type { DesktopSettings } from '@/lib/settings/registry';
export declare const isElectronShell: () => boolean;
/** Default side for in-app window controls (Windows-style, right). */
export declare const DEFAULT_DESKTOP_WINDOW_CONTROLS_POSITION: DesktopWindowControlsPosition;
/** Windows and Linux use frameless windows with in-app minimize/maximize/close controls. */
export declare const usesFramelessElectronChrome: () => boolean;
/** Normalize a stored preference; legacy `auto` maps to the right-side default. */
export declare const normalizeDesktopWindowControlsPosition: (value: unknown) => DesktopWindowControlsPosition | undefined;
export declare const resolveDesktopWindowControlsSide: (preference: DesktopWindowControlsPosition | undefined) => DesktopWindowControlsSide;
/**
 * Left matches macOS traffic-light order (close, minimize, maximize).
 * Right keeps Windows order (minimize, maximize, close).
 */
export declare const getDesktopWindowControlsOrder: (side: DesktopWindowControlsSide) => DesktopWindowControlAction[];
export declare const hasDesktopInvoke: () => boolean;
export declare const canUseElectronDesktopIPC: () => boolean;
export declare const createDesktopThemeFileAPI: () => RuntimeAPIs['themeFiles'];
export declare const invokeDesktop: <T = unknown>(command: string, args?: Record<string, unknown>) => Promise<T | null>;
/** Removes the session's delivered native notifications from Notification Center (macOS only). */
export declare const clearDesktopSessionNotifications: (sessionId: string) => void;
/**
 * The runtime a Mini Chat window must continue on: the instance its parent
 * window is showing, not the default host. `runtimeKey` names the parent's
 * instance (`local` or `host:<id>`); main turns a relay-capable host into the
 * relay transport, since such a host has no HTTP base to inject.
 */
export declare const getMiniChatRuntimeArgs: () => {
    apiBaseUrl: string;
    clientToken: string | null;
    runtimeKey: string;
};
export declare const hasCompatibleManagedDesktopOpenCode: () => Promise<boolean>;
type LaunchAtLoginStatus = {
    supported: boolean;
    enabled: boolean;
};
type KeepAwakeStatus = {
    supported: boolean;
    enabled: boolean;
    active: boolean;
};
type MinimizeToTrayStatus = {
    supported: boolean;
    enabled: boolean;
};
export declare const getDesktopLaunchAtLogin: () => Promise<LaunchAtLoginStatus | null>;
export declare const setDesktopLaunchAtLogin: (enabled: boolean) => Promise<LaunchAtLoginStatus | null>;
export declare const getDesktopMinimizeToTray: () => Promise<MinimizeToTrayStatus | null>;
export declare const setDesktopMinimizeToTray: (enabled: boolean) => Promise<MinimizeToTrayStatus | null>;
type MiniChatGlobalShortcutStatus = {
    supported: boolean;
    combo: string | null;
    active: boolean;
    error?: 'unsupported-combo';
};
export declare const getDesktopMiniChatGlobalShortcut: () => Promise<MiniChatGlobalShortcutStatus | null>;
export declare const setDesktopMiniChatGlobalShortcut: (combo: string | null) => Promise<MiniChatGlobalShortcutStatus | null>;
declare const quakeModeStatusSchema: z.ZodObject<{
    supported: z.ZodBoolean;
    enabled: z.ZodBoolean;
    combo: z.ZodNullable<z.ZodString>;
    storedCombo: z.ZodNullable<z.ZodString>;
    active: z.ZodBoolean;
    heightFraction: z.ZodNumber;
    error: z.ZodOptional<z.ZodLiteral<"unsupported-combo">>;
}, z.core.$strip>;
export type QuakeModeStatus = z.infer<typeof quakeModeStatusSchema>;
export declare const getDesktopQuakeMode: () => Promise<QuakeModeStatus | null>;
export declare const setDesktopQuakeModeEnabled: (enabled: boolean) => Promise<QuakeModeStatus | null>;
export declare const setDesktopQuakeModeShortcut: (combo: string | null) => Promise<QuakeModeStatus | null>;
export declare const setDesktopQuakeModeHeight: (heightFraction: number) => Promise<QuakeModeStatus | null>;
export declare const getDesktopKeepAwake: () => Promise<KeepAwakeStatus | null>;
export declare const setDesktopKeepAwake: (enabled: boolean) => Promise<KeepAwakeStatus | null>;
export declare const isDesktopLocalOriginActive: () => boolean;
export declare const isDesktopShell: () => boolean;
/**
 * Raises the desktop window.
 *
 * Used when work finishes somewhere the app cannot be reached from — an MCP
 * authorization completing in the system browser, for instance. Browsers will
 * not follow a custom-protocol link back without a user gesture, so the app
 * brings itself forward instead of asking the page to do it.
 */
export declare const focusDesktopWindow: () => Promise<boolean>;
/**
 * Opens a session owned by another instance ('local' or 'host:<id>') in a
 * window for that instance. Valid from any app window, including one that
 * currently shows a remote instance — the main process gates the command
 * by sender. Returns false when the desktop bridge is not available, so the
 * caller can fall back to opening it on the current one.
 */
export declare const openHostSession: (runtimeKey: string, sessionId: string) => boolean;
export declare const canRequestNativeDirectoryAccess: () => boolean;
type PendingDesktopSessionLink = {
    sessionId: string;
    messageId: string | null;
};
/**
 * Session links (`openchamber://session/...`) that reached the desktop app
 * before this window could listen for them — the link that launched the app,
 * or "open in main window" from a closed main window. Taking them removes
 * them; outside the desktop local page there are none.
 */
export declare const takePendingDesktopSessionLinks: () => Promise<PendingDesktopSessionLink[]>;
declare const pendingHostActionsSchema: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
    type: z.ZodLiteral<"pairing">;
    link: z.ZodString;
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<"host">;
    hostId: z.ZodString;
}, z.core.$strip>], "type">>;
type PendingDesktopHostAction = z.infer<typeof pendingHostActionsSchema>[number];
/**
 * Host work the desktop shell hands to the main window: a pairing link the user
 * confirmed (`openchamber://connect`), or a relay-capable host to activate
 * (`openchamber://host/<id>`). Taking them removes them.
 */
export declare const takePendingDesktopHostActions: () => Promise<PendingDesktopHostAction[]>;
export declare const pathForDroppedFile: (file: File) => string | null;
export declare const startDesktopWindowDrag: () => Promise<boolean>;
export declare const isVSCodeRuntime: () => boolean;
export declare const isWebRuntime: () => boolean;
/**
 * Electron reuses the web RuntimeAPIs implementation, so distinguish a browser
 * client from an Electron renderer with both the runtime descriptor and shell.
 */
export declare const isBrowserClientRuntime: (platform: RuntimeAPIs['runtime']['platform'], desktopShell?: boolean) => boolean;
export declare const getDesktopHomeDirectory: () => Promise<string | null>;
export declare const requestDirectoryAccess: (directoryPath: string) => Promise<{
    success: boolean;
    path?: string;
    projectId?: string;
    error?: string;
}>;
export declare const requestFileAccess: (options?: {
    filters?: Array<{
        name: string;
        extensions: string[];
    }>;
    defaultPath?: string;
}) => Promise<{
    success: boolean;
    path?: string;
    outsideFileGrant?: string;
    error?: string;
}>;
export declare const startAccessingDirectory: (directoryPath: string) => Promise<{
    success: boolean;
    error?: string;
}>;
export declare const stopAccessingDirectory: (directoryPath: string) => Promise<{
    success: boolean;
    error?: string;
}>;
export declare const checkForDesktopUpdates: () => Promise<UpdateInfo | null>;
export declare const downloadDesktopUpdate: (onProgress?: (progress: UpdateProgress) => void) => Promise<boolean>;
export declare const restartToApplyUpdate: () => Promise<boolean>;
export declare const restartDesktopApp: () => Promise<boolean>;
export declare const getDesktopLanAddress: () => Promise<string | null>;
export declare const openDesktopPath: (path: string, app?: string | null) => Promise<boolean>;
export declare const revealDesktopPath: (path: string) => Promise<boolean>;
export declare const saveDesktopMarkdownFile: (defaultFileName: string, content: string) => Promise<string | null>;
export declare const openDesktopProjectInApp: (projectPath: string, appId: string, appName: string) => Promise<boolean>;
export declare const openDesktopFileInApp: (filePath: string, appId: string, appName: string) => Promise<boolean>;
export type InstalledDesktopAppInfo = {
    name: string;
    iconDataUrl?: string | null;
};
type FetchDesktopInstalledAppsResult = {
    apps: InstalledDesktopAppInfo[];
    success: boolean;
    hasCache: boolean;
    isCacheStale: boolean;
};
export declare const fetchDesktopInstalledApps: (apps: string[], force?: boolean) => Promise<FetchDesktopInstalledAppsResult>;
