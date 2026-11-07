import type { SyncEvent } from '@/lib/opencode/events';
import type { Session, SessionStatus } from '@/lib/opencode/model';
type GlobalSessionStatusEntry = {
    status: SessionStatus;
    directory: string;
};
type GlobalSessionStatusState = {
    /** Last explicitly observed activity/outcome. Bounded memory, never persisted. */
    observedById: ReadonlyMap<string, {
        directory: string;
        outcome: 'completed' | 'failed' | null;
    }>;
    statusById: Map<string, GlobalSessionStatusEntry>;
    activeSessionIds: ReadonlySet<string>;
};
export declare const useGlobalSessionStatusStore: import("zustand").UseBoundStore<import("zustand").StoreApi<GlobalSessionStatusState>>;
/**
 * Replaces the status map wholesale and derives active membership from it.
 * This is the ONE sanctioned way to swap statusById from outside the event
 * reducers (runtime switch, tests) — previously a setState monkeypatch
 * derived membership for arbitrary callers, which silently trusted any
 * caller passing both fields to keep them consistent.
 */
export declare const replaceGlobalSessionStatusById: (statusById: Map<string, GlobalSessionStatusEntry>) => void;
type SessionParentResolver = (sessionId: string) => string | undefined;
export declare const setSessionParentResolver: (resolver: SessionParentResolver) => void;
/** True when a subagent anywhere below the session is running. */
export declare const hasActiveSubagent: (sessionId: string, activeSessionIds: ReadonlySet<string>, resolveParentId?: SessionParentResolver) => boolean;
/**
 * What keeps the session's turn open, or null when nothing does: the session
 * runs itself, or it idles while a subagent below it runs, or while a command
 * it started in the background runs. The session's own run wins; a pause with
 * both kinds of background work reports the subagent.
 */
type SessionTurnActivity = 'running' | 'subagent' | 'shell';
export declare const useSessionTurnActivity: (sessionId: string) => SessionTurnActivity | null;
export declare const getDirectoryOwnedSessionIds: (directory: string, sessions: readonly Session[]) => string[];
export declare const applyGlobalSessionStatusEvents: (directory: string, payloads: readonly SyncEvent[]) => void;
export declare const applyGlobalSessionStatusEvent: (directory: string, payload: SyncEvent) => void;
export declare const applyGlobalSessionStatusSnapshot: (rawDirectory: string, raw: Record<string, SessionStatus>, knownSessionIds?: Iterable<string>) => void;
export {};
