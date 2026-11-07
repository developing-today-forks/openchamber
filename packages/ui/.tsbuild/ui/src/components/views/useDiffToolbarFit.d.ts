import React from 'react';
/**
 * Collapses a toolbar step by step only while its row does not fit.
 *
 * The steps are attributes set on the toolbar in order, each hiding more (the
 * CSS is in `index.css`). A step is taken only while the row overflows or one
 * of its texts that may truncate (`clippedText`) is cut off, so labels go
 * before a branch name is clipped.
 *
 * CSS container breakpoints cannot do this: the row's content changes with the
 * scope (a base picker, a pull request picker, a count) and with the language,
 * so a fixed width either hides labels that fit or lets the row overflow and
 * the icons at its end overlap.
 *
 * Measuring forces a layout, so after a render it runs only when the row
 * mounted or its text changed; a resize or a web font loading refits through
 * the listeners.
 */
interface ToolbarFit {
    steps: readonly string[];
    /** Texts whose truncation counts as not fitting; none when omitted. */
    clippedText?: string;
    /** Steps taken only while the row overflows, whatever `clippedText` says. */
    overflowSteps?: readonly string[];
}
/**
 * The controls that move into the diff toolbar's "More actions" menu, one
 * step each: the view options from the end of the row, then, when the row
 * still does not fit (a repository picker at the narrowest widths), the
 * walkthrough, which the rail opens as well.
 */
export declare const DIFF_TOOLBAR_MENU_STEPS: {
    readonly layout: 'data-diff-toolbar-more-layout';
    readonly whitespace: 'data-diff-toolbar-more-whitespace';
    readonly wrap: 'data-diff-toolbar-more-wrap';
    readonly tree: 'data-diff-toolbar-more-tree';
    readonly walkthrough: 'data-diff-toolbar-more-walkthrough';
};
export declare const useToolbarFit: (ref: React.RefObject<HTMLElement | null>, fit: ToolbarFit) => void;
export declare const useDiffToolbarFit: (ref: React.RefObject<HTMLElement | null>) => void;
export declare const fitToolbar: (container: HTMLElement, { steps, clippedText, overflowSteps }?: ToolbarFit) => void;
export {};
