/**
 * How OpenChamber names a branch it makes for a worktree: a Settings template
 * over the worktree's name. `{name}` is that name (typed, generated from the
 * prompt, or random). A branch started from a pull request has its own
 * template, which may also use `{pr}`, the request's number, and `{head}`,
 * its branch. A branch the user types in the New worktree dialog is theirs
 * and is never templated.
 *
 * The server holds the same rules for worktrees agents create
 * (`packages/web/server/lib/git/branch-name-template.js`).
 */
export declare const DEFAULT_WORKTREE_BRANCH_TEMPLATE = "{name}";
export declare const DEFAULT_PULL_REQUEST_BRANCH_TEMPLATE = "{name}-from-pr-{pr}";
export type BranchTemplateKind = 'worktree' | 'pull-request';
/**
 * Fills a template; `{pr}` and `{head}` only mean something for a pull request.
 * Replacers are functions, so a `$&` in a value stays as written.
 */
export declare const renderBranchName: (template: string, values: {
    name: string;
    pr?: number;
    head?: string;
}) => string;
/**
 * A worktree name made fit for a branch: an exact `/path` contributes its last
 * segment, and each `/`-separated part keeps letters, digits and `._-`, so a
 * typed "Fix login timeout" becomes `Fix-login-timeout` and `feat/login` stays.
 */
export declare const branchSafeName: (worktreeName: string) => string;
/** The branch a template gives a worktree name, before any suffix. */
export declare const branchNameFromTemplate: (template: string, values: {
    name: string;
    pr?: number;
    head?: string;
}) => string;
/**
 * A template names the worktree, so two worktrees never share a branch, uses
 * only the variables its kind has, and renders to a name git accepts.
 */
export declare const isBranchTemplate: (template: string, kind: BranchTemplateKind) => boolean;
/**
 * The first of `name`, `name-2`, `name-3`… that no existing branch has, and
 * that no existing branch uses as a folder (`name/…` would block `name`).
 */
export declare const uniqueBranchName: (name: string, existing: ReadonlySet<string>) => string;
