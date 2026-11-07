import type { WorktreeMetadata } from "@/types/worktree";
export declare function readPersistedWorktreeTopology(runtimeKey: string, storage?: Storage): Map<string, WorktreeMetadata[]>;
export declare function persistWorktreeTopology(runtimeKey: string, topology: Map<string, WorktreeMetadata[]>, storage?: Storage): void;
