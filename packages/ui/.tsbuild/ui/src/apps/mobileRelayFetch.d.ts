import type { RelayTunnelClient } from '@/lib/relay/tunnel-client';
type RelayFetchOutcome = {
    response: Response | null;
    /** Why no response arrived: the tunnel error message or `timeout`. */
    failure: string | null;
};
type RelayFetchTunnel = Pick<RelayTunnelClient, 'fetch' | 'getStatus' | 'subscribeStatus'>;
/** One request, no retry: for non-idempotent calls such as pairing redeem. */
export declare const fetchThroughRelayOnce: (tunnel: RelayFetchTunnel, path: string, init: RequestInit | undefined, budgetMs: number) => Promise<RelayFetchOutcome>;
/**
 * An idempotent probe. When the relay socket drops before answering, the tunnel
 * reconnects on its own backoff; the probe waits for that and asks again, as
 * long as the budget lasts. A failure while the channel stays up is final.
 */
export declare const fetchThroughRelayWithRetry: (tunnel: RelayFetchTunnel, path: string, init: RequestInit | undefined, budgetMs: number) => Promise<RelayFetchOutcome>;
export {};
