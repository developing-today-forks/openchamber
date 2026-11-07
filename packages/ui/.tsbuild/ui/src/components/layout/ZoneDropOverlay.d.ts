import React from 'react';
/**
 * The drop targets while a surface is dragged, over a scrim, and a chip with
 * its name under the pointer. Pointer-transparent: the drag source keeps the gesture. The
 * chip follows the pointer by writing its own transform, so a drag renders
 * React only when the hovered target changes.
 */
export declare const ZoneDropOverlay: React.FC;
