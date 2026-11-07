export type SessionArchiveResult = {
    archivedIds: string[];
    failedIds: string[];
};
export declare function removeWorktreeThenArchiveSessions(options: {
    sessionIds: string[];
    removeWorktree: () => Promise<boolean>;
    archiveSessions: (sessionIds: string[]) => Promise<SessionArchiveResult>;
}): Promise<{
    removed: boolean;
    archive: SessionArchiveResult;
}>;
