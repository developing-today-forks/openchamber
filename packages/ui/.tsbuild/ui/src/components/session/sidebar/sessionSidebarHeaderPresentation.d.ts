import React from 'react';
import type { SessionSidebarActivityKey } from './sessionSidebarRowModel';
import type { SortableDragHandleProps } from './projects/sortableItems';
export declare const SessionSidebarActivityHeader: React.FC<{
    activityKey: SessionSidebarActivityKey;
    collapsed: boolean;
    forceExpanded: boolean;
    alwaysShowActions: boolean;
    /** Sessions in the zone, shown after its title; attention zones only. */
    count?: number;
    /** Set while the header can be dragged to reorder the sections. */
    dragHandleProps?: SortableDragHandleProps;
    onToggle: () => void;
    onNewChat: () => void;
}>;
