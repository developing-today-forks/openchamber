import type { McpServerStatus } from '@/lib/opencode/model';
type McpStatusMap = Record<string, McpServerStatus>;
type McpRuntimeDiagnostic = {
    status: 'failed';
    error: string;
};
type McpRuntimeDiagnosticMap = Record<string, McpRuntimeDiagnostic>;
type McpHealth = {
    connected: number;
    total: number;
    hasFailed: boolean;
    hasAuthRequired: boolean;
};
export declare const computeMcpHealth: (status: McpStatusMap | null | undefined) => McpHealth;
type RefreshOptions = {
    directory?: string | null;
    silent?: boolean;
};
type TestConnectionResult = {
    status?: McpServerStatus;
    error?: string;
    warning?: string;
};
interface McpStore {
    byDirectory: Record<string, McpStatusMap>;
    diagnosticsByDirectory: Record<string, McpRuntimeDiagnosticMap>;
    loadingKeys: Record<string, boolean>;
    lastErrorKeys: Record<string, string | null>;
    /** When each directory's status was last fetched successfully. */
    refreshedAtKeys: Record<string, number>;
    getStatusForDirectory: (directory?: string | null) => McpStatusMap;
    getDiagnosticForDirectory: (directory?: string | null) => McpRuntimeDiagnosticMap;
    getErrorForDirectory: (directory?: string | null) => string | null;
    refresh: (options?: RefreshOptions) => Promise<void>;
    /**
     * Refresh only when the directory has no status yet or the last successful
     * fetch is older than `maxAgeMs`. Mount-time consumers use this so a panel
     * that remounts on every session switch does not refetch on every switch.
     */
    ensureFresh: (options: RefreshOptions & {
        maxAgeMs: number;
    }) => Promise<void>;
    /**
     * Re-read a directory whose status is already held, after OpenCode announced
     * a change there. A directory nobody asked about is left alone: reading it
     * would make OpenCode start it, MCP servers included.
     */
    refreshIfHeld: (directory: string) => Promise<void>;
    /**
     * OpenCode stopped this directory's servers. The held status describes
     * servers that are gone, and keeping it would make the shutdown's own
     * announcements re-read the directory, which starts it again. A surface that
     * shows the directory later reads it afresh.
     */
    forgetDirectory: (directory: string) => void;
    connect: (name: string, directory?: string | null) => Promise<void>;
    disconnect: (name: string, directory?: string | null) => Promise<void>;
    testConnection: (name: string, directory?: string | null) => Promise<TestConnectionResult>;
    /**
     * MCP status is keyed by directory alone, and two instances can hold the same
     * project path — so on a switch the previous instance's servers would be
     * reported for the new one. Drop everything and let consumers re-ask.
     */
    resetForRuntimeSwitch: () => void;
}
export declare const useMcpStore: import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<McpStore>, "devtools" | "setState"> & {
    setState(partial: McpStore | Partial<McpStore> | ((state: McpStore) => McpStore | Partial<McpStore>), replace?: false | undefined, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): void;
    setState(state: McpStore | ((state: McpStore) => McpStore), replace: true, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): void;
    devtools: {
        cleanup: () => void;
    };
}>;
export {};
