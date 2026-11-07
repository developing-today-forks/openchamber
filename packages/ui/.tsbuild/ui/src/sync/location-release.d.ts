import type { WorktreeMetadata } from "@/types/worktree";
import type { State } from "./types";
/** Long enough that flicking between chats does not restart their MCP servers. */
export declare const CHAT_LOCATION_RELEASE_DELAY_MS = 30000;
/**
 * Worktrees are a place the user works in and comes back to through the day,
 * and coming back after a release waits for the MCP servers to start again.
 */
export declare const WORKTREE_LOCATION_RELEASE_DELAY_MS: number;
type Timers<T> = {
    set: (run: () => void, ms: number) => T;
    clear: (timer: T) => void;
};
/**
 * `busy`: work or a question for the user still holds the location.
 * `unknown`: this window cannot see the directory's sessions, so it leaves
 * the location to OpenCode's own sweep.
 */
export type DirectoryUse = "free" | "busy" | "unknown";
type LocationReleaseDeps<T> = {
    /** How long after leaving `directory` to release it; null never releases it. */
    releaseDelayMs: (directory: string) => number | null;
    isCurrentDirectory: (directory: string) => boolean;
    directoryUse: (directory: string) => DirectoryUse;
    release: (directory: string) => Promise<void>;
    timers: Timers<T>;
};
export type LocationRelease = {
    /** The user moved from `previous` to `next`. */
    directoryChanged: (previous: string | null | undefined, next: string | null | undefined) => void;
    /**
     * Something that kept a directory busy let go. Directories waiting for
     * their next busy re-check that `matches` accepts are looked at now.
     */
    recheck: (matches: (directory: string) => boolean) => void;
    dispose: () => void;
};
export declare function createLocationRelease<T>(deps: LocationReleaseDeps<T>): LocationRelease;
/**
 * Whether anything in `directory` still needs its location: a running or
 * retrying session, a pending permission or form, a recap and suggestion the
 * server is still to write, or a background command.
 * `state` is the directory's store; without one the answer is unknown.
 */
export declare function directoryUse(directory: string, state: Pick<State, "session_status" | "permission" | "form"> | undefined): DirectoryUse;
/** Whether `directory` is a known worktree of a project or a sub-folder inside one, not the project root itself. */
export declare function isWorktreeDirectory(directory: string, availableWorktreesByProject: ReadonlyMap<string, readonly WorktreeMetadata[]>): boolean;
export declare function createRealLocationRelease(deps: Omit<LocationReleaseDeps<ReturnType<typeof setTimeout>>, "timers">): LocationRelease;
export {};
