import React from 'react';
import { type ProjectRef } from '@/lib/openchamberConfig';
import type { useProjectIdentityForm } from './useProjectIdentityForm';
import type { ProjectSetupState } from './useProjectSetup';
type ProjectIdentityFormState = ReturnType<typeof useProjectIdentityForm>;
export declare const ProjectGeneralTab: React.FC<{
    form: ProjectIdentityFormState;
    projectRef: ProjectRef;
    setupState: ProjectSetupState;
}>;
export {};
