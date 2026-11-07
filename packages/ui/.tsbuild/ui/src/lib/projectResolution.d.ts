import type { ProjectEntry } from "@/lib/api/types";
import type { WorktreeMetadata } from "@/types/worktree";
import { normalizePath } from "@/lib/pathNormalization";
export declare const normalizeProjectPath: typeof normalizePath;
export declare const resolveProjectForDirectory: (projects: ProjectEntry[], directory: string | null) => ProjectEntry | null;
export declare const resolveProjectForSessionDirectory: (projects: ProjectEntry[], availableWorktreesByProject: Map<string, WorktreeMetadata[]>, directory: string | null) => ProjectEntry | null;
