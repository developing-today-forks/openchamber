import React from 'react';
import type { ProjectRef } from '@/lib/projectContextApi';
export declare const ProjectContextPanel: React.FC<{
    visible?: boolean;
    onActionComplete?: () => void;
    onOpenPlan?: (plan: {
        id: string;
        title: string;
        projectRef: ProjectRef;
    }) => void;
}>;
