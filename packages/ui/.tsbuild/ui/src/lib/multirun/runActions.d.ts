import type { Session } from '@/lib/opencode/model';
import { type MultiRunSummary } from './runs';
/**
 * Renames the run on every member. Each write is a merge patch of the title
 * alone; members whose write failed keep the old title and are returned.
 */
export declare function renameRun(run: MultiRunSummary, title: string, sessionById: ReadonlyMap<string, Session>): Promise<string[]>;
/**
 * Turns a member into an ordinary session, as if it never took part in the
 * run: its membership marker is deleted (a merge patch with `null`) and its
 * lane title ("Model · Run") becomes the run's title. It keeps its directory
 * or worktree. A run left with one member stops being a run by itself.
 */
export declare function detachFromRun(session: Session, runTitle: string): Promise<void>;
/** Archives every member of the run. Worktrees stay; the chats move to the archive. */
export declare function archiveRun(run: MultiRunSummary): Promise<{
    archivedIds: string[];
    failedIds: string[];
}>;
export declare class NotFirstTurnError extends Error {
    constructor();
}
/**
 * Turns a chat into a run: the chat becomes the first lane, and each chosen
 * model gets its own lane with the same first prompt and files, in its own
 * worktree when the project is a git repository. Only the chat's first turn
 * qualifies, because new lanes start without the conversation that followed.
 */
export declare function askOtherModels(input: {
    session: Session;
    turnUserMessageId: string;
    models: ReadonlyArray<{
        providerID: string;
        modelID: string;
        variant?: string;
        displayName?: string;
    }>;
}): Promise<{
    runKey: string;
    failedCount: number;
}>;
/**
 * Adds a lane for another model to an existing variant: same prompt and
 * files as that variant's first lane, same starting commit, its own worktree
 * when the run is isolated. Returns the new session id.
 */
export declare function addLaneToRun(input: {
    run: MultiRunSummary;
    runGroup: string | undefined;
    model: {
        providerID: string;
        modelID: string;
        variant?: string;
        displayName?: string;
    };
    sessionById: ReadonlyMap<string, Session>;
    /**
     * Give the new lane its own worktree even when the template lane works in
     * the project root (a chat turned into a run). Shared-directory runs leave
     * this off and keep sharing.
     */
    isolateFromProjectRoot?: boolean;
}): Promise<string>;
