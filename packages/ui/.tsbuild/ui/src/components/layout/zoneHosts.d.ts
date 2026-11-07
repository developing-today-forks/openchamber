import type { ContextZone } from '@/lib/workspace/zones';
/**
 * The elements each zone frame (`ContextPanel`) gives the surfaces that live
 * outside it. Keep-alive surfaces (the file editor, diffs, the terminal,
 * browser tabs, ...) are mounted once in `ContextSurfacePanes` and portalled
 * into the body of the zone their surface is placed in, so moving a surface
 * to another zone moves its DOM instead of remounting it.
 */
type ZoneElements = {
    left: HTMLElement | null;
    right: HTMLElement | null;
    bottom: HTMLElement | null;
};
type ZoneHostsState = {
    /** Where a zone's surface content goes. */
    body: ZoneElements;
    /** The zone header's toolbar slot (`contextPanelHeaderSlot`). */
    headerSlot: ZoneElements;
};
export declare const useZoneHostsStore: import("zustand").UseBoundStore<import("zustand").StoreApi<ZoneHostsState>>;
export declare const setZoneBody: (zone: ContextZone, element: HTMLElement | null) => void;
export declare const setZoneHeaderSlot: (zone: ContextZone, element: HTMLElement | null) => void;
export {};
