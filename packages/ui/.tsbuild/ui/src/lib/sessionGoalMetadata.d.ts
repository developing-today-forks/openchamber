import type { Session } from '@/lib/opencode/model';
export type SessionGoalStatus = 'active' | 'paused' | 'blocked' | 'budgetLimited' | 'complete';
export interface SessionGoalPayload {
    id: string;
    objective: string;
    /** True when the objective text lives in a server-side file keyed by session id. */
    objectiveFile: boolean;
    /**
     * Hash of the objective text as last saved ('' for goals saved before
     * revisions existed). Accounting merge-writes preserve it; a save that
     * changes the objective replaces it — the edit-conflict signal for
     * file-backed goals, whose text the record itself does not carry.
     */
    objectiveRevision: string;
    /** The user switched this goal's length limit off in the goal editor. */
    ignoreObjectiveLimit: boolean;
    status: SessionGoalStatus;
    tokenBudget: number | null;
    tokensUsed: number;
    turnsUsed: number;
    statusReason: string;
    evaluationProviderID: string;
    evaluationModelID: string;
    lastAccountedMessageID: string;
    createdAt: number;
    updatedAt: number;
}
export declare function getSessionGoal(session: Session | null | undefined): SessionGoalPayload | null;
export declare function formatGoalTokens(count: number): string;
