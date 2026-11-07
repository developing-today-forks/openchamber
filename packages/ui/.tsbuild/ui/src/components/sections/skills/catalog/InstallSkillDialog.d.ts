import React from 'react';
import type { SkillsCatalogItem } from '@/lib/api/types';
interface InstallSkillDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    items: SkillsCatalogItem[];
}
export declare const InstallSkillDialog: React.FC<InstallSkillDialogProps>;
export {};
