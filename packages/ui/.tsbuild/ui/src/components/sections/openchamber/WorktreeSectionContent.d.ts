import React from 'react';
interface WorktreeSectionContentProps {
    projectRef?: {
        id: string;
        path: string;
    } | null;
}
/**
 * The project's worktrees with a delete button each, for the Worktrees page.
 * Setup commands are edited on the project's Settings page.
 */
export declare const WorktreeSectionContent: React.FC<WorktreeSectionContentProps>;
export {};
