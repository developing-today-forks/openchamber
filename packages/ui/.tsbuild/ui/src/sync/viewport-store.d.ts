/**
 * Viewport Store — per-session scroll anchors, streaming state, memory.
 * Extracted from session-ui-store for subscription isolation.
 */
type SessionMemoryState = {
    viewportAnchor: number;
    /** Last known scrollbar pixel state — saved on every scroll event. */
    scrollPosition?: {
        scrollTop: number;
        scrollHeight: number;
        clientHeight: number;
    };
    isStreaming: boolean;
    streamStartTime?: number;
    lastAccessedAt: number;
    backgroundMessageCount: number;
    loadedTurnCount?: number;
    hasMoreAbove?: boolean;
    hasMoreTurnsAbove?: boolean;
    historyLoading?: boolean;
    historyComplete?: boolean;
    historyLimit?: number;
    totalAvailableMessages?: number;
    streamingCooldownUntil?: number;
    isZombie?: boolean;
    lastUserMessageAt?: number;
};
type ViewportState = {
    sessionMemoryState: Map<string, SessionMemoryState>;
    isSyncing: boolean;
    updateViewportAnchor: (sessionId: string, anchor: number, scrollPosition?: SessionMemoryState['scrollPosition']) => void;
};
export declare const viewportSessionKey: (sessionId: string, runtimeKey?: string) => string;
export declare const getViewportSessionMemory: (sessionId: string) => SessionMemoryState | undefined;
export declare const useViewportStore: import("zustand").UseBoundStore<import("zustand").StoreApi<ViewportState>>;
export {};
