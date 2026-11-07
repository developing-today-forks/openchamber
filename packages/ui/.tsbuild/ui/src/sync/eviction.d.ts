import type { DisposeCheck, EvictPlan, State } from "./types";
/**
 * Returns true when the directory's child store holds at least one pending
 * blocking request — a form awaiting an answer or a permission awaiting
 * approval. Such directories must never be evicted, otherwise the SSE-routed
 * request data is lost and the user can never satisfy the agent.
 *
 * Tracks the same `state.form` / `state.permission` shape that
 * {@link bootstrapDirectory} re-hydrates on a fresh `ensureChild` call —
 * an empty record key (e.g. after a `form.settled` event clears the
 * array) is treated as "no pending requests" so a fully resolved directory
 * remains a normal eviction candidate.
 */
export declare function hasPendingBlockingRequests(state: State | undefined): boolean;
export declare function pickDirectoriesToEvict(input: EvictPlan): string[];
export declare function canDisposeDirectory(input: DisposeCheck): boolean;
