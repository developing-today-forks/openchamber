import type { SessionLiveState } from './sidebarZones';
/** A top-level session whose live state the zones need, with its subsessions. */
export type LiveStateCandidate = {
    id: string;
    treeIds: readonly string[];
};
/**
 * The live state of each candidate, from the live channels only: the
 * cross-directory request index (a subagent's request blocks its whole
 * family), the global busy index and background commands, the outcome the
 * server recorded for the session's last turn, and unseen finished turns.
 *
 * Each store is read through a selector that returns a string, so a store
 * publishing for unrelated sessions re-renders nothing; the map changes only
 * when a candidate's state does. These stores publish on lifecycle events
 * (a turn starts or ends, a request arrives or is answered), never per
 * streamed token.
 */
export declare const useSidebarLiveStates: (candidates: readonly LiveStateCandidate[], options: {
    enabled: boolean;
    readUnread: boolean;
}) => ReadonlyMap<string, SessionLiveState>;
