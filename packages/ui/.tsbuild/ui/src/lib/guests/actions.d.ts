import { type GuestActionContribution, type GuestActionRole, type GuestMessageItem, type GuestSessionItem } from '@openchamber/sdk';
import type { IconName } from '@/components/icon/icons';
import { type SessionMessageRecord } from '@/lib/exportSession';
import type { InstalledGuest } from './types.ts';
/** One menu entry: the action and the guest that declared it, with the icon resolved for the host sprite. */
export type GuestActionEntry = {
    guest: InstalledGuest;
    action: GuestActionContribution;
    icon: IconName;
    iconSrc?: string;
};
/**
 * Menu entries for every active guest, in catalog order. A paused or not yet
 * approved guest contributes nothing, so a `payload: ["messages"]` action
 * only appears once `conversation` was granted.
 */
export declare const guestActionEntries: (guests: readonly InstalledGuest[], authenticatedAsset: (path: string) => string) => GuestActionEntry[];
export declare const guestMessageActionsFor: (entries: readonly GuestActionEntry[], role: GuestActionRole) => GuestActionEntry[];
export declare const guestSessionActions: (entries: readonly GuestActionEntry[]) => GuestActionEntry[];
export declare const guestActionWantsMessages: (action: GuestActionContribution) => boolean;
type SessionRef = {
    sessionId: string;
    sessionTitle: string | null | undefined;
    directory: string | null | undefined;
};
export declare const buildGuestMessageItem: (action: string, session: SessionRef, record: SessionMessageRecord) => GuestMessageItem;
/**
 * The session item. `records` omitted means the action did not ask for the
 * conversation (no `messages` field); an empty list is a real empty
 * conversation. Messages are the same ones the Markdown export writes,
 * oldest first; when their JSON would exceed `GUEST_ITEM_SESSION_MAX` the
 * oldest are dropped and `truncated` is set.
 */
export declare const buildGuestSessionItem: (action: string, session: SessionRef, records?: readonly SessionMessageRecord[]) => GuestSessionItem;
export {};
