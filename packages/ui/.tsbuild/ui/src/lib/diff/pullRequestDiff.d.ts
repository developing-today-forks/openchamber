import type { SourceControlReadContext } from '@/lib/source-control/types';
import type { WalkthroughSource } from '@/lib/walkthrough/types';
export type PullRequestSource = Extract<WalkthroughSource, {
    kind: 'pr';
}>;
/** Keep each file's original patch bytes, including binary and metadata-only changes. */
export declare function parsePullRequestDiff(patch: string): {
    path: string;
    previousPath: string | undefined;
    status: string;
    insertions: number;
    deletions: number;
    patch: string;
}[];
export declare function fetchPullRequestDiff(directory: string, source: PullRequestSource, context: Readonly<SourceControlReadContext>): Promise<{
    path: string;
    previousPath: string | undefined;
    status: string;
    insertions: number;
    deletions: number;
    patch: string;
}[]>;
/** Both sides of one PR file from GitHub, for expanding collapsed context on demand. */
export declare function fetchPullRequestFile(directory: string, source: PullRequestSource, context: Readonly<SourceControlReadContext>, file: {
    path: string;
    previousPath?: string;
    status: string;
}): Promise<{
    original: string;
    modified: string;
}>;
