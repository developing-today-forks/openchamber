import React from 'react';
import type { Session } from '@/lib/opencode/model';
type Args = {
    enabled?: boolean;
    currentSessionId: string | null;
    sortedSessions: Session[];
    /** Sessions in work, in their block's order: their neighbours there are prefetched too. */
    workSessions?: readonly Session[];
    prefetchSession: (target: {
        directory: string;
        sessionID: string;
    }) => Promise<void>;
};
type PrefetchTarget = Pick<Session, 'id' | 'directory'>;
/**
 * Speculative message loads a session row asks for while the pointer rests on
 * it or it has keyboard focus. Both go through the same delay, concurrency cap
 * and dedupe as the neighbour prefetch.
 */
export type SessionHoverPrefetch = {
    schedule: (session: PrefetchTarget) => void;
    cancel: (session: PrefetchTarget) => void;
};
/** Null outside the sidebar's prefetch owner, where rows do not prefetch on hover. */
export declare const useSessionHoverPrefetch: () => SessionHoverPrefetch | null;
export declare const useSessionPrefetch: ({ enabled, currentSessionId, sortedSessions, workSessions, prefetchSession }: Args) => SessionHoverPrefetch;
/**
 * Owns the sidebar's speculative message loads: the rows next to the open
 * session, and a row the pointer rests on or focus reaches. Kept in its own
 * component so the open-session subscription re-renders only this owner, not
 * the rows it provides for.
 */
export declare const SessionPrefetchProvider: React.FC<Omit<Args, 'currentSessionId'> & {
    children: React.ReactNode;
}>;
export {};
