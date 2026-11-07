import type { SessionSidebarRenderContext } from '../sessionSidebarRowModel';
import type { WorktreeMetadata } from '@/types/worktree';
import type { SessionNode } from '../types';
/**
 * Per-row render extras precomputed once per group render and threaded down to
 * each `SessionNodeItem`. Hoisting these out of the row `React.memo` comparator
 * turns an O(rows × subtree-depth) walk into per-row `Set.has`/string compares.
 *
 * The child variant intentionally omits `childRenderExtrasFor` — the resolver is
 * shared from the group and re-passed, so it does not need to recurse through
 * each child's extras object.
 */
export type SessionNodeChildRenderExtras = {
    subtreeContainsEditing: Set<string>;
    menuOpenSessionId: string | null;
    nodeStructureKey: string;
    blockingBadgeSessionScopes?: readonly BlockingBadgeSessionScope[];
    /**
     * Bumped once a minute by the owning list so rows that render a relative
     * timestamp ("5m") re-render and recompute it. Only the Recent list
     * supplies it; elsewhere the rows carry no time-dependent label.
     */
    relativeTimeTick?: number;
};
export type SessionNodeRenderExtras<TNode = SessionNode> = SessionNodeChildRenderExtras & {
    childRenderExtrasFor?: (child: TNode) => SessionNodeChildRenderExtras;
};
/**
 * Walk `nodes` and add `node.session.id` to `result` for every node
 * whose subtree contains `targetId`. This is used to precompute, once
 * per SessionGroupSection render, which rows need to update when
 * `editingId` changes. With M visible rows, this
 * turns an O(M × subtree-depth) walk inside `SessionNodeItem.areEqual`
 * into a single O(M) `Set.has` per row.
 */
export declare const collectSubtreeContainingId: (nodes: SessionNode[], targetId: string | null, result: Set<string>) => void;
export declare const nodeContainsSessionId: (node: SessionNode, sessionId: string | null) => boolean;
export type BlockingBadgeSessionScope = {
    directory: string;
    sessionIDs: string[];
};
export declare const canShowSessionWorktreeMenu: ({ isSubtaskSession, archivedBucket, isVSCode, sessionDirectory, }: {
    isSubtaskSession: boolean;
    archivedBucket: boolean;
    isVSCode: boolean;
    sessionDirectory: string | null;
}) => boolean;
export declare const getSessionWorktreeMenuDisabled: ({ sessionDirectory, isStreaming, isMovingToWorktree, }: {
    sessionDirectory: string | null;
    isStreaming: boolean;
    isMovingToWorktree: boolean;
}) => boolean;
/**
 * Choose which (directory, sessionIDs) scopes a sidebar row's blocking-request
 * badges should count. An expanded row counts only its own session; a collapsed
 * parent row additionally rolls up the hidden descendants of its subtree,
 * grouped by the directory store each descendant actually lives in.
 */
export declare const selectBlockingBadgeSessionScopes: (node: SessionNode, isExpanded: boolean, fallbackDirectory: string | null) => BlockingBadgeSessionScope[];
export declare const selectFolderRootNodes: (sessionIds: string[], nodeBySessionId: ReadonlyMap<string, SessionNode>) => SessionNode[];
type FolderHierarchyEntry = {
    id: string;
    parentId?: string | null;
};
/**
 * Preserve stored folder order while projecting every disconnected or cyclic
 * component from a deterministic root. The persisted parent links stay as-is.
 */
export declare const normalizeFolderRoots: <T extends FolderHierarchyEntry>(folders: readonly T[]) => T[];
type FolderProjectionEntry = FolderHierarchyEntry & {
    name: string;
    nodeCount: number;
};
type FolderProjectionOptions = {
    archivedBucket: boolean;
    searchQuery: string;
};
export declare const selectFolderIdsForProjection: (entries: readonly FolderProjectionEntry[], options: FolderProjectionOptions) => Set<string>;
/**
 * Build a key encoding descendant IDs and session object versions. This lets
 * row memoization detect one changed descendant without recursively comparing
 * every subtree after a reference-only grouping rebuild.
 */
export declare const computeNodeStructureKey: (node: SessionNode) => string;
export declare const nodeHasPinnedMembershipChange: (prevNode: SessionNode, nextNode: SessionNode, prevPinnedSessionIds: Set<string>, nextPinnedSessionIds: Set<string>, prevGroupDirectory?: string | null, nextGroupDirectory?: string | null) => boolean;
/**
 * Branch line for a row's tooltip and recent-list marker. An explicit
 * `secondaryMeta` means the owning projection already filtered the branch
 * (Recent and Timeline hide HEAD; Recent also hides a branch equal to the
 * project label), so a null `branchLabel` there is a deliberate filter and
 * must not fall through to the raw worktree branch. Project and Chats rows
 * pass no `secondaryMeta` and keep the worktree fallback.
 */
export declare const resolveTooltipBranchLabel: (secondaryMeta: {
    projectLabel?: string | null;
    branchLabel?: string | null;
} | null | undefined, worktreeBranch: string | null | undefined) => string | null;
/**
 * The worktree directory and branch whose change request a row shows. The
 * row's worktree is the only source of the pair; VS Code renders no PR badges.
 */
export declare const resolveSessionPrLookup: (worktree: WorktreeMetadata | null | undefined, isVSCode: boolean) => {
    directory: string;
    branch: string;
} | null;
/**
 * Resolve the session id whose sidebar menu is open, or null if no
 * menu is open. Only one row can have its menu open at a time.
 */
export declare const resolveMenuOpenSessionId: (nodes: SessionNode[], menuKey: string | null, renderContext: SessionSidebarRenderContext, archivedBucket: boolean) => string | null;
export {};
