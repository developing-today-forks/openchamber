export type Locale = 'en' | 'de' | 'fr' | 'nl' | 'zh-CN' | 'zh-TW' | 'uk' | 'es' | 'pt-BR' | 'ko' | 'pl' | 'ja' | 'tr' | 'ar' | 'he';
export declare const LOCALES: readonly ["en", "de", "fr", "nl", "zh-CN", "zh-TW", "uk", "es", "pt-BR", "ko", "pl", "ja", "tr", "ar", "he"];
export declare const DEFAULT_LOCALE: Locale;
export type LayoutDirection = 'ltr' | 'rtl';
/** The one rule for the app's layout direction: right-to-left locales mirror the UI, every other locale stays left to right. */
export declare function getLocaleDirection(locale: Locale): LayoutDirection;
/**
 * The window edge where a line of the layout starts. OS window controls stay on
 * their physical edge in every language, so window chrome maps them through this.
 */
export declare function getInlineStartSide(direction: LayoutDirection): 'left' | 'right';
/**
 * Whether an element lays out right to left: the nearest explicit `dir`
 * decides (the document root carries the UI direction). Read from the
 * attribute because `matches(':dir(rtl)')` throws on WebKit before 16.4.
 */
export declare function isRightToLeft(element: Element): boolean;
export declare const LOCALE_LABEL_KEYS: Record<Locale, 'common.language.english' | 'common.language.french' | 'common.language.dutch' | 'common.language.simplifiedChinese' | 'common.language.traditionalChinese' | 'common.language.ukrainian' | 'common.language.spanish' | 'common.language.brazilianPortuguese' | 'common.language.korean' | 'common.language.polish' | 'common.language.german' | 'common.language.japanese' | 'common.language.turkish' | 'common.language.arabic' | 'common.language.hebrew'>;
export declare const LOCALE_STORAGE_KEY = "openchamber.i18n.v1";
export declare function normalizeLocale(value: string | undefined | null): Locale;
export declare function writeStoredLocale(locale: Locale): void;
declare global {
    interface Window {
        /** The host application's display language (VS Code sets it), used before the user picks a locale. */
        __OPENCHAMBER_HOST_LANGUAGE__?: string;
    }
}
export declare function detectInitialLocale(): Locale;
