import { type BranchComparisonBaseSource } from '@/components/views/git/baseBranch';
import type { GitBranch } from '@/lib/api/types';
import type { SourceControlReadContext } from '@/lib/source-control/types';
/** What the repository offers as a base, from the caller's branch list and binding. */
export interface BranchComparisonRepository {
    branches: GitBranch | null;
    remoteNames: ReadonlySet<string>;
    /** The remote this repository is bound to; bases come from it alone. */
    primaryRemote: string | null | undefined;
    /** The bound read context, whose pull request status names the merge target. */
    readContext: SourceControlReadContext | null;
}
/**
 * Shared base and freshness identity for Changes, mobile Changes and the
 * current-branch walkthrough. The base is always a qualified ref, or null when
 * no candidate names one; `source` says which candidate it came from.
 */
export declare function useBranchComparisonBase(directory: string | null, branch: string | null, enabled: boolean, repository: BranchComparisonRepository): {
    base: string | null;
    source: BranchComparisonBaseSource | null;
    resolved: boolean;
    revision: string;
};
