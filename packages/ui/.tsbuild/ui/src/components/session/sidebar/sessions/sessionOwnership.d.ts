import type { Project as OpenCodeProject, Session } from '@/lib/opencode/model';
import type { SpaceMark } from '@/lib/spaces/spaces-store';
type Project = {
    id: string;
    normalizedPath: string;
};
type Worktree = {
    path: string;
};
type SessionProjectMetadata = {
    id?: string | null;
    worktree?: string | null;
};
export type SessionOwnershipRecord = Session & {
    directory?: string | null;
    projectID?: string | null;
    project?: SessionProjectMetadata | null;
};
type AuthoritativeOpenCodeProject = Pick<OpenCodeProject, 'id' | 'worktree'>;
export type DirectoryOwner = {
    projectId: string;
    projectRoot: string;
    scopeDirectory: string;
    kind: 'project' | 'worktree' | 'space';
    /** The isolated space that owns the scope, for `kind: 'space'`. */
    spaceId?: string;
};
export type SessionOwnershipIndex = {
    bySessionId: Map<string, DirectoryOwner>;
    sessionsByProject: Map<string, Session[]>;
    archivedSessionsByProject: Map<string, Session[]>;
    sessionsByScope: Map<string, Set<string>>;
    directoryResolutions: number;
};
export declare const createSessionOwnershipIndex: (sessions: SessionOwnershipRecord[], projects: Project[], availableWorktreesByProject: Map<string, Worktree[]>, isVSCode: boolean, archivedSessions?: SessionOwnershipRecord[], authoritativeProjects?: readonly AuthoritativeOpenCodeProject[], spaces?: readonly SpaceMark[]) => SessionOwnershipIndex;
export {};
