import type { SyncEvent } from "@/lib/opencode/events";
import type { State } from "./types";
export type GlobalEventResult = {
    type: "refresh";
} | {
    type: "catalog";
    kind: Extract<SyncEvent, {
        type: "catalog.updated";
    }>["properties"]["kind"];
} | null;
export type SessionMaterializationReason = "missing-owning-message" | "orphan-delta" | "missing-delta-part" | "empty-assistant-message" | "child-session-idle" | "child-session-discovered" | "ensure-session-messages" | "stream-reconnect" | "transport-switch" | "stale-status-resync" | "settled-running-tool";
export type DirectoryEventResult = boolean | {
    changed: boolean;
    materialization: {
        type: "incomplete-session-snapshot";
        reason: SessionMaterializationReason;
        sessionID?: string;
        messageID: string;
        partID?: string;
    };
};
export declare function reduceGlobalEvent(event: SyncEvent): GlobalEventResult;
export declare function applyDirectoryEvent(draft: State, event: SyncEvent, callbacks?: {
    onRefresh?: (directory: string) => void;
    onLoadMcp?: () => void;
    onCatalogUpdated?: (kind: Extract<SyncEvent, {
        type: "catalog.updated";
    }>["properties"]["kind"]) => void;
}): DirectoryEventResult;
