/**
 * Event Pipeline — transport connection, translation, coalescing, and batched flush.
 *
 * Wire events (OpenCode v2 `/api/event`, or the OpenChamber server's WebSocket
 * bridge of that stream) are translated into `SyncEvent`s here and coalesced
 * per directory before the reducer sees them. This module must not make
 * state-dependent decisions about event validity: deciding whether a delta is
 * already represented by a full part snapshot belongs in the reducer.
 *
 * Plain closure API:
 *   const { cleanup } = createEventPipeline({ sdk, onEvents })
 *
 * No class, no start/stop lifecycle. One pipeline per mount.
 * Abort controller created once at init, cleaned up via returned cleanup fn.
 */
import type { OpenCodeClient } from "@opencode/client";
import { z } from "zod";
import { type SyncEvent } from "@/lib/opencode/events";
type EventPipelineDelivery = {
    onEvent: (directory: string, payload: SyncEvent) => void;
    onEvents?: never;
} | {
    onEvent?: never;
    onEvents: (directory: string, payloads: readonly SyncEvent[]) => void;
};
export type EventPipelineInput = {
    sdk: OpenCodeClient;
    routeDirectory?: (directory: string, payload: SyncEvent) => string;
    /** Called after stream reconnects (visibility restore or heartbeat timeout). */
    onReconnect?: (details: {
        replayReset: boolean;
        resumed: boolean;
    }) => void;
    /** Called when the stream disconnects (heartbeat timeout, network error, or transport failure). */
    onDisconnect?: (reason: string) => void;
    /** Called when transport switches (e.g. WS timeout → SSE fallback) without actual disconnection. */
    onTransportSwitch?: () => void;
    /**
     * Called when the host announces that an isolated space's own event connection came or
     * went; after a gap that one space is re-read. `wasReady` says whether the space's stream
     * had been connected before.
     */
    onSpaceStream?: (details: {
        spaceId: string;
        status: "connected" | "disconnected";
        wasReady: boolean;
    }) => void;
    /**
     * Called when the host announces a step of an isolated space's creation, `failed` with the
     * failure of the step that stopped it.
     */
    onSpaceProgress?: (details: SpaceProgress) => void;
    /** Called when the setup commands of an isolated space moved on: began, the next one, or ended. */
    onSpaceSetup?: (spaceId: string) => void;
    /** Called when the host follows an isolated space's permission modes again, after a gap or at first. */
    onSpacePermissionStream?: (spaceId: string) => void;
    /**
     * Called whenever the stream receives anything: an event, a WebSocket frame, or a keepalive
     * that carries no event. Starting an attempt that has received nothing yet does not count.
     */
    onStreamActivity?: () => void;
    transport?: "auto" | "ws" | "sse";
    heartbeatTimeoutMs?: number;
    reconnectDelayMs?: number;
    wsReadyTimeoutMs?: number;
} & EventPipelineDelivery;
export type EventPipeline = {
    cleanup: () => void;
    reconnect: (reason?: string) => void;
};
declare const openchamberSpaceStreamSchema: z.ZodObject<{
    type: z.ZodLiteral<"openchamber:space-stream">;
    properties: z.ZodObject<{
        spaceId: z.ZodString;
        status: z.ZodEnum<{
            connected: "connected";
            disconnected: "disconnected";
        }>;
        wasReady: z.ZodBoolean;
    }, z.core.$strip>;
}, z.core.$strip>;
declare const openchamberSpaceProgressSchema: z.ZodObject<{
    type: z.ZodLiteral<"openchamber:space-progress">;
    properties: z.ZodObject<{
        spaceId: z.ZodString;
        step: z.ZodUnion<readonly [z.ZodEnum<{
            bringing_code: "bringing_code";
            checking_place: "checking_place";
            creating: "creating";
            downloading_image: "downloading_image";
            giving_access: "giving_access";
            preparing_tools: "preparing_tools";
            ready: "ready";
            setting_network: "setting_network";
        }>, z.ZodLiteral<"failed">]>;
        failure: z.ZodNullable<z.ZodObject<{
            code: z.ZodString;
            message: z.ZodString;
        }, z.core.$strip>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export type SpaceProgress = z.infer<typeof openchamberSpaceProgressSchema>["properties"];
type ClassifiedStreamPayload = {
    kind: "space-stream";
    properties: z.infer<typeof openchamberSpaceStreamSchema>["properties"];
} | {
    kind: "space-progress";
    properties: SpaceProgress;
} | {
    kind: "space-setup";
    spaceId: string;
} | {
    kind: "space-permission-stream";
    spaceId: string;
} | {
    kind: "events";
    events: Array<{
        directory: string;
        event: SyncEvent;
    }>;
};
/**
 * Sorts one raw stream payload: an isolated-space announcement for its owner,
 * or the sync events it translates to. Dispatches on `type`, so each payload
 * is validated only against the schema its type names.
 */
export declare function classifyStreamPayload(payload: unknown, frameDirectory: string | undefined): ClassifiedStreamPayload;
export declare function createEventPipeline(input: EventPipelineInput): EventPipeline;
export {};
