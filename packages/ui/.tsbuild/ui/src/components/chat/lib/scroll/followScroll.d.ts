export declare const GLIDE_START_GRACE_MS = 50;
interface FollowGlideProgress {
    readonly lastTop: number;
    readonly issuedAt: number;
    readonly stateEnd: number;
}
/**
 * Whether a follow glide is still under way and should be left to finish,
 * decided from the list's state alone so these frames read no layout. A glide
 * is re-issued once the end moved on (re-issuing restarts the animation, so
 * only then).
 */
export declare const isFollowGlideUnderWay: (glide: FollowGlideProgress | null, stateScroll: number, stateEnd: number, now: number) => boolean;
/**
 * Where a follow glide should go, or null to hold still: the true end (the
 * tail just above the composer, through the tail spacer) unless the viewport
 * is already there.
 */
export declare const resolveFollowGlideTarget: (end: number, scroll: number) => number | null;
/**
 * Where the follow stops at a turn or reply that outgrew the screen, so it can
 * be read from the top while the rest lands below. `limit` is the scroll
 * offset that puts its start at the top of the viewport, `bottom` the content
 * offset of its end, and `visibleLength` the viewport height the composer
 * leaves readable. The follow goes no further than `limit`, and `hold` says
 * it ends there.
 *
 * Only the turn or reply itself outgrowing that height counts. Growth below
 * it (the turn footer, a banner docked on the composer) also carries the
 * start off the top on the way to the end, and stopping for it left the pill
 * up under a reader who was on the end.
 */
export declare const resolveFollowStop: (target: number, stop: {
    readonly limit: number;
    readonly bottom: number;
}, visibleLength: number) => {
    target: number;
    hold: boolean;
};
export declare const AUTOMATIC_MOVEMENT_MAX_MS = 1000;
interface AutomaticMovement {
    readonly from: number;
    readonly target: number;
    readonly issuedAt: number;
}
/**
 * Whether a scroll position is one an automatic follow movement (a follow
 * glide) is passing through: the view is
 * following, the movement is recent, and the position lies between where it
 * started and where it goes.
 */
export declare const isPositionHeldByFollow: (following: boolean, movement: AutomaticMovement | null, scrollTop: number, now: number) => boolean;
/**
 * Whether chrome that mirrors the reader's position (the recap hint) treats
 * the viewport as on the end. While an automatic follow movement is passing
 * through the viewport's position it is, whatever the momentary distance:
 * text arrives ahead of the glide, and measuring then flips the answer
 * several times a second. Any other scroll (a gesture, the scrollbar thumb,
 * find in page) is measured; a held position is not measured at all.
 */
export declare const resolveViewportAtEnd: (heldByFollow: boolean, measureAtEnd: () => boolean) => boolean;
export {};
