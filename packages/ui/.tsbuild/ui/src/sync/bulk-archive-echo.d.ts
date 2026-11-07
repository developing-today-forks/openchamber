import type { SyncEvent } from "@/lib/opencode/events";
export declare const registerBulkArchiveEchoes: (runtimeKey: string, sessions: Iterable<{
    id: string;
    archivedAt: number;
}>, now?: number) => void;
export declare const releaseBulkArchiveEchoes: (runtimeKey: string, sessionIds: Iterable<string>) => void;
export declare const shouldConsumeBulkArchiveEcho: (event: SyncEvent, runtimeKey: string, now?: number) => boolean;
