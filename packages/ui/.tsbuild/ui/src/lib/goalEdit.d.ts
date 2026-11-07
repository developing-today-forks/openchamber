import type { SessionGoalPayload } from '@/lib/sessionGoalMetadata';
import { type GoalEditDraft } from '@/stores/useGoalEditStore';
export interface StartGoalEditInput {
    sessionId: string;
    directory: string | undefined;
    draft: GoalEditDraft;
    /** The goal the edit started from; null creates a new goal. */
    existing: SessionGoalPayload | null;
    /** Run the objective through the goal writer ("rewrite every goal"). */
    rewrite: boolean;
    /** The session's model: the writer falls back to it, and the message goes out on it. */
    sessionModel: {
        providerID: string;
        modelID: string;
    } | null;
    /** Shown on the card while the writer works, such as `anthropic/claude · low`. */
    writerLabel: string | null;
}
export declare function startGoalEdit(input: StartGoalEditInput): void;
/** Stops a save still in progress; once the goal is written, only the message can still be skipped. */
export declare function cancelGoalEdit(sessionId: string): void;
