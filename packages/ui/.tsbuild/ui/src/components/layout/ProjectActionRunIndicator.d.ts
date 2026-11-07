import React from 'react';
import type { ProjectActionRun } from './useProjectActionsRunner';
/** What acting on the action does next: stop it, wait for it, or, with `showIdle`, run it. */
export declare const ProjectActionRunIndicator: React.FC<{
    run: ProjectActionRun | null;
    showIdle?: boolean;
    className?: string;
}>;
