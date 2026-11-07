import { z } from 'zod';
/**
 * Per-session warming, owned by the server (`lib/session-warming`). The server
 * keeps the chosen sessions' prompt cache warm for the chosen duration after each turn;
 * this store mirrors its snapshot for the toggles and the countdown.
 */
export declare const sessionWarmingSnapshotSchema: z.ZodObject<{
    revision: z.ZodNumber;
    enabled: z.ZodBoolean;
    minutes: z.ZodNumber;
    sessions: z.ZodArray<z.ZodObject<{
        sessionId: z.ZodString;
        warmUntil: z.ZodNullable<z.ZodNumber>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type SessionWarmingSnapshot = z.infer<typeof sessionWarmingSnapshotSchema>;
/** How OpenChamber keeps idle sessions warm: not at all, every session (OpenCode's config), or the chosen ones. */
export type SessionWarmingMode = 'off' | 'all' | 'session';
/** The warm durations Settings offers, in minutes; the server accepts only these. */
export declare const WARMING_DURATION_STEPS: readonly [30, 60, 120, 180];
type SessionWarmingState = {
    /**
     * `unavailable` when the server could not be read before any snapshot came,
     * an older server without per-session warming among the cases: Settings then
     * offers only OpenCode's switch for every session.
     */
    status: 'loading' | 'ready' | 'unavailable';
    /** Null until the first snapshot arrives. */
    revision: number | null;
    /** Per-session warming is on: the session toggles are offered. */
    enabled: boolean;
    /** How long a chosen session stays warm after a reply. */
    minutes: number;
    /** Warmed session id → end of its warm window, null while a turn runs or before the first one ends. */
    sessions: Record<string, number | null>;
    applySnapshot: (snapshot: SessionWarmingSnapshot) => void;
    /** `isCurrent` drops an answer that arrives after a runtime switch. */
    refresh: (isCurrent?: () => boolean) => Promise<void>;
    setMode: (mode: SessionWarmingMode) => Promise<void>;
    /** `all` writes OpenCode's warm duration, `session` the chosen sessions' one. */
    setMinutes: (scope: 'all' | 'session', minutes: number) => Promise<void>;
    setSessionWarm: (sessionId: string, directory: string, warm: boolean) => Promise<void>;
    reset: () => void;
};
export declare const useSessionWarmingStore: import("zustand").UseBoundStore<import("zustand").StoreApi<SessionWarmingState>>;
/**
 * The session's warmth: `undefined` when it is not warmed, `null` while it is
 * warmed but its window has not started, else the end of its warm window.
 */
export declare const useSessionWarmUntil: (sessionId: string | null) => number | null | undefined;
export {};
