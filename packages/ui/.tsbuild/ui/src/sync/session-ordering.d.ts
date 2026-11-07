import type { Session } from '@/lib/opencode/model';
export type SessionActivityPhase = 'active' | 'settled';
export type SessionOrderingMutation = {
    type: 'observe';
    sessionId: string;
    phase: SessionActivityPhase;
} | {
    type: 'remove';
    sessionId: string;
};
type SessionOrderingState = {
    rankById: Map<string, number>;
};
export declare const EMPTY_SESSION_ORDER_RANKS: ReadonlyMap<string, number>;
export declare const useSessionOrderingStore: import("zustand").UseBoundStore<import("zustand").StoreApi<SessionOrderingState>>;
/** Promote a confirmed restore without deriving or changing session activity. */
export declare const promoteRestoredSessionOrdering: (sessionId: string) => void;
export declare const observeSessionActivityEvent: (sessionId: string, phase: SessionActivityPhase) => void;
export declare const applySessionOrderingMutations: (mutations: readonly SessionOrderingMutation[]) => void;
export declare const reconcileSessionActivitySnapshot: (activeSessionIds: Iterable<string>, knownSessionIds: Iterable<string>) => void;
export declare const removeSessionOrdering: (sessionId: string) => void;
export declare const resetSessionOrdering: () => void;
/**
 * When the session last had a conversation. `time.idle` moves only when a turn
 * ends; `time.updated` also moves on title and metadata writes, which must not
 * lift a session nobody touched. Sessions migrated from 1.x have no `idle`
 * until their first 2.x turn, so they fall back to `updated`.
 */
export declare const getSessionActivityTime: (session: Session) => number;
/**
 * Raise cached baselines to the sessions' current authoritative timestamps.
 *
 * The frozen baseline keeps live metadata churn from reordering an open list,
 * but a client that slept through a session's whole active→settled cycle never
 * saw the transition that would have promoted its live rank — so its stale
 * baseline pins it in place forever. Call this when an authoritative session
 * SNAPSHOT arrives (global refresh); monotonic, so it can never demote.
 */
export declare const raiseSessionOrderingBaselines: (sessions: Iterable<Session>) => void;
export declare const getSessionLifecycleOrderValue: (session: Session, rankById: ReadonlyMap<string, number>, pinned?: boolean) => number;
export declare const compareSessionsByLifecycleOrder: (left: Session, right: Session, pinnedSessionIds: Set<string>, rankById: ReadonlyMap<string, number>) => number;
export declare const orderSessionsByLifecycleScopes: (sessions: Session[], pinnedSessionIds: Set<string>, rankById: ReadonlyMap<string, number>, hierarchy?: {
    rootIds: readonly string[];
    childrenByParentId: ReadonlyMap<string, readonly string[]>;
}) => Session[];
export {};
