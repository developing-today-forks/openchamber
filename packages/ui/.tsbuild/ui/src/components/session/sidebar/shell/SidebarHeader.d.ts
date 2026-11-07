import React from 'react';
type Props = {
    hideDirectoryControls: boolean;
    showProjectDisplayControls: boolean;
    showSectionControls: boolean;
    handleOpenDirectoryDialog: () => void;
    /** Whether the issues and pull requests board is offered. */
    showSourceBoard: boolean;
    headerActionIconClass: string;
    headerActionButtonClass: string;
    isSessionSearchOpen: boolean;
    openSessionSearch: () => void;
    /** Hides the field and drops its query. */
    closeSessionSearch: () => void;
    sessionSearchInputRef: React.RefObject<HTMLInputElement | null>;
    sessionSearchQuery: string;
    setSessionSearchQuery: (value: string) => void;
    hasSessionSearchQuery: boolean;
    searchMatchCount: number;
    collapseAll: () => void;
    expandAll: () => void;
};
export declare function SidebarHeader(props: Props): React.ReactNode;
export {};
