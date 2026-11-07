import type { GitRemote, SourceControlIdentity, SourceControlProvider } from '@/lib/api/types';
type RepositoryLink = {
    provider: SourceControlProvider;
    url: string;
};
/** Origin first, then the first recognized remote. Fetch identifies the checkout before push. */
export declare const repositoryLinkFromRemotes: (remotes: readonly GitRemote[], identities: readonly SourceControlIdentity[]) => RepositoryLink | null;
export {};
