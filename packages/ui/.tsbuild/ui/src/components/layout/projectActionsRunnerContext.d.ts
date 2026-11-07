import React from 'react';
import type { ProjectActionsRunner } from './useProjectActionsRunner';
export declare const ProjectActionsRunnerContext: React.Context<ProjectActionsRunner | null>;
/** `null` outside the main layout (VS Code, mini chat), where no actions run. */
export declare const useProjectActions: () => ProjectActionsRunner | null;
/** Keeps run states current while `enabled`; see `ProjectActionsRunner.observe`. */
export declare const useObserveProjectActionRuns: (enabled: boolean) => void;
