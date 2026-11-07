/**
 * The status line under an isolated space's group in the sidebar: while it is being made (journey step 2) the step the host announced, the model access this window is giving, a
 * failed creation with the way to remove it, or access that could not be given; once it runs, what
 * access it lacks (step 4), read from the gatekeeper through the journey list, with the way to the
 * grant dialog. Since 5d-2 (step 8) it also says when a space is stopped, broken or not answering,
 * with the one action that repairs it, and what an action from the group's menu is doing or why it
 * failed. Since 5d-4 it says which of the project's setup commands runs, which one failed, with its
 * output and a way to run them again, or that a run was cut off. Nothing when the space runs with
 * its access and its setup done; the group then behaves like any other.
 */
import React from 'react';
export declare const SpaceGroupStatus: React.FC<{
    spaceId: string;
    className?: string;
}>;
