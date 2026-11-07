import type { GitRemote, SourceControlIdentity } from '@/lib/api/types';
import { type NestedRepoDiscovery } from '@/stores/useGitStore';
/**
 * The folder the board reads a project's repository from.
 *
 * A project whose root is a repository is read there. A root that is not one
 * but holds repositories is read in one of them, or in all of them together
 * (`all`, where the runtime can search across repositories): `directory` is
 * then the root, and each item brings the repository folder it belongs to.
 * `pending` and `failed` keep the root as `directory`, so a project that is a
 * repository never waits on the discovery, and neither state is taken for
 * "no repositories".
 */
export type BoardRepository = {
    status: 'pending' | 'failed' | 'ready';
    directory: string | null;
    /** The repositories under a root that is not one itself; empty otherwise. */
    repositories: readonly string[];
    /** The board lists all of `repositories` together. */
    all: boolean;
};
/** What the board remembers for a project's repository: a single one, and whether it lists them all. */
export type RepositoryChoice = {
    path: string | null;
    /** Undefined until chosen; then all repositories unless a single one was remembered. */
    all: boolean | undefined;
};
export declare function resolveBoardRepository(root: string | null, rootIsGitRepo: boolean | null, nestedRepos: NestedRepoDiscovery | undefined, choice: RepositoryChoice, 
/** The runtime can list across repositories (VS Code cannot). */
acrossAvailable: boolean): BoardRepository;
/**
 * A link to an issue or PR is looked up across the folder's repositories: a
 * repository focus pending for the project reads as choosing "all", so the
 * lookup never runs first against a single repository that may not hold the
 * item. Where the root is a repository, or the runtime cannot list across
 * repositories, `resolveBoardRepository` ignores it as it ignores any "all".
 */
export declare const choiceForFocus: (choice: RepositoryChoice, focusPending: boolean) => RepositoryChoice;
/** The focus made the board list all repositories: remember that, as if the user had picked it. */
export declare const shouldRememberAll: (resolution: BoardRepository, storedAll: boolean | undefined, focusPending: boolean) => boolean;
/** A repository's path below the project's root, as the pickers name it. */
export declare const repositoryLabel: (repository: string, root: string) => string;
/** Where Changes and Walkthrough for a PR open, on desktop and on the phone. */
export type PullLinkTarget = {
    /** The panel the tab opens in: the folder the app shows, else the project's root, where a draft opens first. */
    panelDirectory: string;
    /** The folder the tab reads the PR through; null for the panel's own. */
    targetDirectory: string | null;
    /** The key the diff and walkthrough views take the request under: the folder they read. */
    requestDirectory: string;
    /** The phone: the folder the app shows for it, a draft of the project's root when it is not the project's. */
    mobileDirectory: string;
    /** The phone's Changes looks requests up by the normalized folder the app shows. */
    mobileRequestDirectory: string;
    /** The repository the phone's Changes shows the PR in, in place of the Git selection; null for the folder itself. */
    mobileRepository: string | null;
};
/**
 * A PR is read through the project's own folder: the folder the app shows when
 * it belongs to the project, else the project's root, read as another
 * project's. A PR of a repository under a root that is not one is read through
 * that repository, so the views never resolve it through the root's Git
 * selection and the selection stays where it was; a session already in the
 * repository reads it as its own.
 */
export declare function resolvePullLinkTarget(options: {
    projectPath: string;
    /** The folder the PR was listed from; differs from `projectPath` for a repository under a root that is not one. */
    repository: string | null;
    currentDirectory: string | null;
    /** `currentDirectory` belongs to the project. */
    owned: boolean;
}): PullLinkTarget;
/**
 * Probes the root and discovers the repositories under it, reading the Git
 * screen's discovery without touching its repository selection: the board's
 * choice is its own.
 */
export declare function useBoardRepository(root: string | null, choice: RepositoryChoice): BoardRepository & {
    retry: () => void;
};
/** A folder's remotes once its binding is read; null while it is, empty when the read failed. */
export type FolderRemotes = {
    directory: string;
    remotes: readonly GitRemote[] | null;
};
/**
 * Of the folders, the one whose remote is the repository `repositoryUrl` names
 * (`https://host/owner/name`, lowercase): one whose origin is, else one with
 * any remote that is, such as a fork's upstream. Null while a folder that may
 * still answer is being read; `'none'` when no folder's remote is it.
 */
export declare function folderOfRepository(repositoryUrl: string, folders: readonly FolderRemotes[], identities: readonly SourceControlIdentity[]): string | 'none' | null;
/** The folder a link to an issue or PR is read through: `pending` while that is not known yet, `failed` when the search for repositories failed. */
export type LinkRepository = {
    status: 'pending' | 'failed' | 'ready';
    directory: string;
    retry: () => void;
};
/**
 * The folder the Tracker reads a link through. A root that is a repository is
 * read where it is, as before. A root that is not one but holds repositories
 * is read through the one whose remote is the link's repository, so a link to
 * any of them opens in the Tracker; with none, the root is read and answers
 * that it cannot show the link. The Git selection is never touched.
 */
export declare function useLinkRepository(root: string, url: string): LinkRepository;
