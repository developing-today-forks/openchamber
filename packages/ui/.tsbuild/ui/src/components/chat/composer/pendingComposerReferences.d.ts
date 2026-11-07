import type { ComposerReference } from './composerReferences';
type PendingComposerReferences = {
    references: ComposerReference[];
    push: (references: readonly ComposerReference[]) => void;
    consume: () => ComposerReference[];
};
/**
 * Issues and PRs a flow outside the composer hands to the next draft: the New
 * Worktree dialog attaches the item it was created for this way. `ChatInput`
 * consumes them into its chips, like a guest panel's `pendingGuestIssue`.
 */
export declare const usePendingComposerReferences: import("zustand").UseBoundStore<import("zustand").StoreApi<PendingComposerReferences>>;
export {};
