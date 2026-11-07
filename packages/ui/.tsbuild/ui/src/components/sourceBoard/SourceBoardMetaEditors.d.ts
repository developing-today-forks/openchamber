import * as React from 'react';
import type { CachedValue } from '@/components/references/referenceCache';
import type { GitHubPullReference, GitHubReference, GitHubReferenceDetail, SourceControlReadContext } from '@/lib/api/types';
/** An issue's or PR's labels, changed as one set from the repository's labels. */
export declare const SourceBoardLabels: React.FC<{
    reference: GitHubReference;
    context: SourceControlReadContext;
    onChanged: () => void;
}>;
/** Who an open PR asks to review, changed as one set from the people who can. */
export declare const SourceBoardReviewers: React.FC<{
    pull: GitHubPullReference;
    detail: CachedValue<GitHubReferenceDetail>;
    context: SourceControlReadContext;
    onChanged: () => void;
}>;
