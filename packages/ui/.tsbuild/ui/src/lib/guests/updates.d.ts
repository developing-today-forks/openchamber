import type { GuestUpdate, InstalledGuest } from './types.ts';
export type UpdateGuestErrorCode = 'not-git' | 'clone-failed' | 'clone-auth-failed' | 'invalid-manifest' | 'missing-build' | 'host-too-old' | 'enterprise-mode' | 'swap-failed' | 'not-found' | 'failed';
type CheckGuestUpdatesResult = {
    ok: true;
    updates: Record<string, GuestUpdate>;
} | {
    ok: false;
};
type UpdateGuestResult = {
    ok: true;
    guest: InstalledGuest;
} | {
    ok: false;
    code: UpdateGuestErrorCode;
    required?: string;
};
/**
 * Ask the server to compare every git install with its origin. The server
 * answers from a one-hour cache unless `force`. Failure is distinct from
 * "nothing to update" so the page never clears badges on a network error.
 */
export declare const checkGuestUpdates: (force: boolean) => Promise<CheckGuestUpdatesResult>;
/** Replace the installed git copy with a fresh clone of its origin. Returns the refreshed catalog row. */
export declare const updateGuest: (id: string) => Promise<UpdateGuestResult>;
export {};
