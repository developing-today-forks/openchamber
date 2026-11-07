import type { Message, Part } from "@/lib/opencode/model";
import type { SessionMaterializationReason } from "./event-reducer";
export type MaterializedMessageRecord = {
    info: Message;
    parts: Part[];
};
export type MaterializedState = {
    message: Record<string, Message[]>;
    part: Record<string, Part[]>;
};
export type MaterializeSessionSnapshotsOptions = {
    skipPartTypes?: ReadonlySet<string>;
    mode?: "merge" | "prepend";
};
export type MaterializeSessionSnapshotsResult = {
    message: Record<string, Message[]>;
    part: Record<string, Part[]>;
    messages: Message[];
    messagesChanged: boolean;
    partsChanged: boolean;
};
export type SessionMaterializationStatus = {
    hasMessages: boolean;
    renderable: boolean;
    missingPartMessageIDs: string[];
};
export type SessionMaterializationRequest = {
    reason: SessionMaterializationReason;
    messageID?: string;
    partID?: string;
};
export declare const getSessionMaterializationRequestKey: (runtimeKey: string, directory: string, sessionID: string) => string;
export declare function isSessionMaterializationStillNeeded(state: MaterializedState, sessionID: string, request: SessionMaterializationRequest): boolean;
export declare function getStaleRunningToolMessageID(state: MaterializedState, sessionID: string): string | undefined;
export declare function materializeSessionSnapshots(state: MaterializedState, sessionID: string, records: MaterializedMessageRecord[], options?: MaterializeSessionSnapshotsOptions): MaterializeSessionSnapshotsResult;
export declare function getSessionMaterializationStatus(state: MaterializedState, sessionID: string): SessionMaterializationStatus;
