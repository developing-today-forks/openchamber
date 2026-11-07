/**
 * Viewer side of an extension's shared surface: one socket per open panel,
 * frames in, input out, control state mirrored.
 *
 * The host sends a `frame` text message followed by one binary message with
 * the image; the client pairs them, hands the bytes to the pane, and
 * acknowledges the sequence once the pane has drawn it. That ack is what
 * lets the host send the next frame, so a pane that draws slowly sees fewer
 * frames rather than a growing queue. The socket goes through the runtime
 * transport so it works over the relay too, and reconnects with backoff
 * while the pane is open.
 */
import type { SurfaceController, SurfaceInputEvent } from '@openchamber/sdk';
import type { RelayTunnelWebSocket } from '@/lib/relay/tunnel-client';
export type SurfaceFrame = {
    seq: number;
    width: number;
    height: number;
    mime: 'image/jpeg' | 'image/png';
    bytes: ArrayBuffer;
    title?: string;
    agentActive: boolean;
};
export type SurfaceControlState = {
    controller: SurfaceController;
    mine: boolean;
};
export type SurfaceConnectionState = {
    status: 'connecting';
} | {
    status: 'open';
} | {
    status: 'reconnecting';
    attempt: number;
} | {
    status: 'ended';
    reason: 'service-stopped' | 'extension-unavailable' | 'host-shutdown';
};
export type SurfaceClientHandlers = {
    onFrame: (frame: SurfaceFrame) => void;
    onControl: (state: SurfaceControlState) => void;
    onConnection: (state: SurfaceConnectionState) => void;
    onResized?: (size: {
        width: number;
        height: number;
    }) => void;
    onClipboard?: (id: string, text: string) => void;
    onError?: (code: string, message: string) => void;
    /** The host-issued id of this connection; a new one after every reconnect. */
    onViewer?: (viewerId: string) => void;
};
type SurfaceClientDependencies = {
    refreshAuth: () => Promise<string>;
    clearUrlAuthToken: () => void;
    openSocket: (guestId: string) => RelayTunnelWebSocket;
    /** Hidden tab or offline: back off for longer and wait to be woken. */
    isPaused: () => boolean;
    /** Calls `wake` when the tab shows or the network returns; returns the cleanup. */
    onWake: (wake: () => void) => () => void;
};
export declare class SurfaceClient {
    private readonly guestId;
    private readonly handlers;
    private readonly dependencies;
    private socket;
    private pendingFrame;
    private reconnectTimer;
    private wakeCleanup;
    private failures;
    private generation;
    private disposed;
    private ended;
    constructor(guestId: string, handlers: SurfaceClientHandlers, dependencies?: SurfaceClientDependencies);
    start(): void;
    dispose(): void;
    /** Called by the pane once a frame is on screen; unlocks the next one. */
    ack(seq: number): void;
    sendInput(events: SurfaceInputEvent[]): boolean;
    release(): void;
    resize(width: number, height: number): void;
    requestClipboard(id: string): void;
    private send;
    private connect;
    private handleMessage;
    /** After an `ended`, a user-initiated attempt to attach again. */
    retry(): void;
    private scheduleReconnect;
    private cancelReconnect;
}
export {};
