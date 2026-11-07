import React from 'react';
export declare const IPAD_LEFT_SIDEBAR_WIDTH = 320;
export declare const IPAD_RIGHT_SIDEBAR_WIDTH = 380;
/** The workspace panel holds diffs, a file editor and a terminal, so it earns
    far more room than the sessions list ever needs. */
export declare const IPAD_WORKSPACE_SIDEBAR_MAX_WIDTH = 900;
/** Drag-resize for the iPad sidebars: same live-width mechanics as the desktop
    Sidebar (imperative styles during the drag, committed to state at the end),
    but with a finger-sized grab strip instead of a 3px hover handle. */
export declare function useIpadSidebarResize(side: 'left' | 'right', storageKey: string, defaultWidth: number, maxWidth?: number): {
    asideRef: React.RefObject<HTMLElement | null>;
    width: number;
    isResizing: boolean;
    handleProps: {
        onPointerDown: (event: React.PointerEvent) => void;
        onPointerMove: (event: React.PointerEvent) => void;
        onPointerUp: (event: React.PointerEvent) => void;
        onPointerCancel: (event: React.PointerEvent) => void;
    };
};
