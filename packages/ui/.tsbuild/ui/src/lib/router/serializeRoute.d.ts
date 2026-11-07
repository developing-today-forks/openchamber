/**
 * Application state relevant for URL serialization.
 */
export interface AppRouteState {
    sessionId: string | null;
    isSettingsOpen: boolean;
    settingsPath: string;
}
/**
 * Update the browser URL using pushState or replaceState.
 * Does nothing if URL already matches or in VS Code context.
 */
export declare function updateBrowserURL(state: AppRouteState, options?: {
    replace?: boolean;
    force?: boolean;
}): void;
