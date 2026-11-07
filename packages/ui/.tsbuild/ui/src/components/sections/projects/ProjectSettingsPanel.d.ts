import React from 'react';
import type { ProjectSettingsTab } from '@/components/sections/projects/projectSettingsTabs';
import { type ProjectIdentitySaveData } from '@/components/sections/projects/useProjectIdentityForm';
import type { ProjectEntry } from '@/lib/api/types';
type ProjectSettingsPanelProps = {
    project: ProjectEntry;
    onIdentitySave: (data: ProjectIdentitySaveData) => void | Promise<void>;
    tab: ProjectSettingsTab;
    onTabChange: (tab: ProjectSettingsTab) => void;
    /** Settings frames the panel as a page with the save indicator; the edit dialog shows it bare. */
    frame: 'page' | 'dialog';
    /** Opens the project's worktrees page; absent where that page is not reachable. */
    onOpenWorktrees?: () => void;
    /** Closes the project, as the sidebar's "Close project" does; shown only in the page frame. */
    onCloseProject?: () => void;
};
/**
 * Everything a project carries, on one page: the icon, colour and name in
 * the header, and below it a tab per concern. Settings and the project's
 * edit dialog both show this panel.
 */
export declare const ProjectSettingsPanel: React.FC<ProjectSettingsPanelProps>;
export {};
