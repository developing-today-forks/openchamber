import type { GitDiffResponse } from '@/lib/api/types';
import type { SourceControlProvider, SourceControlReadContext } from '@/lib/source-control/types';
import type { WalkthroughSource } from '@/lib/walkthrough/types';
export type GitComparisonSource = Extract<WalkthroughSource, {
    kind: 'branch' | 'commit' | 'pr';
}>;
export interface GitComparisonFile {
    path: string;
    status: string;
    previousPath?: string;
    insertions: number;
    deletions: number;
    patch?: string;
    /** Branch listings: moves only when this file's patch can change. */
    revision?: string;
}
/** File-list authority shared by the stacked desktop view and mobile drill-down. */
export declare function useGitComparison(directory: string | null, source: GitComparisonSource | null, enabled?: boolean, revision?: string, readContext?: Readonly<SourceControlReadContext> | null, 
/** The project's host, for wording when no account can read it. */
changeRequestProvider?: SourceControlProvider | null): {
    key: string | null;
    revision: number;
    files: GitComparisonFile[] | null;
    loading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
    fetchDiff: (filePath: string, contextLines?: number) => Promise<GitDiffResponse>;
    fetchFullFile: (filePath: string) => Promise<{
        original: string;
        modified: string;
    }>;
};
