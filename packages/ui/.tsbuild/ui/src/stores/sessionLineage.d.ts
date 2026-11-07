import type { Session } from '@/lib/opencode/model';
/**
 * Which descendants an action reaches below a session.
 *
 * - `active`: active sessions, stopping at an archived one and everything
 *   under it, the tree the project sidebar renders. Move and export.
 * - `activeThroughArchived`: active sessions at any depth, also under an
 *   archived intermediate. Archive, which must not restamp an archived one.
 * - `all`: every session at any depth, archived ones included. Delete.
 * - `archived`: archived sessions, stopping at an active one. Restore, which
 *   brings back the archived subsessions of a root.
 */
type SessionLineagePolicy = 'active' | 'activeThroughArchived' | 'all' | 'archived';
type SessionLineage = {
    /** The descendants of `rootId` under `policy`, each parent before its children. */
    descendantsOf: (rootId: string, policy: SessionLineagePolicy) => Session[];
};
/**
 * The parent-child graph of `sessions`, indexed once. Build it once per
 * action, or once per pass over many roots.
 */
export declare const createSessionLineage: (sessions: readonly Session[]) => SessionLineage;
/**
 * The lineage of every session the client knows, active and archived, read
 * from the global cache when the user acts. A sidebar row may render its
 * session with no children (In work, Pinned, the List view), so an action
 * never takes its descendants from the row.
 */
export declare const readGlobalSessionLineage: () => SessionLineage;
export {};
