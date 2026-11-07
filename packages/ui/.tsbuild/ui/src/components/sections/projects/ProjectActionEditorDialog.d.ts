import React from 'react';
import type { OpenChamberProjectAction, ProjectSetupSource } from '@/lib/openchamberConfig';
export type ProjectActionEditorTarget = {
    /** Null while creating one. */
    action: OpenChamberProjectAction | null;
    source: ProjectSetupSource;
};
/**
 * One action, edited in its own dialog and written once on Save. "Saved in"
 * is a field like the others: switching it moves the action between the
 * user's settings and the repository's file.
 */
export declare const ProjectActionEditorDialog: React.FC<{
    target: ProjectActionEditorTarget | null;
    canShare: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (action: OpenChamberProjectAction, to: ProjectSetupSource) => Promise<boolean>;
    onDelete: () => Promise<boolean>;
}>;
