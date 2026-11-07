import React from 'react';
import { type SessionRowElements } from '@/stores/useSessionDisplayStore';
type TimelineRowProject = {
    id: string;
    icon?: string | null;
    color?: string | null;
    iconImage?: {
        mime: string;
        updatedAt: number;
        source: 'custom' | 'auto';
    } | null;
    iconBackground?: string | null;
};
type Props = {
    /** One-line rows (tree rows, Chats, the Tree view's Pinned and In work):
        title and meta on one line, no branch line. */
    compact?: boolean;
    /** Set in the zones and the combined list, where projects mix: the second
        line opens with this project's icon, a one-line row's title with it.
        Rows under their project header pass null. */
    project: TimelineRowProject | null;
    /** A chat where projects mix: the chat mark stands where a project's icon would. */
    chat?: boolean;
    /** The project's name, spoken and shown on hover for its icon. */
    projectLabel: string | null;
    /** Three lines (List sorted by time): the project's icon and name get a
        first line of their own, above the title, where the time sits. */
    projectLine?: boolean;
    title: React.ReactNode;
    titleClassName: string;
    branchLabel: string | null;
    /** Set when the branch label is an isolated space's name: the second line
        then carries the space's container mark, with this as its accessible
        name, where a branch shows the branch icon. */
    spaceMark?: string | null;
    /** Replaces the branch on the second line (a run row puts its mark and
        lane count there). */
    metaLineLead?: React.ReactNode;
    statusDot: React.ReactNode;
    /** Pin glyph shown in the meta cluster while the row is pinned. */
    pinnedMarker: React.ReactNode;
    /** Elapsed-turn counter while running/unread, otherwise the compact date. */
    timeSlot: React.ReactNode;
    directoryIndicator: React.ReactNode;
    prBadge: React.ReactNode;
    zombieIndicator: React.ReactNode;
    /** Goal status glyph; opens the second line's state cluster, so it stays
        visible while a turn runs and while the hover actions cover line one. */
    goal?: React.ReactNode;
    badges: React.ReactNode;
    /** Jev's "looks done" check: it sits in the time cluster, where the hover
        Done action appears, left of the status dot so the dot stays by the time. */
    doneHint?: React.ReactNode;
    /** Provider of the session's model; its logo closes the second line. */
    providerId?: string | null;
    /** Reserves room for permanently shown action buttons on the title line. */
    metaPaddingClass?: string;
    /** Optional row elements, shown where the row already has a slot for them.
        Everything shows by default, exactly like today. Live status and the
        permission/question badges are not here: a row always says when it
        needs the user. */
    elements?: SessionRowElements;
    hideMetaOnHoverClass: string;
    /** Sets how far hover-revealed actions reach into the title line
        (`--oc-actions-reserve`). */
    actionsReserveClass?: string;
    /** Fades the title's tail away under hover-revealed actions. */
    actionsMaskClass?: string;
};
export declare const SessionTimelineRowBody: React.FC<Props>;
export {};
