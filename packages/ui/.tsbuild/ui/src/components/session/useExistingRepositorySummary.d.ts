import type { GitAPI, GitIdentitySummary, SourceControlAPI, SourceControlRepositoryRemote } from '@/lib/api/types';
export type ExistingRepositoryRemote = SourceControlRepositoryRemote & {
    host: string | null;
    /** Whether the remote's own URLs allow a managed transport of each kind. */
    https: boolean;
    ssh: boolean;
};
/**
 * What a directory's own `.git` already states, read once when a repository is
 * about to be added. Every field is what the repository says about itself, so
 * the add screen can offer it instead of asking the person to restate it.
 */
export type ExistingRepositorySummary = {
    directory: string;
    repositoryId: string;
    configRevision: string;
    remotes: ExistingRepositoryRemote[];
    /** The remote a provider association would be anchored to. */
    primaryRemote: ExistingRepositoryRemote | null;
    author: GitIdentitySummary | null;
    /** True when `user.name`/`user.email` are set in this repository, not inherited. */
    authorIsLocal: boolean;
};
type ExistingRepositoryAPIs = {
    sourceControl: Pick<SourceControlAPI, 'repositoryContext'>;
    git: Pick<GitAPI, 'getCurrentGitIdentity' | 'hasLocalIdentity'>;
};
/**
 * Reads the repository at `directory` without binding anything.
 *
 * A repository with no remote is still reported: an identity says who commits
 * as well as which account a repository answers to, and a local-only
 * repository commits like any other. It simply has no remote to associate, so
 * `primaryRemote` is null and the add screen writes the signature alone.
 *
 * A directory that is not a repository, or that cannot be read, resolves to
 * null: the add screen then behaves exactly as it did before. The probe is
 * delayed because `directory` follows what is typed in the path field.
 */
export declare const useExistingRepositorySummary: (directory: string, { sourceControl, git }: ExistingRepositoryAPIs, enabled: boolean) => ExistingRepositorySummary | null;
export {};
