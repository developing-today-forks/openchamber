import { runSessionRetentionCleanup } from '@/sync/session-retention';
type CleanupOptions = {
    autoRun?: boolean;
    enabled?: boolean;
};
export declare const useSessionAutoCleanup: ({ autoRun, enabled }?: CleanupOptions) => {
    candidates: string[];
    isRunning: boolean;
    status: "error" | "idle" | "loading" | "ready";
    runCleanup: typeof runSessionRetentionCleanup;
    keepRecentCount: number;
    action: import("@/stores/useUIStore").SessionRetentionAction;
};
export {};
