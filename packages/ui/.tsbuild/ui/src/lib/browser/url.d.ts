/**
 * Address-bar input handling for the browser surface.
 */
export declare const DEV_TUNNEL_HOSTNAME = "openchamber-preview.localhost";
export declare const BLANK_URL = "about:blank";
/**
 * Normalizes what the user typed into a URL the browser can load.
 *
 * Schemeless input defaults to `https:`, except for loopback authorities:
 * dev servers overwhelmingly speak plain HTTP, and defaulting `localhost:5173`
 * to HTTPS turns the single most common address in this panel into a
 * connection error.
 */
export declare const normalizeBrowserUrl: (value: string) => string;
/** True when a URL points at the machine the page is loaded from. */
export declare const isLoopbackUrl: (value: string) => boolean;
/** Short label for a tab or header: host plus port, falling back to the raw value. */
export declare const browserUrlLabel: (value: string) => string;
/**
 * Whether a failed load is worth retrying. Restricted to loopback: retrying a
 * public site that refused us is just hammering somebody else's server, and a
 * remote dev server is reached through a local tunnel port anyway.
 */
export declare const isStartingServerFailure: (code: number, url: string) => boolean;
