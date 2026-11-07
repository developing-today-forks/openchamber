import type { DesktopSshInstance } from '@/lib/desktopSsh';
import type { IconName } from "@/components/icon/icons";
type ProjectActionIconKey = 'play' | 'build' | 'lint' | 'terminal' | 'tools' | 'bug' | 'flask' | 'rocket' | 'code' | 'server' | 'branch' | 'search' | 'settings' | 'brain' | 'stack' | 'robot' | 'command' | 'file';
/** The id of the built-in action that detects the dev server command and opens what it serves. */
export declare const AUTO_DISCOVER_ACTION_ID = "__openchamber_auto_discover_preview__";
export declare const PROJECT_ACTION_ICONS: Array<{
    key: ProjectActionIconKey;
    label: string;
    Icon: IconName;
}>;
export declare const PROJECT_ACTION_ICON_MAP: Record<ProjectActionIconKey, IconName>;
export declare const PROJECT_ACTIONS_UPDATED_EVENT = "openchamber:project-actions-updated";
export declare const normalizeProjectActionDirectory: (value: string) => string;
export declare const toProjectActionRunKey: (directory: string, actionId: string) => string;
type ProjectActionDesktopForwardOption = {
    id: string;
    label: string;
    url: string;
};
export declare const buildProjectActionDesktopForwardOptions: (instances: DesktopSshInstance[]) => ProjectActionDesktopForwardOption[];
export declare const resolveProjectActionDesktopForwardUrl: (selectionId: string | undefined, instances: DesktopSshInstance[]) => string | null;
export declare const resolveProjectActionIconName: (action: {
    id: string;
    icon?: string | null;
}) => IconName;
export {};
