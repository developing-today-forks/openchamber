/**
 * Where the draft's auto-created worktree starts: the Settings default, a
 * worktree's branch, any other local or remote branch, or a pull request typed
 * by number. The pick is kept on the draft together with the project it was
 * made in, so a draft moved to another project falls back to the default.
 * A picked pull request adds a New branch checkbox: off checks out its branch
 * so commits push to it, on starts a new branch from its head.
 */
export declare function AutoWorktreeSourcePicker({ projectId, projectPath, isMobile }: {
    projectId: string;
    projectPath: string;
    isMobile: boolean;
}): import("react/jsx-runtime").JSX.Element;
