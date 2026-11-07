/**
 * How much of the transcript's end the floating composer reserves.
 *
 * The tail spacer keeps the resting composer (the smallest height its slot
 * has measured) plus a gap. A composer that grows (a top row, more lines of
 * text, the mobile pill expanding) takes the gap first and pushes the
 * transcript only past the growth allowance. ChatContainer publishes the
 * result; the mobile composer morph uses the same rule to announce how far
 * the transcript's end really moves when it swaps pill and full composer.
 */
/**
 * Gap between the last transcript row and the resting composer's top edge,
 * on top of the status row reserve. Generous on purpose: the recap note and
 * the rows docked above the composer (context chips, linked references, the
 * queue) land in this band, and a follow glide that trails the live edge
 * should still leave the last line clear of the glass.
 */
export declare const FLOATING_COMPOSER_GAP_PX = 80;
export declare const FLOATING_COMPOSER_DEFAULT_TAIL_INSET_PX: number;
export declare const resolveComposerTailInset: (restingHeight: number, height: number) => number;
/**
 * Records a measured slot height for the column and returns the tail inset
 * and whether the composer is taller than at rest. A zero height (a slot not
 * laid out yet) is not a resting composer.
 */
export declare const recordComposerSlotHeight: (column: HTMLElement, height: number) => {
    tailInset: number;
    grown: boolean;
};
export declare const forgetComposerSlot: (column: HTMLElement) => void;
/** The tail inset the column will publish once its slot measures `height`. */
export declare const composerTailInsetFor: (column: HTMLElement, height: number) => number;
