import React from 'react';
import type { useProjectIdentityForm } from './useProjectIdentityForm';
type ProjectIdentityFormState = ReturnType<typeof useProjectIdentityForm>;
/**
 * The top of the project page: the icon, which opens the colour and icon
 * picker, the name, edited in place, and the path.
 */
export declare const ProjectSettingsHeader: React.FC<{
    form: ProjectIdentityFormState;
}>;
export {};
