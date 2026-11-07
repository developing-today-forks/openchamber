export declare const RELAY_PROTOCOL_VERSION = 1;
export declare const parseRelayRetire: (raw: string) => {
    code: number;
    reason: string;
} | null;
export declare const RELAY_HKDF_INFO = "openchamber-relay-v1";
export declare const ENCRYPTED_FRAME_VERSION = 1;
export declare const ENCRYPTED_FRAME_IV_BYTES = 12;
export declare const ENCRYPTED_FRAME_HEADER_BYTES: number;
export declare const MAX_PLAINTEXT_FRAME_BYTES: number;
export declare const TUNNEL_FRAME_HEADER_BYTES = 5;
export declare const TUNNEL_FRAGMENT_FLAG = 128;
export declare const BATCH_CONTAINER_TAG_SINGLE = 0;
export declare const BATCH_CONTAINER_TAG_BATCH = 1;
export declare const BATCH_FRAME_LENGTH_BYTES = 4;
export declare const MAX_TUNNEL_PAYLOAD_BYTES: number;
export declare const TUNNEL_ACCEPT_ENCODING_HEADER = "x-openchamber-tunnel-accept-encoding";
export declare const TUNNEL_CONTENT_ENCODING_HEADER = "x-openchamber-tunnel-content-encoding";
export declare const TunnelFrameType: {
    readonly HttpRequest: 1;
    readonly HttpBody: 2;
    readonly HttpResponse: 3;
    readonly StreamEnd: 4;
    readonly StreamAbort: 5;
    readonly WsOpen: 6;
    readonly WsOpened: 7;
    readonly WsText: 8;
    readonly WsBinary: 9;
    readonly WsClose: 10;
    readonly Ping: 11;
    readonly Pong: 12;
    readonly DeliveryAck: 13;
};
export type TunnelFrameTypeValue = (typeof TunnelFrameType)[keyof typeof TunnelFrameType];
export declare const isTunnelFrameType: (value: number) => value is TunnelFrameTypeValue;
export interface TunnelHttpRequestPayload {
    method: string;
    path: string;
    query: string;
    headers: Record<string, string>;
    /** True when the client had a request body to send. The host uses this to
     * distinguish a genuine bodyless request from one whose body frames were lost
     * through the tunnel (which it must abort as an ambiguous transport failure
     * instead of forwarding an empty body the loopback server rejects with 400). */
    hasBody?: boolean;
}
export interface TunnelHttpResponsePayload {
    status: number;
    headers: Record<string, string>;
}
export interface TunnelStreamAbortPayload {
    reason: string;
}
export interface TunnelWsOpenPayload {
    path: string;
    query: string;
    protocols?: string[];
}
export interface TunnelWsClosePayload {
    code: number;
    reason: string;
}
export interface E2eeHelloMessage {
    t: 'hello';
    v: typeof RELAY_PROTOCOL_VERSION;
    clientPubJwk: JsonWebKey;
    nonce: string;
    batch?: boolean;
    /** Client supports cumulative downstream delivery acknowledgements. */
    flowControl?: boolean;
}
export interface E2eeReadyMessage {
    t: 'ready';
    v: typeof RELAY_PROTOCOL_VERSION;
    batch?: boolean;
    /** Enabled only when both peers support downstream flow control. */
    flowControl?: boolean;
}
export declare const RelayCloseCode: {
    readonly ControlReplaced: 4001;
    readonly DuplicateClient: 4002;
    readonly StuckControlReset: 4003;
    readonly HostUnavailable: 4008;
    readonly AuthFailed: 4010;
    readonly LimitExceeded: 4029;
    readonly HostWentAway: 1012;
    readonly RekeyMismatch: 1008;
    readonly ChannelFailure: 1011;
};
