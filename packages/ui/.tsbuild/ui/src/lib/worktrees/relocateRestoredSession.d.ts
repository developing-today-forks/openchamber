import type { Session } from '@/lib/opencode/model';
export type RestoredSessionRelocation = {
    outcome: 'kept';
} | {
    outcome: 'moved';
    projectRoot: string;
} | {
    outcome: 'failed';
    error: Error;
};
type RelocationDeps = {
    getSession: (sessionId: string) => Session | undefined;
    getActiveSessions: () => readonly Session[];
    getDirectoryAvailability: (directory: string) => Promise<'available' | 'missing' | 'unknown'>;
    resolveProjectRoot: (session: Session) => string | null;
    moveSession: (session: Session, sourceDirectory: string, destinationDirectory: string) => Promise<void>;
};
/**
 * A session restored from the archive may still point at a worktree that was
 * removed meanwhile. OpenCode cannot run a prompt there (it answers 500), so
 * the session moves to its project root, where it works again. OpenCode
 * records the move and tells the model its working directory changed.
 *
 * Only a directory the server confirms missing triggers the move; an
 * unreachable server or an unknown answer leaves the session where it is.
 */
export declare function relocateRestoredSessionIfDirectoryMissing(sessionId: string, deps?: RelocationDeps): Promise<RestoredSessionRelocation>;
/**
 * Restores the session's working directory after an unarchive and tells the
 * user why it moved: the worktree folder is gone, which this app did not
 * necessarily do (it may have been removed by hand or by git).
 */
export declare function relocateRestoredSessionWithNotice(sessionId: string): Promise<void>;
export {};
