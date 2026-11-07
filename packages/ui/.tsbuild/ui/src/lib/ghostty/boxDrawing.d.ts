import type { GhosttyColor } from './core';
/**
 * Procedural glyphs for the cell-filling symbols TUI apps draw borders and
 * bars with: Box Drawing (U+2500–U+257F), Block Elements (U+2580–U+259F) and
 * the Powerline arrows (U+E0B0–U+E0B3). A font draws these only as tall as
 * its own em box, so at the terminal's 1.35 em line height every border and
 * every logo built from block characters shows a strip of background between
 * rows. Native terminals draw them to the exact cell instead; so does this.
 */
export interface BoxDrawingContext {
    fillStyle: string | CanvasGradient | CanvasPattern;
    strokeStyle: string | CanvasGradient | CanvasPattern;
    lineWidth: number;
    lineCap: CanvasLineCap;
    fillRect(x: number, y: number, w: number, h: number): void;
    beginPath(): void;
    moveTo(x: number, y: number): void;
    lineTo(x: number, y: number): void;
    quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void;
    closePath(): void;
    fill(): void;
    stroke(): void;
}
export interface BoxDrawingCell {
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
}
/** Whether a cell's text is a single symbol this module draws instead of the font. */
export declare function isBoxDrawingText(text: string): boolean;
/**
 * Draw one symbol into its cell. Returns false when the code point is not a
 * symbol this module owns, so the caller falls back to the font.
 */
export declare function drawBoxDrawingGlyph(context: BoxDrawingContext, text: string, cell: BoxDrawingCell, color: GhosttyColor): boolean;
