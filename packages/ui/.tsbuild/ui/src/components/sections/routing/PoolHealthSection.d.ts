import React from 'react';
/**
 * Pool health: how many sessions share each target right now, and, for a
 * target linked to a plan, a rough projection against its quota window.
 * Linking a target to a plan and lowering a suggested weight are the only
 * writes this section makes.
 */
export declare const PoolHealthSection: React.FC<{
    onLowerWeight: (poolID: string, targetRef: string) => void;
    /** Changes whenever the pools change, so the panel reads them again. */
    reloadKey?: string;
}>;
