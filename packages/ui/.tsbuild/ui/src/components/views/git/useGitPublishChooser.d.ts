import { BoundGitNetworkOperationError, runPreparedGitPublish, type GitPublishContext, type GitPublishTargets } from '@/lib/boundGitNetworkOperation';
import type { ContributorDestinationCandidate } from './contributorDestination';
export declare function useGitPublishChooser({ directory, branch, chooseContributor }: {
    directory: string | null | undefined;
    branch: string | undefined;
    chooseContributor: (candidates: ContributorDestinationCandidate[]) => Promise<string | null>;
}): {
    context: GitPublishContext | null;
    settle: (targets: GitPublishTargets | null) => void;
    prepare: (action: 'push' | 'sync', options?: {
        beforeCommit?: boolean;
        forceChoose?: boolean;
        onOperation?: Parameters<typeof runPreparedGitPublish>[0]['onOperation'];
    }) => Promise<() => Promise<import("../../../lib/api/types").GitNetworkOperation | null>>;
    errorMessage: (error: BoundGitNetworkOperationError) => string | null;
    confirmDialog: import("react/jsx-runtime").JSX.Element;
};
