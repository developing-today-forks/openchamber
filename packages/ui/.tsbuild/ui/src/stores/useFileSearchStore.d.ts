import { type ProjectFileSearchHit } from '@/lib/opencode/client';
interface FileSearchCacheEntry {
    files: ProjectFileSearchHit[];
    timestamp: number;
}
interface FileSearchStoreState {
    cache: Record<string, FileSearchCacheEntry>;
    cacheKeys: string[];
    inFlight: Record<string, Promise<ProjectFileSearchHit[]>>;
    searchFiles: (directory: string, query: string, limit?: number, options?: {
        includeHidden?: boolean;
        respectGitignore?: boolean;
        type?: 'file' | 'directory';
    }) => Promise<ProjectFileSearchHit[]>;
    invalidateDirectory: (directory?: string | null) => void;
    resetForRuntimeSwitch: () => void;
}
export declare const useFileSearchStore: import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<FileSearchStoreState>, "devtools" | "setState"> & {
    setState(partial: FileSearchStoreState | Partial<FileSearchStoreState> | ((state: FileSearchStoreState) => FileSearchStoreState | Partial<FileSearchStoreState>), replace?: false | undefined, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): void;
    setState(state: FileSearchStoreState | ((state: FileSearchStoreState) => FileSearchStoreState), replace: true, action?: (string | {
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
