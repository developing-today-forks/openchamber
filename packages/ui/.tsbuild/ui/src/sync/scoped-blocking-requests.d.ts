import type { Session } from "@/lib/opencode/model";
type BlockingRequest = {
    id: string;
};
/** The record of a session, or nothing when none is held. */
export type SessionLookup = (sessionID: string) => Session | undefined;
export declare const computeSubtreeIds: (sessions: Session[], rootId: string) => Set<string>;
/**
 * The sessions whose composer docks a permission request or form raised in
 * `sessionID`: that session, then each ancestor above it that runs in the same
 * directory, nearest first. A subagent moved to another directory takes its
 * requests to that directory's store, which no dock above the move reads, so
 * the walk stops before an ancestor in another directory. It also stops at a
 * parent `lookup` holds no record of. Docks and the alerts about a request
 * both read this one lineage, so an alert opens a session whose dock shows
 * the request.
 */
export declare const blockingRequestLineage: (sessionID: string, lookup: SessionLookup) => string[];
/** The request comes from a subagent below the viewed session, at any depth. */
export declare const isSubagentRequest: (requestSessionId: string, viewedSessionId: string | null, lookup: SessionLookup) => boolean;
export declare const areRequestArraysReferentiallyEqual: <T extends BlockingRequest>(left: T[], right: T[]) => boolean;
/**
 * The requests the composer of `sessionID` docks: each one whose lineage
 * reaches that session, its own first and a nearer subagent's before a farther
 * one's.
 */
export declare const collectScopedBlockingRequests: <T extends BlockingRequest>(requestsBySession: Record<string, T[] | undefined>, sessionID: string | null, lookup: SessionLookup, empty: T[]) => T[];
export {};
