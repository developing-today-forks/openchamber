/**
 * True when a loopback URL of this directory cannot be reached from a browser
 * tab: it is on the OpenChamber machine, or inside an isolated space, whose
 * ports only the desktop's tunnel reaches. A tab's `localhost` is its own.
 */
export declare const isRemoteWebLoopbackUrl: (url: string, directory?: string | null) => boolean;
/** True when the directory is an isolated space and this client has no tunnel into it. */
export declare const isSpaceUnreachableFromHere: (directory: string | null | undefined) => boolean;
export declare const resolveIframeBrowserUrl: (url: string, directory?: string | null) => string;
/**
 * True when the desktop reaches the instance's dev servers through this
 * tunnel. Only loopback addresses can go through it: a named local address
 * (portless `https://auth.myapp.localhost`) resolves on this machine, and the
 * tunnel rewrites the host the name-based proxy routes on.
 */
export declare const reachesDevServersThroughTunnel: () => boolean;
/** Thrown when a remote dev server exists but could not be reached from here. */
export declare class DevTunnelUnavailableError extends Error {
    constructor(message: string);
}
/**
 * Returns the URL the browser view should actually load.
 *
 * A failure to tunnel is reported rather than papered over. Loading the
 * original loopback URL instead would not be "the same outcome without this
 * mechanism": on a remote instance it changes which machine answers, so the
 * user would be shown whatever happens to run on that port here — possibly a
 * different application — under the address they asked for. The refusal is
 * often authoritative, too: discovery unavailable, port not offered,
 * authentication rejected. None of that should look like a page.
 */
export declare const resolveBrowsableUrl: (url: string, directory?: string | null) => Promise<string>;
/**
 * True when a loopback URL belongs to the machine OpenChamber runs on rather
 * than to this one.
 *
 * A page served through a tunnel can send the browser to another local port —
 * a docs server behind a dev gateway, an API on its own port — and that
 * navigation happens inside the view, where nothing resolved it. Without this
 * the address would be looked for on the user's own machine, where it is either
 * nothing at all or, worse, a different application.
 *
 * A URL already pointing at a tunnel's local port is not retargeted; that one
 * is this machine, deliberately.
 */
export declare const shouldTunnelLoopbackUrl: (url: string, directory?: string | null) => boolean;
/**
 * Maps a URL the view actually loaded back to the address the user asked for.
 *
 * Without this the tunnel's random local port would show up in the address bar
 * and, worse, be persisted as the tab's target — a port that means nothing
 * after a restart.
 */
export declare const toDisplayUrl: (url: string) => string;
