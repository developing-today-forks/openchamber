import { type GuestSurfaceDock } from '@openchamber/sdk';
import type { ContextSurfaceDescriptor } from '@/lib/surfaces/registry';
import type { InstalledGuest } from './types.ts';
/** An extension whose rail panel is a host-drawn shared surface, not an iframe. */
export declare const guestHasSharedSurface: (guest: Pick<InstalledGuest, 'service'>) => boolean;
export type GuestSurfaceDocking = {
    dock: GuestSurfaceDock;
    size: number;
};
/**
 * Where the extension's own page sits beside its shared surface (a toolbar
 * above, a tool column beside) and how thick it is, or null when the
 * surface is the whole panel.
 */
export declare const guestSurfaceDocking: (guest: Pick<InstalledGuest, 'service' | 'entry' | 'entryDock' | 'entrySize'>) => GuestSurfaceDocking | null;
/**
 * Rail surfaces for the enabled guests with a page or a shared surface, in
 * catalog order. The rail and the digit shortcuts must agree on this list.
 * Background-only and tools-only extensions have no visible panel and get
 * no surface.
 */
export declare const enabledGuestSurfaces: (guests: readonly InstalledGuest[], authenticatedAsset: (path: string) => string) => ContextSurfaceDescriptor[];
