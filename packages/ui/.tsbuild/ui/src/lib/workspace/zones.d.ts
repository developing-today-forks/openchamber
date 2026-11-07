import { z } from 'zod';
import { type ContextPanelMode } from '@/lib/surfaces/modes';
/**
 * Where a context surface opens around the chat. The chat is always the
 * centre and takes the remaining space; every other surface lives in one of
 * three zones. `right` is the context panel everyone has today, so it is the
 * default and is never stored.
 */
export type ContextZone = 'left' | 'right' | 'bottom';
type MovedContextZone = Exclude<ContextZone, 'right'>;
export declare const CONTEXT_ZONES: readonly ContextZone[];
/** Surface mode -> zone, for surfaces moved off the right. Per device. */
export type ContextZonePlacement = Partial<Record<ContextPanelMode, MovedContextZone>>;
/** What one zone shows: open or not, expanded over the chat, and its tab. */
export type ContextZoneView = {
    isOpen: boolean;
    expanded: boolean;
    activeTabId: string | null;
};
export declare const CLOSED_ZONE_VIEW: ContextZoneView;
/** The left and bottom zones of one project's panel. */
export type MovedZoneViews = {
    left: ContextZoneView;
    bottom: ContextZoneView;
};
type ZonedTab = {
    id: string;
    mode: ContextPanelMode;
    touchedAt: number;
};
/**
 * The right zone keeps the panel's original top-level fields, so state an
 * older build wrote, and every reader that predates zones, stays the right
 * panel. The left and bottom zones live under `zones`.
 */
export type ZonedPanel<T extends ZonedTab = ZonedTab> = ContextZoneView & {
    tabs: readonly T[];
    zones: MovedZoneViews;
};
export declare const zoneOfMode: (placement: ContextZonePlacement, mode: ContextPanelMode) => ContextZone;
export declare const getZoneView: (panel: ZonedPanel, zone: ContextZone) => ContextZoneView;
export declare const withZoneView: <P extends ZonedPanel>(panel: P, zone: ContextZone, patch: Partial<ContextZoneView>) => P;
/**
 * The zone's tab: the one it names when that tab is still open and placed in
 * this zone, else the zone's last tab. A tab id that points at a surface since
 * moved elsewhere never shows here.
 */
export declare const resolveZoneActiveTabId: (tabs: readonly ZonedTab[], placement: ContextZonePlacement, zone: ContextZone, activeTabId: string | null) => string | null;
export declare const resolveZoneActiveTab: <T extends ZonedTab>(panel: ZonedPanel<T>, placement: ContextZonePlacement, zone: ContextZone) => T | null;
/** The zone is on screen: open, with a tab of its own to show. */
export declare const isZoneShown: (panel: ZonedPanel | undefined, placement: ContextZonePlacement, zone: ContextZone) => boolean;
/** Every surface on screen right now, one per shown zone. */
export declare const shownContextModes: (panel: ZonedPanel | undefined, placement: ContextZonePlacement) => Set<ContextPanelMode>;
/**
 * Re-resolves every zone against the tabs and the placement: each zone names
 * one of its own tabs, and a zone left without tabs closes.
 */
export declare const settleZones: <P extends ZonedPanel>(panel: P, placement: ContextZonePlacement) => P;
/**
 * Moves a surface's on-screen state with it. When the surface is what `from`
 * shows, `to` opens on it (giving up whatever `to` showed) and `from` closes,
 * rather than jumping to another surface the user did not ask for. The
 * placement passed in is the one after the move.
 */
export declare const carrySurfaceToZone: <P extends ZonedPanel>(panel: P, mode: ContextPanelMode, from: ContextZone, to: ContextZone, placementAfter: ContextZonePlacement) => P;
/**
 * Stored placement: known surfaces placed in a moved zone. `right` is the
 * default and is dropped, as is anything malformed.
 */
export declare const zonePlacementSchema: z.ZodPipe<z.ZodCatch<z.ZodRecord<z.ZodString, z.ZodUnknown>>, z.ZodTransform<{
    [k: string]: "bottom" | "left";
}, Record<string, unknown>>>;
/** Stored left/bottom views; anything missing or malformed loads closed. */
export declare const zoneViewsSchema: z.ZodCatch<z.ZodObject<{
    left: z.ZodDefault<z.ZodCatch<z.ZodObject<{
        isOpen: z.ZodCatch<z.ZodBoolean>;
        expanded: z.ZodCatch<z.ZodBoolean>;
        activeTabId: z.ZodCatch<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>>>;
    bottom: z.ZodDefault<z.ZodCatch<z.ZodObject<{
        isOpen: z.ZodCatch<z.ZodBoolean>;
        expanded: z.ZodCatch<z.ZodBoolean>;
        activeTabId: z.ZodCatch<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>>>;
}, z.core.$strip>>;
/** A view only stays open on a tab that still exists. */
export declare const keepZoneViewsOnTabs: (views: MovedZoneViews, tabIds: ReadonlySet<string>) => MovedZoneViews;
export {};
