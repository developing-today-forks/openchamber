import React from 'react';
/**
 * Every keep-alive context surface, mounted once for the whole layout and
 * placed into the zone its surface lives in (`MovablePane`). The zone frames
 * (`ContextPanel`) render their chrome and the surfaces that remount on
 * switch (git, notes, plan, ...); these hold state a remount would lose.
 *
 * Rendered after every zone frame: the frames register their bodies from
 * refs and begin their layout animation in layout effects, both of which have
 * to run before the panes attach and the settle step queues behind them.
 */
export declare const ContextSurfacePanes: React.FC;
