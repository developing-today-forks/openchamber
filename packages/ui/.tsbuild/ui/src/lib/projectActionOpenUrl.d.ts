import type { GitAPI } from '@/lib/api/types';
/** The runtime's Git reads the template needs. */
type OpenUrlGit = Pick<GitAPI, 'getGitStatus' | 'isLinkedWorktree'>;
export declare const hasOpenUrlTemplate: (value: string | undefined) => boolean;
export declare const toHostnameLabel: (name: string) => Promise<string>;
type OpenUrlCheckout = {
    /** Current branch; null on a detached HEAD or outside a Git repository. */
    readonly branch: string | null;
    /** A worktree created with `git worktree add`, not the main checkout. */
    readonly linkedWorktree: boolean;
};
export declare const fillOpenUrlTemplate: (template: string, checkout: OpenUrlCheckout) => Promise<string>;
/** The action's address for the checkout it runs in. */
export declare const resolveOpenUrl: (git: OpenUrlGit, template: string, directory: string) => Promise<string>;
export {};
