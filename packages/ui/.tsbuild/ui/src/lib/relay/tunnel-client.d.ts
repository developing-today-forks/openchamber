export interface TunnelWireSocket {
    readonly readyState: number;
    send(data: string | ArrayBuffer | Uint8Array): void;
    close(code?: number, reason?: string): void;
    onopen: (() => void) | null;
    onmessage: ((event: {
        data: unknown;
    }) => void) | null;
    onclose: ((event: {
        code: number;
        reason: string;
    }) => void) | null;
    onerror: (() => void) | null;
}
export interface RelayTunnelSocketMessageEvent {
    data: string | ArrayBuffer;
}
export interface RelayTunnelSocketCloseEvent {
    code: number;
    reason: string;
}
export interface RelayTunnelWebSocket {
    readonly readyState: number;
    binaryType?: 'blob' | 'arraybuffer';
    onopen: (() => void) | null;
    onmessage: ((event: RelayTunnelSocketMessageEvent) => void) | null;
    onerror: (() => void) | null;
    onclose: ((event: RelayTunnelSocketCloseEvent) => void) | null;
    send(data: string | ArrayBuffer | ArrayBufferView): void;
    close(code?: number, reason?: string): void;
}
export declare const wrapBrowserWebSocket: (ws: WebSocket) => RelayTunnelWebSocket;
export type RelayTunnelState = 'idle' | 'connecting' | 'connected' | 'reconnecting' | 'error';
export interface RelayTunnelStatus {
    state: RelayTunnelState;
    lastError?: string;
    /** Set on an `error` the tunnel will not retry on a timer (auth failed,
     * duplicate client, limit exceeded); only an `online`/foreground wake or
     * `retry()` retries. */
    terminal?: boolean;
    /** The relay's close code behind a `terminal` error. */
    closeCode?: number;
}
/** True while the tunnel is parked because the relay refused it over its
 * per-server limits (too many devices at once, too many connects a minute). */
export declare const isRelayLimitReached: (status: RelayTunnelStatus | null | undefined) => boolean;
interface RelayTunnelClientOptions {
    relayUrl: string;
    serverId: string;
    hostEncPubJwk: JsonWebKey;
    grant?: string;
    /** Test hook: replaces native WebSocket construction with a fake wire. */
    createWireSocket?: (url: string) => TunnelWireSocket;
    helloRetryMs?: number;
    helloTimeoutMs?: number;
    pingIntervalMs?: number;
    pingTimeoutMs?: number;
    /** Frame-batching flush window in ms (default 150). Only applies once negotiated. */
    batchWindowMs?: number;
    /** Advertise frame batching in the handshake. Default true. */
    batch?: boolean;
    /** Advertise downstream delivery acknowledgements. Default true. */
    flowControl?: boolean;
    reconnectBaseDelayMs?: number;
    reconnectMaxDelayMs?: number;
    hiddenOrOfflineMaxDelayMs?: number;
}
export interface RelayTunnelClient {
    fetch(input: string | URL | Request, init?: RequestInit): Promise<Response>;
    openWebSocket(pathWithQuery: string, protocols?: string[]): RelayTunnelWebSocket;
    getStatus(): RelayTunnelStatus;
    subscribeStatus(listener: (status: RelayTunnelStatus) => void): () => void;
    /** Makes one fresh attempt when parked in a terminal error; no-op otherwise. */
    retry(): void;
    close(): void;
}
export declare const createRelayTunnelClient: (options: RelayTunnelClientOptions) => RelayTunnelClient;
export {};
