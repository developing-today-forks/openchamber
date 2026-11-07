import type { ExternalToast } from 'sonner';
import type { Session } from '@/lib/opencode/model';
import type { I18nKey, I18nParams } from '@/lib/i18n';
import { type SessionUIState } from '@/sync/session-ui-store';
import type { SessionNode } from '../types';
type Translate = (key: I18nKey, params?: I18nParams) => string;
export type SessionSubtreeAction = 'archive' | 'delete';
export type SessionSubtreeStore = Pick<SessionUIState, 'archiveSession' | 'archiveSessions' | 'deleteSession' | 'deleteSessions'>;
type SessionSubtreeOutcome = {
    succeededIds: string[];
    failedIds: string[];
};
/**
 * Every descendant an archive or delete should reach, resolved when the user
 * acts rather than while rows render.
 *
 * `knownDescendantIds` is what the surface already sees: the rendered tree on
 * desktop, the active list on mobile. Both stop at an archived child, so an
 * active subagent under an archived intermediate stayed behind (an edge #2580
 * pointed out). The global lineage reaches through archived intermediates:
 * archive takes the active sessions below, since it must not restamp archived
 * ones, and delete takes the whole subtree.
 */
export declare const collectSessionSubtreeIds: (rootId: string, knownDescendantIds: readonly string[], includeArchived: boolean) => string[];
/**
 * A session's active subtree from the global cache, built the way the project
 * tree builds it: it stops at an archived session and everything below it.
 * In work, Pinned and the List view render a root with no children, so an
 * action that needs the subagents of such a row resolves them here when the
 * user acts.
 */
export declare const buildActiveSessionTreeFromCache: (root: Session) => SessionNode;
/**
 * Every descendant a move to another worktree takes along: the row's rendered
 * tree (`knownDescendants`) plus the active subtree from the global lineage,
 * so a move from a flat row, the header or the project tree takes the same
 * subagents along.
 */
export declare const collectSessionMoveDescendants: (root: Session, knownDescendants: readonly Session[]) => Session[];
/**
 * Undo an archive that just succeeded.
 *
 * Restores exactly the sessions that archive moved, on the runtime they were
 * archived on. When the archive closed the open session (`reopenId`) and the
 * user has not opened another one since, it opens again, so the screen returns
 * to where it was. Archive side effects that are not archive state, such as a
 * deleted btw fork, are not undone.
 */
export declare const undoArchive: (archivedIds: readonly string[], reopenId: string | null, runtimeKey: string, t: Translate) => Promise<void>;
/** Toast options offering Undo for an archive that just succeeded. */
export declare const archiveUndoToastOptions: (archivedIds: readonly string[], reopenId: string | null, t: Translate) => ExternalToast;
/**
 * Archive or hard-delete a session together with its descendants.
 *
 * The server does not cascade `time.archived`, so a parent archived on its own
 * leaves its subagents active as orphan roots. Desktop sidebar rows, Recent,
 * managed Chats, and the mobile sessions sheet resolve the subtree first and
 * run it through here, so the calls made and the outcome the user sees stay
 * the same: a lone session keeps the singular copy, a subtree reports counts,
 * and a partial failure says how many sessions were left behind.
 */
export declare const runSessionSubtreeAction: (action: SessionSubtreeAction, session: Session, descendantIds: readonly string[], store: SessionSubtreeStore, t: Translate) => Promise<SessionSubtreeOutcome>;
export {};
