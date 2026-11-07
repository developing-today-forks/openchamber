import React from 'react';
import type { IconName } from "@/components/icon/icons";
interface SettingsSidebarItemAction {
    /** Label shown in dropdown menu */
    label: string;
    /** Icon component to show before label */
    icon?: IconName;
    /** Callback when action is clicked */
    onClick: () => void;
    /** If true, uses destructive styling (red text) */
    destructive?: boolean;
}
interface SettingsSidebarItemProps {
    /** Primary title text */
    title: React.ReactNode;
    /** Secondary metadata text (shown below title) */
    metadata?: React.ReactNode;
    /** Whether this item is currently selected */
    selected?: boolean;
    /** Callback when item is clicked */
    onSelect: () => void;
    /** Optional icon to show before title */
    icon?: React.ReactNode;
    /** Actions shown in dropdown menu. If empty/undefined, no dropdown is shown. */
    actions?: SettingsSidebarItemAction[];
    /** Additional className for the outer container */
    className?: string;
}
/**
 * Standard list item for settings sidebars.
 * Provides consistent styling for title, metadata, selection state, and optional actions dropdown.
 *
 * @example
 * <SettingsSidebarItem
 *   title={agent.name}
 *   metadata={agent.description}
 *   selected={selectedId === agent.id}
 *   onSelect={() => setSelectedId(agent.id)}
 *   icon={<'robot' className="h-4 w-4" />}
 *   actions={[
 *     { label: 'Duplicate', icon: 'file-copy', onClick: handleDuplicate },
 *     { label: 'Delete', icon: 'delete-bin', onClick: handleDelete, destructive: true },
 *   ]}
 * />
 */
export declare const SettingsSidebarItem: React.FC<SettingsSidebarItemProps>;
export {};
