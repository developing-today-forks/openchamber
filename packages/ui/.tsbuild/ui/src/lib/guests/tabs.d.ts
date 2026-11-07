import { type PluginContextPanelMode } from '@/lib/surfaces/modes';
/** Close every context-panel tab of one guest in every project. Disable, remove, and a catalog that no longer lists the guest all end here. */
export declare const closeGuestTabsEverywhere: (mode: PluginContextPanelMode) => void;
export declare const closeGuestTabsById: (guestId: string) => void;
