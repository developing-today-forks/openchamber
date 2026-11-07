import React from 'react';
interface SidebarGroupProps {
    /** Group display label (e.g. "business", "automation-ai") */
    label: string;
    /** Number of items in this group */
    count: number;
    /** Unique storage key prefix for persisting collapse state */
    storageKey: string;
    /** Whether to start expanded. Defaults to true. */
    defaultExpanded?: boolean;
    children: React.ReactNode;
}
/**
 * Collapsible sidebar group with persisted expand/collapse state.
 * Used in Agents and Skills sidebars to group items by subfolder.
 */
export declare const SidebarGroup: React.FC<SidebarGroupProps>;
export {};
