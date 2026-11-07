import type { InstalledGuest } from '@/lib/guests/types';
import { type ExtensionSectionId } from './sections';
export type WorkStatusExtensionSections = {
    /** Section ids of available extensions, in catalog order. */
    ids: ExtensionSectionId[];
    byId: ReadonlyMap<ExtensionSectionId, InstalledGuest>;
};
/**
 * Extension sections the panel and the sections dialog may place. Empty on
 * VS Code and mobile, where no guest is loaded (`useGuestStatusSections`).
 */
export declare const useWorkStatusExtensionSections: () => WorkStatusExtensionSections;
