import { type DesktopHost, type HostProbeResult } from '@/lib/desktopHosts';
export type DesktopHostStatus = {
    status: HostProbeResult['status'];
    latencyMs: number;
    /** Which transport the successful probe used (multi-transport hosts). */
    via?: 'relay';
};
/** Reachability by instance id. */
type DesktopHostStatusMap = Record<string, DesktopHostStatus>;
type DesktopHostStatusSnapshot = {
    byHostId: Readonly<DesktopHostStatusMap>;
    /** True while any probe run is in flight, for the refresh spinner. */
    isProbing: boolean;
};
export declare const subscribeDesktopHostStatuses: (listener: () => void) => (() => void);
export declare const getDesktopHostStatusSnapshot: () => DesktopHostStatusSnapshot;
/**
 * Record a status learned outside a probe run — the switch flow probes too, and
 * its result is the freshest thing anyone has, so it takes ownership away from
 * any probe run still running for that host.
 */
export declare const setDesktopHostStatus: (hostId: string, status: DesktopHostStatus) => void;
/**
 * True while a probe run is still checking this host. The status on record is
 * then older than that run: opening the switcher re-probes every host, and a
 * host that stopped answering keeps its old "ok" until the re-probe times out.
 */
export declare const isDesktopHostStatusPending: (hostId: string) => boolean;
/**
 * Forget instances that are no longer configured. Called with the authoritative
 * host list, never with a partially loaded one — dropping entries on a list
 * that has not finished loading is what made every dropdown open start blank.
 */
export declare const pruneDesktopHostStatuses: (configuredHostIds: readonly string[]) => void;
/**
 * Probe every given instance, publishing each result the moment it lands.
 * Waiting for the slowest probe would hold answered rows on "Checking" beside
 * one host still working through its relay tunnel retries.
 */
export declare const probeDesktopHosts: (hosts: readonly DesktopHost[]) => Promise<void>;
/**
 * Learn every instance's status once at startup, so the switcher opens on real
 * values instead of probing for the first time under the user's cursor.
 *
 * Deliberately after the app's own bootstrap: this is background work, and the
 * direct legs go through the Electron main process while relay legs open their
 * own WebSocket, so neither shares the renderer's connection pool with session
 * traffic — but the machine's network is still busiest right at launch.
 */
export declare const warmDesktopHostStatuses: () => Promise<void>;
export {};
