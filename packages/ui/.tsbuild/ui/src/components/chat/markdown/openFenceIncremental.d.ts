export type OpenFencePatch = {
    /** Line elements the painted `<code>` has, as a check before patching. */
    expectLines: number;
    /** Line elements that stay; the rest are replaced by `html`. */
    keepLines: number;
    /** Sanitized HTML of the lines from `keepLines` on. */
    html: string;
};
type RenderedOpenFence = {
    html: string;
    /** The DOM change turning the block painted under `paintedId` into this one. */
    patchFrom?: (paintedId: string) => OpenFencePatch | null;
};
export declare const createOpenFenceRenderer: (sanitize: (html: string) => string) => {
    /**
     * Sanitized HTML of the highlighted open fence `raw`, rendered as block
     * `id`. `unfinishedSource` says the fence text ends inside a line.
     */
    render(raw: string, id: string, unfinishedSource: boolean): RenderedOpenFence;
    reset(): void;
};
/**
 * Shiki ends code that ends in a line break with one more, empty line; for some
 * languages it holds an empty token span. Emptied, it matches the stylesheet's
 * `:empty` rule, which hides it so it gets no number of its own.
 */
export declare const emptyTrailingCodeLine: (code: Element) => void;
/**
 * Applies `patch` to a block painted from an earlier step of the same fence:
 * its finished lines stay, the rest is replaced. False, with the block
 * untouched, when it does not have the shape the patch was made for.
 */
export declare const applyOpenFencePatch: (block: HTMLElement, patch: OpenFencePatch) => boolean;
export {};
