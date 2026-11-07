/**
 * Choosing where a new session will run.
 *
 * The new-session draft targets a project and a directory within it — the
 * project root or one of its worktrees. Both are discovered lazily: whether a
 * project is even a git repository is unknown until asked, and its branch list
 * is served stale-while-revalidate so a cached list appears instantly and
 * refreshes behind it.
 *
 * The awkward part this hook contains is that the draft can point at a
 * directory that does not exist yet — a worktree being created. Such a
 * directory must survive not appearing in the list, or the selector would snap
 * back to the project root mid-creation and the session would be started in
 * the wrong place.
 */
export interface DraftTargetProject {
    id: string;
    path: string;
    label?: string;
    icon?: string | null;
    color?: string | null;
    iconImage?: {
        mime: string;
        updatedAt: number;
        source: 'custom' | 'auto';
    } | null;
    iconBackground?: string | null;
    kind?: 'chat' | 'project';
}
/** A project's display name, falling back to its directory name. */
export declare function getProjectDisplayLabel(project: {
    label?: string;
    path: string;
}): string;
export declare function useDraftTarget(enabled: boolean): {
    projects: DraftTargetProject[];
    selectedDraftProject: DraftTargetProject;
    selectedDraftProjectPath: string | null;
    selectedDraftProjectIsGitRepo: boolean | null;
    draftProjectLabel: string | null;
    selectedDraftDirectory: string | null;
    selectedDraftBranchLabel: string | null;
    selectedDraftBranchIsKnown: boolean;
    selectedDraftDirectoryHasUncommittedChanges: boolean;
    projectRootBranchOption: {
        value: string;
        label: string;
    } | null;
    worktreeBranchOptions: import("@/sync/session-worktree-contract").SessionTargetOption[];
    draftBranchItems: {
        value: string;
        label: string;
    }[];
    shouldShowDraftBranchSelector: boolean;
    handleDraftProjectChange: (projectId: string) => void;
    handleDraftDirectoryChange: (directory: string) => void;
    refreshDraftTarget: () => void;
};
