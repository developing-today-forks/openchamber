import type { Session } from '@/lib/opencode/model';
import { type MultiRunIndex, type MultiRunSummary } from './runs';
export type MultiRunSessions = {
    index: MultiRunIndex;
    sessionById: ReadonlyMap<string, Session>;
};
/**
 * Runs across every project, from the global session cache overlaid with the
 * live per-directory records (fresher metadata and timestamps). Surfaces that
 * are not the sidebar (overview, tabs, mobile sheet, auto-fusion) share this.
 */
export declare function useMultiRunSessions(): MultiRunSessions;
/**
 * Title of a run, read straight from the global session cache. A primitive
 * result keeps always-mounted chrome (the header) from re-rendering on
 * unrelated session updates; with no run key it does no work.
 */
export declare function useMultiRunTitle(runKey: string | null): string | null;
/**
 * Ids of every active member of the run `sessionId` belongs to, or an empty
 * list. Joined into one string inside the selector so the caller re-renders
 * only when membership changes.
 */
export declare function useMultiRunMemberIds(sessionId: string | null): readonly string[];
export type MultiRunLookup = {
    run: MultiRunSummary | null;
    sessionById: ReadonlyMap<string, Session>;
};
export declare function useMultiRun(runKey: string | null): MultiRunLookup;
