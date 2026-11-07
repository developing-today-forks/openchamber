type SessionActivityPhase = 'idle' | 'busy' | 'retry';
export interface SessionActivityResult {
    phase: SessionActivityPhase;
    isWorking: boolean;
    isBusy: boolean;
    isCooldown: boolean;
}
/**
 * Determines if a session is actively working.
 * Checks session_status and, only when status is missing, falls back to the
 * trailing assistant message when its completion update has not landed yet.
 * Returns idle when permissions or forms are pending (the permission /
 * form indicator takes priority, and the send button must stay available so
 * the user can supersede the prompt with a new message).
 */
export declare function useSessionActivity(sessionId: string | null | undefined, directory?: string): SessionActivityResult;
export declare function useCurrentSessionActivity(): SessionActivityResult;
export {};
