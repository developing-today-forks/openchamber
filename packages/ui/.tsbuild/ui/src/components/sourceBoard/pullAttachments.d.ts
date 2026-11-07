import type { ReferenceCommentItem } from '@/components/references/referenceTimeline';
import type { GitHubReference } from '@/lib/api/types';
import type { CIRun } from '@/lib/source-control/types';
/**
 * Parts of an issue or PR pinned above the composer, as the PR panel always
 * did: the user decides what to ask and when to send. They go to the session
 * in view, or to a new session's draft.
 */
export declare function usePullAttachments(reference: GitHubReference | null): {
    attachComment: (comment: ReferenceCommentItem) => void;
    attachComments: (comments: ReferenceCommentItem[]) => void;
    attachFailedChecks: (runs: CIRun[]) => void;
};
