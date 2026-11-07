import type { GitLogEntry } from '@/lib/api/types';
export declare const commitSelectionKey: (directory: string, branch: string | null, runtimeKey?: string) => string;
interface CommitSelectionState {
    selections: Map<string, GitLogEntry>;
    select: (key: string, commit: GitLogEntry) => void;
}
export declare const useCommitSelectionStore: import("zustand").UseBoundStore<import("zustand").StoreApi<CommitSelectionState>>;
export {};
