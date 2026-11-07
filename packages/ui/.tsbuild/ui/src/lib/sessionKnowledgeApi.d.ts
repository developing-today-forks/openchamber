/**
 * Project knowledge for a session, as decided by the server.
 *
 * The client neither assembles this text nor tracks what the session was told.
 * Before a send it asks the server to write the knowledge into the session's
 * OpenCode instruction entries; OpenCode tells the agent what changed and keeps
 * it through compaction, revert and fork.
 *
 * Nothing here throws. A message must go out even when its background cannot
 * be written: sending without it costs the agent some context, failing the
 * send costs the user their message.
 */
/**
 * Awaited before the prompt request, so the agent reads the knowledge with the
 * message. Goes to the server that owns the session, which for a session in an
 * isolated space is the one inside the space.
 */
export declare const syncSessionKnowledge: (directory: string | null | undefined, sessionId: string | null | undefined) => Promise<void>;
export interface SessionKnowledgeSummary {
    notes: Array<{
        id: string;
        body: string;
    }>;
    plans: Array<{
        id: string;
        title: string;
    }>;
    memory: {
        global: number;
        project: number;
    };
}
/** What the session is carrying, for display. Never throws; shows nothing instead. */
export declare const fetchSessionKnowledgeSummary: (directory: string | null, sessionId?: string | null) => Promise<SessionKnowledgeSummary>;
export type SessionProjectContextPins = {
    notes: string[];
    plans: string[];
};
export declare const setSessionProjectContextPin: (directory: string, sessionId: string, kind: 'note' | 'plan', id: string, pinned: boolean) => Promise<SessionProjectContextPins | null>;
