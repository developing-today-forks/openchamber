import React from 'react';
interface SessionSidebarProps {
    isVisible?: boolean;
    mobileVariant?: boolean;
    onSessionSelected?: (sessionId: string) => void;
    allowReselect?: boolean;
    hideDirectoryControls?: boolean;
    showOnlyMainWorkspace?: boolean;
}
export declare const SessionSidebar: React.NamedExoticComponent<SessionSidebarProps>;
export {};
