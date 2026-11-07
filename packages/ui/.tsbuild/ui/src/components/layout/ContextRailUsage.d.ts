import React from 'react';
/**
 * Rail icon for the Context surface: an outline ring whose arc is the share of
 * the context window in use. Drawn in the button's own colour, so it follows
 * the rail's idle, hover and active states like the other icons. An empty
 * track means nothing is measured yet, or a compaction made the fill unknown.
 */
export declare const ContextUsageRingIcon: React.FC<{
    className?: string;
}>;
/**
 * Context readings under the rail tooltip's description. Mounted only while
 * the tooltip is open: the cost rollup reads every live session, which changes
 * on each streamed step.
 */
export declare const ContextRailTooltipDetails: React.FC;
