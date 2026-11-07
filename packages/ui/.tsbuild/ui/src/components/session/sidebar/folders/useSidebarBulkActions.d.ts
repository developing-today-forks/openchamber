import React from 'react';
import type { SessionFolder } from '@/stores/useSessionFoldersStore';
import type { BulkDeleteSessionsConfirmState } from '../shell/ConfirmDialogs';
type Args = {
    isInlineEditing: boolean;
    showDeletionDialog: boolean;
    foldersMap: Record<string, SessionFolder[]>;
    /**
     * Selection scope is the project id (flat per-project session list); this
     * map resolves it to the project's folder scopes (root + worktrees). When
     * the scope is missing here it is treated as a plain directory scope.
     */
    getFolderScopesForProject: (projectId: string) => readonly {
        scopeKey: string;
        directory: string | null;
    }[];
    addSessionsToFolder: (scopeKey: string, folderId: string, sessionIds: string[]) => void;
    removeSessionsFromFolders: (scopeKey: string, sessionIds: string[]) => void;
    createFolderAndStartRename: (scopeKey: string, parentId?: string | null) => {
        id: string;
    } | null;
    archiveSessions: (ids: string[]) => Promise<{
        archivedIds: string[];
        failedIds: string[];
    }>;
    unarchiveSessions: (ids: string[]) => Promise<{
        restoredIds: string[];
        failedIds: string[];
    }>;
    deleteSessions: (ids: string[]) => Promise<{
        deletedIds: string[];
        failedIds: string[];
    }>;
    bulkDeleteConfirm: BulkDeleteSessionsConfirmState;
    setBulkDeleteConfirm: React.Dispatch<React.SetStateAction<BulkDeleteSessionsConfirmState>>;
};
export declare const resolveSelectionFolderScopes: (selectionScope: string | null, getFolderScopesForProject: Args['getFolderScopesForProject']) => string[];
export declare const resolveBulkDeleteConfirmation: (value: NonNullable<BulkDeleteSessionsConfirmState>, sessionsById: ReadonlyMap<string, {
    time?: {
        archived?: number | null;
    };
}>) => {
    ready: true;
    value: NonNullable<BulkDeleteSessionsConfirmState>;
} | {
    ready: false;
    value: NonNullable<BulkDeleteSessionsConfirmState> | null;
};
/**
 * Bulk-action logic for the sidebar. The hot-path concern is that this
 * hook subscribes to `useSessionMultiSelectStore` — which can fire on
 * every selection toggle and on every setRange/toggleSelected call —
 * but the rest of the Sidebar tree only needs the boolean
 * `selectionModeEnabled` flag to decide whether to render the
 * selection chrome.
 *
 * To keep that subscription narrow, the heavy work (folders lookup,
 * DOM-attribute scanning for the active/archived scope, etc.) is
 * deferred behind a `selectedIds.size > 0` check inside the hook itself.
 * Scope and archive state come from the selection store rather than mounted
 * row DOM, so virtual eviction cannot change the available actions.
 */
export declare const useSidebarBulkActions: (args: Args) => {
    selectionModeEnabled: boolean;
    hasSelection: boolean;
    selectedIdsSize: number;
    bulkScopeIsArchived: boolean;
    derivedSelectionScope: string | null;
    bulkScopeFolders: SessionFolder[];
    bulkCanRemoveFromFolder: boolean;
    handleToggleSelectionMode: () => void;
    handleExitSelectionMode: () => void;
    handleBulkMoveToFolder: (folderId: string) => void;
    handleBulkCreateFolderAndMove: () => void;
    handleBulkRemoveFromFolder: () => void;
    handleBulkDelete: () => void;
    handleBulkArchive: () => void;
    handleBulkHardDelete: () => void;
    handleBulkRestore: () => Promise<void>;
    confirmBulkDelete: () => Promise<void>;
};
export {};
