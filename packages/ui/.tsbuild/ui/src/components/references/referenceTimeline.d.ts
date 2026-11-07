/** The preview's thread: comments and, for a PR, its commits, in the order they happened. */
/** One comment in the preview's thread, from GitHub, GitLab or Linear. */
export type ReferenceCommentItem = {
    kind: 'comment';
    key: string;
    author: string | null;
    avatarUrl: string | null;
    body: string;
    createdAt: string | null;
    /** What the comment is attached to: a review verdict, or `path:line`. */
    context: string | null;
    /** The `path:line` a review comment sits on, for what it is attached to in chat. */
    location: string | null;
    /** Set when the comment opens a review thread; its replies are not entries of their own. */
    thread?: ReferenceCommentThread;
};
export type ReferenceCommentThread = {
    id: string;
    resolved: boolean;
    canResolve: boolean;
    canReply: boolean;
    /** Oldest first. */
    replies: ReferenceCommentItem[];
};
export type ReferenceCommitItem = {
    sha: string;
    headline: string;
    /** Who made it: the host account, or the name git recorded. */
    author: string | null;
    avatarUrl: string | null;
    committedAt: string | null;
    url: string | null;
};
/** Commits that landed one after another, between two comments. */
export type ReferenceCommitGroup = {
    kind: 'commits';
    key: string;
    commits: ReferenceCommitItem[];
};
export type ReferenceTimelineEntry = ReferenceCommentItem | ReferenceCommitGroup;
/**
 * Comments and commits in the order they happened, so a review reads next to
 * the commits it answered. Commits in a row become one group.
 */
export declare const buildReferenceTimeline: (comments: ReferenceCommentItem[], commits: ReferenceCommitItem[]) => ReferenceTimelineEntry[];
