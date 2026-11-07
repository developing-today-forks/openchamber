import type { Metadata } from '@/lib/opencode/model';
import { type GoalWriterChoice } from '@/lib/goalWriter';
import { type SessionGoalPayload, type SessionGoalStatus } from '@/lib/sessionGoalMetadata';
export interface SetSessionGoalInput {
    objective: string;
    tokenBudget: number | null;
    /**
     * Run the objective through the goal writer first ("rewrite every goal").
     * `writer` is a model and effort picked for this goal and wins over
     * Settings; otherwise the writer uses the Settings model, else the
     * session's (`providerID`/`modelID`). Null keeps the objective as written.
     */
    rewrite?: {
        providerID?: string | null;
        modelID?: string | null;
        writer?: GoalWriterChoice | null;
    } | null;
    /** Keep an objective longer than the limit whole instead of condensing it. */
    ignoreLimit?: boolean;
    /**
     * Start an idle session's next turn right away (`statusReason: 'resumed'`).
     * False when a message sent with the change starts that turn, so the check
     * does not first judge the last reply against the new objective.
     */
    kickoff?: boolean;
    /** Cancels the save up to the moment anything is written. */
    signal?: AbortSignal;
}
export type SetSessionGoalResult = 
/** `rewrittenSpec` is the spec the goal writer made the objective, or null when it is the text as given. */
{
    outcome: 'saved';
    rewrittenSpec: string | null;
}
/** The goal changed elsewhere after this edit began (completed, paused, replaced); nothing was saved. */
 | {
    outcome: 'changed';
};
/** A short content hash identifying one saved objective text (FNV-1a). */
export declare const goalObjectiveRevision: (text: string) => string;
/**
 * The goal record a save writes: the edited goal in place (id and usage kept,
 * reactivated, stale audit state cleared), a new goal, or `changed` when the
 * stored goal is no longer the one an edit started from.
 */
export declare const nextGoalRecord: (input: {
    currentGoal: Metadata | null;
    /** The goal an edit started from; null, or a completed goal, creates a new one. */
    existing: SessionGoalPayload | null;
    objective: string;
    objectiveFile: boolean;
    /** Revision of the full objective text being saved (see goalObjectiveRevision). */
    objectiveRevision: string;
    ignoreLimit: boolean;
    tokenBudget: number | null;
    /** `resumed` starts an idle session's next turn at once. */
    kickoff: boolean;
    now: number;
    newId: string;
}) => {
    changed: true;
} | {
    changed: false;
    record: Metadata;
};
/**
 * Create a new goal (fresh id resets accounting) or edit the existing one
 * (id and usage counters preserved).
 *
 * An edit is saved only over the goal it started from: a rewrite can take
 * minutes, and in that time the check may complete the goal, the user may
 * pause it, or another window may replace it. Then nothing is written and the
 * result says so. The stored goal is read before the objective file is
 * written and again inside the metadata write. To keep an aborted save from
 * clobbering a change made elsewhere in between, the objective file is
 * snapshotted just before it is overwritten and restored when the metadata
 * write aborts, so the surviving goal keeps the objective text its stored
 * objectiveRevision describes (#1372).
 */
export declare function setSessionGoal(sessionId: string, directory: string | undefined, input: SetSessionGoalInput, existing: SessionGoalPayload | null): Promise<SetSessionGoalResult>;
export declare function setSessionGoalStatus(sessionId: string, directory: string | undefined, status: Extract<SessionGoalStatus, 'active' | 'paused' | 'complete'>): Promise<void>;
export declare function clearSessionGoal(sessionId: string, directory: string | undefined): Promise<void>;
