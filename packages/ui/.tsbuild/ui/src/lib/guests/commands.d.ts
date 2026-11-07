import type { GuestCommandContribution } from '@openchamber/sdk';
import type { InstalledGuest } from './types.ts';
export type GuestCommandEntry = {
    guestId: string;
    guestName: string;
    command: GuestCommandContribution;
};
/**
 * The slash commands active guests contribute, in catalog order. A name the
 * composer already knows (a local command, an OpenCode command, or a skill)
 * or one an earlier guest already took is dropped with a console warning,
 * once per name, so an extension can never shadow what the user has.
 */
export declare const guestCommandEntries: (guests: readonly InstalledGuest[], reservedNames: ReadonlySet<string>) => GuestCommandEntry[];
/** A composer submission that matched one of the guest commands. */
export type GuestCommandRoute = {
    entry: GuestCommandEntry;
    args: string;
};
