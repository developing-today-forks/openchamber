import { type DesktopHost } from '@/lib/desktopHosts';
/**
 * Which configured instance the window is actually talking to.
 *
 * This lives outside the host switcher because the header names the same
 * instance on its button. When the header carried its own copy of the matching
 * rules it was missing the relay branch, so a relay instance — whose API base
 * is the window origin and therefore matches no host URL — fell through to the
 * word "Instance" while the switcher two clicks away named it correctly.
 */
export declare const LOCAL_HOST_ID = "local";
/**
 * Where this app's own server listens, as the desktop shell reports it. Empty
 * when the shell runs no local server (`OPENCHAMBER_SKIP_LOCAL_SERVER=1`) or
 * has not reported one to this page yet. The page's own origin cannot stand in
 * for it. On desktop, that origin is the packaged UI's scheme or another
 * instance whose page the window shows.
 */
export declare const getLocalDesktopOrigin: () => string;
/**
 * The configured instances with Local in front, when the shell reported where
 * its local server listens. Without a local server, an entry for it would
 * point at nothing.
 */
export declare const withLocalDesktopHost: (hosts: DesktopHost[], localOrigin: string | null | undefined) => DesktopHost[];
export declare const runtimeKeyForDesktopHost: (host: DesktopHost) => string;
type ResolvedDesktopHost = {
    id: string;
    label: string;
    url: string;
};
export declare const resolveCurrentDesktopHost: (hosts: DesktopHost[]) => ResolvedDesktopHost;
export {};
