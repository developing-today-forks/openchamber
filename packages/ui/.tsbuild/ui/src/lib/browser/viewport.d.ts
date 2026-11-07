/**
 * Viewport sizing for the browser panel.
 *
 * The page is rendered at a chosen size and scaled down to fit the panel when
 * it does not. Scaling is visual only: the view still lays out at the chosen
 * width, which is the whole point — a 390px layout has to be measured at 390px,
 * not at whatever the panel happens to be.
 */
export type BrowserViewport = {
    readonly kind: 'fill';
} | {
    readonly kind: 'preset';
    readonly id: string;
    readonly width: number;
    readonly height: number;
} | {
    readonly kind: 'custom';
    readonly width: number;
    readonly height: number;
};
export declare const FILL_VIEWPORT: BrowserViewport;
export declare const MIN_VIEWPORT_SIZE = 240;
export declare const MAX_VIEWPORT_SIZE = 3840;
type ViewportPreset = {
    readonly id: string;
    readonly label: string;
    readonly width: number;
    readonly height: number;
};
/**
 * Sizes worth having, not every device ever made. A long list is harder to pick
 * from than it is useful, and anything missing can be typed in directly.
 */
export declare const VIEWPORT_PRESETS: readonly ViewportPreset[];
export declare const clampViewportSize: (value: number) => number;
export declare const viewportSize: (viewport: BrowserViewport) => {
    width: number;
    height: number;
} | null;
/** Turns a preset id into a viewport, or null when the id is unknown. */
export declare const presetViewport: (id: string) => BrowserViewport | null;
export declare const rotateViewport: (viewport: BrowserViewport) => BrowserViewport;
type ViewportLayout = {
    /** Size to lay the page out at, in CSS pixels. */
    readonly width: number;
    readonly height: number;
    /** Visual scale, ≤ 1. Applied with a transform; the page never learns of it. */
    readonly scale: number;
};
/**
 * Fits a chosen viewport into the space available.
 *
 * Only ever scales down. Enlarging a small viewport to fill a big panel would
 * misrepresent the very thing the user asked to see.
 */
export declare const fitViewport: (viewport: BrowserViewport, available: {
    width: number;
    height: number;
}) => ViewportLayout | null;
/** Label for the current viewport, for the size control. */
export declare const describeViewport: (viewport: BrowserViewport) => string;
/**
 * The vocabulary the agent gets.
 *
 * Named sizes rather than pixel dimensions: an agent asked to "check the mobile
 * layout" should not have to invent a width, and a number it invented tells the
 * user nothing about what was actually checked.
 */
declare const VIEWPORT_MODES: readonly ['mobile', 'tablet', 'desktop', 'fill'];
type BrowserViewportMode = (typeof VIEWPORT_MODES)[number];
export declare const isViewportMode: (value: unknown) => value is BrowserViewportMode;
export declare const viewportForMode: (mode: BrowserViewportMode) => BrowserViewport;
/**
 * Reports the current viewport in the agent's own vocabulary, so a snapshot
 * states which layout it describes.
 */
export declare const viewportSummary: (viewport: BrowserViewport) => {
    mode: BrowserViewportMode | 'custom';
    width: number | null;
    height: number | null;
};
export {};
