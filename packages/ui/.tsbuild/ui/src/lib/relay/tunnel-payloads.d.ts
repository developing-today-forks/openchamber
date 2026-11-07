import type { TunnelHttpResponsePayload, TunnelStreamAbortPayload, TunnelWsClosePayload } from './protocol';
export declare const isHttpResponsePayload: (value: unknown) => value is TunnelHttpResponsePayload;
export declare const isStreamAbortPayload: (value: unknown) => value is TunnelStreamAbortPayload;
export declare const isWsClosePayload: (value: unknown) => value is TunnelWsClosePayload;
export declare const TUNNEL_PARSE_BASE = "http://tunnel.invalid";
/** Extracts `pathname?search` from an absolute or relative WS/HTTP URL. */
export declare const wsUrlToTunnelPath: (url: string) => string;
interface NormalizedTunnelRequest {
    method: string;
    path: string;
    query: string;
    headers: Record<string, string>;
    body: AsyncIterable<Uint8Array> | null;
    signal?: AbortSignal;
}
/**
 * Flattens a fetch-style (input, init) pair into the tunnel HttpRequest shape,
 * preserving method, headers, body bytes/stream, and abort signal.
 */
export declare const normalizeTunnelRequest: (input: string | URL | Request, init?: RequestInit) => Promise<NormalizedTunnelRequest>;
export {};
