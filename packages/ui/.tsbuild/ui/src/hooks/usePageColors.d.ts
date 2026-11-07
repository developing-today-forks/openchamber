import React from 'react';
/**
 * True inside a panel docked beside the chat: the context panel card and the
 * work status card when it is not floating. Such a panel takes the sidebar's
 * colour instead of the chat's (halfway to it in light themes); CSS does that for everything
 * painted with `bg-background` or `var(--surface-background)` (the
 * `.oc-panel-edge` rule in design-system.css). Surfaces that take their
 * colour from the theme object instead (the terminal, extension frames) read
 * it through `usePageColors` so they match the panel they sit in.
 */
export declare const DockedPanelSurfaceContext: React.Context<boolean>;
type PageColors = {
    /** The colour of the page the surface sits on. */
    background: string;
    /** A soft block one step off that page, for extensions' muted surfaces. */
    mutedSurface: string;
};
export declare const usePageColors: () => PageColors;
export {};
