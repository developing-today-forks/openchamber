import type { GitAPI, GitAuxiliaryBindingIntent, GitIdentityProfile, SourceControlAPI } from '@/lib/api/types';
import { type RemoteTraits } from './identity';
export type IdentityApplicability = {
    applicable: true;
} | {
    applicable: false;
    reason: 'host';
    host: string;
} | {
    applicable: false;
    reason: 'scheme';
    scheme: 'https' | 'ssh';
};
/**
 * Whether an identity can serve a repository on this remote.
 *
 * An identity is specific to an instance: one that acts as an account on
 * gitlab.com cannot answer for a repository on a self-managed GitLab, whatever
 * its transport. And a transport has to be able to reach the address — an
 * account's credential and anonymous reads travel over HTTPS, a managed key
 * over SSH. System Git reaches whatever the machine reaches.
 */
export declare const identityApplicability: (identity: Pick<GitIdentityProfile, 'account' | 'transport'>, remote: RemoteTraits) => IdentityApplicability;
type ApplyIdentityOutcome = {
    status: 'applied';
} | {
    status: 'failed';
    reason: 'binding' | 'author' | 'runtime';
};
type ApplyIdentityInput = {
    directory: string;
    identity: GitIdentityProfile;
    /** The remote the identity's account answers for, or null when the repository has none. */
    remoteName: string | null;
};
type ApplyIdentityAPIs = {
    git: Pick<GitAPI, 'configureTransportBinding' | 'removeTransportBinding' | 'setGitIdentity'>;
    sourceControl: Pick<SourceControlAPI, 'repositoryBinding' | 'repositoryProviderBindingMutate'>;
    /** The active runtime; defaults to the app's. */
    runtimeKey?: () => string;
};
/** The words for an identity that cannot serve a remote, next to its name. */
export declare const describeIdentityApplicability: (applicability: IdentityApplicability, t: (key: 'gitView.identity.unavailableHost' | 'gitView.identity.unavailableNeedsHttps' | 'gitView.identity.unavailableNeedsSsh', params?: Record<string, string>) => string) => string;
/**
 * Writes one identity onto a repository.
 *
 * The three answers a repository needs — whose issues these are, how transfers
 * authenticate, and who commits — are what an identity is, so applying it
 * writes all three rather than asking for them one control at a time.
 *
 * A part that cannot be written leaves the others written: half a binding is
 * more useful than none, and the strip and the panel show what is still
 * missing.
 */
export declare const applyIdentityToRepository: ({ directory, identity, remoteName }: ApplyIdentityInput, { git, sourceControl, runtimeKey }: ApplyIdentityAPIs) => Promise<ApplyIdentityOutcome>;
/** What a checkout-hydration grant needs beyond the identity that answers for it. */
type AuxiliaryGrantAuthority = Omit<GitAuxiliaryBindingIntent & {
    operation: 'remove';
}, 'operation'>;
/**
 * The grant an identity gives one submodule or Git LFS endpoint.
 *
 * A submodule server authenticates the way a remote does, so the endpoint is
 * answered with an identity and this puts that answer in the terms the binding
 * is written in. Null means the identity names no way to reach the endpoint:
 * an account with no credential, a key that is not there, or System Git before
 * anyone has said they trust whatever the machine holds.
 */
export declare const auxiliaryGrantIntent: (identity: GitIdentityProfile, authority: AuxiliaryGrantAuthority) => GitAuxiliaryBindingIntent | null;
/**
 * Lets the repository's identity answer for one more of its remotes.
 *
 * A repository can carry a second address — a fork beside the upstream it was
 * cloned from — and the identity was written for the one it was applied to.
 * The other stays unreachable until someone says so here, because a grant is
 * given to an exact endpoint, never to a whole host: `github.com` is where a
 * person's own fork lives and where a stranger's does.
 *
 * Only the transfer half is written. Which account the repository answers to,
 * and who commits, were decided when the identity was applied and are not
 * revisited by naming one more address.
 */
export declare const grantIdentityToRemote: ({ directory, identity, remoteName }: {
    directory: string;
    identity: GitIdentityProfile;
    remoteName: string;
}, { git, sourceControl, runtimeKey }: ApplyIdentityAPIs) => Promise<ApplyIdentityOutcome>;
export {};
