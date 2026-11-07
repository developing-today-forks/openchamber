/** A branch as git names it (`remotes/origin/x` for a remote one) and as it is shown. */
export type PickedBranch = {
    value: string;
    label: string;
};
/** A titled group of choices shown above the branch lists. */
export type BranchPickerSection = {
    heading: string;
    branches: PickedBranch[];
};
/** A pull request offered while the search is its number. */
type BranchPickerPullRequests = {
    heading: string;
    label: (number: number) => string;
    onPick: (number: number) => void;
};
/**
 * One branch choice, searchable: a dropdown on desktop, a sheet on mobile.
 * Matches rank first while searching; otherwise the leading sections, then
 * local branches, then remote ones. The New Worktree dialog uses it as a form
 * field; the composer's Auto-create worktree source uses the `inline` trigger
 * with its default and worktrees as leading sections and pull requests by number.
 */
export declare function NewWorktreeBranchPicker({ value, valueLabel, placeholder, title, localBranches, remoteBranches, leadingSections, pullRequests, isLoading, isMobile, disabled, variant, onSelect, }: {
    value: string;
    /** The trigger's text when the value is not what the user reads. */
    valueLabel?: string;
    placeholder: string;
    /** The mobile sheet's title, and the inline trigger's accessible name. */
    title: string;
    localBranches: string[];
    remoteBranches: string[];
    /** Choices above the branch lists, searched with them. */
    leadingSections?: readonly BranchPickerSection[];
    /** Offered while the search is a number; absent where a pull request is not a choice. */
    pullRequests?: BranchPickerPullRequests;
    isLoading: boolean;
    isMobile: boolean;
    /** Shown, but not applicable to the current choice. */
    disabled?: boolean;
    /** `inline` is the chrome-less trigger of the composer's target row. */
    variant?: 'field' | 'inline';
    onSelect: (branch: PickedBranch) => void;
}): import("react/jsx-runtime").JSX.Element;
export {};
