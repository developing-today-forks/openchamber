import type { GitAPI, SourceControlAPI } from '@/lib/api/types';
import { type GitOperationRead } from '@/lib/boundGitNetworkOperation';
import { gitOperationRecoveryOwner, type PendingGitReference } from '@/lib/source-control/git-operation-recovery';
export type GitActionRecovery = {
    reads: GitOperationRead[];
    executing: boolean;
    checking: boolean;
    pending?: PendingGitReference[];
    problem?: 'storage' | 'capacity' | 'reconciling' | 'repository' | null;
};
export declare function useGitOperationRecovery(directory: string | null | undefined, git: Pick<GitAPI, 'getNetworkOperation' | 'cancelNetworkOperation'>, sourceControl: Pick<SourceControlAPI, 'repositoryBinding'>, { owner, kind }?: {
    owner?: typeof gitOperationRecoveryOwner;
    kind?: 'repository' | 'clone';
}): {
    entry: GitActionRecovery | undefined;
    blocked: boolean;
    start: () => {
        isCurrent: () => boolean;
        onOperation: (read: GitOperationRead) => void;
        finish: () => void;
    } | null;
    refresh: () => Promise<void>;
    cancel: () => Promise<void>;
};
