/** Space the image keeps from the viewer's edges, in CSS pixels (Tailwind `p-3`). */
export declare const IMAGE_VIEWPORT_PADDING = 12;
type Size = {
    width: number;
    height: number;
};
/** The scale fit shows the image at: whole inside the viewer, never upscaled. */
export declare const fitImageScale: (natural: Size, viewport: Size) => number;
/** Keeps a zoom inside its range; a huge image may go below the floor as far as its fit. */
export declare const clampImageScale: (scale: number, fitScale: number) => number;
/** The next preset level from the current scale, the way the − and + buttons step. */
export declare const stepImageScale: (scale: number, direction: 1 | -1) => number;
/**
 * Scale factor for one zoom wheel event. A trackpad pinch sends many small
 * deltas, a mouse wheel notch one large one; capping the delta keeps a notch
 * from jumping several levels at once.
 */
export declare const wheelZoomFactor: (deltaY: number, deltaMode: number) => number;
export {};
