import { type GuestCapability } from '@openchamber/sdk';
import type { InstalledGuest } from './types.ts';
/**
 * A guest takes part in the app only when the user has not paused it and has
 * approved everything its package asks for. Rail icons, attach rows,
 * integration cards, and the pane itself all use this one definition.
 */
export declare const isGuestActive: (guest: InstalledGuest) => boolean;
export declare const guestNeedsApproval: (guest: InstalledGuest) => boolean;
export declare const guestMay: (guest: InstalledGuest | null, capability: GuestCapability) => boolean;
