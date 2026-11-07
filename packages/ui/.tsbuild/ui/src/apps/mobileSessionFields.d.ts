import type { Session } from '@/lib/opencode/model';
/** Field readers shared by the mobile sessions sheet and its timeline list.
    Kept out of the sheet so the timeline list can read the same session
    fields without importing the sheet (which imports the list). */
export declare const getParentId: (session: Session) => string | null;
export declare const getSessionDirectory: (session: Session) => string;
/** The last conversation, the time the lists order by; a rename does not move it. */
export declare const getSessionTimestamp: (session: Session) => number;
export declare const formatRelativeShort: (timestamp: number) => string;
