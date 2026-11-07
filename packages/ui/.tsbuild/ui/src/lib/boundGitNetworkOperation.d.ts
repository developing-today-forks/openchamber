import type { GitAPI, GitBranch, GitContributorDestinationCandidates, GitNetworkOperation, GitNetworkOperationRequest, GitStatus, SourceControlAPI, SourceControlBindingRead, SourceControlIdentity } from '@/lib/api/types';
import { getRuntimeKey } from '@/lib/runtime-switch';
type BoundGitNetworkAction = 'fetch' | 'pull' | 'sync';
export declare class BoundGitNetworkOperationError extends Error {
    readonly code: 'binding-required' | 'anonymous-read-only' | 'binding-needs-attention' | 'branch-required' | 'publish-target-required' | 'publish-cancelled' | 'publish-selection-stale' | 'tracking-required' | 'tracking-remote-mismatch' | 'binding-remote-missing' | 'stale-runtime' | 'contributor-publish-cancelled' | 'contributor-publish-cancelled-after-update' | 'operation-unavailable' | 'operation-result' | 'operation-storage' | 'invalid-terminal-state';
    constructor(code: BoundGitNetworkOperationError['code']);
}
export type GitOperationRead = {
    runtimeKey: string;
    operation: GitNetworkOperation;
    availability: 'available' | 'unavailable';
};
export declare class GitOperationResultError extends BoundGitNetworkOperationError {
    readonly read: GitOperationRead;
    constructor(read: GitOperationRead, code?: BoundGitNetworkOperationError['code']);
}
export declare const isGitOperationUnresolved: (read: GitOperationRead) => boolean;
export declare const refreshGitOperation: (git: Pick<GitAPI, 'getNetworkOperation' | 'cancelNetworkOperation'>, read: GitOperationRead, action?: 'refresh' | 'cancel', runtimeKey?: typeof getRuntimeKey, isCurrent?: () => boolean) => Promise<GitOperationRead>;
export declare const runBoundRemoteBranchDelete: ({ branch, directory, git, remoteName, runtimeKey, sourceControl, }: {
    branch: string;
    directory: string;
    git: Pick<GitAPI, 'planNetworkOperation' | 'executeNetworkOperation' | 'getNetworkOperation'>;
    remoteName: string;
    runtimeKey?: () => string;
    sourceControl: Pick<SourceControlAPI, 'repositoryBinding'>;
}) => Promise<GitNetworkOperation>;
export declare const runGitClone: ({ destinationPath, git, gitIdentityId, remoteUrl, providerAccount, selection, signal, runtimeKey, onOperation, }: {
    destinationPath: string;
    git: Pick<GitAPI, 'planNetworkOperation' | 'executeNetworkOperation' | 'getNetworkOperation' | 'cancelNetworkOperation'>;
    gitIdentityId?: string;
    remoteUrl: string;
    providerAccount?: SourceControlIdentity & {
        accountId: string;
    };
    selection: Pick<Extract<GitNetworkOperationRequest, {
        operation: 'clone';
        transportMode: 'system';
    }>, 'transportMode' | 'unverifiedConfirmed'> | Pick<Extract<GitNetworkOperationRequest, {
        operation: 'clone';
        credentialAccount: SourceControlIdentity & {
            accountId: string;
        };
    }>, 'transportMode' | 'credentialAccount'> | {
        transportMode: 'managed';
        sshCredentialId: string;
        credentialAccount?: never;
    } | {
        transportMode: 'anonymous';
    };
    signal?: AbortSignal;
    runtimeKey?: () => string;
    onOperation?: (read: GitOperationRead) => void;
}) => Promise<{
    status: 'succeeded' | 'setup-required' | 'cancelled';
}>;
export declare const runCheckoutHydration: ({ directory, git, parentRemoteName, runtimeKey, sourceControl, onOperation, }: {
    directory: string;
    git: Pick<GitAPI, 'planNetworkOperation' | 'executeNetworkOperation' | 'getNetworkOperation'>;
    parentRemoteName: string;
    runtimeKey?: () => string;
    sourceControl: Pick<SourceControlAPI, 'repositoryBinding'>;
    onOperation?: (read: GitOperationRead) => void;
}) => Promise<GitNetworkOperation>;
type ContributorDestinations = Exclude<GitContributorDestinationCandidates, {
    kind: 'ordinary';
}>;
export declare const buildBoundGitNetworkOperationRequest: ({ action, bindingRead, directory, fetchTarget, remoteName, status, targets, }: {
    action: BoundGitNetworkAction;
    bindingRead: SourceControlBindingRead;
    directory: string;
    fetchTarget?: GitFetchTarget;
    remoteName: string;
    status: GitStatus;
    targets?: GitPublishTargets;
}) => GitNetworkOperationRequest;
export declare const buildBoundBranchPushRequest: ({ bindingRead, branch, directory, remoteName, destinationRef, configureUpstream, }: {
    bindingRead: SourceControlBindingRead;
    branch: string;
    directory: string;
    remoteName: string;
    destinationRef: string;
    configureUpstream?: boolean;
}) => GitNetworkOperationRequest;
export type GitPublishTargets = {
    push: {
        remoteName: string;
        ref: string;
    };
    fetch?: {
        remoteName: string;
        ref: string;
    };
};
type GitFetchTarget = {
    remoteName: string;
    sourceRef: string;
    destinationRef: string;
};
export type GitPublishContext = {
    action: 'push' | 'sync';
    directory: string;
    runtime: string;
    bindingRead: SourceControlBindingRead;
    status: GitStatus;
    branches: GitBranch;
};
export type GitPublishSelection = GitPublishContext & {
    targets: GitPublishTargets;
};
export declare const readGitPublishContext: ({ action, directory, git, sourceControl, runtimeKey, }: {
    action: 'push' | 'sync';
    directory: string;
    git: Pick<GitAPI, 'getGitStatus' | 'getGitBranches'>;
    sourceControl: Pick<SourceControlAPI, 'repositoryBinding'>;
    runtimeKey?: () => string;
}) => Promise<GitPublishContext>;
export declare const validateGitPublishSelection: ({ selection, git, sourceControl, runtimeKey, allowNewCommit, }: {
    selection: GitPublishSelection;
    git: Pick<GitAPI, 'getGitStatus' | 'getGitBranches'>;
    sourceControl: Pick<SourceControlAPI, 'repositoryBinding'>;
    runtimeKey?: () => string;
    allowNewCommit?: boolean;
}) => Promise<GitPublishContext>;
export declare const prepareGitPublish: ({ choose, ...dependencies }: Parameters<typeof readGitPublishContext>[0] & {
    choose: (context: GitPublishContext) => Promise<GitPublishTargets | null>;
}) => Promise<GitPublishSelection>;
export declare const runPreparedGitPublish: ({ selection, git, sourceControl, runtimeKey, allowNewCommit, assertCurrent, onOperation, }: BoundGitNetworkDependencies & {
    selection: GitPublishSelection;
    git: Pick<GitAPI, 'getGitStatus' | 'getGitBranches' | 'planNetworkOperation' | 'executeNetworkOperation' | 'getNetworkOperation'>;
    allowNewCommit?: boolean;
    assertCurrent?: () => void;
}) => Promise<GitNetworkOperation>;
type GitNetworkTerminalInterpretation = {
    status: 'succeeded';
} | {
    status: 'failed';
    state: Exclude<GitNetworkOperation['state'], 'planned' | 'running' | 'succeeded'>;
    message: string;
};
export declare const interpretGitNetworkTerminalOperation: (operation: GitNetworkOperation, action: BoundGitNetworkAction) => GitNetworkTerminalInterpretation;
type BoundGitNetworkDependencies = {
    sourceControl: Pick<SourceControlAPI, 'repositoryBinding'>;
    git: Pick<GitAPI, 'planNetworkOperation' | 'executeNetworkOperation' | 'getNetworkOperation'>;
    onOperation?: (read: GitOperationRead) => void;
    runtimeKey?: () => string;
};
export declare const runBoundGitNetworkOperation: ({ action, directory, fetchTarget, remoteName, status, sourceControl, git, runtimeKey, targets, onOperation, }: {
    action: BoundGitNetworkAction;
    directory: string;
    fetchTarget?: GitFetchTarget;
    remoteName: string;
    status: GitStatus;
    targets?: GitPublishTargets;
} & BoundGitNetworkDependencies) => Promise<GitNetworkOperation>;
export declare const runContributorPush: ({ directory, status, sourceControl, git, choose, destinations: initialDestinations, updatedBeforePublish, runtimeKey, onOperation, }: {
    directory: string;
    status: GitStatus;
    sourceControl: Pick<SourceControlAPI, 'repositoryBinding'>;
    git: Pick<GitAPI, 'listContributorDestinations' | 'issueContributorDestination' | 'planNetworkOperation' | 'executeNetworkOperation' | 'getNetworkOperation'>;
    onOperation?: (read: GitOperationRead) => void;
    choose: (candidates: ContributorDestinations['candidates']) => string | null | Promise<string | null>;
    destinations?: ContributorDestinations;
    updatedBeforePublish?: boolean;
    runtimeKey?: () => string;
}) => Promise<GitNetworkOperation>;
export declare const runContributorAwareSync: ({ directory, remoteName, status, sourceControl, git, choose, runtimeKey, targets, onOperation, }: {
    directory: string;
    remoteName: string;
    status: GitStatus;
    sourceControl: Pick<SourceControlAPI, 'repositoryBinding'>;
    git: Pick<GitAPI, 'listContributorDestinations' | 'issueContributorDestination' | 'planNetworkOperation' | 'executeNetworkOperation' | 'getNetworkOperation'>;
    onOperation?: (read: GitOperationRead) => void;
    choose: (candidates: ContributorDestinations['candidates']) => string | null | Promise<string | null>;
    runtimeKey?: () => string;
    targets?: GitPublishTargets;
}) => Promise<GitNetworkOperation>;
export declare const runContributorAwarePush: ({ directory, branch, remoteName, sourceControl, git, choose, runtimeKey, destinationRef, onOperation, }: {
    directory: string;
    branch: string;
    remoteName: string;
    sourceControl: Pick<SourceControlAPI, 'repositoryBinding'>;
    git: Pick<GitAPI, 'listContributorDestinations' | 'issueContributorDestination' | 'planNetworkOperation' | 'executeNetworkOperation' | 'getNetworkOperation'>;
    onOperation?: (read: GitOperationRead) => void;
    choose: (candidates: ContributorDestinations['candidates']) => string | null | Promise<string | null>;
    runtimeKey?: () => string;
    destinationRef?: string;
}) => Promise<void>;
/**
 * What a finished sync did, for the message that reports it. The server marks
 * a step `skipped` when there was nothing for it to do: a pull that brought
 * nothing in, or a push of a commit the remote already held.
 */
export type GitSyncOutcome = {
    kind: 'up-to-date';
} | {
    kind: 'pulled';
    remoteName: string;
} | {
    kind: 'pushed';
    remoteName: string;
} | {
    kind: 'synced';
};
export declare const describeGitSyncOutcome: (operation: GitNetworkOperation | null) => GitSyncOutcome;
export {};
