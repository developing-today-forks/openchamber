import type { Session } from '@/lib/opencode/model';
import type { SessionNode } from '../types';
type ProjectSidebarActiveSessionsArgs = {
    globalActiveSessions: Session[];
    liveSessions: Session[];
    knownDirectories: Set<string>;
    isVSCode: boolean;
};
type SidebarSessionPartitions = {
    projectSessions: Session[];
    chatSessions: Session[];
};
export declare const partitionSidebarSessions: (sessions: readonly Session[], isVSCode: boolean) => SidebarSessionPartitions;
export declare const projectSidebarActiveSessions: ({ globalActiveSessions, liveSessions, knownDirectories, isVSCode, }: ProjectSidebarActiveSessionsArgs) => Session[];
export declare const projectSidebarCollection: (args: ProjectSidebarActiveSessionsArgs) => Session[];
export declare const getDescendantIds: (childrenMap: ReadonlyMap<string, readonly Session[]>, sessionId: string) => string[];
export declare const buildActiveSessionNode: (childrenMap: ReadonlyMap<string, readonly Session[]>, session: Session) => SessionNode;
type SidebarSessionProjectionArgs = ProjectSidebarActiveSessionsArgs & {
    pinnedSessionIds: Set<string>;
    sessionOrderRanks: ReadonlyMap<string, number>;
};
export declare const buildSidebarSessionProjection: ({ globalActiveSessions, liveSessions, knownDirectories, isVSCode, pinnedSessionIds, sessionOrderRanks, }: SidebarSessionProjectionArgs) => {
    chatSessions: Session[];
    childrenMap: Map<string, Session[]>;
    orderedSessions: Session[];
    projectSessions: Session[];
    sessionById: Map<string, Session>;
};
type UseSessionProjectCollectionArgs = {
    knownDirectories: Set<string>;
    isVSCode: boolean;
    isVisible: boolean;
    /** The open session's rank while the sidebar holds it in place (`zones/openSessionHold.ts`). */
    heldRank?: {
        sessionId: string;
        rank: number;
    } | null;
};
export declare const useSessionProjectCollection: ({ knownDirectories, isVSCode, isVisible, heldRank, }: UseSessionProjectCollectionArgs) => {
    archivedSessions: Session[];
    childrenMap: Map<string, Session[]>;
    chatSessions: Session[];
    getDescendantIds: (sessionId: string, options: {
        includeArchived: boolean;
    }) => string[];
    hasAuthoritativeGlobalSessions: boolean;
    orderedSessions: Session[];
    pinnedSessionIds: Set<string>;
    sessionOrderRanks: ReadonlyMap<string, number>;
    sessions: Session[];
    sessionById: Map<string, Session>;
    rootSessions: Session[];
};
export {};
