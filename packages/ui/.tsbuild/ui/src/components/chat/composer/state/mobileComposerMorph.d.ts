/**
 * The pill ↔ full-composer morph (Capacitor iOS).
 *
 * The swap between the collapsed pill and the full composer is a React
 * conditional: one tree unmounts, the other mounts, and the glass box changes
 * height in a single frame. Left alone that is a visible jump — the box, and
 * the pinned transcript above it, snap by the height difference before the
 * keyboard has even started moving.
 *
 * The morph is a FLIP over that swap: the swap commits at once, then the box is frozen at its old
 * height and animated to the new one with its contents anchored to the
 * bottom edge (the footer icon row and the model/agent row stay where the
 * pill's rows were), the prompt travels from where it was to where it is
 * (the pill's text line rises into the editor, or the editor's first line
 * drops into the pill), gained editor lines unfurl beneath it, and the
 * footer controls that only exist expanded fade in once the box has mostly
 * grown. Everything is measured after the swap, so old and new geometry are
 * both real.
 *
 * The transcript never chases the box: the composer slot is pinned for the
 * tween at the height the transcript should see (the new one on expand, the
 * old one on collapse, since the transcript's end may only shrink once the
 * keyboard has landed), so the slot's ResizeObserver publishes one final
 * inset and keyboardFollowGlide moves scrollTop on the keyboard's curve.
 *
 * The motion is timed to the keyboard: it starts on the `oc:keyboard-anim`
 * event for its direction and runs on the keyboard's shared duration and
 * curve (mobileKeyboardTiming.ts); it ends on the keyboard's settled event.
 * A fallback timer runs it alone when no keyboard event follows (an expand
 * that raises no keyboard, a collapse without a keyboard transition).
 *
 * Only the native iOS shell morphs. Mobile browsers rely on Safari's own
 * reveal scroll; Android resizes the window natively and is not verified
 * against this; reduced motion keeps the instant swap.
 */
export type ComposerMorphDirection = 'expand' | 'collapse';
export interface ComposerMorphController {
    /**
     * Run `swap` (which must commit the pill ↔ composer change synchronously,
     * i.e. via flushSync) as a morph of the box found under `host`. Falls
     * back to a plain swap when the morph is unsupported or there is nothing
     * to measure.
     */
    run: (direction: ComposerMorphDirection, host: HTMLElement | null, swap: () => void) => void;
    /** Abort an in-flight morph and restore the natural layout. */
    cancel: () => void;
}
export declare function createComposerMorphController(): ComposerMorphController;
