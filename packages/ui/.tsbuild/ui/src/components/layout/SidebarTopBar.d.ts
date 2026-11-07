import React from 'react';
/**
 * Strip at the top of the desktop left sidebar that reserves room for the
 * persistent {@link TitlebarLeftControls} overlay (sidebar toggle), so the
 * session list starts below it. Its height tracks the
 * header via `--oc-header-height`.
 *
 * Split into two regions so the strip stays a window drag area while the
 * overlay buttons remain clickable: a `no-drag` carve matching the overlay
 * footprint (the overlay sits on top of it; an OS drag region here would steal
 * the buttons' clicks, since a separate-subtree `no-drag` can't carve a drag
 * region in Electron/macOS) plus a `drag` remainder for window dragging.
 */
export declare const SidebarTopBar: React.FC;
