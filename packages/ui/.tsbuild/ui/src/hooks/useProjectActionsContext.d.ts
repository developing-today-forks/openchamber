import type { ProjectEntry } from '@/lib/api/types';
import type { ProjectRef } from '@/lib/openchamberConfig';
import type { WorktreeMetadata } from '@/types/worktree';
export interface ProjectActionsContext {
    projectRef: ProjectRef;
    directory: string;
}
interface ProjectActionsOwnerInput {
    projects: ProjectEntry[];
    worktreesByProject: Map<string, WorktreeMetadata[]>;
    directory: string | null;
    activeProjectId: string | null;
}
export declare const resolveProjectActionsOwner: ({ projects, worktreesByProject, directory, activeProjectId, }: ProjectActionsOwnerInput) => ProjectEntry | null;
/**
 * Resolves the active project ref + working directory whose actions
 * `ProjectActionsProvider` runs. Directory
 * priority: worktree → session → draft → project path. A sticky ref keeps the last
 * good context so the actions button doesn't flicker during session switches.
 */
export declare function useProjectActionsContext(): ProjectActionsContext | null;
export {};
