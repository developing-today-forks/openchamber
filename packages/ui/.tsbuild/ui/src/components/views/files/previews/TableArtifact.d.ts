import React from 'react';
/**
 * CSV/TSV as a grid: a sticky header row, monospace cells, and a hard cap on
 * rows so a large export renders at all. The cap is stated in the meta line,
 * not hidden, because "2,000 rows" and "the first 2,000 rows" mean different
 * things to someone checking a result.
 */
export declare const TableArtifact: React.FC<{
    path: string;
    content: string;
    sizeBytes: number | null;
}>;
