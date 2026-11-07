import { type I18nKey } from './messages/en';
import { type Locale } from './runtime';
export type I18nParams = Record<string, string | number | boolean | null | undefined>;
export type I18nDictionary = Record<I18nKey, string>;
type I18nState = {
    locale: Locale;
    dictionary: I18nDictionary;
    loadingLocale: Locale | null;
    setLocale: (locale: Locale) => void;
};
export declare function resetI18nDictionaryCacheForTests(): void;
export declare const useI18nStore: import("zustand").UseBoundStore<import("zustand").StoreApi<I18nState>>;
export declare function initializeLocale(): void;
export declare function formatMessage(dictionary: I18nDictionary, key: I18nKey, params?: I18nParams): string;
export type { I18nKey, Locale };
