import { type MonoFontOption, type UiFontOption } from '@/lib/fontOptions';
interface FontPreferences {
    uiFont: UiFontOption;
    monoFont: MonoFontOption;
    customUiFont: string;
    customMonoFont: string;
}
/**
 * The fonts the app renders with. A font with a `source` loads from a public
 * CDN; enterprise mode keeps the app from reaching outside servers, so there
 * it falls back to the system font. The stored choice is untouched and comes
 * back when the mode is off.
 */
export declare const useFontPreferences: () => FontPreferences;
export {};
