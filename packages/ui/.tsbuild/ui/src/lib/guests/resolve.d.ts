import type { AttachIssueRequest, ResolveRequest } from '@openchamber/sdk';
/**
 * `timeout`: the frame never answered; `unavailable`: no frame could be
 * asked (never loaded, or closed mid-call); `error`: the guest's own answer,
 * whose message is shown to the user as the extension wrote it.
 */
export type GuestResolveOutcome = {
    ok: true;
    item: AttachIssueRequest | null;
} | {
    ok: false;
    reason: 'timeout' | 'unavailable';
} | {
    ok: false;
    reason: 'error';
    message: string;
};
type GuestResolver = (request: ResolveRequest) => Promise<GuestResolveOutcome>;
export declare const registerGuestResolver: (guestId: string, resolver: GuestResolver) => (() => void);
export declare const getGuestResolver: (guestId: string) => GuestResolver | null;
/** Resolves with the resolver once one is registered, or `null` at the deadline. */
export declare const waitForGuestResolver: (guestId: string, timeoutMs: number) => Promise<GuestResolver | null>;
export {};
