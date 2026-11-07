import { type RunningShell } from '@/lib/opencode/background-shell';
import type { SyncEvent } from '@/lib/opencode/events';
export type TrackedShell = RunningShell & {
    directory: string;
    /** Went to the background; false while the turn that started it waits for it. */
    background: boolean;
};
/**
 * `stopped`: removed while running, by a user's Stop or an aborted turn.
 * `unknown`: the end fell into a stream gap and a list read dropped it.
 */
export type EndedShellStatus = 'exited' | 'timeout' | 'killed' | 'stopped' | 'unknown';
export type EndedShell = TrackedShell & {
    status: EndedShellStatus;
    exit?: number;
    endedAt: number;
};
type BackgroundShellsState = {
    byId: ReadonlyMap<string, TrackedShell>;
    /** Sessions with at least one running command. */
    sessionIds: ReadonlySet<string>;
    /** Commands seen running that have since ended, oldest end first. */
    ended: ReadonlyMap<string, EndedShell>;
};
export declare const ENDED_SHELLS_MAX = 200;
export declare const useBackgroundShellsStore: import("zustand").UseBoundStore<import("zustand").StoreApi<BackgroundShellsState>>;
/** Applies shell lifecycle events for one directory. Other event types are ignored cheaply. */
export declare const applyBackgroundShellEvents: (rawDirectory: string, payloads: readonly SyncEvent[]) => void;
/**
 * Replaces one directory's commands with a complete list read from it.
 * `since` is the revision the read started at (`backgroundShellRevision()`).
 */
export declare const replaceDirectoryShells: (rawDirectory: string, shells: readonly RunningShell[], since: number) => void;
export declare const backgroundShellRevision: () => number;
/**
 * Reads a directory's running commands and applies them. A failed read
 * rejects and changes nothing: it proves nothing about the commands.
 */
export declare const refreshBackgroundShells: (directory: string, listRunningShells: (directory: string) => Promise<{
    directory: string;
    shells: RunningShell[];
}>) => Promise<void>;
/** Directories the index holds running commands for. */
export declare const directoriesWithRunningShells: () => string[];
export declare const hasRunningShell: (sessionId: string) => boolean;
export declare const resetBackgroundShells: () => void;
/**
 * Which of `sessionIds` are `rootId` itself or one of its subagents, at any
 * depth, sorted. `parentOf` answers from the session list the caller holds; a
 * session it does not know ends its chain, so its commands stay out.
 */
export declare const sessionsInTree: (sessionIds: Iterable<string>, rootId: string, parentOf: (sessionId: string) => string | undefined) => string[];
/** Commands of the given sessions that went to the background, oldest first. */
export declare const backgroundShellsOfSessions: (byId: ReadonlyMap<string, TrackedShell>, sessionIds: ReadonlySet<string>) => TrackedShell[];
export declare const useRunningShell: (shellID: string | undefined) => TrackedShell | undefined;
export {};
