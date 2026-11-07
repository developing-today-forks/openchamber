import type { GuestUpdate, InstalledGuest, UnreadableGuest } from './types.ts';
import type { GuestRequestFailure } from './request-failure.ts';
type GuestsStatus = 'idle' | 'loading' | 'ready' | 'error' | 'unsupported';
type GuestsState = {
    status: GuestsStatus;
    failure: GuestRequestFailure | null;
    guests: InstalledGuest[];
    /** Installed rows this build could not read; Settings lists them so they can be removed. */
    unreadable: UnreadableGuest[];
    runtimeKey: string;
    markLoading: () => void;
    replaceCatalog: (guests: InstalledGuest[], runtimeKey: string, unreadable?: UnreadableGuest[]) => void;
    /** Overlay a fresh server update check: listed guests get `update`, every other guest loses it. */
    applyUpdates: (updates: Record<string, GuestUpdate>, runtimeKey: string) => void;
    markFailed: (runtimeKey: string, failure?: GuestRequestFailure) => void;
    markUnsupported: (runtimeKey: string) => void;
    resetForRuntimeSwitch: (runtimeKey: string) => void;
};
export declare const useGuestsStore: import("zustand").UseBoundStore<import("zustand").StoreApi<GuestsState>>;
export {};
