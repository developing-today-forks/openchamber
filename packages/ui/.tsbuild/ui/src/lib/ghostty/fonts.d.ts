export declare function quoteFontFamilyName(name: string): string;
/**
 * Normalize a family list into a canvas-safe CSS font-family list, or null
 * when nothing usable remains. Quotes names the shorthand would reject and
 * drops generics that only some engines know.
 */
export declare function canvasFontFamilies(input: string): string | null;
export declare function areFontAdvancesMonospace(advances: readonly number[]): boolean;
/**
 * Whether a family renders every character on the same advance. The cell grid
 * requires this: a proportional face draws its text narrower than its own
 * cells and strands the cursor.
 */
export declare function isMonospaceFamily(family: string): boolean;
