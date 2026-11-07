/** Compose alpha before measuring; a tinted surface is not a solid status color. */
export declare function contrastRatio(foreground: string, background: string, canvas?: string): number | null;
/** Keep a readable author color; otherwise move it toward the readable neutral. */
export declare function readableText(foreground: string, background: string, canvas?: string): string;
export declare function onColor(background: string, canvas: string): string;
export declare function withOpacity(value: string, alpha: number): string;
export declare function mixColor(foreground: string, background: string, amount: number, canvas?: string): string;
/** Move a surface toward an accent's hue and chroma while keeping its own
 * perceptual lightness, so a tint adds color without becoming a brighter patch. */
export declare function tintColor(accent: string, surface: string, amount: number, canvas?: string): string;
/** Perceptual hue/chroma separation after alpha composition; brightness alone
 * must not turn two nearly identical status hues into a distinct pair. */
export declare function chromaticDistance(first: string, second: string, background: string, canvas: string): number | null;
/** Hue of a painted color; near-neutral colors have no semantic hue. */
export declare function colorHue(value: string, canvas: string): number | null;
