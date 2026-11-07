import type { Session } from '@/lib/opencode/model';
import { type ReviewTransferDirection } from '@/lib/reviewFlow';
import { type GlobalSessionStructure } from './globalSessionStructure';
export { mergeSessionDirectoryMetadata, resolveGlobalSessionDirectory } from './globalSessionStructure';
type GlobalSessionsStatus = 'idle' | 'loading' | 'ready' | 'error';
type LoadResult = {
    activeSessions: Session[];
    archivedSessions: Session[];
};
export type GlobalSessionMutation = {
    type: 'upsert';
    session: Session;
} | {
    type: 'remove';
    sessionId: string;
};
type GlobalSessionsState = {
    activeSessions: Session[];
    archivedSessions: Session[];
    entityById: ReadonlyMap<string, Session>;
    structure: GlobalSessionStructure;
    sessionsByDirectory: Map<string, Session[]>;
    reviewTransferBySessionId: Map<string, ReviewTransferDirection>;
    mutationRevision: number;
    mutationRevisionBySessionId: Map<string, number>;
    /** A complete global snapshot has arrived for this runtime. */
    hasLoaded: boolean;
    managedChatsHydrated: boolean;
    status: GlobalSessionsStatus;
    /** Re-read the persisted managed-chats snapshot after the chats root is
        warm; retain newer mutations and stop after an authoritative load. */
    rehydrateManagedChatSessions: () => void;
    loadSessions: (fallbackActive?: Session[]) => Promise<LoadResult>;
    refreshSessionsForDirectories: (directories: Iterable<string>, fallbackActive?: Session[]) => Promise<LoadResult>;
    applySnapshot: (activeSessions: Session[], archivedSessions: Session[], status?: GlobalSessionsStatus) => void;
    applySessionMutations: (mutations: readonly GlobalSessionMutation[]) => void;
    upsertSession: (session: Session) => void;
    upsertSessions: (sessions: Session[]) => void;
    removeSessions: (ids: Iterable<string>) => void;
    archiveSessions: (ids: Iterable<string>, archivedAt?: number) => void;
    /** Drop every session from the previous runtime instance and go back to the
        unloaded state, so a fresh load runs against the new endpoint. */
    resetForRuntimeSwitch: () => void;
};
export declare const isGlobalSessionRecencyOnlyUpdate: (existing: Session, incoming: Session) => boolean;
export declare const useGlobalSessionsStore: import("zustand").UseBoundStore<import("zustand").StoreApi<GlobalSessionsState>>;
export declare const ensureGlobalSessionsLoaded: (fallbackActive?: Session[]) => Promise<LoadResult>;
export declare const refreshGlobalSessions: (fallbackActive?: Session[]) => Promise<LoadResult>;
export declare const refreshGlobalSessionsForDirectories: (directories: Iterable<string>, fallbackActive?: Session[]) => Promise<LoadResult>;
