import { z } from 'zod';
import { createRelayTunnelClient } from '@/lib/relay/tunnel-client';
/**
 * Private-relay reachability for a host. A host may carry this ALONGSIDE a
 * direct `apiUrl` (multi-transport: direct on the home network, E2EE tunnel
 * away — mirrors the mobile connection model) or as its only transport.
 * `hostEncPubJwk` is the trust anchor that pins the tunnel to the real server.
 * The relay admission `grant` is a one-time pairing artifact and is
 * intentionally NOT persisted — steady-state relay connections route by
 * `serverId` alone.
 */
export type DesktopHostRelay = {
    relayUrl: string;
    serverId: string;
    hostEncPubJwk: JsonWebKey;
};
export type DesktopHost = {
    id: string;
    label: string;
    /** Legacy/UI URL. During migration this may equal apiUrl. For relay hosts this is a display-only `relay://<serverId>` pseudo-URL. */
    url: string;
    /** API endpoint used by packaged Electron UI for this instance. Absent for relay-only hosts. */
    apiUrl?: string;
    /** Remote client bearer token for packaged-client API access. */
    clientToken?: string;
    /** Extra headers for desktop runtime API requests. */
    requestHeaders?: Record<string, string>;
    /** When set, this host is reached over the private relay tunnel. */
    relay?: DesktopHostRelay;
    /** The native SSH manager currently forwards this host's API. Not stored. */
    sshForwarded?: boolean;
};
/** Display-only pseudo-URL for a relay host (never fetched). */
export declare const relayHostDisplayUrl: (serverId: string) => string;
type DesktopHostsConfig = {
    hosts: DesktopHost[];
    defaultHostId: string | null;
    initialHostChoiceCompleted: boolean;
    localOrigin?: string | null;
};
/** Backward-compatible input type — callers may omit `initialHostChoiceCompleted`. */
type DesktopHostsConfigInput = {
    hosts: DesktopHost[];
    defaultHostId: string | null;
    initialHostChoiceCompleted?: boolean;
    localClientToken?: string | null;
};
export declare const importDesktopHostPairing: (link: string, hosts: DesktopHost[]) => Promise<{
    hosts: DesktopHost[];
    hostId: string;
}>;
export type HostProbeResult = {
    /** 'relay-limit' comes only from relay probes: the relay refused the tunnel
     * over its limits (too many devices at once, too many connects a minute). */
    status: 'ok' | 'auth' | 'update-recommended' | 'incompatible' | 'wrong-service' | 'unreachable' | 'relay-limit';
    latencyMs: number;
};
type DesktopHostUrlResolution = {
    persistedUrl: string;
    redeemUrl: string | null;
    kind: 'normal-host' | 'tunnel-connect-link';
};
export declare const normalizeHostUrl: (raw: string) => string | null;
export declare const resolveDesktopHostUrl: (raw: string) => DesktopHostUrlResolution | null;
export declare const redactSensitiveUrl: (raw: string) => string;
export declare const locationMatchesHost: (locationHref: string, hostUrl: string) => boolean;
export declare const getDesktopHostApiUrl: (host: DesktopHost) => string;
export declare const desktopHostsGet: () => Promise<DesktopHostsConfig>;
export declare const desktopHostsSet: (config: DesktopHostsConfigInput) => Promise<void>;
export declare const desktopLocalClientTokenGet: () => Promise<string>;
/**
 * Asks the desktop shell to load the Local UI into this window. True when it
 * does, which happens when the page belongs to another instance and cannot
 * switch to Local in place. False on the app's own pages and from a shell
 * without the command.
 */
export declare const desktopSwitchToLocal: () => Promise<boolean>;
/**
 * Stable per-install identifier for this desktop. Used as the client dedupe key
 * so re-pairing or re-authenticating this desktop reuses its single device
 * record on a server instead of piling up duplicates. Empty string when not in
 * the desktop shell.
 */
export declare const desktopInstallIdGet: () => Promise<string>;
/**
 * Reachability and client-auth check for a relay host: open a throwaway E2EE
 * tunnel, verify `/health`, then verify `/auth/session` with the saved bearer.
 * Relay hosts have no HTTP address for `desktopHostProbe`. Bounded by
 * `RELAY_PROBE_DEADLINE_MS`: a ghost relay registration (relay lost the host,
 * host doesn't know) leaves the tunnel reconnecting forever — the probe must
 * report unreachable rather than hang every status/switch flow with it — while
 * still spanning enough reconnect attempts that a cold first attempt is not
 * mistaken for an unreachable instance.
 */
export declare const probeRelayDesktopHost: (relay: DesktopHostRelay, options?: {
    keepTunnel?: boolean;
    clientToken?: string | null;
    requestHeaders?: Record<string, string> | null;
}) => Promise<HostProbeResult & {
    tunnel?: ReturnType<typeof createRelayTunnelClient>;
}>;
export declare const desktopHostProbe: (url: string, options?: {
    clientToken?: string | null;
    requestHeaders?: Record<string, string> | null;
    expectedServerId?: string | null;
}) => Promise<HostProbeResult>;
declare const remoteHostUpdateResult: z.ZodDiscriminatedUnion<[z.ZodObject<{
    status: z.ZodLiteral<"started">;
}, z.core.$strip>, z.ZodObject<{
    status: z.ZodLiteral<"auth">;
}, z.core.$strip>, z.ZodObject<{
    status: z.ZodLiteral<"failed">;
    error: z.ZodNullable<z.ZodString>;
}, z.core.$strip>], "status">;
type RemoteHostUpdateResult = z.infer<typeof remoteHostUpdateResult>;
/**
 * Asks a saved remote host to update its own OpenChamber. The desktop shell
 * reads the host's address and token from its own hosts file, so only a saved
 * host can be asked. `failed` carries the host's reason when it gave one.
 */
export declare const desktopHostUpdateServer: (hostId: string) => Promise<RemoteHostUpdateResult>;
/**
 * Waits until a host that was asked to update answers as a compatible server.
 * While it installs it still answers as the old version, then drops off while
 * it restarts; both mean "keep waiting". `auth` counts as back: the server is
 * up, and connecting will ask to sign in again.
 */
export declare const waitForDesktopHostUpdated: (hostId: string, { maxWaitMs, intervalMs, readHosts, probe, }?: {
    maxWaitMs?: number;
    intervalMs?: number;
    readHosts?: typeof desktopHostsGet;
    probe?: typeof desktopHostProbe;
}) => Promise<'updated' | 'timeout'>;
export declare const desktopOpenNewWindowAtUrl: (url: string, options?: {
    clientToken?: string | null;
    requestHeaders?: Record<string, string> | null;
}) => Promise<void>;
/**
 * Open a saved host in a new window by id. Required for relay-capable hosts —
 * the new window boots the local UI and picks the transport itself (direct
 * first, E2EE tunnel fallback), which a fixed URL cannot express.
 */
export declare const desktopOpenNewWindowForHost: (hostId: string) => Promise<void>;
export {};
