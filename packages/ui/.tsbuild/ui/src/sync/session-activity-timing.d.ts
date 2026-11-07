type SessionActivityPhase = 'active' | 'settled';
export type SessionActivityTimingMutation = {
    type: 'observe';
    sessionId: string;
    phase: SessionActivityPhase;
} | {
    type: 'remove';
    sessionId: string;
};
type SessionActivityTimingState = {
    startedAt: ReadonlyMap<string, number>;
    settledMs: ReadonlyMap<string, number>;
};
export declare const useSessionActivityTimingStore: import("zustand").UseBoundStore<import("zustand").StoreApi<SessionActivityTimingState>>;
/**
 * Event-driven path: one session changed phase, live. Busy repeats throughout a
 * turn and carries no boundary; idle/error fire once and end it, which is why
 * only settling here retires the persisted record.
 */
export declare const observeSessionActivityTiming: (sessionId: string, phase: SessionActivityPhase) => void;
export declare const applySessionActivityTimingMutations: (mutations: readonly SessionActivityTimingMutation[]) => void;
/**
 * Authoritative path: a `/session/status` snapshot for one directory. Sessions
 * the snapshot covers but does not report active stop their live counters —
 * that is what recovers a turn whose end event this client missed — but their
 * persisted records survive, because a snapshot that cannot yet see a session
 * looks identical to one whose turn is over.
 */
export declare const reconcileSessionActivityTiming: (activeSessionIds: ReadonlySet<string>, isCoveredBySnapshot: (sessionId: string) => boolean) => void;
export declare const removeSessionActivityTiming: (sessionId: string) => void;
/**
 * Drops in-memory state and the cached restored-start snapshot — i.e. treats
 * what follows as a fresh page load. Called on a runtime switch, where the
 * previous instance's turns are no longer ours, and by tests. `pageLoadAt`
 * overrides the navigation-start reference so tests can place a load in the
 * past (slow bootstrap, expired window).
 */
export declare const resetSessionActivityTiming: (options?: {
    pageLoadAt?: number;
}) => void;
export declare const useSessionActivityStartedAt: (sessionId: string) => number | undefined;
export declare const useSessionSettledDurationMs: (sessionId: string) => number | undefined;
/**
 * Whether a duration exists to render, without subscribing the caller to the
 * value itself — a row uses this to decide between the counter and its normal
 * metadata, and must not re-render every tick to do so.
 */
export declare const useHasSessionActivityDuration: (sessionId: string, running: boolean) => boolean;
export {};
