/**
 * Width animations of the columns beside the chat: the session sidebar and
 * the right slot (context panel and work-status card).
 *
 * While one runs, the chat column changes width on every frame and the
 * transcript re-wraps. Work that measures layout to follow a width (markdown
 * table column widths, the active-turn spy) would force a layout of the
 * transcript on every one of those frames, so it waits for the animation to
 * end and runs once, at the final width. The pinned end is the exception: it
 * is held on every frame, since a reader would see it slide away.
 *
 * The flag is also published as `data-panel-animating` on the document root,
 * for profiling and probes only. No stylesheet may select on it: an attribute
 * on the root that a selector reads restyles the whole document when it flips.
 */
/**
 * Duration of both side columns' width animation, kept in sync. Components
 * read it through `useLayoutAnimationMs`, which is zero when the user turned
 * the animations off (`layoutAnimations`, Settings › General › Navigation).
 */
export declare const LAYOUT_ANIMATION_MS = 240;
/**
 * Their timing function, which starts slow. A column has its final width from
 * the first frame and the moving edge uncovers it; at 120 ms ease-out the
 * first frames uncovered a zone's leading column (the file tree beside the
 * editor) at once and the rest crept in after it, which read as two steps.
 */
export declare const LAYOUT_ANIMATION_EASING = "cubic-bezier(0.4, 0, 0.2, 1)";
export declare const isLayoutAnimating: () => boolean;
/** Readers who asked for reduced motion get no width animation at all. */
export declare const prefersReducedMotion: () => boolean;
/**
 * Marks a side-column width animation that starts now. It ends one frame after
 * `durationMs` (at once with reduced motion) counted from the next frame, when
 * the transition begins, so it ends after the transition has drawn its last
 * frame; a second call while one runs extends it. Counted from the call, it
 * ended while the transition still ran whenever the toggle's own frame was
 * slow (40 to 60 ms), and the work waiting for the end stalled the
 * animation just short of its final width.
 */
export declare const beginLayoutAnimation: (durationMs?: number) => void;
/**
 * Called when an animation starts while none runs, before the browser lays
 * out its first frame, so a listener can note the state it starts from.
 */
export declare const onLayoutAnimationStart: (listener: () => void) => (() => void);
/**
 * Runs `task` now, or once the running animation has ended. The same function
 * queued several times during one animation runs once.
 */
export declare const runWhenLayoutSettled: (task: () => void) => void;
/** Drops a queued task, for an owner that goes away before the animation ends. */
export declare const cancelWhenLayoutSettled: (task: () => void) => void;
