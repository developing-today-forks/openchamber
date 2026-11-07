import { type AttachMode } from '@openchamber/sdk';
import type { IconName } from '@/components/icon/icons';
import { type GuestActionEntry } from '@/lib/guests/actions';
import { type GuestCommandEntry } from '@/lib/guests/commands';
import type { InstalledGuest } from '@/lib/guests/types';
import type { ContextSurfaceDescriptor } from '@/lib/surfaces/registry';
export type GuestAttachItem = {
    id: string;
    name: string;
    icon: IconName;
    iconSrc?: string;
    mode: AttachMode;
};
export declare const useGuestSurfaces: () => ContextSurfaceDescriptor[];
export declare const useGuestPages: () => InstalledGuest[];
/**
 * Active guests that contribute a Work Status section. Empty on VS Code and
 * mobile, which never mount guests (the panel itself is web/desktop only).
 * Reads the store only; the rail owns loading the catalog.
 */
export declare const useGuestStatusSections: () => InstalledGuest[];
/**
 * Message and session menu entries from active guests. Empty on VS Code and
 * mobile, which never mount guests. Reads the store only: every transcript
 * row and sidebar row calls this, and the rail (`useGuestSurfaces`) already
 * owns loading the catalog and following runtime switches. The store is
 * emptied on a switch, so a memo on `guests` alone stays current.
 */
export declare const useGuestActions: () => GuestActionEntry[];
/**
 * Slash commands from active guests, minus any name in `reservedNames` (the
 * composer's own commands, OpenCode commands, skills). Empty on VS Code and
 * mobile. Store read only, like `useGuestActions`.
 */
export declare const useGuestCommands: (reservedNames: ReadonlySet<string>) => GuestCommandEntry[];
export declare const useGuestAttachItems: () => GuestAttachItem[];
