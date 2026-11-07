import type { Session } from '@/lib/opencode/model';
type DeleteSessionSource = {
    archivedBucket?: boolean;
    hardDelete?: boolean;
    /** Bypass the confirmation dialog and delete/archive immediately. */
    skipConfirm?: boolean;
};
export type DeleteSessionConfirmState = {
    session: Session;
    descendantCount: number;
    descendantIds: string[];
    archivedBucket: boolean;
} | null;
type Args = {
    mobileVariant: boolean;
    allowReselect: boolean;
    onSessionSelected?: (sessionId: string) => void;
    resetSessionSearch: () => void;
    descendantIds: readonly string[];
    showDeletionDialog: boolean;
    setDeleteSessionConfirm: (value: DeleteSessionConfirmState) => void;
    deleteSessionConfirm: DeleteSessionConfirmState;
    setEditingId: (id: string | null) => void;
    setEditingRowKey: (key: string | null) => void;
    editingSessionId: string;
    editingOccurrenceKey: string;
    setEditTitle: (value: string) => void;
    editingId: string | null;
    editTitle: string;
};
export declare const useSessionActions: (args: Args) => {
    handleSessionSelect: (sessionId: string, sessionDirectory?: string | null) => void;
    handleSessionDoubleClick: (sessionId: string, sessionTitle: string) => void;
    handleSaveEdit: (titleOverride?: string) => Promise<void>;
    handleCancelEdit: () => void;
    handleCopySessionId: (sessionId: string) => void;
    handleDeleteSession: (session: Session, source?: DeleteSessionSource) => void;
    handleRestoreSession: (session: Session) => Promise<void>;
    confirmDeleteSession: () => Promise<void>;
};
export {};
