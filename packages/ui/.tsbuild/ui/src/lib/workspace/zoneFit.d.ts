type ZoneFitInput = {
    /** The workspace row's width now: left zone, chat and right zone. */
    rowWidth: number;
    /** Widths the side zones take once the one being opened is on screen. */
    leftWidth: number;
    rightWidth: number;
    /** The session sidebar beside the row, when it is open. */
    sidebarWidth: number | null;
    /** The zone that just opened; the other side is the one that may give way. */
    opening: 'left' | 'right';
};
type ZoneFitPlan = {
    collapseSidebar: boolean;
    /** The opposite side zone, closed to make room. */
    displace: 'left' | 'right' | null;
};
/**
 * Room for a side zone that just opened: the chat keeps its minimum width.
 * The session sidebar folds first (navigation, one click back); only when
 * that is not enough does the zone on the other side close.
 */
export declare const planZoneFit: ({ rowWidth, leftWidth, rightWidth, sidebarWidth, opening }: ZoneFitInput) => ZoneFitPlan;
export {};
