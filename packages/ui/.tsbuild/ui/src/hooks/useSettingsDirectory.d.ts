import type { ProjectEntry } from '@/lib/api/types';
/**
 * Resolves which project the Settings pages describe.
 *
 * `settingsProjectPath` is the user's pick in the Settings project selector.
 * Until they make one — or when the project it names is gone — Settings follows
 * the app's active project, so nothing looks different before it is used.
 */
export declare const resolveSettingsDirectory: (settingsProjectPath: string | null, projects: ProjectEntry[], activeProjectId: string | null) => string | null;
/**
 * Directory the Settings pages read and write configuration for.
 *
 * Settings has its own project selector. Picking a project there used to call
 * `setActiveProject`, which moves the whole app — chat, sessions, files, git —
 * so reading another project's MCP servers silently relocated the user.
 */
export declare const useSettingsDirectory: () => string | null;
