import { type TunnelFrameTypeValue } from './protocol';
/** Cumulative raw tunnel-frame bytes, excluding stream zero and batch/crypto overhead. */
export declare const encodeDeliveryAck: (receivedBytes: number) => Uint8Array;
export declare class TunnelCodecError extends Error {
    constructor(message: string);
}
export interface TunnelFrame {
    frameType: TunnelFrameTypeValue;
    streamId: number;
    payload: Uint8Array;
    /** True when this frame is a fragment and more fragments of the same message follow. */
    hasMoreFragments: boolean;
}
export declare const encodeTunnelFrame: (frameType: TunnelFrameTypeValue, streamId: number, payload: Uint8Array, hasMoreFragments?: boolean) => Uint8Array;
export declare const decodeTunnelFrame: (frame: Uint8Array) => TunnelFrame;
export declare const encodeJsonPayload: (value: unknown) => Uint8Array;
export declare const decodeJsonPayload: <T>(payload: Uint8Array, validate: (parsed: unknown) => parsed is T) => T;
/** Split a body/message into payload-sized chunks. Empty input yields one empty chunk. */
export declare const chunkPayload: (bytes: Uint8Array, chunkSize?: number) => Uint8Array[];
/**
 * Encode one logical message as one or more frames, setting the fragment flag
 * on all but the last. Used for WS messages that exceed the frame budget.
 */
export declare const encodeFragmentedMessage: (frameType: TunnelFrameTypeValue, streamId: number, payload: Uint8Array) => Uint8Array[];
export declare const MAX_PENDING_FRAGMENT_KEYS = 1024;
/**
 * Reassembles fragmented messages per (streamId, frameType). Bounded to protect memory:
 * per message, in aggregate pending bytes, and in pending-key count.
 */
export declare const createFragmentAssembler: (maxMessageBytes?: number, maxAggregateBytes?: number, maxPendingKeys?: number) => {
    /**
     * Returns the complete message payload once all fragments arrived, or null
     * while more fragments are expected.
     */
    push(frame: TunnelFrame): Uint8Array | null;
    dropStream(streamId: number): void;
};
/**
 * Batch envelope encoder (Layer 2 plaintext container). Only used when both
 * peers negotiated `batch`. One encrypted WS message still equals one
 * encrypt() call — this only changes how many tunnel frames it carries.
 *
 * - 1 frame  -> [0x00][frame bytes]                (single, 1-byte overhead)
 * - N frames -> [0x01]([4B BE length][frame])×N    (batch)
 *
 * Callers must keep the encoded size within MAX_PLAINTEXT_FRAME_BYTES; the
 * outbound batcher flushes before an add would exceed the budget.
 */
export declare const encodeFrameBatch: (frames: Uint8Array[]) => Uint8Array;
/** Decodes a batch-envelope plaintext into its ordered tunnel frames. */
export declare const decodeFrameBatch: (plaintext: Uint8Array) => Uint8Array[];
export declare const DEFAULT_BATCH_WINDOW_MS = 150;
interface OutboundFrameBatcherOptions {
    /** Trailing flush window in ms. Buffered frames flush no later than this. */
    windowMs?: number;
    maxBatchBytes?: number;
    maxBatchFrames?: number;
    /** Encrypt + write one batched plaintext to the wire. Called in enqueue order. */
    sendBatch: (plaintext: Uint8Array) => void;
    now?: () => number;
    setTimer?: (fn: () => void, ms: number) => ReturnType<typeof setTimeout>;
    clearTimer?: (handle: ReturnType<typeof setTimeout>) => void;
}
export interface OutboundFrameBatcher {
    /** Buffer or immediately flush a tunnel frame per the batching policy. */
    enqueue(frame: Uint8Array): void;
    /** Force-flush any buffered frames now. */
    flush(): void;
    /** Stop the batcher; drops any un-flushed frames (channel is being torn down). */
    dispose(): void;
}
/**
 * Outbound batching buffer shared by the client and (mirrored in JS) the host
 * send paths. Policy:
 *  - Leading edge: if nothing flushed within windowMs, the frame ships now
 *    (batch of 1) — keeps time-to-first-token and keystroke echo instant.
 *  - Trailing window: subsequent body frames buffer and flush when the timer
 *    fires, buffered bytes >= maxBatchBytes, buffered frames >= maxBatchFrames,
 *    or the plaintext budget would be exceeded.
 *  - Non-buffered frame types (setup/teardown/keepalive) flush immediately, and
 *    flush any pending buffer first so per-stream ordering is preserved.
 */
export declare const createOutboundFrameBatcher: (options: OutboundFrameBatcherOptions) => OutboundFrameBatcher;
/** Allocates client-initiated stream ids: odd, starting at 1. */
export declare const createStreamIdAllocator: () => {
    next(): number;
};
export {};
