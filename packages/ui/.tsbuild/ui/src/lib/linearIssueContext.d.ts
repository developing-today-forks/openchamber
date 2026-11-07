import type { LinearIssue, LinearIssueComment } from '@/lib/api/types';
/** What an agent receives for an attached Linear issue: the issue and its comments as JSON. */
export declare function buildIssueContextText(args: {
    issue: LinearIssue;
    comments: LinearIssueComment[];
}): string;
