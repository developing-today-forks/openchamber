import { useUIStore } from '@/stores/useUIStore';
import type { SettingsSurface } from './registry';
type UIState = ReturnType<typeof useUIStore.getState>;
/**
 * The device-scoped settings this window reports to its server, so the agent
 * tool can read them (`settings.devices`); the server keeps only registry
 * device keys. Left out: state that moves as the user works rather than a
 * preference (scroll position, open dialogs, the Settings page on screen,
 * per-folder panel state, "last viewed" stamps, terminal names that mean
 * nothing on another device).
 */
export declare const readDeviceSettings: (state: UIState) => {
    isSidebarOpen: boolean;
    sidebarWidth: number;
    contextRailOrder: string[];
    contextRailHiddenSurfaces: string[];
    mobileWorkspaceTabOrder: string[];
    mobileWorkspaceHiddenTabs: string[];
    contextSurfaceZones: Partial<Record<import("@/stores/useUIStore").ContextPanelMode, "bottom" | "left">>;
    contextEditorTreeVisible: boolean;
    contextEditorVisible: boolean;
    contextEditorTreeWidth: number;
    workStatusExpandedSections: Record<string, boolean>;
    messageQueueExpanded: boolean;
    messageLimit: number;
    walkthroughTocWidth: number;
    diffFileListMode: "flat" | "tree";
    diffFileTreeWidth: number;
    showTerminalQuickKeysOnDesktop: boolean;
    dockBadgeEnabled: boolean;
    alwaysShowScrollbars: boolean;
    mobileKeyboardMode: import("../mobileKeyboardMode").MobileKeyboardMode;
    desktopWindowControlsPosition: "left" | "right";
    desktopWindowControlsStyle: "classic" | "traffic-lights";
    inputBarOffset: number;
};
/**
 * `revision` grows with every send of this page, so the server can ignore a
 * report that arrives after a newer one.
 */
type DeviceSettingsReport<T> = {
    deviceId: string;
    surface: SettingsSurface;
    values: T;
    revision: number;
};
type ReporterDeps<T> = {
    read: () => T;
    /** Resolves true when the server took the report. `closing`: the window is going away. */
    send: (report: DeviceSettingsReport<T>, closing: boolean) => Promise<boolean>;
    deviceId: string;
    surface: SettingsSurface;
    /** Returns the timer handle `cancel` takes. */
    schedule: (callback: () => void, delayMs: number) => number;
    cancel: (handle: number) => void;
    debounceMs?: number;
};
/**
 * Sends the device settings after they have been still for `debounceMs`, and
 * only when they differ from what the server last took. A report the server
 * refused (signed out, offline) counts as not delivered, so the next request
 * sends it again.
 */
export declare const createDeviceSettingsReporter: <T>({ read, send, deviceId, surface, schedule, cancel, debounceMs }: ReporterDeps<T>) => {
    request: () => void;
    flush: (closing?: boolean) => Promise<void>;
    forget: () => void;
};
/** True when `next` differs from the last value it was given (structurally). */
export declare const createChangeFilter: <T>(initial: T) => (next: T) => boolean;
/**
 * Starts reporting this window's device settings to its server. The VS Code
 * extension runs no OpenChamber server and has no agent tool, so it reports
 * nothing; a desktop Mini Chat window does not start it (its layout state
 * is not the main window's).
 */
export declare const startDeviceSettingsReport: () => void;
export {};
