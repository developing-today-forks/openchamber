import type { Message, Part, Session, SessionStatus } from "@/lib/opencode/model";
type ReconnectMaterializationState = {
    session: Session[];
    session_status?: Record<string, SessionStatus>;
    message?: Record<string, Message[]>;
    part?: Record<string, Part[]>;
};
type ViewedSessionMaterializationTarget = {
    directory: string;
    sessionId: string;
};
type ReconnectCandidateOptions = {
    directory?: string;
    viewedSession?: ViewedSessionMaterializationTarget | null;
};
type BootstrapSessionRevisionOptions = {
    baselineRevision: number;
    /** Pages add coverage; only the completed list may remove absent sessions. */
    partial?: boolean;
    eventRevision?: Record<string, number>;
    deletedRevision?: Record<string, number>;
};
export declare function mergeBootstrapSessions(rootSessions: Session[], allSessions: Session[] | null, existingSessions: Session[], revisions?: BootstrapSessionRevisionOptions): {
    sessions: Session[];
    rootCount: number;
};
export declare function getReconnectCandidateSessionIds(state: ReconnectMaterializationState, options?: ReconnectCandidateOptions): string[];
export {};
