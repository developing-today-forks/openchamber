import React from 'react';
/**
 * Persistent titlebar controls at the start of the line (app menu on frameless
 * chrome + sidebar toggle): top left, or top right in a right-to-left locale.
 *
 * Rendered exactly once as an absolutely-positioned overlay above both the
 * sidebar and the header, so the buttons never migrate / re-mount between the
 * two while the sidebar animates open or closed — the panels slide *underneath*
 * a fixed control cluster instead. Its height tracks `--oc-header-height` and
 * its start padding clears the OS window controls via `--oc-titlebar-start-inset`.
 * The cluster's measured width is published as `--oc-titlebar-controls-width`
 * onto the elements that reserve room for it (`titlebarControlsWidth.ts`), so
 * the header can reserve matching space when the sidebar is collapsed.
 */
export declare const TitlebarLeftControls: React.FC;
