import { type GuestItem } from '@openchamber/sdk';
import type { InstalledGuest } from './types.ts';
/**
 * A message or session action that targets a dialog-mode guest opens the
 * attach window from wherever the menu was (a transcript row, the sidebar,
 * the header). `GuestActionDialogHost` renders whatever is parked here.
 */
type GuestDialogState = {
    request: {
        guestId: string;
        item: GuestItem;
    } | null;
    open: (guestId: string, item: GuestItem) => void;
    close: () => void;
};
export declare const useGuestDialogStore: import("zustand").UseBoundStore<import("zustand").StoreApi<GuestDialogState>>;
/**
 * Open a guest with an item as `ready.item`: the attach window when the
 * manifest declared `attach: "dialog"`, otherwise the rail panel through the
 * item hand-off store. Same routing the composer chip uses.
 */
export declare const openGuestWithItem: (guest: Pick<InstalledGuest, 'id' | 'attach'>, item: GuestItem, directory: string | null | undefined) => void;
export {};
