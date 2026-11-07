import type { PermissionRequest, Session } from "@/lib/opencode/model";
type Dependencies = {
    getPolicy: () => Record<string, boolean>;
    getSessions: () => ReadonlyMap<string, Session>;
    getSession: (sessionId: string, directory?: string) => Promise<Session>;
    getKnownPendingPermissions?: (directory?: string) => PermissionRequest[];
    listPendingPermissions: (directory?: string) => Promise<PermissionRequest[]>;
    getPermissionState: (sessionId: string, requestId: string, directory?: string) => Promise<"ok" | "resolved" | "unknown">;
    reply: (sessionId: string, requestId: string, directory?: string) => Promise<void>;
    wait: (delayMs: number) => Promise<void>;
};
export declare function createVSCodePermissionAutoAcceptRuntime(dependencies: Dependencies): {
    processPermission: (permission: PermissionRequest, directory?: string, options?: {
        verifyPending?: boolean;
    }) => Promise<boolean>;
    reconcilePending: (directory?: string) => Promise<void>;
};
export declare const processVSCodePermissionAutoAccept: (permission: PermissionRequest, directory?: string) => Promise<boolean>;
export declare const processVSCodeReconciledPermissionAutoAccept: (permission: PermissionRequest, directory?: string) => Promise<boolean>;
export declare const reconcileVSCodePendingPermissions: (directory?: string) => Promise<void>;
export {};
