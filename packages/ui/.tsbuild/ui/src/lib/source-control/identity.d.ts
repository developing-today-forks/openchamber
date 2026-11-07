import type { GitRemote, PageResult, SourceControlAuthAccount, SourceControlBindingRead, SourceControlIdentity, SourceControlProvider, SourceControlReadContext } from '@/lib/api/types';
export declare const GITHUB_SOURCE_CONTROL_IDENTITY: SourceControlIdentity;
type SourceControlTarget = {
    identity: SourceControlIdentity;
    remote: GitRemote;
};
/**
 * The accounts a repository's change requests and issues are read with.
 *
 * A bound provider answers first. A repository nobody bound, bound to an
 * identity that names no account, or bound to an account that is gone (signed
 * out, or signed in again as a new credential), still has remotes on hosts the
 * person is signed in to; those are read with the current account of that
 * host, the way they were before bindings existed. `activeAccountFor` says which account
 * that is, and null when none is connected there.
 */
export declare const getBoundSourceControlReadContexts: (result: SourceControlBindingRead, directory: string, activeAccountFor?: (identity: SourceControlIdentity) => string | null, knownIdentities?: SourceControlIdentity[]) => SourceControlReadContext[];
export declare const sourceControlReadContextParts: (context: SourceControlReadContext) => readonly [SourceControlProvider, string, string, string, number, string, string];
export declare const hasSameSourceControlReadContext: (left: SourceControlReadContext, right: SourceControlReadContext) => boolean;
export declare const mergeIncompleteSourceControlPage: <T extends {
    number: number;
    project: {
        id: string;
    };
}>(previous: T[], next: PageResult<T>) => T[];
export declare const resolveSourceControlTarget: (remotes: GitRemote[], identities: SourceControlIdentity[]) => SourceControlTarget | null;
export declare const resolveSourceControlIdentity: (remote: GitRemote | null | undefined, identities: SourceControlIdentity[]) => SourceControlIdentity | null;
export declare const getSourceControlBaseUrl: (identity: SourceControlIdentity) => string;
export declare const getSourceControlProviderLabel: (provider: SourceControlProvider) => 'GitHub' | 'GitLab';
export declare const formatChangeRequestReference: (provider: SourceControlProvider | null | undefined, number: number) => string;
type ManagedCredentialSourceLabelKey = 'settings.github.page.accountSource.oauth' | 'settings.github.page.accountSource.cli' | 'settings.gitlab.token.label';
/** The source shown for a token account added from 1Password; a product name, so not translated. */
export declare const VAULT_ACCOUNT_SOURCE_LABEL = "1Password";
export declare const getManagedCredentialSourceLabelKey: (source: 'oauth' | 'pat' | 'cli') => ManagedCredentialSourceLabelKey;
/**
 * The host a git remote points at, for `https://host/owner/repo.git` and for
 * the scp-like `git@host:owner/repo.git` alike. A provider association is
 * about which host answers for the repository, not how the bytes travel, so
 * it must recognise an SSH remote too.
 */
export declare const gitRemoteHost: (remoteUrl: string) => string | null;
/**
 * Whether a remote URL travels over SSH: an explicit `ssh://`, or the scp-like
 * `git@host:owner/repo.git`. The scp-like form has no scheme, which is what
 * separates it from `https://host/owner/repo.git` — that also reads as
 * `<word>:<rest>` and would otherwise pass for an SSH remote.
 */
export declare const isSshRemoteUrl: (remoteUrl: string) => boolean;
/** What a remote URL allows: which host answers for it and how it can be reached. */
export type RemoteTraits = {
    host: string | null;
    https: boolean;
    ssh: boolean;
};
export declare const remoteTraits: (remoteUrl: string) => RemoteTraits;
/** The host a provider instance names, whether stored bare or as a URL. */
export declare const instanceHost: (instance: string) => string | null;
/**
 * The identity to offer for a repository on this host.
 *
 * An identity that already names an account on the host is the answer the
 * person has effectively given: it says both whose repository this is and how
 * to reach it. Failing that, the one marked default, and failing that nothing —
 * proposing an unrelated identity would be a guess wearing a name.
 */
/** The id the identities store gives the person's own Git configuration. */
export declare const GLOBAL_IDENTITY_ID = "global";
/**
 * Whether the account an identity names is still connected.
 *
 * Removing an account leaves every identity that named it pointing at a
 * credential that no longer exists; binding a repository to one would produce
 * a grant nothing can answer. An instance whose accounts have not been read
 * yet answers `true`, because "not loaded" is not "not connected".
 */
export declare const identityAccountConnected: (profile: {
    account?: (SourceControlIdentity & {
        accountId: string;
    }) | null;
}, connectedAccountIds: (account: SourceControlIdentity) => string[] | null) => boolean;
/**
 * The identities a repository may be given.
 *
 * The System identity is what OpenChamber discovered on this machine, and it
 * is always offered: it is how a person says no override applies here. Stored
 * identities are offered only when they are complete, because an identity that
 * names no account cannot authenticate as anyone.
 */
export declare const selectableIdentities: <T extends {
    id: string;
}>(profiles: T[], systemIdentity: T | null | undefined, isComplete: (profile: T) => boolean) => T[];
/**
 * The identity a repository is currently acting as.
 *
 * The repository's own author decides it: a stored identity with that
 * signature, else the machine's if it matches, else the author itself shown as
 * it is. A repository that names no author is on the System identity, which is
 * what having no override means — and is why every surface has to answer this
 * the same way.
 */
export declare const activeIdentityFor: <T extends {
    id: string;
    name: string;
    userName: string;
    userEmail: string;
    account?: {
        accountId: string;
    } | null;
}>(profiles: T[], systemIdentity: T | null | undefined, author: {
    userName?: string | null;
    userEmail?: string | null;
} | null | undefined, fromAuthor: (author: {
    userName: string;
    userEmail: string;
}) => T, 
/**
 * The account the repository is bound to, when it is bound to one. Two
 * identities can share an author — the machine's own and an account with
 * the same email — and the author alone cannot tell them apart; the
 * binding can. Null means the repository answers to no account, which is
 * the System identity when the author is the machine's.
 */
boundAccountId?: string | null) => T | null;
/** What an identity is called on screen. The System one is named by the product, not by a record. */
export declare const identityDisplayName: (profile: {
    id: string;
    name: string;
} | null | undefined, t: (key: 'gitView.identity.system') => string) => string;
export declare const proposeIdentityForHost: <T extends {
    id: string;
    account?: {
        instance: string;
    } | null;
}>(identities: T[], host: string | null, defaultIdentityId?: string | null) => T | null;
type ManagedAccountOption = {
    key: string;
    reference: SourceControlIdentity & {
        accountId: string;
    };
    label: string;
    source: SourceControlAuthAccount['source'];
};
/**
 * Whether an identity can answer with this account.
 *
 * The server uses the gh CLI login only while it is the active GitHub account
 * in Integrations, so a gh account counts only while it is current. The glab
 * login never does: Git transport reads only GitLab credentials OpenChamber
 * stores.
 */
export declare const accountUsableByIdentity: (identity: SourceControlIdentity, account: Pick<SourceControlAuthAccount, 'source' | 'current'>) => boolean;
/**
 * Why an identity's account cannot be used, for its Git Settings row: it names
 * the gh CLI login (`github.com#cli:<user id>`) while no gh account is in use,
 * so switching to it in Integrations fixes it; otherwise the account is gone.
 * A gh login in use as another person is gone too, since switching cannot help.
 */
export declare const unavailableAccountReason: (account: SourceControlIdentity & {
    accountId: string;
}, listedAccounts: Pick<SourceControlAuthAccount, 'source' | 'current'>[] | null) => 'cli-not-in-use' | 'gone';
/**
 * Selectable managed HTTPS credential accounts: one per person and source.
 *
 * Re-authenticating keeps the credential it replaces, so one account can hold
 * several. Offering each of them separately asks a question nobody can answer
 * — they carry the same name — so the current credential represents the
 * person, and the others stay valid for identities that already name them.
 * The gh CLI login of the same person is a different credential with its own
 * source label, so it stays a separate option.
 */
export declare const buildManagedAccountOptions: (identity: SourceControlIdentity, accounts: SourceControlAuthAccount[], sourceLabel: (account: SourceControlAuthAccount) => string) => ManagedAccountOption[];
export {};
