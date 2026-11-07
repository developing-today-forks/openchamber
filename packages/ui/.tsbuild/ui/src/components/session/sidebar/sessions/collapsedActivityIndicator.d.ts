import React from 'react';
import type { SessionNode } from '../types';
import { type CollapsedActivityState } from './collapsedActivityState';
export declare function CollapsedActivityIndicator({ state, className, }: {
    state: Exclude<CollapsedActivityState, null>;
    className?: string;
}): React.ReactNode;
export declare const CollapsedSessionActivityIndicator: React.FC<{
    nodes: SessionNode[];
    blockingSessionIds?: readonly string[];
    includeUnreadSubtasks: boolean;
}>;
