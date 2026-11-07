/**
 * Files attached on GitLab. GitLab writes one as a path on its project,
 * `/uploads/<secret>/<name>`, which the browser would resolve against this app
 * and which only a signed-in member may read. For display a picture or a clip
 * goes through the server's GitLab route, and a link to any other file goes to
 * the file on GitLab, where the user is signed in. Code keeps the path as
 * written, and the text attached for the agent is not rewritten at all.
 */
import * as React from 'react';
import type { GitHubReference } from '@/lib/api/types';
type GitLabUploadUrls = {
    /** Where a drawn picture or clip is read from. */
    media: (path: string) => string;
    /** Where a link to an attached file opens. */
    link: (path: string) => string;
};
/** The same Markdown with every upload path outside code pointed at `urls`. */
export declare const rewriteGitLabUploads: (markdown: string, urls: GitLabUploadUrls) => string;
/**
 * How a GitLab item's description and notes read for display, or null when
 * nothing needs rewriting (GitHub, or the read context is not known yet).
 */
export declare function useGitLabUploadRewrite(directory: string | null, reference: GitHubReference | null): ((markdown: string) => string) | null;
/** The rewrite every Markdown body inside a preview applies; none outside one. */
export declare const ReferenceMarkdownRewriteContext: React.Context<((markdown: string) => string) | null>;
export {};
