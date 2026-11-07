import type { SessionNode } from '../types';
export type CollapsedActivityState = 'permission' | 'form' | 'active' | 'unread' | null;
export declare const getSessionNodesActivityState: (nodes: SessionNode[], activeSessionIds: Set<string>, unreadSessionIds: Set<string>, includeUnreadSubtasks: boolean) => CollapsedActivityState;
type SessionActivityProps = {
    nodes: readonly SessionNode[];
    blockingSessionIds?: readonly string[];
    includeUnreadSubtasks: boolean;
};
export declare const useCollapsedSessionActivityState: ({ nodes, blockingSessionIds, includeUnreadSubtasks, enabled, }: SessionActivityProps & {
    enabled?: boolean;
}) => CollapsedActivityState;
export {};
