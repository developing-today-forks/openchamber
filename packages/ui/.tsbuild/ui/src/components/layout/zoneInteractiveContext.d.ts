import React from 'react';
import type { ContextPanelMode } from '@/stores/useUIStore';
/**
 * Whether a zone's content takes focus and input: false while the zone is
 * closed and, for most surfaces, through its opening animation, when the
 * zone frame keeps its card `inert` (ContextPanel). A surface that focuses
 * itself on being shown waits for it, since focusing inside an inert card
 * does nothing. True outside a zone.
 */
export declare const ZoneInteractiveContext: React.Context<boolean>;
export declare const useZoneInteractive: () => boolean;
/**
 * Whether the zone's content is out of `inert`, from its open state, its
 * state as of the end of its animation (`useOpenWhenSettled`) and the
 * surface it shows. A closing zone always stays exposed until the end.
 */
export declare const isZoneExposed: (isOpen: boolean, settledOpen: boolean, mode: ContextPanelMode | undefined) => boolean;
