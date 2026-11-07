import type { IconName } from '@/components/icon/icons';
import type { GitHubPullStatus, GitHubReference, RepositoryReferenceFilter, LinearIssueListAssignee, LinearIssueListPriority, LinearIssueListStatus, LinearIssueSummary } from '@/lib/api/types';
import type { I18nKey } from '@/lib/i18n';
export type ReferencePickerSource = 'github' | 'linear';
/** One row of the picker, from either source. */
export type ReferencePickerItem = 
/** `directory`: in a list across several repositories, the folder whose read context the item belongs to. */
{
    source: 'github';
    reference: GitHubReference;
    directory?: string;
} | {
    source: 'linear';
    issue: LinearIssueSummary;
};
/** A confirmed choice: the item plus what the user set on it in the picker. */
export type ReferencePickerSelection = {
    source: 'github';
    reference: GitHubReference;
    includeDiff: boolean;
} | {
    source: 'linear';
    issue: LinearIssueSummary;
};
/** Linear lists combine a state, whose issues, and a priority. */
export type LinearReferenceFilter = {
    status: LinearIssueListStatus;
    people: LinearIssueListAssignee;
    priority: LinearIssueListPriority;
};
export declare const DEFAULT_LINEAR_FILTER: LinearReferenceFilter;
/** `#12` for an issue or a GitHub PR, `!12` for a GitLab merge request. */
export declare const referenceNumberLabel: (reference: GitHubReference) => string;
export declare const referencePickerItemKey: (item: ReferencePickerItem | ReferencePickerSelection) => string;
export declare const DEFAULT_REPOSITORY_FILTER: RepositoryReferenceFilter;
/** What each kind can be narrowed to: only change requests merge and get review requests. */
export declare const REPOSITORY_STATES: {
    readonly issue: readonly ["open", "closed", "all"];
    readonly pull: readonly ["open", "merged", "closed", "all"];
};
export declare const REPOSITORY_PEOPLE: {
    readonly issue: readonly ["any", "assigned", "created"];
    readonly pull: readonly ["any", "assigned", "created", "reviewRequested"];
};
export declare const LINEAR_STATUS_FILTERS: readonly ["open", "all", "backlog", "todo", "started", "inReview", "completed", "canceled", "duplicate"];
export declare const LINEAR_PEOPLE_FILTERS: readonly ["any", "me", "created"];
export declare const LINEAR_PRIORITY_FILTERS: readonly ["all", "urgent", "high", "medium", "low", "none"];
export declare const LINEAR_STATUS_LABEL_KEYS: {
    readonly open: 'references.picker.filter.linear.status.open';
    readonly all: 'references.picker.filter.linear.status.all';
    readonly backlog: 'references.picker.filter.linear.status.backlog';
    readonly todo: 'references.picker.filter.linear.status.todo';
    readonly started: 'references.picker.filter.linear.status.started';
    readonly inReview: 'references.picker.filter.linear.status.inReview';
    readonly completed: 'references.picker.filter.linear.status.completed';
    readonly canceled: 'references.picker.filter.linear.status.canceled';
    readonly duplicate: 'references.picker.filter.linear.status.duplicate';
};
export declare const LINEAR_PEOPLE_LABEL_KEYS: {
    readonly any: 'references.picker.filter.linear.people.any';
    readonly me: 'references.picker.filter.assigned';
    readonly created: 'references.picker.filter.created';
};
export declare const LINEAR_PRIORITY_LABEL_KEYS: {
    readonly all: 'references.picker.filter.linear.priority.all';
    readonly urgent: 'contextPanel.linear.priority.urgent';
    readonly high: 'contextPanel.linear.priority.high';
    readonly medium: 'contextPanel.linear.priority.medium';
    readonly low: 'contextPanel.linear.priority.low';
    readonly none: 'references.picker.filter.linear.priority.none';
};
export declare const REPOSITORY_STATE_LABEL_KEYS: {
    readonly open: 'references.picker.filter.open';
    readonly closed: 'references.picker.filter.state.closed';
    readonly merged: 'references.picker.filter.state.merged';
    readonly all: 'references.picker.filter.state.all';
};
export declare const REPOSITORY_PEOPLE_LABEL_KEYS: {
    readonly any: 'references.picker.filter.linear.people.any';
    readonly assigned: 'references.picker.filter.assigned';
    readonly created: 'references.picker.filter.created';
    readonly reviewRequested: 'references.picker.filter.reviewRequested';
};
/** How a state is drawn: an icon in a theme colour. */
type StateGlyph = {
    icon: IconName;
    color: string;
};
type StateLook = StateGlyph & {
    labelKey: I18nKey;
};
/**
 * Issue and PR states in the theme's PR colours, the way the sidebar shows
 * them: open is open, done is merged, dropped is closed. An open PR turns
 * orange on failed checks, checks still running, or a conflict once its status has arrived
 * (`prVisualStateOf`); until then it reads as open.
 */
export declare const githubStateLook: (reference: GitHubReference, status: GitHubPullStatus | null) => StateLook;
/** Linear workflow types in the same colours; the state's own name is the label. */
export declare const linearStateLook: (issue: LinearIssueSummary) => StateGlyph;
/** The look of a Linear workflow type, for a state that is not an issue's yet (a status menu). */
export declare const linearStateTypeLook: (type: string | null) => StateGlyph;
export declare const LINEAR_PRIORITY_KEYS: {
    readonly 1: 'contextPanel.linear.priority.urgent';
    readonly 2: 'contextPanel.linear.priority.high';
    readonly 3: 'contextPanel.linear.priority.medium';
    readonly 4: 'contextPanel.linear.priority.low';
};
type RelativeTime = {
    key: 'common.relative.justNow';
} | {
    key: 'common.relative.minutesAgoShort' | 'common.relative.hoursAgoShort' | 'common.relative.daysAgoShort' | 'common.relative.weeksAgoShort' | 'common.relative.yearsAgoShort';
    count: number;
};
/** How long ago an ISO timestamp was, as a short message key; null when unknown. */
export declare const relativeTimeOf: (iso: string | null | undefined, now: number) => RelativeTime | null;
/**
 * Ids, people, times and labels around an item. One step quieter than the
 * usual muted text, so titles and bodies stay the brightest thing on screen.
 */
export declare const REFERENCE_META_TEXT = "text-muted-foreground/60";
/** GitHub label colours come as bare hex; anything else gets the neutral chip. */
export declare const labelColor: (color: string | null | undefined) => string | null;
export {};
