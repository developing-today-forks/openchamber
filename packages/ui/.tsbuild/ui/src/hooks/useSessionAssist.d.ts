import { type SessionAssistPayload } from '@/lib/sessionAssistMetadata';
export interface SessionAssistState {
    /** Valid (fresh) assist payload, or null. */
    assist: SessionAssistPayload | null;
    /** Recap text, only when the 1-minute quiet window has elapsed. */
    visibleRecap: string | null;
    /** Suggestion text — fresh payload, session idle; caller still gates on input emptiness. */
    suggestion: string | null;
    /** False until the session record is in memory; the recap cannot be decided before that. */
    sessionKnown: boolean;
}
export declare function useSessionAssistState(sessionId: string, directory?: string): SessionAssistState;
