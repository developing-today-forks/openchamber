import type { I18nKey } from '@/lib/i18n/store';
import type { SettingsPageSlug, SettingsRuntimeContext } from './metadata';
interface SettingsSearchItem {
    id: string;
    page: SettingsPageSlug;
    titleKey: I18nKey;
    descriptionKey?: I18nKey;
    keywords?: string[];
    isAvailable?: (ctx: SettingsSearchAvailabilityContext) => boolean;
}
export interface SettingsSearchResult extends SettingsSearchItem {
    title: string;
    description: string | null;
    pageTitle: string;
}
interface SettingsSearchAvailabilityContext extends SettingsRuntimeContext {
    messagingSupported: boolean;
    isMobile: boolean;
    isDesktopLocalOrigin: boolean;
    isMac: boolean;
    isWindows: boolean;
    isLinux: boolean;
}
/** The search target (and highlight anchor) of one shortcut row on the Shortcuts page. */
export declare const shortcutSearchItemId: (actionId: string) => string;
interface BuildSettingsSearchResultsOptions {
    query: string;
    runtimeCtx: SettingsSearchAvailabilityContext;
    visiblePageSlugs?: SettingsPageSlug[];
    t: (key: I18nKey) => string;
    getPageTitle: (slug: SettingsPageSlug) => string;
}
export declare function buildSettingsSearchResults({ query, runtimeCtx, visiblePageSlugs, t, getPageTitle, }: BuildSettingsSearchResultsOptions): SettingsSearchResult[];
export {};
