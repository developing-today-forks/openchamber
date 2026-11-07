import React from 'react';
import type { LanedCommit } from './gitGraph';
interface GitGraphSegmentProps {
    laned: LanedCommit;
    totalLanes: number;
    isExpanded: boolean;
}
/**
 * Renders the git graph lane column using an HTML Canvas element.
 *
 * Layout isolation pattern:
 *   A plain <div> (no replaced-element intrinsic sizing) owns all layout via
 *   `height: 100%` + self-stretch on the parent. The <canvas> is absolutely
 *   positioned inside it (`inset: 0`) so it fills the div without affecting
 *   the flex layout measurement. Canvas intrinsic height (default 150px) never
 *   leaks into the row height calculation.
 *
 *   useLayoutEffect reads the div's offsetHeight (stable, no replaced-element
 *   quirks) and sets the canvas drawing-buffer size + draws.
 */
export declare const GitGraphSegment: React.FC<GitGraphSegmentProps>;
export {};
