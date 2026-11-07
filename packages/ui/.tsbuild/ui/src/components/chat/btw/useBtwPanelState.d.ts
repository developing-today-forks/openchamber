export type BtwPanelState = {
    /** The session the composer is in was promoted out of `/btw`. */
    parentPromoted: boolean;
    /** The active fork for this parent, or null when no panel should exist. */
    btwSessionId: string | null;
    /** The fork's directory identity (may be canonicalized by the server). */
    btwDirectory: string | null;
    /** Last message id inherited from the parent; the panel shows what's after it. */
    boundaryMessageID: string | null;
    collapsed: boolean;
    creating: boolean;
    pending: boolean;
};
/**
 * Whether the BTW panel takes the composer's floating dock. A collapsed panel
 * hands the composer back to the parent session, so the parent's pending
 * permission or question outranks its strip: otherwise the parent's turn
 * waits on a request nobody can see.
 */
export declare const btwHoldsDock: (panel: BtwPanelState, parentHasRequest: boolean) => boolean;
/**
 * Derive the `/btw` panel identity for one parent session from authoritative
 * session metadata (`openchamber.btwSessionID`), plus the transient UI state
 * kept in `useBtwStore`. The panel exists only while the parent's link AND the
 * fork itself are present in the live stores, so a fork deleted anywhere
 * (sidebar, another client) makes the panel disappear without extra tracking.
 *
 * The returned object keeps its identity until one of its fields changes.
 */
export declare function useBtwPanelState(parentSessionId: string | null | undefined, directory: string | undefined): BtwPanelState;
