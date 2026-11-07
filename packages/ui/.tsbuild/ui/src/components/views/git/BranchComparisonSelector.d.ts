interface BranchComparisonSelectorProps {
    branches: readonly string[];
    currentBranch: string | null;
    base: string | null;
    onSelect: (ref: string) => void;
    /** Whether the base was detected rather than chosen. */
    automatic?: boolean;
    /** Drops the choice so the base is detected again; offered when given. */
    onSelectAutomatic?: () => void;
    mobile?: boolean;
}
export declare function BranchComparisonSelector({ branches, currentBranch, base, onSelect, automatic, onSelectAutomatic, mobile }: BranchComparisonSelectorProps): import("react/jsx-runtime").JSX.Element;
export {};
