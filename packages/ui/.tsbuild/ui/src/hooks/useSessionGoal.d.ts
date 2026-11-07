import { type SessionGoalPayload } from '@/lib/sessionGoalMetadata';
export interface SessionGoalState {
    /** Parsed goal payload, or null when the session has no goal. */
    goal: SessionGoalPayload | null;
    /** The Settings → Chat toggle; when off, goal UI stays hidden. */
    enabled: boolean;
}
export declare function useSessionGoal(sessionId: string, directory?: string): SessionGoalState;
/**
 * False only when nothing can check a goal's progress: Jev is not the chosen
 * checker or has no classification provider, and the small model is known to
 * be unavailable. The server checks with the small model whenever Jev cannot,
 * so that is the model asked about here.
 */
export declare function useGoalCheckAvailable(directory: string | undefined, active: boolean): boolean;
/** `useGoalCheckAvailable` read once, for a decision taken at send time. */
export declare function isGoalCheckAvailableNow(directory: string | null | undefined): boolean;
export declare function useGoalObjectiveContent(sessionId: string, goal: SessionGoalPayload | null): string | null;
