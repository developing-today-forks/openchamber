/**
 * App-level dialog shown the first time a team's shared setup commands or
 * shared actions (from `<repo>/.openchamber/project.json`) are about to run.
 * It lists exactly what would run. Dismissing via the close button, Escape,
 * or the backdrop settles the request the way it asked to be dismissed:
 * worktree creation cancels, everything else runs without the shared
 * commands this time.
 */
export declare const SharedTrustConfirmDialog: () => import("react/jsx-runtime").JSX.Element;
