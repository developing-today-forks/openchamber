import React from 'react';
import type { ProjectSetupSource } from '@/lib/openchamberConfig';
import type { ProjectSetupState } from './useProjectSetup';
/** Where an action or a command lives: in the repo for the whole team, or only in the user's own settings. */
export declare const ProjectScopeChip: React.FC<{
    source: ProjectSetupSource;
}>;
/** Stands in for a tab's content while the setup loads, or when it could not be read. */
export declare const ProjectSetupUnavailable: React.FC<{
    setupState: ProjectSetupState;
}>;
