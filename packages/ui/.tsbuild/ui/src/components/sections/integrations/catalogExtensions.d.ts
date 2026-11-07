import type { IconName } from '@/components/icon/icons';
import type { I18nKey } from '@/lib/i18n';
import type { InstalledGuest } from '@/lib/guests/types';
/** An OpenChamber extension the team publishes and the Integrations page offers to install. */
export interface CatalogExtensionDefinition {
    /** The extension's `panel.id`, which is its id once installed. */
    guestId: string;
    /** Installed through the same Git install as Settings → Extensions. */
    gitUrl: string;
    homepage: string;
    nameKey: I18nKey;
    descriptionKey: I18nKey;
    logo: CatalogExtensionLogo;
}
/** The card's logo: the file-type icon of a file the extension opens, or an app icon. */
export type CatalogExtensionLogo = {
    kind: 'file-type';
    fileName: string;
} | {
    kind: 'icon';
    name: IconName;
};
export declare const EXCALIDRAW_EXTENSION: CatalogExtensionDefinition;
export declare const RESOURCE_MONITOR_EXTENSION: CatalogExtensionDefinition;
export declare const CATALOG_EXTENSIONS: readonly CatalogExtensionDefinition[];
export type CatalogExtensionState = {
    kind: 'not-installed';
} | {
    kind: 'blocked';
    guest: InstalledGuest;
} | {
    kind: 'needs-approval';
    guest: InstalledGuest;
} | {
    kind: 'paused';
    guest: InstalledGuest;
} | {
    kind: 'update-available';
    guest: InstalledGuest;
    version: string;
} | {
    kind: 'installed';
    guest: InstalledGuest;
};
/**
 * One state per card, from the installed catalog. Approval and pause outrank
 * an available update: the extension does nothing until they are resolved.
 */
export declare const getCatalogExtensionState: (guests: readonly InstalledGuest[], definition: CatalogExtensionDefinition) => CatalogExtensionState;
