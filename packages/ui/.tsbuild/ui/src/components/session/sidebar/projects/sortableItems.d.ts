import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
export type SortableDragHandleProps = {
    listeners: ReturnType<typeof useSortable>['listeners'];
    setActivatorNodeRef: ReturnType<typeof useSortable>['setActivatorNodeRef'];
};
type ProjectIdentityProps = {
    id: string;
    projectLabel: string;
    projectIcon?: string;
    projectColor?: string;
    projectIconImage?: {
        mime: string;
        updatedAt: number;
        source: 'custom' | 'auto';
    };
    projectIconBackground?: string;
};
type ProjectPickerOption = ProjectIdentityProps & {
    projectDescription: string;
};
interface SortableProjectItemProps extends ProjectIdentityProps {
    disabled?: boolean;
    projectDescription: string;
    projectDirectory?: string;
    isCollapsed: boolean;
    isRepo: boolean;
    hideDirectoryControls: boolean;
    mobileVariant: boolean;
    alwaysShowActions: boolean;
    onToggle: () => void;
    onNewSession: () => void;
    onNewWorktreeSession?: () => void;
    onManageWorktrees?: () => void;
    /** The project's isolated spaces page; absent while the feature is off, and always in VS Code. */
    onManageSpaces?: () => void;
    /** The issues and PRs board on this project's repository; absent in VS Code. */
    onOpenSourceBoard?: () => void;
    onOpenFolder?: () => void;
    onRenameStart: () => void;
    /** Archives the project's sessions except pinned, running and In work ones. */
    onArchiveAll?: () => void;
    onClose: () => void;
    children?: React.ReactNode;
    showCreateButtons?: boolean;
    hideHeader?: boolean;
    /** Aggregated activity/attention indicator shown while the project is collapsed. */
    statusIndicator?: React.ReactNode;
    openSidebarMenuKey: string | null;
    setOpenSidebarMenuKey: (key: string | null) => void;
    projectPickerOptions?: ProjectPickerOption[];
    onProjectSelect?: (projectId: string) => void;
}
export declare const SortableProjectItem: React.FC<SortableProjectItemProps>;
export declare const SortableGroupItem: React.NamedExoticComponent<{
    id: string;
    disabled?: boolean;
    children: (dragHandleProps: SortableDragHandleProps) => React.ReactNode;
}>;
export {};
