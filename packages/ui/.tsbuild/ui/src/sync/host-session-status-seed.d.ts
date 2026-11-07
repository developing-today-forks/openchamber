import type { SyncEvent } from '@/lib/opencode/events';
import type { HostSessionStatusSnapshot } from '@/lib/opencode/session-status';
export declare const HOST_STATUS_SEED_MAX_AGE_MS: number;
type SeedDependencies = {
    isKnown: (sessionId: string) => boolean;
    resolveDirectory: (sessionId: string) => string | null;
};
/**
 * Turns the host snapshot into per-directory `session.status` events for the
 * sessions the client has no live observation of. Retry collapses to busy:
 * the host keeps no attempt details, and the next live event restores them.
 */
export declare const buildHostStatusSeedEvents: (snapshot: HostSessionStatusSnapshot, deps: SeedDependencies, maxAgeMs?: number) => Map<string, SyncEvent[]>;
/** Fetches the host map once and seeds unobserved busy sessions. Coalesces overlapping calls. */
export declare const seedGlobalSessionStatusFromHost: () => Promise<void>;
export {};
