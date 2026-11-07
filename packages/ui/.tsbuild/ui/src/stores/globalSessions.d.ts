import type { Session } from "@/lib/opencode/model";
import type { SessionListOptions, SessionPage } from "@/lib/opencode/client";
import type { SpaceMark } from "@/lib/spaces/spaces-store";
export type GlobalSessionRecord = Session & {
    project?: {
        id: string;
        name?: string;
        worktree?: string;
    } | null;
};
export declare const filterManagedChatsForRuntime: (sessions: Session[], vscode: boolean) => Session[];
/**
 * Split a session list into active and archived buckets. Restored sessions
 * carry `time.archived === 0` (see `UNARCHIVED_TIMESTAMP` in
 * `sync/session-actions.ts`), so the truthiness check classifies them as
 * active.
 */
export declare const splitGlobalSessionsByArchived: <T extends GlobalSessionRecord>(sessions: T[]) => {
    active: T[];
    archived: T[];
};
/** One page request. Injected so callers and tests can supply their own transport. */
export type SessionPageLister = (options: SessionListOptions) => Promise<SessionPage>;
/**
 * Walks every page of a session list and returns the records.
 *
 * v2 lists sessions newest-first and pages by an opaque cursor; it has no
 * archived filter, so callers take the whole list and split it with
 * `splitGlobalSessionsByArchived`.
 */
export declare const GLOBAL_SESSION_MAX_PAGES = 100;
export declare function listGlobalSessionPages(listPage: SessionPageLister, options: {
    directory?: string;
    pageSize: number;
    onPage?: (sessions: GlobalSessionRecord[]) => void;
    /** The first page's isolated-space marks: `null` when the page carried none. */
    onSpaces?: (spaces: SpaceMark[] | null) => void;
}): Promise<GlobalSessionRecord[]>;
