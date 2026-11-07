import React from 'react';
interface BranchSelectorProps {
    /** Current directory to check for git repository */
    directory: string | null;
    /** Currently selected branch */
    value: string;
    /** Called when branch selection changes */
    onChange: (branch: string) => void;
    /** Optional className for the trigger */
    className?: string;
    /** Whether the selector is disabled */
    disabled?: boolean;
    /** ID for accessibility */
    id?: string;
}
export interface BranchSelectorState {
    localBranches: string[];
    remoteBranches: string[];
    isLoading: boolean;
    isGitRepository: boolean | null;
}
/**
 * Hook to load available git branches for a directory.
 * Uses the shared useGitStore (same as NewWorktreeDialog).
 */
export declare function useBranchOptions(directory: string | null): BranchSelectorState;
/**
 * Branch selector dropdown for selecting a source branch for worktree creation.
 * Matches the NewWorktreeDialog source branch selector exactly.
 */
export declare const BranchSelector: React.FC<BranchSelectorProps>;
export {};
