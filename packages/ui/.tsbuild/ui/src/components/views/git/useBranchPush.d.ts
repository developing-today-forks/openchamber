/**
 * Pushes the current branch the way the Git view's Publish does: to its own
 * remote, or through the publish and contributor choosers when that is not
 * obvious, as a tracked network operation. `dialogs` renders those choosers.
 */
export declare function useBranchPush(directory: string | null, branch: string | undefined): {
    push: () => Promise<boolean>;
    dialogs: import("react/jsx-runtime").JSX.Element;
};
