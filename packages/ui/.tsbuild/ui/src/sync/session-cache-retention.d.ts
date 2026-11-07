import type { ChildStoreManager } from "./child-store";
import type { SessionMessageTarget } from "./session-message-loader";
type RetentionOptions = {
    limit: number;
    idleTtlMs?: number;
    isCurrent: () => boolean;
    isViewed: (target: SessionMessageTarget) => boolean;
    isProtected: (target: SessionMessageTarget) => boolean;
    evict: (target: SessionMessageTarget) => void;
};
/**
 * Whole-session eviction, never partial trimming. A cached history is either
 * fully present or gone. Settled sessions nobody is looking at are dropped
 * after an idle grace period, so a quick return needs no request; the count
 * limit is a safety net that evicts the least recently visited session first.
 */
export declare class SessionCacheRetention {
    private readonly stores;
    private readonly options;
    private readonly directories;
    private readonly pending;
    private readonly unsubscribeRegistry;
    private readonly idleTtlMs;
    private disposed;
    constructor(stores: ChildStoreManager, options: RetentionOptions);
    touch(target: SessionMessageTarget): void;
    admitPrefetch(target: SessionMessageTarget): boolean;
    schedule(directory: string): void;
    dispose(): void;
    private detach;
    private attach;
    private clean;
    private armTimer;
}
export {};
