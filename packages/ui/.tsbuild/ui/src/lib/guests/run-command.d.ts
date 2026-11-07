import type { GuestCommandRoute } from './commands.ts';
import { type GuestResolveOutcome } from './resolve.ts';
/**
 * Which guest `GuestHosts` keeps mounted off-screen so a slash command can be
 * answered while that guest's panel is closed. One at a time; the frame goes
 * away as soon as the command has an outcome.
 */
type GuestResolveHostState = {
    guestId: string | null;
    mount: (guestId: string) => void;
    unmount: (guestId: string) => void;
};
export declare const useGuestResolveHostStore: import("zustand").UseBoundStore<import("zustand").StoreApi<GuestResolveHostState>>;
/**
 * Ask the guest behind `route` to turn `/name args` into a chip. Uses the
 * rail pane when it is up; otherwise mounts a hidden pane for the call and
 * unmounts it after. A guest that never connects is `unavailable`, not a
 * silent null.
 */
export declare const runGuestCommand: (route: GuestCommandRoute) => Promise<GuestResolveOutcome>;
export {};
