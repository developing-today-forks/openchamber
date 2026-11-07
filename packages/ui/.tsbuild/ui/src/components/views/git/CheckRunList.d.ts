import React from 'react';
import type { CIRun } from '@/lib/source-control/types';
import { type CheckRunExpansion } from './checkRunState';
/**
 * A change request's check runs, each opening to its output, failed
 * annotations and steps. Shared by the PR panel and the board's checks dialog.
 */
export declare const CheckRunList: React.FC<{
    runs: CIRun[];
    /** The clock running checks count their time against. */
    now: number;
    expansion: CheckRunExpansion;
    formatTimestamp: (value?: string) => string;
}>;
