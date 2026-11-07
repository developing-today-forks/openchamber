import React from 'react';
/**
 * Lets the active context-panel surface put its own toolbar into the panel
 * header instead of stacking a second row under it. ContextPanel provides the
 * header element only to the surface on screen; everywhere else (inactive
 * tabs, the mobile drawer, other hosts) the value is null and the toolbar
 * renders inline where it always did.
 */
export declare function ContextPanelHeaderSlotProvider({ value, children }: {
    value: HTMLElement | null;
    children: React.ReactNode;
}): React.ReactNode;
/**
 * Renders `children` into the panel header when a slot is provided, otherwise
 * in place. The header hides its own mode label while a toolbar is present
 * (`data-context-panel-toolbar`), so a surface that renders no toolbar — an
 * empty or loading state — still leaves the header named.
 */
export declare function ContextPanelHeaderToolbar({ children }: {
    children: React.ReactNode;
}): React.ReactNode;
