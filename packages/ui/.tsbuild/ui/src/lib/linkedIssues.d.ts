import type { Session } from '@/lib/opencode/model';
import { type JsonValue } from '@openchamber/sdk';
/**
 * Source-control issues and change requests, and tracker issues, a user has
 * linked to a session.
 *
 * Stored as a **snapshot**, not a reference: identifier or number, title, author
 * and avatar only. Enough to render a row and open the thing, and nothing more.
 * The body, comments and state of an issue belong to its provider, and mirroring
 * them here would mean owning their staleness. The stored title can drift from
 * the real one; that is the accepted cost of a storage that never needs
 * refreshing.
 *
 * Rides the same session-metadata channel as pinned messages
 * (`contextObligatoryMessages`), so it inherits their persistence and sync for
 * free.
 */
type LinkedRepositoryIssue = {
    /**
     * `owner/repo#number` on github.com, `host:owner/repo#number` on any other
     * instance, unique per session and stable across renames. Entries stored
     * before the host was added carry the bare shape whatever their instance.
     */
    id: string;
    number: number;
    title: string;
    url: string;
    kind: 'issue' | 'pull';
    author?: string;
    authorAvatarUrl?: string;
    linkedAt: number;
};
type LinkedLinearIssue = {
    /** `linear:{identifier}`, unique per session. */
    id: string;
    identifier: string;
    title: string;
    url: string;
    kind: 'linear';
    author?: string;
    authorAvatarUrl?: string;
    linkedAt: number;
};
export type LinkedGuestIssue = {
    /** `guest:{providerId}:{identifier}`, unique per session. */
    id: string;
    providerId: string;
    identifier: string;
    title: string;
    url: string;
    kind: 'guest';
    /** Missing on older snapshots; those are issues. */
    thread?: 'issue' | 'pull';
    author?: string;
    head?: string;
    base?: string;
    /** Opaque guest payload from `attach`, handed back as `ready.item.data`. Never shown or sent to the model. */
    data?: JsonValue;
    linkedAt: number;
};
/**
 * A thread on any other service, linked by an agent through `session.link`
 * (`packages/web/server/lib/openchamber-sessions/session-link.js`): a GitLab merge request,
 * a Jira ticket. Shown by identifier and opened by URL; a GitLab one gets live
 * state from its instance (`getGitLabThreadRef`), others have none.
 */
type LinkedExternalItem = {
    /** `link:{url}`, unique per session. */
    id: string;
    kind: 'external';
    /** `change` is any code change under review: a pull, merge or change request. */
    thread: 'issue' | 'change';
    /** The service's short label, such as `!42` or `OPS-7`; the URL's host when none was given. */
    identifier: string;
    title: string;
    url: string;
    linkedAt: number;
};
export type LinkedIssue = LinkedRepositoryIssue | LinkedLinearIssue | LinkedGuestIssue | LinkedExternalItem;
/** A linked thread that is a code change under review rather than an issue. */
export declare const isLinkedChange: (entry: LinkedIssue) => boolean;
export declare const buildLinkedIssueId: (owner: string, repo: string, number: number) => string;
/**
 * Builds the stored snapshot from what an attach flow already has.
 *
 * The id comes from the URL rather than a separate owner/repo pair: every flow
 * that attaches a thread has its URL, and only some of them carry the repo
 * separately. A URL that does not parse falls back to itself, which is still
 * unique per thread — the id only has to identify an entry, not be pretty.
 */
export declare const buildLinkedIssue: (input: {
    url: string;
    number: number;
    title: string;
    kind: 'issue' | 'pull';
    author?: {
        login?: string;
        avatarUrl?: string;
    } | null;
    linkedAt: number;
}) => LinkedRepositoryIssue;
export declare const buildLinkedGuestIssue: (input: {
    providerId: string;
    identifier: string;
    title: string;
    url: string;
    thread?: 'issue' | 'pull';
    author?: string;
    head?: string;
    base?: string;
    data?: JsonValue;
    linkedAt: number;
}) => LinkedGuestIssue;
export declare const buildLinkedLinearIssue: (input: {
    identifier: string;
    title: string;
    url: string;
    author?: {
        login?: string;
        avatarUrl?: string;
    } | null;
    linkedAt: number;
}) => LinkedLinearIssue;
export declare const getLinkedIssues: (session: Session | null | undefined) => LinkedIssue[];
export type LinkedGitHubPullRequest = {
    owner: string;
    repo: string;
    number: number;
    url: string;
    title: string;
};
/** A linked thread that lives on github.com, wherever the link came from. */
type GitHubThreadRef = {
    key: string;
    owner: string;
    repo: string;
    number: number;
    thread: 'pull' | 'issue';
};
/**
 * The GitHub thread behind a link, or null. A GitHub entry carries it in its
 * id; an extension's or agent's link to a github.com address is the same
 * thread, so it gets the same live state and is not listed twice. Entries
 * whose id is a URL that names no repository cannot be looked up.
 */
export declare const getGitHubThreadRef: (entry: LinkedIssue) => GitHubThreadRef | null;
/** A linked thread on a GitLab instance: `owner` is the namespace path, subgroups included. */
export type GitLabThreadRef = {
    key: string;
    instance: string;
    owner: string;
    repo: string;
    number: number;
    thread: 'pull' | 'issue';
};
/**
 * The GitLab thread behind a link, or null: a merge request or issue attached
 * from a GitLab project, or an agent's link to one. Read from the address, the
 * one field every such link carries.
 */
export declare const getGitLabThreadRef: (entry: LinkedIssue) => GitLabThreadRef | null;
/** Each GitLab merge request and issue linked to a session, once. */
export declare const getLinkedGitLabThreads: (session: Session | null | undefined) => GitLabThreadRef[];
/**
 * The session's links as a list shows them: each GitHub or GitLab thread once,
 * at its first link, however many times and by whom it was linked.
 */
export declare const getDistinctLinkedIssues: (session: Session | null | undefined) => LinkedIssue[];
/** GitHub pull requests linked to a session, with their repository. */
export declare const getLinkedGitHubPullRequests: (session: Session | null | undefined) => LinkedGitHubPullRequest[];
/** A code change linked to a session from a service other than GitHub. */
export type LinkedSidebarChange = {
    key: string;
    identifier: string;
    url: string;
    title: string;
    /** Set for a GitLab merge request, whose live state is looked up by it. */
    gitlab?: GitLabThreadRef;
};
/**
 * Pull and merge requests linked from services other than GitHub (an
 * extension's PR, a GitLab merge request attached in the composer or linked by
 * an agent), in link order, each GitLab merge request once. The sidebar lists
 * them beside GitHub PRs; GitLab ones carry their thread for live state, the
 * rest show by identifier, uncoloured.
 */
export declare const getLinkedSidebarChanges: (session: Session | null | undefined) => LinkedSidebarChange[];
/** An issue linked to a session, as the sidebar shows it. */
export type LinkedSidebarIssue = {
    source: 'github';
    key: string;
    owner: string;
    repo: string;
    number: number;
    url: string;
    title: string;
} | {
    source: 'gitlab';
    key: string;
    ref: GitLabThreadRef;
    identifier: string;
    url: string;
    title: string;
} | {
    source: 'linear' | 'guest' | 'external';
    key: string;
    identifier: string;
    url: string;
    title: string;
};
/**
 * Issues linked to a session, in link order. GitHub issues carry their
 * repository (read from the entry id) and GitLab issues their thread, so their
 * state can be looked up; Linear and extension trackers are shown by identifier. Pull requests,
 * including extension ones, are not issues here.
 */
export declare const getLinkedSidebarIssues: (session: Session | null | undefined) => LinkedSidebarIssue[];
export {};
