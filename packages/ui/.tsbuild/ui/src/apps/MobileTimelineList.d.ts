import React from 'react';
import type { Session } from '@/lib/opencode/model';
import { type MobileProjectIconProject } from './MobileProjectIcon';
import type { SessionNode } from '@/components/session/sidebar/types';
import type { MultiRunSummary } from '@/lib/multirun/runs';
export type TimelineProject = MobileProjectIconProject & {
    label: string;
};
export type TimelineEntry = {
    kind: 'session';
    session: Session;
    project: TimelineProject;
    /** Worktree branch for worktree sessions, project root branch otherwise.
        Null when no branch is known; the second line then holds only state. */
    branch: string | null;
    /** The branch is an isolated space's name; the row marks it with the space's container icon. */
    inSpace: boolean;
} | {
    /** A multi-run takes one row at its first lane's position. */
    kind: 'run';
    run: MultiRunSummary;
    /** Lanes with their subsessions, for the aggregate activity indicator. */
    laneNodes: readonly SessionNode[];
    project: TimelineProject;
};
export type TimelineRowHandlers = {
    currentSessionId: string | null;
    revealedSessionId: string | null;
    confirmingDeleteSessionId: string | null;
    renamingSessionId: string | null;
    onSelect: (session: Session) => void;
    onRevealedChange: (sessionId: string, revealed: boolean) => void;
    onArchive: (session: Session) => void;
    onRequestDelete: (sessionId: string) => void;
    onConfirmDelete: (session: Session) => void;
    onRequestRename: (sessionId: string) => void;
    onSubmitRename: (sessionId: string, title: string) => void;
    onCancelRename: () => void;
    /** Track / Done; absent while the feature is off. */
    onToggleWork?: (session: Session, inWork: boolean) => void;
    isPinned: (session: Session) => boolean;
    onTogglePin: (session: Session) => void;
    /** Subsessions of a row, for the requests they are waiting on. */
    descendantIdsOf: (sessionId: string) => readonly string[];
};
/** Left padding of timeline rows and of the Show more / Show fewer rows under them. */
export declare const TIMELINE_ROW_INDENT = 12;
/** Two-line timeline rows. Under a project header they need no project mark;
    Pinned and In work mix projects, so there each row shows its project's
    icon. `projectLine` gives the list by time three lines, the project's
    icon and name on the first. `compact` puts a row on one line, the Tree
    view's default for Pinned and In work. The Pinned section passes
    `pinMarker={false}`: its header already says every row there is pinned. */
export declare const MobileTimelineRows: React.FC<{
    entries: readonly TimelineEntry[];
    showProject: boolean;
    projectLine?: boolean;
    compact?: boolean;
    pinMarker?: boolean;
    handlers: TimelineRowHandlers;
}>;
/** Watches the end of the list by time inside the sheet's own scroller and
    asks for the next page before the user reaches the bottom: the sheet is a
    plain scroller, so a workspace with thousands of sessions must not mount
    them all at once. Re-created whenever the revealed count changes, because
    a sentinel that stays in view never fires a second time on its own. */
export declare const TimelineEndSentinel: React.FC<{
    scrollRootRef: React.RefObject<HTMLElement | null>;
    visibleCount: number;
    onReachEnd: () => void;
}>;
