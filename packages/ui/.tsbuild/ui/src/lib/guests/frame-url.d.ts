/**
 * Direct frames use a short-lived guest-scoped URL. Relay frames fetch their
 * HTML and static resources over authenticated runtime HTTP and use srcDoc;
 * browser-owned iframe requests cannot travel through the JS tunnel client.
 * Neither representation contains the runtime's bearer credential.
 */
export type GuestFrameUrl = {
    kind: 'url';
    url: string;
    expiresAt: number;
} | {
    kind: 'document';
    html: string;
};
export declare const resolveGuestFrameUrl: (guestId: string, entry: string, signal?: AbortSignal, origins?: readonly string[]) => Promise<GuestFrameUrl>;
