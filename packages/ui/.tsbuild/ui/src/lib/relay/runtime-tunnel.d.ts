import { type RelayTunnelClient, type RelayTunnelStatus } from './tunnel-client';
export interface RelayRuntimeDescriptor {
    relayUrl: string;
    serverId: string;
    hostEncPubJwk: JsonWebKey;
    grant?: string;
}
/**
 * Status changes of whichever tunnel is the runtime's at the time. Only
 * changes are delivered; read `getActiveRelayTunnel()?.getStatus()` for the
 * current one.
 */
export declare const subscribeActiveRelayTunnelStatus: (listener: (status: RelayTunnelStatus) => void) => (() => void);
export declare const getActiveRelayTunnel: () => RelayTunnelClient | null;
export declare const getActiveRelayDescriptor: () => Omit<RelayRuntimeDescriptor, 'grant'> | null;
export declare const isRelayModeActive: () => boolean;
/**
 * Activates relay mode with the given descriptor, replacing any previous tunnel.
 * Reuses the existing client when the descriptor is unchanged so a redundant
 * runtime switch does not tear down a live tunnel.
 */
export declare const activateRelayTunnel: (descriptor: RelayRuntimeDescriptor) => RelayTunnelClient;
/**
 * Adopts an ALREADY-OPEN tunnel client (e.g. the connect flow's probe tunnel)
 * as the active runtime tunnel, so the immediately following
 * `activateRelayTunnel` with an equal descriptor reuses it instead of paying a
 * second WebSocket connect + E2EE handshake. Replaces any previous tunnel.
 */
export declare const adoptRelayTunnel: (descriptor: RelayRuntimeDescriptor, client: RelayTunnelClient) => void;
export declare const deactivateRelayTunnel: () => void;
