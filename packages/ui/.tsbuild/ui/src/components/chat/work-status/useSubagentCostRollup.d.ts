import type { Session } from '@/lib/opencode/model';
export type SubagentCostRollup = {
    totalCost: number | null;
    /** The root session's own spend, excluding every subagent. */
    ownCost: number;
    /** Everything the subagents cost between them: `totalCost - ownCost`. */
    subagentCost: number;
    subagentCount: number;
};
/**
 * Pure core of useSubagentCostRollup, kept separate so it can be unit-tested
 * directly against a plain session array instead of rendering the hook.
 */
export declare function computeRollup(liveSessions: Session[], sessionId: string | null): SubagentCostRollup;
/**
 * Own cost plus every descendant subagent's cost, recursively summed, for a
 * given root session. Reads the same `useAllLiveSessions()` subscription
 * WorkStatusSubagentsSection already holds — no new store subscription.
 */
export declare function useSubagentCostRollup(sessionId: string | null): SubagentCostRollup;
