import type { Session } from '@/lib/opencode/model';
import { type LaneDiffStat } from './laneData';
import { type MultiRunSummary } from './runs';
export type FusionJudge = {
    providerID: string;
    modelID: string;
    variant?: string;
    agent?: string;
    /** Display name for the fusion session title. */
    modelName?: string;
    /** Context window of the judge model, when the provider reports it. */
    contextLimit?: number;
};
export type FusionMode = 'answers' | 'code';
export declare class NoFusionOutputsError extends Error {
    constructor();
}
/** Selected lanes whose worktrees hold changes and who all have one: that is a code fusion. */
export declare const fusionModeFor: (stats: ReadonlyArray<{
    hasWorktree: boolean;
    diff: LaneDiffStat | null;
}>) => FusionMode;
/** Whether every diff together fits in the inline budget of the judge's context window. */
export declare const shouldInlineDiffs: (changedLines: number, contextLimit: number | undefined) => boolean;
/**
 * Starts a fusion session for the selected lanes and opens it. Answers mode
 * fuses the lanes' final replies in the project directory. Code mode snapshots
 * every lane, gives the judge its own worktree at the lanes' starting commit
 * and a manifest (answers, diffstats, snapshot commits), inlining the diffs
 * only when they are small next to the judge's context window.
 */
export declare function startRunFusion(input: {
    run: MultiRunSummary;
    sourceIds: readonly string[];
    judge: FusionJudge;
    sessionById: ReadonlyMap<string, Session>;
}): Promise<{
    sessionId: string;
    directory: string;
    mode: FusionMode;
}>;
