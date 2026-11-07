import React from 'react';
import { type ProjectRef } from '@/lib/openchamberConfig';
import type { ProjectSetupState } from './useProjectSetup';
export declare const ProjectWorktreesTab: React.FC<{
    projectRef: ProjectRef;
    setupState: ProjectSetupState;
    /** Opens the project's worktrees page; absent where that page does not exist. */
    onOpenWorktrees?: () => void;
}>;
