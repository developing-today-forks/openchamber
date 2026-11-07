import * as React from 'react';
import type { SourceControlReadContext } from '@/lib/api/types';
import type { ChangeRequest } from '@/lib/source-control/types';
/**
 * The checked-out branch's pull request, drawn as the issues and PRs board
 * previews one: description, activity with its commits, checks, reviewers,
 * labels, a reply box and the merge and close actions. Comments and failed
 * checks can be pinned above the composer.
 */
export declare const BranchPullRequestPreview: React.FC<{
    /** The repository the branch is in. */
    directory: string;
    context: SourceControlReadContext;
    changeRequest: ChangeRequest;
    /** Asks the branch status again after a change. */
    onChanged: () => void;
}>;
