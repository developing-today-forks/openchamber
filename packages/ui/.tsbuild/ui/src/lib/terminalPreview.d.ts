/** True for an address on this machine's loopback interface by number or `localhost`. */
export declare const isLoopbackPreviewUrl: (url: string) => boolean;
/**
 * Loopback ports portless announced it put behind a named address. Output is
 * scanned in chunks, so callers keep what earlier chunks reported and pass it
 * back to `extractAnnouncedUrls`.
 */
export declare const extractProxiedPorts: (text: string) => number[];
type AnnouncementOptions = {
    /** Ports earlier output said portless put behind a name. */
    readonly proxiedPorts?: readonly number[];
    /**
     * False when a named local address resolves on the wrong machine (a desktop
     * viewing a remote instance, which tunnels loopback ports only): portless
     * names are then skipped and the port behind them is the address.
     */
    readonly namedAddressesReachable?: boolean;
};
export declare const extractAnnouncedUrls: (text: string, { proxiedPorts, namedAddressesReachable }?: AnnouncementOptions) => string[];
export declare const extractTerminalPreviewUrl: (text: string, options?: AnnouncementOptions) => string | null;
export declare const isTerminalPreviewUrlAvailable: (url: string, timeoutMs?: number) => Promise<boolean>;
/**
 * Finds the URL a project action wants opened.
 *
 * Prefers the announcement line — `Local`, `ready on`, `serving` — because that
 * is the address the server is telling you to visit. The path is part of that
 * answer: an app served under a base path announces it, and dropping it lands
 * the user on that app's own 404.
 *
 * `requireAnnounced` refuses to guess at all. Output is scanned in whatever
 * chunks the terminal emits and the first match wins, so scoring loose URLs
 * makes the result depend on where those chunk boundaries happened to fall — a
 * dev gateway logging its routing table offers several backends that all look
 * openable. Where the command itself was inferred rather than configured,
 * waiting for a server to announce itself is the only answer that is the same
 * every time.
 */
export declare const extractProjectActionUrl: (text: string, { requireAnnounced, ...announcement }?: AnnouncementOptions & {
    requireAnnounced?: boolean;
}) => string | null;
export {};
