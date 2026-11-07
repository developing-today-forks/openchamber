import React from 'react';
export declare const ROW_ACTION_SLOT_WIDTH = 48;
export declare const ROW_ACTIONS_WIDTH: number;
export type MobileSessionWorkAction = {
    inWork: boolean;
    onToggle: () => void;
};
export type MobileSessionPinAction = {
    pinned: boolean;
    onToggle: () => void;
};
/** Generic swipe-to-reveal wrapper for drawer rows (sessions, projects,
    worktrees): horizontal intent detection, imperative transform during the
    drag, snap on release. The actions sit at the row's start (left, or right
    in RTL) and the row slides toward its end, so the opposite direction stays
    free for the drawer's own close swipe. */
export declare const MobileSwipeActionsRow: React.FC<{
    actionsWidth: number;
    actions: React.ReactNode;
    revealed: boolean;
    onRevealedChange: (revealed: boolean) => void;
    /** Marks the row as the current session so the sheet's open-time
        auto-scroll can find it. */
    dataActiveSession?: boolean;
    /** Classes for the transformed content element. The default suits a plain
        header row; session rows pass their own layout and active background. */
    contentClassName?: string;
    children: React.ReactNode;
}>;
/** The session swipe actions, shared by every mobile session row. Ordered
    left to right by how often they are used on a phone: the leftmost slot is
    the one a short drag exposes first, so archive leads and the destructive
    delete never sits under a partial swipe. Copy ID stays in the final slot. */
export declare const MobileSessionRowActions: React.FC<{
    sessionId: string;
    title: string;
    revealed: boolean;
    confirmingDelete: boolean;
    onArchive?: () => void;
    onRequestDelete?: () => void;
    onConfirmDelete?: () => void;
    onRequestRename?: () => void;
    onRevealedChange?: (revealed: boolean) => void;
    /** Track / Done, when the feature is on and the row is a top-level session. */
    work?: MobileSessionWorkAction;
    /** Pin / Unpin, on top-level rows. */
    pin?: MobileSessionPinAction;
}>;
