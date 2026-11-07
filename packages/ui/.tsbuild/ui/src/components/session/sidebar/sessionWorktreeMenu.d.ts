import { type ProjectRef } from '@/lib/worktrees/worktreeManager';
import type { WorktreeMetadata } from '@/types/worktree';
export type SessionWorktreeMenuTarget = {
    metadata: WorktreeMetadata;
    isPrimary: boolean;
    isCurrent: boolean;
};
export type StartSessionWorktreeMenuLoadArgs = {
    projectId: string | null;
    sourceDirectory: string | null;
    currentWorktree: WorktreeMetadata | null;
};
export type StartSessionWorktreeMenuLoadResult = {
    cachedTargets: SessionWorktreeMenuTarget[];
    refreshTargets: Promise<SessionWorktreeMenuTarget[]>;
};
type SessionWorktreeMenuState = {
    refreshState: 'error' | null;
    showNewWorktreeAction: boolean;
};
type WorktreeTopologyRefreshDependencies = {
    projects: ReadonlyArray<ProjectRef>;
    getCurrentProjects: () => ReadonlyArray<ProjectRef>;
    rawWorktreesByProjectRef: {
        current: RawWorktreesByProjectScope;
    };
    getPublishedWorktreesByProject: () => Map<string, WorktreeMetadata[]>;
    resolveProject: (directory: string) => ProjectRef | null;
    listProjectWorktrees: (project: ProjectRef, options: {
        force: true;
    }) => Promise<WorktreeMetadata[]>;
    partitionWorktreesByRegisteredProject: (projects: ReadonlyArray<Pick<ProjectRef, 'path'>>, worktreesByProject: ReadonlyMap<string, WorktreeMetadata[]>) => Map<string, WorktreeMetadata[]>;
    worktreeMapsEqual: (a: Map<string, WorktreeMetadata[]>, b: Map<string, WorktreeMetadata[]>) => boolean;
    recordWorktreesSeen: (paths: Iterable<string | null | undefined>, seenAt: number) => void;
    publishTopology: (next: {
        availableWorktrees: WorktreeMetadata[];
        availableWorktreesByProject: Map<string, WorktreeMetadata[]>;
    }) => void;
    getRuntimeKey: () => string;
    now: () => number;
};
type StartSessionWorktreeMenuLoadDependencies = WorktreeTopologyRefreshDependencies & {
    projectRootBranch: string | null;
};
export declare const refreshProjectWorktreeTopology: (project: ProjectRef, currentWorktree: WorktreeMetadata | null, deps: WorktreeTopologyRefreshDependencies) => Promise<WorktreeMetadata[]>;
type RequestRediscovery = () => void;
export type RawWorktreesByProjectScope = {
    runtimeKey: string | null;
    revision: number;
    worktreesByProject: Map<string, WorktreeMetadata[]>;
};
export declare const markRawWorktreesByProjectMutation: (rawWorktreesByProjectRef: {
    current: RawWorktreesByProjectScope;
}, runtimeKey: string) => number;
export declare const ensureRawWorktreesByProjectScope: (args: {
    rawWorktreesByProjectRef: {
        current: RawWorktreesByProjectScope;
    };
    publishedWorktreesByProject: Map<string, WorktreeMetadata[]>;
    runtimeKey: string;
}) => RawWorktreesByProjectScope;
export declare const buildSessionWorktreeMenuTargets: (args: {
    projectPath: string | null;
    discoveredWorktrees: ReadonlyArray<WorktreeMetadata>;
    sourceDirectory: string | null;
    currentWorktree: WorktreeMetadata | null;
    projectRootBranch?: string | null;
}) => SessionWorktreeMenuTarget[];
export declare const resolveSessionWorktreeMenuProject: (args: StartSessionWorktreeMenuLoadArgs, deps: Pick<WorktreeTopologyRefreshDependencies, 'projects' | 'resolveProject'>) => ProjectRef | null;
export declare const startSessionWorktreeMenuLoad: (args: StartSessionWorktreeMenuLoadArgs, deps: StartSessionWorktreeMenuLoadDependencies) => StartSessionWorktreeMenuLoadResult;
export declare const commitDiscoveredRawWorktreesByProject: (args: {
    rawWorktreesByProjectRef: {
        current: RawWorktreesByProjectScope;
    };
    runtimeKey: string;
    capturedRevision: number;
    nextRawWorktreesByProject: Map<string, WorktreeMetadata[]>;
    publishedWorktreesByProject: Map<string, WorktreeMetadata[]>;
    partitionWorktreesByRegisteredProject: StartSessionWorktreeMenuLoadDependencies['partitionWorktreesByRegisteredProject'];
    projects: ReadonlyArray<Pick<ProjectRef, 'id' | 'path'>>;
    worktreeMapsEqual: StartSessionWorktreeMenuLoadDependencies['worktreeMapsEqual'];
    recordWorktreesSeen: StartSessionWorktreeMenuLoadDependencies['recordWorktreesSeen'];
    publishTopology: StartSessionWorktreeMenuLoadDependencies['publishTopology'];
    requestRediscovery: RequestRediscovery;
    now: () => number;
}) => boolean;
export declare const getSessionWorktreeMenuState: (args: {
    targets: ReadonlyArray<SessionWorktreeMenuTarget>;
    loadFailed: boolean;
}) => SessionWorktreeMenuState;
export {};
