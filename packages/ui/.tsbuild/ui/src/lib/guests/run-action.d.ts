import { type ActionResultPayload, type GuestActionItem, type HostActionMessage } from '@openchamber/sdk';
import type { I18nKey, I18nParams } from '@/lib/i18n';
import type { GuestActionEntry } from './actions.ts';
type ActionOutcome = ActionResultPayload | {
    ok: false;
    reason: 'timeout' | 'unavailable';
};
/** One click owns one temporary frame and one completion, independently of other clicks. */
export type GuestBackgroundAction = {
    id: string;
    guestId: string;
    item: GuestActionItem;
    isActive: () => boolean;
    takeMessage: () => HostActionMessage | null;
    complete: (outcome: ActionOutcome) => void;
};
export declare const useGuestActionHostStore: import("zustand").UseBoundStore<import("zustand").StoreApi<{
    requests: GuestBackgroundAction[];
}>>;
/** Revalidate the menu's captured declaration before opening UI or starting guest code. */
export declare const runGuestAction: (entry: GuestActionEntry, item: GuestActionItem, t: (key: I18nKey, params?: I18nParams) => string, runtimeKey?: string) => Promise<void>;
export {};
