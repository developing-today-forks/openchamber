import React from 'react';
import type { GitStatus, GitIdentityProfile, GitRemote, GitHubPullRequest, GitHubChecksSummary } from '@/lib/api/types';
import { type IdentityApplicability } from '@/lib/source-control/applyIdentity';
import type { SourceControlProvider } from '@/lib/source-control/types';
type SyncAction = 'fetch' | 'pull' | 'sync' | 'publish' | null;
interface GitHeaderProps {
    directory: string;
    status: GitStatus | null;
    localBranches: string[];
    remoteBranches: string[];
    branchInfo: Record<string, {
        ahead?: number;
        behind?: number;
    }> | undefined;
    syncAction: SyncAction;
    operationBlocked?: boolean;
    remotes: GitRemote[];
    onFetch: (remote: GitRemote) => void;
    onPull: (remote: GitRemote) => void;
    onSync: (remote: GitRemote) => void;
    onPublish: () => void;
    onChooseSyncTargets: () => void;
    onRemoveRemote: (remote: GitRemote) => void;
    removingRemoteName: string | null;
    onCheckoutBranch: (branch: string) => void;
    onCreateBranch: (name: string) => Promise<void>;
    onRenameBranch?: (oldName: string, newName: string) => Promise<void>;
    activeIdentityProfile: GitIdentityProfile | null;
    availableIdentities: GitIdentityProfile[];
    onSelectIdentity: (profile: GitIdentityProfile) => void;
    isApplyingIdentity: boolean;
    /** What the binding cannot currently do, shown beside the identity it belongs to. */
    identityAttention?: string | null;
    identityApplicability?: (identity: GitIdentityProfile) => IdentityApplicability;
    onConfigureRepository?: () => void;
    /** Called when the identity menu opens, so connected accounts can be re-read before choosing. */
    onIdentityMenuOpen?: () => void;
    isWorktreeMode: boolean;
    onOpenHistory?: () => void;
    onOpenGraph?: () => void;
    onOpenStashes?: () => void;
    onOpenUpdateBranch?: () => void;
    onOpenReintegrateCommits?: () => void;
    pullRequest?: GitHubPullRequest | null;
    /** Whose change request `pullRequest` is; GitLab's reads `!N` and "merge request". */
    pullRequestProvider?: SourceControlProvider | null;
    prChecks?: GitHubChecksSummary | null;
    onOpenPullRequest?: () => void;
    repositoryOptions?: string[];
    selectedRepository?: string | null;
    onSelectRepository?: (repository: string) => void;
    repositoryRoot?: string;
}
interface IdentityDropdownProps {
    activeProfile: GitIdentityProfile | null;
    identities: GitIdentityProfile[];
    onSelect: (profile: GitIdentityProfile) => void;
    isApplying: boolean;
    iconOnly?: boolean;
    /**
     * Whether the repository's binding is doing what its identity says. Shown on
     * the button because the identity is the only thing naming it now: an
     * account that was revoked or a configuration changed underneath has to be
     * visible somewhere, and here it sits beside what it is about.
     */
    attention?: string | null;
    /** Opens what an identity does not carry: auxiliary grants, agent Git, reset. */
    onConfigure?: () => void;
    /**
     * Whether each identity can serve this repository's remote. One that cannot
     * — an account on another instance, a transport that cannot reach the
     * address — stays listed with the reason, so the person sees why it is not
     * offered rather than wondering where it went.
     */
    applicability?: (identity: GitIdentityProfile) => IdentityApplicability;
    /** Lets a form give the trigger a field's width and border; the panel keeps its ghost button. */
    triggerClassName?: string;
    menuAlign?: 'start' | 'end';
    /** Called when the menu opens, so connected accounts can be re-read before choosing. */
    onOpen?: () => void;
}
export declare const IdentityDropdown: React.FC<IdentityDropdownProps>;
export declare const GitHeader: React.FC<GitHeaderProps>;
export {};
