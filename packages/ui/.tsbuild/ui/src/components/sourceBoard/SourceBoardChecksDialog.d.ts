import * as React from 'react';
import type { GitHubPullReference, SourceControlReadContext } from '@/lib/api/types';
import type { CIRun } from '@/lib/source-control/types';
/**
 * A pull request's check runs, read when the dialog opens: the board's lists
 * ask only for each PR's totals, the runs and their steps come one PR at a
 * time. The same cache the PR panel reads, so either fills the other.
 */
export declare const SourceBoardChecksDialog: React.FC<{
    pull: GitHubPullReference;
    context: SourceControlReadContext;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    /** Pins the failed runs, with their steps and annotations, above the composer. */
    onAttachFailed?: (runs: CIRun[]) => void;
}>;
