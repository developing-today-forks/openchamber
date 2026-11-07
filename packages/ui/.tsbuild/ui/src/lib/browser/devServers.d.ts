export type DiscoveredDevServer = {
    readonly port: number;
    readonly url: string;
    readonly command: string;
};
export type DevServerDiscovery = {
    readonly kind: 'loading';
} | {
    readonly kind: 'ready';
    readonly servers: ReadonlyArray<DiscoveredDevServer>;
} | {
    readonly kind: 'unavailable';
};
/**
 * The servers listening where this directory's code runs: on the host, or
 * inside the isolated space that owns the directory, which the request is
 * addressed to by its directory.
 */
export declare const fetchDevServers: (signal: AbortSignal | undefined, directory: string) => Promise<DevServerDiscovery>;
/**
 * Asks the server for the HTTP status a loopback URL currently returns.
 *
 * A dev server fronted by a gateway answers requests before the app behind it
 * is up, returning a 5xx page. That is a successful load as far as the browser
 * is concerned, so it produces no navigation failure — the status is the only
 * honest signal, short of reading the page and guessing from its contents.
 *
 * Returns null when the status could not be established.
 */
export declare const probeLoopbackStatus: (url: string) => Promise<number | null>;
type DevServerCandidate = {
    readonly url: string;
    readonly port: number;
    /** Present when a server announced this address itself. */
    readonly announced: boolean;
};
/**
 * Combines what servers said with what is actually listening.
 *
 * Each source knows something the other cannot. An announcement carries the base
 * path an app is served under, which a socket cannot reveal. A listening port is
 * ground truth, which an announcement is not: terminals wrap long lines, and a
 * URL split mid-port reads as a perfectly plausible address on a port where
 * nothing is running.
 *
 * So discovery decides which servers exist and announcements supply their paths.
 * When discovery is unavailable the announcements stand on their own — offering
 * something unverified beats offering nothing.
 */
export declare const mergeDevServerCandidates: ({ announced, discovered, }: {
    announced: ReadonlyArray<string>;
    discovered: ReadonlyArray<DiscoveredDevServer> | null;
}) => DevServerCandidate[];
export {};
