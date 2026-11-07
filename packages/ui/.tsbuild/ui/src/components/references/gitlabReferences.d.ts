/**
 * GitLab issues and merge requests in the picker's item shape.
 *
 * The picker lists one project's issues and change requests whichever host it
 * lives on. GitLab has no search document like GitHub's, so its pages come
 * from the provider-neutral list reads (page-numbered, open items) and are
 * mapped onto the rows and preview GitHub items use.
 */
import type { ChangeRequest, GitHubPullReference, GitHubReference, GitHubReferenceDetail, GitHubReferenceKind, RepositoryReferenceFilter, SourceControlAPI, SourceControlReadContext } from '@/lib/api/types';
import type { ListPage } from './referenceCache';
type GitLabReads = Pick<SourceControlAPI, 'issuesList' | 'changeRequestsList' | 'issueComments' | 'changeRequestContext' | 'issueGet'>;
/**
 * A change request as the preview reads it. GitLab's lists and any host's
 * branch status carry this shape; the comment count is not in it, and labels
 * only where the host sends them (GitLab does).
 */
export declare const pullReferenceFromChangeRequest: (changeRequest: ChangeRequest) => GitHubPullReference;
/** One page of a GitLab project's issues or merge requests, filtered like GitHub's; the cursor is the next page number. */
export declare const fetchGitLabReferencePage: (reads: GitLabReads, context: SourceControlReadContext, kind: GitHubReferenceKind, filter: RepositoryReferenceFilter, text: string, cursor: string | null) => Promise<ListPage<GitHubReference>>;
/** Comments, and a merge request's size and pipeline, for the previewed GitLab item. */
export declare const fetchGitLabReferenceDetail: (reads: GitLabReads, context: SourceControlReadContext, reference: GitHubReference) => Promise<GitHubReferenceDetail>;
export {};
