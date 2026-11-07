import type { Session } from '@/lib/opencode/model';
import { type SessionAttentionState, type SidebarLayout, type SidebarZoneKey } from '@/stores/sidebarLayout';
/** What the attention zones read about a top-level session and its subsessions. */
export type SessionLiveState = {
    state: SessionAttentionState;
    /** A finished turn the user has not looked at yet. */
    unread: boolean;
};
/** The zones sessions are listed in; Chats and the projects list their sessions themselves. */
export type SidebarSessionZoneKey = Exclude<SidebarZoneKey, 'chats'>;
/** Where the open session is held while it stays open: a zone, or none (its project only). */
export type HeldZonePlacement = {
    sessionId: string;
    zone: SidebarSessionZoneKey | null;
};
export type SidebarZonePartitionArgs = {
    /** Top-level, unarchived sessions in the shared lifecycle order, Chats included. */
    roots: readonly Session[];
    layout: SidebarLayout;
    showPinnedZone: boolean;
    showWorkZone: boolean;
    isPinned: (session: Session) => boolean;
    isInWork: (session: Session) => boolean;
    isChat: (session: Session) => boolean;
    liveStateById: ReadonlyMap<string, SessionLiveState>;
    held: HeldZonePlacement | null;
};
export type SidebarZonePartition = {
    sessionsByZone: ReadonlyMap<SidebarSessionZoneKey, readonly Session[]>;
    /** Every listed session's zone, the held session's included. */
    zoneBySessionId: ReadonlyMap<string, SidebarSessionZoneKey>;
    /** Where each session would be without the hold: the hold compares against it. */
    naturalZoneBySessionId: ReadonlyMap<string, SidebarSessionZoneKey>;
};
/**
 * Sessions the user follows are those the Pinned and In work zones list.
 * Those that need the user (an approval, a question, an error, a stop) or,
 * with "everything not running", every one that is not running, move to the
 * attention zone the layout names for that state. The other sessions, Chats
 * included, join an attention zone only when the layout asks for them, and
 * the active ones get a zone of their own when asked. Every session sits in
 * at most one zone; the zones stay in the lifecycle order of `roots`.
 */
export declare const partitionSidebarZones: (args: SidebarZonePartitionArgs) => SidebarZonePartition;
/**
 * The partition again when nothing changed: same zones holding the same
 * sessions in the same order. Session records may have changed underneath;
 * zone items are built from them, so a changed record is a change.
 */
export declare const reuseUnchangedPartition: (previous: SidebarZonePartition | null, next: SidebarZonePartition) => SidebarZonePartition;
