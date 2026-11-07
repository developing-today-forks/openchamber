import React from 'react';
export declare const MobileHeader: React.FC<{
    onOpenSessions: () => void;
    /** Opens the right workspace drawer (Changes / Files / Terminal / Notes / MCP). */
    onOpenWorkspace: () => void;
    /** Tablet: size the title trigger to its text instead of the free width, so
        a wide header doesn't turn the switcher into a full-width tap target. */
    compactTitle?: boolean;
}>;
