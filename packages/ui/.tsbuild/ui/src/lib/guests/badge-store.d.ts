/**
 * Rail badge counts by guest id, in memory only. A guest writes it through
 * `host.setBadge`; opening that guest's panel clears it. Nothing persists
 * across reloads, so a stale count never outlives the frame that set it.
 */
type GuestBadgeState = {
    countByGuest: Record<string, number>;
    setBadge: (guestId: string, count: number | null) => void;
    clearBadge: (guestId: string) => void;
    /** Another instance's extensions are different extensions, even with the same ids. */
    resetForRuntimeSwitch: () => void;
};
export declare const useGuestBadgeStore: import("zustand").UseBoundStore<import("zustand").StoreApi<GuestBadgeState>>;
export {};
