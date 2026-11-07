type UseNestedGitDirectoryOptions = {
    /** False defers all probing/discovery work while the surface is hidden. */
    enabled?: boolean;
    /**
     * Re-probe a cached "not a repository" root each time the surface becomes
     * enabled. For surfaces the user opens to look at git (Changes, Git), not
     * for ones that render alongside every session.
     */
    recheckOnOpen?: boolean;
};
/**
 * Resolves the repository a git surface operates on when the project root may
 * not itself be a git repository. Owns the full resolution flow: probing the
 * root, discovering nested repositories, auto-selecting the first one, and
 * dropping a selection whose repository disappeared.
 *
 * A root repository with no commits yet (a fresh `git init`, #4886) hides
 * nothing below it: discovery keeps running, a nested selection keeps
 * applying, and the picker offers the root next to the nested repositories.
 * It is a repository the user may mean to work in, so nothing is
 * auto-selected for it.
 *
 * Consumers still fetch their own git data for the returned `gitDirectory`;
 * this hook only owns who that directory is. `repositoryOptions` is what a
 * repository picker lists, or null when the surface has no choice to offer.
 */
export declare const useNestedGitDirectory: (root: string | null, options?: UseNestedGitDirectoryOptions) => {
    rootIsGitRepo: boolean | null;
    gitDirectory: string | null;
    nestedRepos: import("@/stores/useGitStore").NestedRepoDiscovery | undefined;
    nestedRepoSelection: string | null;
    repositoryOptions: string[] | null;
};
export {};
