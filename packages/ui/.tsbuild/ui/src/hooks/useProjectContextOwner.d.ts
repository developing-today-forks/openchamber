import { type ProjectRef } from '@/lib/projectContextApi';
import type { WorktreeMetadata } from '@/types/worktree';
import type { ProjectEntry } from '@/lib/api/types';
interface ProjectContextOwnerInput {
    projects: ProjectEntry[];
    worktreesByProject: Map<string, WorktreeMetadata[]>;
    directory: string | null;
    activeProjectId: string | null;
    chatDraftOpen: boolean;
    chatDraftTarget: 'chat' | 'project';
    /** The server-named chats root; null until known. */
    chatsRoot: string | null;
}
export declare const resolveProjectContextOwner: ({ projects, worktreesByProject, directory, activeProjectId, chatDraftOpen, chatDraftTarget, chatsRoot: knownChatsRoot, }: ProjectContextOwnerInput) => ProjectRef | null;
/**
 * The project an agent's plan-open request means, outside React. The asking
 * session's directory decides it the way it decides the panel's owner; when
 * the agent named another project, the request's storage id picks it from the
 * registered projects. Null when this window knows no such project.
 */
export declare const resolvePlanRequestOwner: (directory: string | null, projectId: string) => ProjectRef | null;
/** The single owner used by Project knowledge and agent-memory synchronization. */
export declare const useProjectContextOwner: (directory: string | null) => ProjectRef | null;
export {};
