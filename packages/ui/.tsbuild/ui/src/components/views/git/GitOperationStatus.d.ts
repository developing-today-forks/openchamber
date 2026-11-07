import type { GitActionRecovery } from './useGitOperationRecovery';
/**
 * Says what a Git transfer left for the person to act on.
 *
 * A transfer in flight already shows on the control that started it, and a
 * check of saved operations with nothing saved is bookkeeping, so neither
 * renders here. The card appears for a failure, an outcome nobody knows, a
 * saved operation from earlier.
 */
export declare function GitOperationStatus({ entry, onRefresh, onCancel, className }: {
    entry: GitActionRecovery | undefined;
    onRefresh: () => void;
    onCancel: () => void;
    /** Outer spacing; the panel insets the card like the in-progress banner, the dialog stacks it flush. */
    className?: string;
}): import("react/jsx-runtime").JSX.Element | null;
