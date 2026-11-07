import type { GitContributorDestinationCandidates } from '@/lib/api/types';
export type ContributorDestinationCandidate = Extract<GitContributorDestinationCandidates, {
    kind: 'contributor';
}>['candidates'][number];
export declare const getContributorDestinationLabelKey: (classification: ContributorDestinationCandidate['classification']) => "gitView.contributor.destination.bound-repository" | "gitView.contributor.destination.contributor-fork" | "gitView.contributor.destination.other" | "gitView.contributor.destination.own-fork";
export declare const useContributorDestinationChooser: () => {
    candidates: {
        remote: import("@/lib/api/types").GitNetworkRemoteTarget;
        transportMode: 'managed';
        classification: import("@/lib/api/types").GitContributorDestinationClassification;
    }[] | null;
    choose: (nextCandidates: ContributorDestinationCandidate[]) => Promise<string | null>;
    settle: (name: string | null) => void;
};
