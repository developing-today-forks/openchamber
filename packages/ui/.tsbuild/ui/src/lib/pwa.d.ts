export type PWADisplayMode = 'browser' | 'standalone' | 'minimal-ui' | 'fullscreen' | 'window-controls-overlay' | 'twa';
export declare const PWA_RECENT_SESSIONS_STORAGE_KEY = "openchamber.pwaRecentSessions";
export declare const getPWADisplayMode: () => PWADisplayMode;
