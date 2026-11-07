import type { GuestItem } from '@openchamber/sdk';
/**
 * Hand-off slot between the composer chip (or a message / session action)
 * and a rail-mounted guest pane. The click cannot pass a prop to the rail, so
 * it parks the item here under the guest id; the pane takes it (and clears
 * the slot) when it mounts or, if already up, as soon as it lands. Dialog
 * panes get the item as a prop and never touch this store.
 */
type GuestItemState = {
    pendingItemByGuest: Record<string, GuestItem>;
    setPendingItem: (guestId: string, item: GuestItem) => void;
    takePendingItem: (guestId: string) => GuestItem | null;
};
export declare const useGuestItemStore: import("zustand").UseBoundStore<import("zustand").StoreApi<GuestItemState>>;
export {};
