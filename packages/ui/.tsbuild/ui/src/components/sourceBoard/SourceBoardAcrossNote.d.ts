import * as React from 'react';
import type { AcrossExclusion } from '@/components/references/acrossRepositories';
/**
 * Above a list across repositories: how many repositories it leaves out, and
 * in a menu which ones and why, so a list that looks complete never hides a gap.
 */
export declare const SourceBoardAcrossNote: React.FC<{
    leftOut: readonly AcrossExclusion[];
    root: string;
}>;
