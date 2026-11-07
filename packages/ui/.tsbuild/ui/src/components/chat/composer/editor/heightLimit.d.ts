interface ComposerHeightLimitOptions {
    maxLinesHeight: number;
    boundHeight?: number;
    surroundingHeight?: number;
    boundGapPx?: number;
}
export declare function getComposerHeightLimit(options: ComposerHeightLimitOptions): number;
/**
 * Whether the text really outgrew the height cap, so the scroller should
 * offer a vertical scrollbar. Content that fits can still report a pixel or
 * two of overflow (drawn caret, font metrics, rounding), which classic
 * scrollbars on Linux and Windows paint as a useless sliver next to the send
 * button. Real overflow at the cap is at least half a line, so anything
 * smaller is treated as fitting.
 */
export declare function isComposerContentCapped(contentHeight: number, cap: number, lineHeight: number): boolean;
interface ComposerHostHeightLimitOptions {
    maxLinesHeight: number;
    editorHeight: number;
    renderedScrollHeight: number;
    boundHeight?: number;
    branchHeight?: number;
    hostHeight?: number;
    boundGapPx?: number;
}
export declare function getComposerHostHeightLimit(options: ComposerHostHeightLimitOptions): number;
export {};
