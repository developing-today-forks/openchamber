/**
 * Keeps a pinned transcript on its end THROUGH the mobile keyboard and
 * composer transitions with one continuous scroll motion.
 *
 * The transcript's geometry (the composer's tail spacer, the scroller's
 * keyboard padding) changes in single steps: the composer swaps size in one
 * commit, the keyboard strip is reserved in one write. Left to the pinned-end
 * observer, each step is an instant scrollTop snap — the staircase. Here the
 * observer is held while a transition runs, the geometry is allowed to land
 * in its final state at once, and scrollTop itself is driven frame by frame
 * from where it was to where the end now is, on the keyboard's curve. The
 * composer slides and unfolds on the same curve, so all three move as one.
 *
 * Show: geometry grows first (spacer at the swap, padding at willShow), the
 * viewport glides up to the new end. Hide: geometry is kept until the
 * keyboard has landed, the viewport glides down to where the end WILL be
 * (current end minus the keyboard strip minus the composer's shrink), and
 * the settle snap then only clamps scrollTop to the value it already has.
 *
 * Event contract:
 *  - `oc:composer-morph` (mobileComposerMorph): `hold` at the swap with the
 *    tail inset's delta; `glide` when the morph runs without a keyboard;
 *    `release` when such a morph ends.
 *  - `oc:keyboard-anim` / `oc:keyboard-settled` (useNativeMobileChrome):
 *    start the glide for a keyboard leg and release the hold when it lands.
 */
export interface ComposerMorphEventDetail {
    phase: 'hold' | 'glide' | 'release';
    direction: 'expand' | 'collapse';
    /** How far the transcript's end moves: the change of the composer's tail inset, in px. */
    delta: number;
    durationMs: number;
}
export interface KeyboardFollowGlideOptions {
    scrollNode: HTMLElement;
    /** The reader is pinned to the end and nothing else owns the scroll. */
    canFollow: () => boolean;
}
export interface KeyboardFollowGlide {
    /** A transition is in flight: end pinning must yield to the glide. */
    isHeld: () => boolean;
    dispose: () => void;
}
export declare function createKeyboardFollowGlide(options: KeyboardFollowGlideOptions): KeyboardFollowGlide;
