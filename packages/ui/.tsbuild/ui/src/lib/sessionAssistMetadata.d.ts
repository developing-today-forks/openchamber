import type { Session } from '@/lib/opencode/model';
export interface SessionAssistPayload {
    recap: string;
    suggestion: string;
    forMessageID: string;
    generatedAt: number;
}
/**
 * The one freshness rule for a stored assist, shared by the sidebar row's
 * recap tooltip (which has only the session record) and the chat (which must
 * agree with it).
 * OpenCode stamps `time.idle` whenever a turn ends, succeeded or not, and the
 * assist is generated after that quiet turn end. A later turn moves `idle`
 * past `generatedAt`, so the payload describes an older turn and is retired.
 * A reverted session shows history that is no longer the active conversation.
 * The server also deletes the assist when a new turn starts; this rule covers
 * payloads written before that, or by another process.
 * Callers still hide it while a turn runs.
 */
export declare function getCurrentSessionAssist(session: Session | null | undefined): SessionAssistPayload | null;
