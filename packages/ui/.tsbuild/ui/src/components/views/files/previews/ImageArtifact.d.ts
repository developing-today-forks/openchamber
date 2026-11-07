import React from 'react';
/** A neighbouring image of the same folder and how to show it. */
export type ImageNeighbor = {
    name: string;
    open: () => void;
};
/**
 * An image the way a designer looks at one: whole first, then closer. Fit never
 * upscales, so a small icon stays its real size instead of blurring across the
 * panel. Zoom follows the pointer: Ctrl/⌘ + wheel or a trackpad pinch
 * (Chromium, Firefox), WebKit gesture events (Safari), a two-finger touch pinch,
 * the − and + steps, or a double-click between fit and 1:1. A zoomed image
 * larger than the viewer pans by dragging.
 *
 * With `neighbors`, arrows at the viewer's edges and the arrow keys (while the
 * viewer has focus and the image is at fit; zoomed, the keys keep scrolling)
 * show the previous and next image of the folder.
 */
export declare const ImageArtifact: React.FC<{
    src: string;
    name: string;
    sizeBytes: number | null;
    neighbors?: {
        previous: ImageNeighbor;
        next: ImageNeighbor;
    } | null;
}>;
