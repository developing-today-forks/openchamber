export type ZoneRect = {
    left: number;
    top: number;
    width: number;
    height: number;
};
export type ZoneDropTargets = {
    left: ZoneRect;
    right: ZoneRect;
    bottom: ZoneRect;
};
export type ZonePoint = {
    x: number;
    y: number;
};
/**
 * Where a dragged surface can land, from rects measured once when the drag
 * starts: the workspace row (left zone, chat column, right slot), the chat
 * column (the chat and the bottom zone under it) and the open bottom zone's
 * card, if any.
 *
 * The bottom target is the open bottom zone, or the lower band of the chat,
 * across the chat column's full width. A side target is a full-height column
 * over whatever stands on its side of the chat (an open zone, the work-status
 * card); with nothing there, it is a strip of the chat's edge that stops
 * above the bottom target. No two targets overlap.
 */
export declare const computeZoneDropTargets: (row: ZoneRect, chatColumn: ZoneRect, bottomZone?: ZoneRect | null) => ZoneDropTargets;
/** The target under the pointer, if any. */
export declare const hitTestZoneDropTargets: (targets: ZoneDropTargets, point: ZonePoint) => keyof ZoneDropTargets | null;
