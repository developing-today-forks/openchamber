import type { Session } from '@/lib/opencode/model';
import type { SidebarSessionZoneKey } from './sidebarZones';
/**
 * What the sidebar draws differently from the live order for the open
 * session: its zone and its rank, each only while it differs from where the
 * session would be now. Null while nothing differs, so the sidebar re-renders
 * only when the open session's place has actually moved under it.
 */
type OpenSessionOverride = {
    sessionId: string;
    /** Present while the held zone differs from the live one; null holds it out of every zone. */
    zone?: SidebarSessionZoneKey | null;
    rank?: number;
};
type HoldInputs = {
    enabled: boolean;
    sessionById: ReadonlyMap<string, Session>;
    naturalZoneBySessionId: ReadonlyMap<string, SidebarSessionZoneKey>;
    pinnedSessionIds: Set<string>;
};
/** What the sidebar must draw differently for the open session; read before the collection is ordered. */
export declare const useOpenSessionOverride: () => OpenSessionOverride | null;
/**
 * Keeps the open session where it was while it stays open: everything
 * underneath (zone membership, the live order) moves as usual, and the
 * session takes its live place as soon as another session opens.
 * Selection is followed with a store subscription, so opening a session does
 * not re-render the sidebar unless its drawn place changes.
 */
export declare const useOpenSessionHoldTracking: (next: HoldInputs) => void;
/** Holds the open session where it is now, for "keep the row until I leave" after Done. */
export declare const holdOpenSessionForDone: (sessionId: string) => void;
/** Lets the open session move at once; the returned function holds it again. */
export declare const releaseOpenSession: (sessionId: string) => (() => void);
/** Sessions opened before the current one, newest last. */
export declare const getOpenedSessionHistory: () => readonly string[];
export {};
