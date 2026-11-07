import React from 'react';
import type { Session } from '@/lib/opencode/model';
import { type BlockingBadgeSessionScope } from './sessionNodeItemUtils';
import type { SessionNode } from '../types';
import { type SessionSidebarRenderContext } from '../sessionSidebarRowModel';
import type { WorktreeMetadata } from '@/types/worktree';
import { type StartSessionWorktreeMenuLoadResult } from '../sessionWorktreeMenu';
type SecondaryMeta = {
    projectLabel?: string | null;
    branchLabel?: string | null;
    /** The branch label is an isolated space's name; the row marks it with the space's container icon. */
    inSpace?: boolean;
};
export type SessionNodeItemProps = {
    node: SessionNode;
    depth?: number;
    groupDirectory?: string | null;
    projectId?: string | null;
    folderOwnerKey?: string | null;
    selectionScopeKey?: string | null;
    archivedBucket?: boolean;
    pinnedSessionIds: Set<string>;
    expandedParents: Set<string>;
    hasSessionSearchQuery: boolean;
    normalizedSessionSearchQuery: string;
    notifyOnSubtasks: boolean;
    editingId: string | null;
    editingRowKey: string | null;
    setEditingId: (id: string | null) => void;
    setEditingRowKey: (key: string | null) => void;
    editTitle: string;
    setEditTitle: (value: string) => void;
    handleSaveEdit: (titleOverride?: string) => void;
    handleCancelEdit: () => void;
    toggleParent: (expansionKey: string) => void;
    handleSessionSelect: (sessionId: string, sessionDirectory: string | null) => void;
    handleSessionDoubleClick: (sessionId: string, sessionTitle: string) => void;
    handleCopySessionId: (sessionId: string) => void;
    openSidebarMenuKey: string | null;
    setOpenSidebarMenuKey: (key: string | null) => void;
    createFolderAndStartRename: (scopeKey: string, parentId?: string | null) => {
        id: string;
    } | null;
    handleDeleteSession: (session: Session, source?: {
        archivedBucket?: boolean;
        hardDelete?: boolean;
        skipConfirm?: boolean;
    }) => void;
    handleRestoreSession: (session: Session) => void;
    startSessionWorktreeMenuLoad: (args: {
        projectId: string | null;
        sourceDirectory: string | null;
        currentWorktree: WorktreeMetadata | null;
    }) => StartSessionWorktreeMenuLoadResult;
    mobileVariant: boolean;
    alwaysShowActions: boolean;
    secondaryMeta?: SecondaryMeta | null;
    renderContext?: SessionSidebarRenderContext;
    blockingBadgeSessionScopes?: readonly BlockingBadgeSessionScope[];
    rowKey?: string;
    dragKey?: string;
    /**
     * Precomputed set of session IDs whose subtree contains the session
     * currently being edited. Precomputed once per group render.
     */
    subtreeContainsEditing: Set<string>;
    /**
     * Precomputed session ID of the row whose sidebar menu is open, or null
     * if no menu is open. Only one row can have its menu open at a time.
     */
    menuOpenSessionId: string | null;
    /**
     * Bumped once a minute by the Recent list so the compact relative
     * timestamp rendered below recomputes instead of freezing at the value it
     * had when the row first mounted.
     */
    relativeTimeTick?: number;
    /**
     * Precomputed structural key for this node and its badge-only scopes in
     * flat Timeline rows. Both row memo boundaries use it to notice changes
     * to hidden descendants without adding them to the rendered node.
     */
    nodeStructureKey: string;
    /**
     * Resolves the per-row render extras for each child node. SessionGroupSection
     * walks the whole tree once to precompute the structure key for every
     * descendant; SessionNodeItem's recursive child render uses this lookup
     * to fetch the right key for each child it produces.
     */
    children?: React.ReactNode;
};
declare function SessionNodeItemComponent(props: SessionNodeItemProps): React.ReactNode;
export declare const SessionNodeItem: React.MemoExoticComponent<typeof SessionNodeItemComponent>;
export {};
