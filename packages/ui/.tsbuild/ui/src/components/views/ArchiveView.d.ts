import React from 'react';
/**
 * The archive itself, mounted only while it is on screen, so every open starts
 * fresh. `page` is the desktop surface that replaces the chat area; `mobile`
 * is the single-column list inside the phone's fullscreen surface. `onLeave`
 * runs once an archived session has been opened. `initialQuery` fills the
 * search field, for a sidebar search that found nothing.
 */
export declare function ArchiveSessionsView({ layout, onLeave, initialQuery }: {
    layout: 'page' | 'mobile';
    onLeave: () => void;
    initialQuery?: string;
}): React.ReactNode;
export declare function ArchiveView(): React.ReactNode;
