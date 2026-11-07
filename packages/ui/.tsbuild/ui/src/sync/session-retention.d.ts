import type { Session } from "@/lib/opencode/model";
import { type SessionRetentionAction } from '@/stores/useUIStore';
export declare const RETENTION_KEEP_RECENT = 5;
export declare const RETENTION_INTERVAL_MS = 86400000;
/**
 * Sessions the user asked to keep: pinned or in the In work block. The pin is
 * read from the session itself and from the pinned set, which also holds a
 * pin clicked a moment ago and this device's older local pins that have not
 * reached the server yet.
 */
export declare const isSessionKeptByUser: (session: Session, pinnedIds?: Set<string>) => boolean;
type CandidateOptions = {
    sessions: readonly Session[];
    currentSessionId: string | null;
    cutoffDays: number;
    action: SessionRetentionAction;
    onlyArchived?: boolean;
    activeSessionIds: ReadonlySet<string>;
    isKept?: (session: Session) => boolean;
    now?: number;
};
/** The unselected scope stays protected, including from cascading parent deletion. */
export declare function buildSessionRetentionCandidates({ sessions, currentSessionId, cutoffDays, action, onlyArchived, activeSessionIds, isKept, now, }: CandidateOptions): string[];
type SessionRetentionResult = {
    completedIds: string[];
    failedIds: string[];
    action: SessionRetentionAction;
    skippedReason?: 'disabled' | 'loading' | 'cooldown' | 'no-candidates' | 'running' | 'runtime-changed';
};
export declare const useSessionRetentionRunStore: import("zustand").UseBoundStore<import("zustand").StoreApi<{
    isRunning: boolean;
}>>;
export declare function runSessionRetentionCleanup({ force }?: {
    force?: boolean | undefined;
}): Promise<SessionRetentionResult>;
export {};
