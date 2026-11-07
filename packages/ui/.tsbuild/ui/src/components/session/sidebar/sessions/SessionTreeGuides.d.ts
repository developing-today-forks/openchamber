import React from 'react';
import type { SessionTreeGuide } from './sessionTreeGeometry';
/**
 * Draws a row's guides over it. `slotStartPx` is where the slot of a level 0
 * row starts; the line of `level` runs under the centre of the slot one level
 * up. The parent wraps the row in a positioned box that contains its margins
 * (`relative flow-root`), so lines of neighbouring rows meet.
 */
export declare const SessionTreeGuides: React.FC<{
    guides: readonly SessionTreeGuide[];
    slotStartPx: number;
}>;
