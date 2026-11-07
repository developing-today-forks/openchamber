import type { Session } from '@/lib/opencode/model';
export declare const formatCost: (cost: number) => string;
/**
 * Groups a flat live-session list by parentID. One pass, O(n). Sessions
 * without a parentID (roots) are simply absent as keys — callers look up a
 * specific id's children via `.get(id) ?? []`.
 */
export declare function buildChildrenIndex(sessions: Session[]): Map<string, Session[]>;
/**
 * Own cost plus every descendant's cost, recursively. Cycle-guarded with a
 * visited set: parentID should form a tree, but this does not trust that
 * invariant blindly (mirrors opencode-session-cost's src/cost.ts).
 */
export declare function computeSubtreeCost(id: string, sessionsById: Map<string, Session>, childrenByParent: Map<string, Session[]>, visited?: Set<string>): number;
