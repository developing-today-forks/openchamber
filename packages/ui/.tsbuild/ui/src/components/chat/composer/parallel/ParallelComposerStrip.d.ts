import React from 'react';
import type { ParallelComposer } from './useParallelComposer';
/**
 * The composer's "Run in parallel" controls, above the editor inside the
 * composer box, so entering the mode grows the box upward and the text field
 * never moves. One row: the active variant's models, then a summary of the
 * launch settings that opens them. Variant tabs get a row only when there are
 * two or more variants.
 */
export declare function ParallelComposerStrip({ parallel, project, }: {
    parallel: ParallelComposer;
    project: {
        id: string;
        path: string;
    } | null;
}): React.ReactNode;
