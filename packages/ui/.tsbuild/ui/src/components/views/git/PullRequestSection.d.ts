import React from 'react';
export declare const PullRequestSection: React.FC<{
    directory: string;
    branch: string;
    baseBranch: string;
    trackingBranch?: string;
    /** Local commits the tracked remote branch does not have yet. */
    ahead?: number;
    remoteBranches?: string[];
    onGeneratedDescription?: () => void;
}>;
