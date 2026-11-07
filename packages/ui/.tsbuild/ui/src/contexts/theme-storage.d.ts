import type { ThemeMode } from '@/types/theme';
import type { DesktopSettings } from '@/lib/desktop';
type StoredThemePreferences = {
    themeMode: ThemeMode;
    lightThemeId: string;
    darkThemeId: string;
};
export declare const getThemePreferencesStorageKey: (runtimeKey: string) => string;
export declare const readThemePreferencesForRuntime: (runtimeKey: string) => StoredThemePreferences | null;
export declare const writeThemePreferencesForRuntime: (runtimeKey: string, preferences: StoredThemePreferences) => void;
/**
 * Resolve the preferences a cross-window storage event should apply for the
 * current runtime. Returns null — meaning "keep current preferences" — when
 * the event targets another runtime's key, when no valid stored preferences
 * exist, or when the stored preferences already match the current ones (the
 * identity check breaks cross-window adoption loops).
 */
export declare const resolveThemePreferencesFromStorageEvent: (eventKey: string | null, runtimeKey: string, current: StoredThemePreferences) => StoredThemePreferences | null;
/**
 * Resolve the preferences for a runtime at boot: the scoped entry when one
 * exists, otherwise a one-time seed from the superseded global keys, otherwise
 * defaults. The seed guarantees the first scoped write carries the last-known
 * theme instead of defaults.
 */
export declare const resolveThemePreferencesForRuntime: (runtimeKey: string) => StoredThemePreferences;
/**
 * Adopt another runtime's stored preferences when the endpoint switches: the
 * new runtime's scoped entry when one exists, otherwise the current
 * preferences unchanged (the same reference — no re-render, no write-through)
 * until the incoming settings sync refines with the server's authoritative
 * value.
 */
export declare const adoptThemePreferencesForRuntime: (runtimeKey: string, current: StoredThemePreferences) => StoredThemePreferences;
type SettingsSyncThemePayload = Pick<DesktopSettings, 'useSystemTheme' | 'themeVariant' | 'lightThemeId' | 'darkThemeId'>;
/**
 * Resolve the preferences a settings sync should apply. Returns null — meaning
 * "keep current preferences" — when the sync is not bootstrap-grade (a
 * mid-session save echo replays the server document, which may hold another
 * window's theme, a default, or a stale value; the scoped entry and bootstrap
 * syncs own this window's theme) and when the resolved values already match
 * the current ones (the identity check breaks adoption loops).
 *
 * Theme fields absent from the server document mean "not set", not "reset to
 * defaults": each one independently keeps the current preference. The payload
 * is the already-sanitized settings document (sanitizeWebSettings), so fields
 * present in it are domain-valid; an unknown id injected some other way fails
 * theme lookup downstream and falls back cosmetically.
 */
export declare const resolveThemePreferencesFromSettingsSync: (detail: {
    adoptTheme: boolean;
    settings: SettingsSyncThemePayload;
} | null, current: StoredThemePreferences) => StoredThemePreferences | null;
export {};
