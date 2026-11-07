import type { Session } from '@/lib/opencode/model';
import type { SessionNode } from '../types';
import type { SidebarSessionLocation } from './sessionLocation';
type SidebarActivityItem = {
    node: SessionNode;
    projectId: string | null;
    groupDirectory: string | null;
    secondaryMeta: {
        projectLabel?: string | null;
        branchLabel?: string | null;
        inSpace?: boolean;
    } | null;
    getSecondaryMeta?: (sessionId: string) => SidebarActivityItem['secondaryMeta'];
};
/**
 * The part of a tree a search shows: a matching session with everything under
 * it, otherwise only the branches that lead to a match, as project groups
 * filter theirs. Null when nothing in the tree matches.
 */
export declare const pruneSessionTreeForSidebarQuery: (node: SessionNode, query: string) => SessionNode | null;
/** Sessions in a tree that answer the query themselves, ancestors kept only as context excluded. */
export declare const countSessionTreeQueryMatches: (node: SessionNode, query: string) => number;
/**
 * The Pinned or In work sessions a search lists, with the matches each one
 * counts. Tree (`'tree'`) looks through the whole session tree, since its
 * one-line rows open to the match and search lists these sessions nowhere
 * else. List (`'session'`) matches the session
 * itself, as its project lists do, since its flat rows cannot show the
 * subsession that matched.
 */
export declare const matchZoneSessionsForSidebarQuery: (zone: readonly Session[], getTree: (session: Session) => SessionNode, query: string, scope: 'tree' | 'session') => {
    sessions: Session[];
    matchCountById: Map<string, number>;
};
export declare const deriveTimelineActivityItems: ({ sessions, getSessionLocation, getSessionNode, query, }: {
    sessions: readonly Session[];
    getSessionLocation: (sessionId: string) => SidebarSessionLocation | null;
    getSessionNode: (session: Session) => SessionNode;
    query: string;
}) => SidebarActivityItem[];
export {};
