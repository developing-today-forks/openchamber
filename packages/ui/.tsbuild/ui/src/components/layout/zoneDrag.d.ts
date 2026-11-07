import type { ContextPanelMode } from '@/lib/surfaces/modes';
import { type ZoneDropTargets, type ZonePoint } from '@/lib/workspace/zoneDropTargets';
import { type ContextZone } from '@/lib/workspace/zones';
/**
 * Moving a surface to another zone by dragging it: a rail icon, a panel tab
 * or a panel header. The targets are measured once when the drag starts and
 * only the hovered one changes while it runs; nothing reflows until the drop,
 * which moves the surface once (`moveContextSurfaceToZone`).
 */
type ActiveZoneDrag = {
    mode: ContextPanelMode;
    label: string;
    /** Where the surface lives now. */
    from: ContextZone;
    targets: ZoneDropTargets;
    /** Where each target is drawn: the open card it stands for, else its area inset like a card. */
    frames: ZoneDropTargets;
};
type ZoneDragState = {
    drag: ActiveZoneDrag | null;
    hovered: ContextZone | null;
};
export declare const useZoneDragStore: import("zustand").UseBoundStore<import("zustand").StoreApi<ZoneDragState>>;
/** Shows the drop targets. False when the layout has no workspace to drop into. */
export declare const beginZoneDrag: (drag: Omit<ActiveZoneDrag, 'targets' | 'frames'>) => boolean;
export declare const updateZoneDrag: (point: ZonePoint) => void;
export declare const cancelZoneDrag: () => void;
/**
 * Drops the surface on the hovered target: it moves there (when it was
 * elsewhere) and is on screen afterwards. Returns whether it landed on a
 * target, so a source can skip what the gesture would otherwise do.
 */
export declare const finishZoneDrag: (directory: string | null | undefined) => boolean;
export type ZoneDragGesture = {
    /**
     * Ends the gesture. True when it ended outside the source: the drop was
     * the zone drag's, on a target or not, and the source does nothing more.
     */
    finish: (directory: string | null | undefined) => boolean;
    cancel: () => void;
};
/**
 * Follows a drag a source already runs (a sortable rail icon or tab). The
 * targets show once the pointer leaves the source (`isOutside`), and hide
 * again when it comes back, so a drag that stays inside keeps its own meaning
 * (reordering).
 */
export declare const startZoneDragGesture: (drag: Omit<ActiveZoneDrag, 'targets' | 'frames'>, isOutside: (point: ZonePoint) => boolean) => ZoneDragGesture;
export {};
