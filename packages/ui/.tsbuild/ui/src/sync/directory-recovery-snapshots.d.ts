import type { SyncEvent } from "@/lib/opencode/events";
import type { FormRequest, PermissionRequest } from "@/lib/opencode/model";
import type { State } from "./types";
export type DirectoryRecoverySource = {
    getState: () => State;
};
export declare function recordDirectoryRecoveryEvent(source: DirectoryRecoverySource, event: SyncEvent): void;
export declare function readDirectoryStatusSnapshot(source: DirectoryRecoverySource, read: () => Promise<State["session_status"]>): Promise<State["session_status"]>;
export declare const readDirectoryPermissionSnapshot: (source: DirectoryRecoverySource, read: () => Promise<PermissionRequest[]>) => Promise<Record<string, import("@opencode/client").PermissionRequest[]>>;
export declare const readDirectoryFormSnapshot: (source: DirectoryRecoverySource, read: () => Promise<FormRequest[]>) => Promise<Record<string, import("@opencode/client").FormInfo[]>>;
