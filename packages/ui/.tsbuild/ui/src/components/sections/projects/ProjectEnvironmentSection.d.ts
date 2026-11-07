import React from 'react';
import type { ProjectRef } from '@/lib/openchamberConfig';
/**
 * A project's variables and its environment command (direnv, devenv), for
 * Git, the terminal and project actions in the project and its worktrees.
 * The managed OpenCode serves every project at once, so it never gets these.
 */
export declare const ProjectEnvironmentSection: React.FC<{
    projectRef: ProjectRef;
}>;
