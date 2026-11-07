import { type GhosttyCell, type GhosttySnapshot } from './core';
import { type BoxDrawingContext } from './boxDrawing';
/** The canvas operations the renderer uses; a CanvasRenderingContext2D satisfies it structurally. */
export interface GhosttyRenderContext extends BoxDrawingContext {
    readonly canvas: {
        readonly width: number;
        readonly height: number;
    };
    font: string;
    textBaseline: CanvasTextBaseline;
    fillRect(x: number, y: number, w: number, h: number): void;
    strokeRect(x: number, y: number, w: number, h: number): void;
    fillText(text: string, x: number, y: number, maxWidth?: number): void;
    save(): void;
    restore(): void;
    beginPath(): void;
    rect(x: number, y: number, w: number, h: number): void;
    clip(): void;
    resetTransform(): void;
}
export interface GhosttyMeasureContext {
    font: string;
    measureText(text: string): {
        readonly width: number;
        readonly actualBoundingBoxAscent: number;
        readonly actualBoundingBoxDescent: number;
    };
}
export interface GhosttyCellMetrics {
    readonly width: number;
    readonly height: number;
    readonly baseline: number;
}
export interface GhosttyCellRange {
    readonly start: {
        readonly x: number;
        readonly y: number;
    };
    readonly end: {
        readonly x: number;
        readonly y: number;
    };
}
export declare function ghosttyTextRunEnd(cells: readonly GhosttyCell[], start: number, sameStyle: (cell: GhosttyCell) => boolean): number;
export declare function measureGhosttyCell(context: GhosttyMeasureContext, fontSize: number, fontFamily: string): GhosttyCellMetrics;
export interface GhosttyGridSize {
    readonly cols: number;
    readonly rows: number;
}
export declare function terminalGridSize(width: number, height: number, metrics: GhosttyCellMetrics, padding: number): GhosttyGridSize;
export declare function renderGhosttySnapshot(options: {
    readonly context: GhosttyRenderContext;
    readonly snapshot: GhosttySnapshot;
    readonly metrics: GhosttyCellMetrics;
    readonly fontSize: number;
    readonly fontFamily: string;
    readonly padding: number;
    readonly forceFull: boolean;
    readonly cursorOn: boolean;
    readonly previousCursorY?: number | null;
    readonly focused?: boolean;
    readonly selectionBackground?: string;
    readonly hoveredLinkRange?: GhosttyCellRange | null;
    /** Vertical origin of row 0; defaults to the horizontal padding. */
    readonly originY?: number;
}): void;
