import type { IconName } from '@/components/icon/icons';
export type SettingsPageSlug = 'home' | 'general' | 'projects' | 'remote-instances' | 'providers' | 'web-search' | 'messaging' | 'usage' | 'agents' | 'behavior' | 'commands' | 'mcp' | 'plugins' | 'skills.installed' | 'skills.catalog' | 'git' | 'appearance' | 'chat' | 'shortcuts' | 'sessions' | 'routing' | 'magic-prompts' | 'snippets' | 'notifications' | 'voice' | 'tunnel' | 'isolated-spaces' | 'about' | 'integrations' | 'extensions';
type SettingsPageGroup = 'general' | 'projects' | 'opencode' | 'content';
export interface SettingsRuntimeContext {
    isVSCode: boolean;
    isWeb: boolean;
    isDesktop: boolean;
    isMobile: boolean;
    /** Whether this runtime has Jev routing, which needs the OpenChamber server. */
    routingAvailable: boolean;
    /** The server runs in enterprise mode: pages for what it refuses are hidden. */
    enterpriseMode: boolean;
    /** Enterprise mode keeps Jev off (no administrator's endpoint), so pages that only configure Jev are hidden. */
    jevBlockedByEnterprise: boolean;
}
export interface SettingsPageMeta {
    slug: SettingsPageSlug;
    title: string;
    group: SettingsPageGroup;
    kind: 'single' | 'split';
    description?: string;
    keywords?: string[];
    isAvailable?: (ctx: SettingsRuntimeContext) => boolean;
}
export declare const SETTINGS_PAGE_METADATA: readonly SettingsPageMeta[];
export declare function getSettingsPageMeta(slug: string): SettingsPageMeta | null;
export declare function resolveSettingsSlug(value: string | null | undefined): SettingsPageSlug;
export declare function getSettingsNavIcon(slug: SettingsPageSlug): IconName | null;
export {};
