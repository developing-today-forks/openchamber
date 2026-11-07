/**
 * Shared concurrency gate for background network traffic.
 *
 * The browser allows only ~6 concurrent HTTP/1.1 connections per origin, and
 * every runtime (web, desktop loopback, VS Code, mobile host) funnels API
 * traffic through one origin. During startup many subsystems fan out at once —
 * per-directory session/status polls, git checks per project and worktree,
 * command/skill discovery, global session pages — and several of those calls
 * are slow while the OpenCode server is still warming up. Uncapped, they
 * occupy the whole connection pool and interactive traffic (opening a session
 * and fetching its messages) queues for seconds behind them.
 *
 * Session pages use {@link runSessionListNetworkTask}; other poll/prefetch reads
 * and directory initialization use {@link runBackgroundNetworkTask}. The lanes
 * share a fixed aggregate budget, with reserved list capacity so a slow Git or
 * skills request cannot block an empty worktree's session list. GitHub PR
 * status also takes a background slot, in addition to its own fan-out cap.
 * An independent PR budget used to overfill the browser's pool alongside
 * three persistent SSE connections, despite each limiter looking bounded.
 */
export declare const runBackgroundNetworkTask: <T>(task: () => Promise<T>, priority?: "normal" | "active-session") => Promise<T>;
export declare const runSessionListNetworkTask: <T>(task: () => Promise<T>) => Promise<T>;
/** Test-only visibility into both lanes. */
export declare const getBackgroundNetworkState: () => {
    active: number;
    waiting: number;
    limit: number;
    sessionLists: {
        active: number;
        waiting: number;
        limit: number;
    };
};
