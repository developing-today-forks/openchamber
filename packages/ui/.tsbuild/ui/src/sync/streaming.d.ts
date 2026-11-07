/**
 * Streaming lifecycle tracking.
 *
 * Derives streaming state from the sync child store's session_status and
 * message/part updates. Components read this to know which messages are
 * currently streaming and their lifecycle phase.
 */
import type { State } from "./types";
type StreamPhase = "streaming" | "cooldown" | "completed";
type MessageStreamState = {
    phase: StreamPhase;
    startedAt: number;
    lastUpdateAt: number;
    completedAt?: number;
};
type StreamingStore = {
    /** Currently streaming message per session */
    streamingMessageIds: Map<string, string | null>;
    /** Lifecycle phase per message */
    messageStreamStates: Map<string, MessageStreamState>;
};
export declare const useStreamingStore: import("zustand").UseBoundStore<import("zustand").StoreApi<StreamingStore>>;
export declare function resetStreamingState(): void;
export declare function updateStreamingState(state: State, now?: number): void;
export declare function updateChangedStreamingSessions(state: State, previous: State, now?: number): void;
export declare function touchStreamingSession(sessionID: string, now?: number): void;
export {};
