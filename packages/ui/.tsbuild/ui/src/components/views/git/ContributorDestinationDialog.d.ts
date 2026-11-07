import React from 'react';
import { type ContributorDestinationCandidate } from './contributorDestination';
export declare const ContributorDestinationDialog: React.FC<{
    candidates: ContributorDestinationCandidate[] | null;
    onSelect: (name: string | null) => void;
}>;
