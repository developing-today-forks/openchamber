import * as React from 'react';
import { Icon } from '@/components/icon/Icon';
import type { GitHubChecksSummary, GitHubPullStatus, GitHubReferenceDetail, LinearIssue, LinearIssueSummary } from '@/lib/api/types';
import type { CachedValue } from './referenceCache';
import { type ReferenceThreadActions } from './ReferenceComments';
import { type ReferenceCommentItem } from './referenceTimeline';
import { type ReferencePickerItem } from './referencePickerItems';
export type ReferencePreviewPurpose = 'attach' | 'worktree';
/** An item's state as a tinted pill; `trailing` adds a chevron when the pill opens a menu. */
export declare const StatePill: React.FC<{
    icon: React.ComponentProps<typeof Icon>['name'];
    color: string;
    label: string;
    trailing?: React.ReactNode;
}>;
/** A checks total as the preview and the board's checks dialog show it. */
export declare const ChecksSummaryLine: React.FC<{
    checks: GitHubChecksSummary;
}>;
/** Pins a comment, or all of them, above the composer. */
type CommentAttachments = {
    onAttach: (comment: ReferenceCommentItem) => void;
    onAttachAll: (comments: ReferenceCommentItem[]) => void;
};
export declare const ReferencePreview: React.FC<{
    item: ReferencePickerItem | null;
    /** The project the item was listed for; GitLab attachments are read through it. */
    directory: string | null;
    /** The previewed PR's checks and mergeability, as its row has them. */
    pullStatus: CachedValue<GitHubPullStatus | null>;
    linearDetail: CachedValue<LinearIssue>;
    githubDetail: CachedValue<GitHubReferenceDetail>;
    purpose: ReferencePreviewPurpose;
    /** Desktop pane: own scroll with the send summary pinned below. */
    pinned: boolean;
    includeDiff: boolean;
    onIncludeDiffChange: (include: boolean) => void;
    now: number;
    /** Replaces what the agent gets with what the surface does with the item. */
    footer?: React.ReactNode;
    /** Beside a PR's size: where to look at its changes. */
    pullLinks?: React.ReactNode;
    /** Replaces a Linear issue's state pill, such as with one that changes the state. */
    linearStateControl?: React.ReactNode;
    /** After an issue's or PR's activity: a way to answer it. */
    reply?: React.ReactNode;
    /** Replace an issue's or PR's labels, and a PR's reviewers, with ones that change them. */
    labelsControl?: React.ReactNode;
    reviewersControl?: React.ReactNode;
    /** Opens the previewed PR's check runs from its checks totals. */
    onOpenChecks?: () => void;
    /** An issue's or PR's comments, pinned above the composer one by one or together. */
    commentAttachments?: CommentAttachments;
    /** Menu items on an issue's or PR's state pill, such as close or reopen. */
    stateMenu?: React.ReactNode;
    /** Previews a Linear issue's parent or sub-issue; without it they are plain text. */
    onOpenLinearIssue?: (issue: LinearIssueSummary) => void;
    /** Reads an issue or PR again from its host, past every cached answer; settles when the reads are asked. */
    onRefresh?: () => Promise<void>;
    /** Answer and resolve a PR's review threads; without it they are read only. */
    threadActions?: ReferenceThreadActions;
}>;
export {};
