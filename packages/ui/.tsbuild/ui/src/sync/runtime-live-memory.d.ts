import type { SessionStatus } from "@/lib/opencode/model";
export declare const LIVE_STATUS_TTL_MS = 15000;
type RuntimeLiveStatus = {
    runtimeKey: string;
    directory: string;
    sessionId: string;
    status: SessionStatus;
    expiresAt: number;
};
export declare function rememberRuntimeLiveStatus(params: {
    runtimeKey: string;
    directory: string | null | undefined;
    sessionId: string | null | undefined;
    status: SessionStatus | null | undefined;
}): void;
export declare function getRuntimeLiveStatusSeed(runtimeKey: string, directory: string): RuntimeLiveStatus | null;
export {};
