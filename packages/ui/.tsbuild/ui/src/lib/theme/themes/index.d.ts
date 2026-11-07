import type { Theme } from '@/types/theme';
export declare const DEFAULT_LIGHT_THEME_ID: 'openchamber-light';
export declare const DEFAULT_DARK_THEME_ID: 'openchamber-dark';
export declare const themes: Theme[];
export declare function getThemeById(id: string): Theme | undefined;
export declare function getDefaultTheme(prefersDark: boolean): Theme;
