import React from 'react';
import type { ProjectIdentitySaveData } from '@/components/sections/projects/useProjectIdentityForm';
import type { ProjectEntry } from '@/lib/api/types';
interface ProjectEditDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    project: ProjectEntry | null;
    onSave: (data: ProjectIdentitySaveData) => void | Promise<void>;
}
export declare const ProjectEditDialog: React.FC<ProjectEditDialogProps>;
export {};
