import type { SessionOwnershipIndex } from '../sessions/sessionOwnership';
type ProjectForArchivedFolders = {
    id: string;
    normalizedPath: string;
};
type FolderEntry = {
    id: string;
    name: string;
    sessionIds: string[];
};
type Args = {
    enabled?: boolean;
    normalizedProjects: ProjectForArchivedFolders[];
    ownership: SessionOwnershipIndex;
    isSessionsLoading: boolean;
    hasAuthoritativeGlobalSessions: boolean;
    isWorktreeTopologyLoading: boolean;
    unresolvedWorktreeProjectPaths: ReadonlySet<string>;
    foldersMap: Record<string, FolderEntry[]>;
    createFolder: (scopeKey: string, name: string, parentId?: string | null, id?: string) => FolderEntry;
    addSessionToFolder: (scopeKey: string, folderId: string, sessionId: string) => void;
};
export declare const useArchivedAutoFolders: (args: Args) => void;
export {};
