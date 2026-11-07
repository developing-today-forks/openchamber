import type { ProjectEntry } from '@/lib/api/types';
import type { DesktopSettings } from '@/lib/desktop';
interface ProjectPathValidationResult {
    ok: boolean;
    normalizedPath?: string;
    reason?: string;
}
interface VSCodeWorkspaceFolderConfig {
    name?: string;
    path: string;
}
interface ProjectsStore {
    hasServerSnapshot: boolean;
    serverSnapshotFailed: boolean;
    projects: ProjectEntry[];
    activeProjectId: string | null;
    manualProjectOrder: string[];
    addProject: (path: string, options?: {
        label?: string;
        id?: string;
    }) => Promise<ProjectEntry | null>;
    addProjects: (paths: string[]) => Promise<ProjectEntry[]>;
    removeProject: (id: string) => void;
    setActiveProject: (id: string) => void;
    setActiveProjectIdOnly: (id: string) => void;
    renameProject: (id: string, label: string) => void;
    updateProjectMeta: (id: string, meta: {
        label?: string;
        icon?: string | null;
        color?: string | null;
        iconBackground?: string | null;
        defaultAgent?: string | null;
        defaultModel?: string | null;
        defaultVariant?: string | null;
    }) => void;
    uploadProjectIcon: (id: string, file: File) => Promise<{
        ok: boolean;
        error?: string;
    }>;
    removeProjectIcon: (id: string) => Promise<{
        ok: boolean;
        error?: string;
    }>;
    discoverProjectIcon: (id: string, options?: {
        force?: boolean;
    }) => Promise<{
        ok: boolean;
        skipped?: boolean;
        reason?: string;
        error?: string;
    }>;
    reorderProjects: (fromIndex: number, toIndex: number) => void;
    resetForRuntimeSwitch: () => void;
    validateProjectPath: (path: string) => ProjectPathValidationResult;
    synchronizeFromSettings: (settings: DesktopSettings, options?: {
        adoptActiveProject?: boolean;
    }) => void;
    syncVSCodeWorkspaceFolders: (folders: VSCodeWorkspaceFolderConfig[], activePath?: string | null) => ProjectEntry | null;
    getActiveProject: () => ProjectEntry | null;
}
export declare const useProjectsStore: import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<ProjectsStore>, "devtools" | "setState"> & {
    setState(partial: Partial<ProjectsStore> | ProjectsStore | ((state: ProjectsStore) => Partial<ProjectsStore> | ProjectsStore), replace?: false | undefined, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): void;
    setState(state: ProjectsStore | ((state: ProjectsStore) => ProjectsStore), replace: true, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): void;
    devtools: {
        cleanup: () => void;
    };
}>;
export {};
