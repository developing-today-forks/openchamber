import type { GitHubIssueLiveSummary, LinearIssueLiveSummary, LinearStateType } from '@/lib/api/types';
import type { LinkedGitHubPullRequest, LinkedSidebarIssue } from '@/lib/linkedIssues';
import type { PrVisualSummary } from '@/stores/useGitHubPrStatusStore';
/**
 * Every PR a session row shows: its worktree branch's PR and the PRs linked to
 * the session, each once, most urgent first. The branch entry wins a
 * duplicate because a full status read carries more than a live summary.
 */
export declare const combineSessionPrSummaries: (branch: PrVisualSummary | null, linked: readonly PrVisualSummary[]) => PrVisualSummary[];
/**
 * Linked PRs whose state has not arrived: not fetched yet, GitHub signed out,
 * or the batch failed. They are still the session's PRs, so the row lists
 * them, uncoloured, and they keep its issues out as any PR does.
 */
export declare const findLinkedPrsWithoutState: (links: readonly LinkedGitHubPullRequest[], summaries: readonly PrVisualSummary[]) => LinkedGitHubPullRequest[];
type PrStatusLabelKey = 'sessions.sidebar.group.pr.status.merged' | 'sessions.sidebar.group.pr.status.readyToMerge' | 'sessions.sidebar.group.pr.status.open' | 'sessions.sidebar.group.pr.status.mergeConflicts' | 'sessions.sidebar.group.pr.status.checksFailing' | 'sessions.sidebar.group.pr.status.checksRunning' | 'sessions.sidebar.group.pr.status.mergeBlocked' | 'sessions.sidebar.group.pr.status.draft' | 'sessions.sidebar.group.pr.status.closed';
/** The status line a PR shows in the sidebar. */
export declare const getPrStatusLabelKey: (summary: PrVisualSummary) => PrStatusLabelKey | null;
type IssueStatusLabelKey = 'sessions.sidebar.group.issue.status.open' | 'sessions.sidebar.group.issue.status.completed' | 'sessions.sidebar.group.issue.status.notPlanned';
/** A linked issue the way a session row shows it. */
type SessionIssueItem = {
    key: string;
    /** `#12` for GitHub, the tracker's identifier otherwise. */
    label: string;
    icon: 'record-circle' | 'linear';
    /** Theme PR colour for a known state; null when the state is unknown. */
    color: string | null;
    statusKey: IssueStatusLabelKey | null;
    /** A tracker's own state name (Linear's "In Progress"), shown as is. */
    statusText: string | null;
    url: string;
    title: string;
};
/** How an issue in a known state looks: its PR-token colour and status line. */
export declare const getIssueStateLook: (state: GitHubIssueLiveSummary['state']) => {
    color: string;
    statusKey: IssueStatusLabelKey;
};
/** How a Linear issue in a known state looks: the GitHub issue colour of its type. */
export declare const getLinearIssueStateLook: (type: LinearStateType) => {
    color: string;
    priority: number;
};
/**
 * The issues a session row shows, most relevant first: open issues, then
 * ones whose state is unknown, then closed ones. `states` lines up with the
 * GitHub issues among `issues`, in order; `linearStates` with the Linear ones;
 * `gitlabStates` with the GitLab ones.
 */
export declare const buildSessionIssueItems: (issues: readonly LinkedSidebarIssue[], states: ReadonlyArray<GitHubIssueLiveSummary | null>, linearStates?: ReadonlyArray<LinearIssueLiveSummary | null>, gitlabStates?: ReadonlyArray<GitHubIssueLiveSummary | null>) => SessionIssueItem[];
export {};
