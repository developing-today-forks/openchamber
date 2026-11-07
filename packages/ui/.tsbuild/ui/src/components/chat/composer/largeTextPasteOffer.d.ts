/**
 * Offer-id state for the large-text paste choice above the composer.
 *
 * The choice outlives the paste event, and a second large paste can supersede
 * an unanswered offer. These helpers keep that invalidation pure so ChatInput
 * only wires the choice UI to attach/inline actions.
 */
/** Allocate a new offer id, superseding any unanswered previous offer. */
export declare const beginLargeTextPasteOffer: (activeOfferId: number) => number;
/**
 * Attempt to resolve an offer. Returns whether this call won the race, and the
 * next active id. A superseded or already-resolved offer is rejected so
 * dismiss/action cannot double-apply.
 */
export declare const resolveLargeTextPasteOffer: (activeOfferId: number, offerId: number, choice: {
    explicitlyChosen: boolean;
}) => {
    accepted: boolean;
    nextOfferId: number;
    restoreFocus: boolean;
};
