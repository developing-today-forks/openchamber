import React from 'react';
type ZoneSurfaceDragOut = (isOutside: (point: {
    x: number;
    y: number;
}) => boolean) => {
    finish: () => boolean;
    cancel: () => void;
};
/**
 * Given to a surface's own tab strip (the terminal's) inside a zone: a tab
 * dragged out of that strip moves the whole surface to another zone, as a
 * zone's own tabs do. Null outside a zone, where such strips only reorder.
 */
export declare const ZoneSurfaceDragContext: React.Context<ZoneSurfaceDragOut | null>;
export declare const useZoneSurfaceDragOut: () => ZoneSurfaceDragOut | null;
export {};
