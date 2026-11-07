import type { I18nKey } from '@/lib/i18n';
import type { PluginEntry, RegistryResult } from '@/stores/usePluginsStore';
export interface ThirdPartyPluginDefinition {
    id: string;
    packageName: string;
    /** The provider the plugin registers; its card shows that provider's logo. */
    providerId: string;
    nameKey: I18nKey;
    descriptionKey: I18nKey;
    homepage: string;
}
export declare const THIRD_PARTY_PLUGINS: readonly ThirdPartyPluginDefinition[];
export interface CatalogPluginState {
    userEntry: PluginEntry | null;
    userEntryIsAmbiguous: boolean;
    projectEntries: PluginEntry[];
    registry: RegistryResult | null;
}
export type CatalogPluginPrimaryAction = 'install' | 'update' | 'setup' | 'manage';
type CatalogPluginPresentationStatus = 'not-installed' | 'installed' | 'installed-version' | 'update-available' | 'unpinned' | 'ambiguous' | 'restart-required' | 'registry-unavailable' | 'provider-unavailable';
interface CatalogPluginPresentationOptions {
    registryUnavailable?: boolean;
    restartRequired?: boolean;
    providerUnavailable?: boolean;
}
interface CatalogPluginPresentation {
    status: CatalogPluginPresentationStatus;
    latestVersion: string | null;
}
export declare const specMatchesPackage: (spec: string, packageName: string) => boolean;
export declare function getCatalogPluginState(entries: PluginEntry[], packageName: string, registryInfo: Record<string, RegistryResult>): CatalogPluginState;
export declare function getLatestNpmSpec(packageName: string, registry: RegistryResult | null | undefined): string | null;
export declare function getCatalogPluginPrimaryAction(state: CatalogPluginState, packageName: string): CatalogPluginPrimaryAction;
/**
 * Converts catalog and temporary mutation state into the one compact-card
 * status. Transient states intentionally outrank installed/version metadata.
 */
export declare function getCatalogPluginPresentation(state: CatalogPluginState, options?: CatalogPluginPresentationOptions): CatalogPluginPresentation;
export {};
