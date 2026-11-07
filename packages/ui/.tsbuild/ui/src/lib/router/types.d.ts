import type { SidebarSection } from '@/constants/sidebar';
/**
 * Represents the current route state derived from URL parameters.
 * All fields are nullable - null means "not specified in URL" (use app defaults).
 */
export interface RouteState {
    /** Session ID to navigate to */
    sessionId: string | null;
    /** Message to show in that session (a message link); only with a session */
    messageId: string | null;
    /** View selected through the legacy `tab` URL parameter. */
    tab: RouteTab | null;
    /** Settings section - when non-null, settings dialog should be open */
    settingsPath: string | null;
    /** File path for diff view */
    diffFile: string | null;
}
/**
 * Valid values for the legacy `tab` URL parameter. Non-chat tabs open the
 * matching context-panel surface; the chat always owns the main area.
 */
export type RouteTab = 'chat' | 'git' | 'diff' | 'terminal' | 'files';
export declare const VALID_TABS: readonly RouteTab[];
/**
 * Valid settings section values for URL routing.
 */
export declare const VALID_SETTINGS_SECTIONS: readonly SidebarSection[];
/**
 * URL parameter names used for routing.
 */
export declare const ROUTE_PARAMS: {
    readonly SESSION: 'session';
    readonly MESSAGE: 'message';
    readonly TAB: 'tab';
    readonly SETTINGS: 'settings';
    readonly FILE: 'file';
};
