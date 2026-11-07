import { type SpaceArchive } from './spaces-api';
type SpaceArchivesState = {
    /**
     * By the directory that holds the chats, normalized as the session lists compare directories;
     * null until the host answered once for this runtime.
     */
    byDirectory: ReadonlyMap<string, SpaceArchive> | null;
    resetForRuntimeSwitch: () => void;
};
export declare const useSpaceArchivesStore: import("zustand").UseBoundStore<import("zustand").StoreApi<SpaceArchivesState>>;
/**
 * Reads the archives again. A read that fails leaves the last answer in place, so a chat known
 * to be archived never reads as live; one a runtime switch overtook is dropped.
 */
export declare const refreshSpaceArchives: () => Promise<void>;
/** Reads the archives once for this runtime, when nothing has been read yet; a failure is left for the next call. */
export declare const ensureSpaceArchives: () => void;
/** Whether a directory holds the archived chats of a deleted space, as this runtime last read the archives. */
export declare const isSpaceArchiveDirectory: (directory: string | null | undefined) => boolean;
/** The deleted space whose chats a directory holds, or null. */
export declare const useSpaceArchiveOf: (directory: string | null | undefined) => SpaceArchive | null;
export {};
