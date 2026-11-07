import React from 'react';
type Props = {
    onOpenSettings: () => void;
    onOpenShortcuts: () => void;
    onOpenAbout: () => void;
    onOpenUpdate: () => void;
    showRuntimeButtons?: boolean;
    showUpdateButton?: boolean;
};
export declare function SidebarFooter({ onOpenSettings, onOpenShortcuts, onOpenAbout, onOpenUpdate, showRuntimeButtons, showUpdateButton, }: Props): React.ReactNode;
export {};
