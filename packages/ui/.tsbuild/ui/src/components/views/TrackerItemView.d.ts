import * as React from 'react';
type TrackerItemViewProps = {
    /** The item's link, as its tab keeps it. */
    url: string;
    /** The folder the item is read through: its project's, or the panel's own. */
    directory: string;
    /** The panel the tab lives in, and the tab itself. */
    panelDirectory: string;
    tabId: string;
    /** The tab reads through another project than the panel's. */
    foreign: boolean;
    visible: boolean;
};
/**
 * One issue, pull or merge request or Linear issue in the Tracker, drawn as
 * the issues and PRs board previews it: description, activity, checks,
 * labels, reviewers, a reply box, merge and close. Nothing here starts a
 * session or a worktree; the item can be attached to the session on screen.
 * A link its project cannot read, opened just now, opens in the browser
 * instead and its tab closes; restored on launch, the tab says so in place.
 * A project that is a folder of repositories reads the link through the
 * repository whose remote it points into.
 */
export declare const TrackerItemView: React.FC<TrackerItemViewProps>;
export {};
