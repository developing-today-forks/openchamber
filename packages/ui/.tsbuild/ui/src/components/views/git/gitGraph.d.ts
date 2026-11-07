import type { GitLogEntry } from '@/lib/api/types';
type LaneColor = string;
/**
 * Describes one visible line/curve in a commit row's SVG.
 * Each segment covers the FULL row height (y=0 to y=100%).
 *
 * Types:
 *  - 'passing'    : straight vertical line, lane active but this row is not its commit
 *  - 'commit-lane': straight vertical line for this commit's lane (has both incoming and outgoing)
 *  - 'top-stub'   : line from y=0 to dot-y only (branch HEAD — no child above)
 *  - 'bottom-stub': line from dot-y to y=100% only (root commit — nothing above)
 *  - 'branch-out' : bezier from (dot-x, dot-y) to (toLane-x, 100%) — new parent lane opens
 *  - 'merge-in'   : bezier from (fromLane-x, 0) to (dot-x, dot-y) — lane converges here
 */
interface ConnectorSegment {
    fromLane: number;
    toLane: number;
    color: LaneColor;
    type: 'passing' | 'commit-lane' | 'top-stub' | 'bottom-stub' | 'branch-out' | 'merge-in';
}
export interface LanedCommit {
    commit: GitLogEntry;
    lane: number;
    color: LaneColor;
    /** All visible line segments in this row's height. */
    connectors: ConnectorSegment[];
}
/**
 * Assigns visual lanes to a list of commits (newest-first order).
 *
 * Greedy lane assignment algorithm (O(n × lanes) where lanes = max concurrent active branches):
 * - activeLanes[i] holds the hash expected next on lane i (or null if free)
 * - Each commit takes the lane that was waiting for it, or the next free lane
 * - Merge commits open new lanes for additional parents
 * - Connectors describe ALL visible lines in each row (both above and below the dot)
 */
export declare function assignLanes(commits: GitLogEntry[]): LanedCommit[];
export {};
