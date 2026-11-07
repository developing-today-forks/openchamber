import { type SessionLookup } from "./scoped-blocking-requests";
/**
 * Where every blocking-request lineage reads session records: the directory
 * stores first, then the global session list. A directory store drops its
 * oldest sessions past its limit, and the global list still holds a parent the
 * store dropped before its subagent asked. Docks and the alerts about a request
 * both use this lookup, so they agree on where the request is answered.
 */
export declare const sessionRecordLookup: () => SessionLookup;
/**
 * The session a permission request or form is answered from: the last one in
 * its lineage, the highest session above the one that raised it that still
 * runs in the same directory, whose composer docks it. `directory` is the
 * asking session's own, or null when no record of that session, or no
 * directory on it, is held.
 */
export declare const resolveBlockingRequestRoot: (sessionID: string) => {
    sessionID: string;
    directory: string | null;
};
