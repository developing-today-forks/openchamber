import type { DesktopSettings } from '@/lib/desktop';
export declare const applyPersistedHomeDirectoryToWindow: (homeDirectory: string) => void;
export declare const getRuntimeSettingsMirrorStorageKey: (runtimeKey: string) => string;
export interface SettingsSyncedDetail {
    settings: DesktopSettings;
    /** Whether listeners may adopt authoritative state that this window owns a
        live copy of (workspace pointers, theme). True only for a bootstrap-grade
        sync: the settings document is shared by every window of this server, so
        a mid-session reconciliation adopting them would hijack this window's
        choices with another window's. Every settings save echoes the full
        document back as a sync event with bootstrap=false — the echo itself is
        not filtered; listeners gate their adoption on this flag and keep their
        live state for the fields they own. */
    bootstrap: boolean;
    /** Whether this sync may replace this window's theme preferences. VS Code
        settings broadcasts remain bootstrap-grade for shared workspace pointers,
        but must not copy one webview's theme into another webview. */
    adoptTheme: boolean;
}
type SettingsSaveState = 'idle' | 'saving' | 'error';
export declare const getSettingsSaveState: () => SettingsSaveState;
export declare const subscribeToSettingsSaveState: (listener: () => void) => (() => void);
/**
 * Drive the shared settings save indicator from pages that persist through
 * their own APIs instead of updateDesktopSettings. 'error' resets to idle.
 */
export declare const reportSettingsSaveState: (state: 'saving' | 'saved' | 'error') => void;
/** Whether a settings write reached its store. A no-op (nothing to send) counts as ok. */
type SettingsWriteResult = {
    ok: boolean;
};
export declare const isApplyingServerSettings: () => boolean;
/** Forget everything cached about the server document: the GET cache and the
 * last-known per-key values used to drop redundant writes. */
export declare const invalidateSettingsCache: () => void;
export declare const syncDesktopSettings: (options?: {
    bootstrap?: boolean;
    adoptTheme?: boolean;
}) => Promise<void>;
/**
 * Load the shared settings document for the current runtime (cached briefly
 * during startup bursts). Pages that need a field the stores do not carry read
 * it from here instead of fetching the endpoint themselves. `null` is a load
 * failure, never an empty document.
 */
export declare const loadDesktopSettings: () => Promise<DesktopSettings | null>;
/**
 * Queue a change a person made in this window for the debounced write. Keys
 * whose value the server already holds are dropped; computed server flags are
 * never sent. Resolves once the write (or the decision not to write) settled.
 */
export declare const updateDesktopSettings: (changes: Partial<DesktopSettings>) => Promise<SettingsWriteResult>;
export declare const initializeAppearancePreferences: () => Promise<void>;
export {};
