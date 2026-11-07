import React from 'react';
import type { GitSubmoduleState } from '@/lib/api/types';
/**
 * A submodule has no file contents to diff, only the commit its parent records
 * and the state of its own checkout. Staged changes compare HEAD with the
 * index; unstaged changes compare the index with the checkout, which is also
 * where uncommitted and untracked work inside the submodule lives.
 */
export declare const SubmoduleDiffSummary: React.FC<{
    state: GitSubmoduleState;
    staged: boolean;
}>;
