/**
 * Background shell commands, as the transcript and the shell routes report them.
 *
 * OpenCode 2.x runs a `shell` call with `background: true` (or one moved to the
 * background mid-run) as a job and settles the tool call at once: its
 * metadata carries `status: "running"` and the `shellID`, and its text is a
 * "moved to the background" notice followed by instructions for the model.
 * While the command runs, `/api/shell` lists it with the originating session
 * in its metadata, and `shell.created` / `shell.exited` / `shell.deleted`
 * announce it on the event stream. When the job settles, OpenCode appends one
 * synthetic message whose metadata names the shell (`source: "shell"`) and
 * whose text wraps the result in a `<shell …>` envelope (core
 * `tool/plugin/shell.ts`, `shell/result.ts`).
 */
import type { Message, Metadata, ToolPart } from "./model";
/** A command the shell service is still running for a session. */
export type RunningShell = {
    id: string;
    sessionID: string;
    command: string;
    /** File the combined output streams to. */
    file: string;
    startedAt: number;
};
/**
 * How the shell service reported a command's end on the event stream. A
 * command exits with a terminal status, or is removed: a running command by
 * a user's Stop (the shell route) or by aborting the turn whose tool call
 * waits on it, an exited one when OpenCode evicts it from its history.
 */
export type ShellEnd = {
    kind: "exited";
    status: "exited" | "timeout" | "killed";
    exit?: number;
} | {
    kind: "removed";
};
/** How a background command ended, from its completion message. */
export type ShellCompletion = {
    shellID: string;
    state: "completed" | "cancelled" | "error";
    exit?: number;
    signal?: string;
    timeout?: boolean;
    /** Captured output and any failure notice, without the envelope. */
    output: string;
    endedAt: number;
};
/**
 * The shell id of a call OpenCode moved to the background, or undefined for
 * any other call. Only a settled call carries the marker.
 */
export declare function readBackgroundShellID(part: ToolPart): string | undefined;
/**
 * The shell id in the metadata a call settles with when its command went to
 * the background. A call that waits for its command settles only after the
 * command ended, without this marker.
 */
export declare function readBackgroundShellIDFromMetadata(metadata: Metadata | undefined): string | undefined;
/** The background command a message reports the end of, or undefined for any other message. */
export declare function readShellCompletion(message: Message): ShellCompletion | undefined;
/** The completion of one background command among a session's messages. */
export declare function findShellCompletion(messages: readonly Message[], shellID: string): ShellCompletion | undefined;
export declare const shellCompletionFailed: (completion: ShellCompletion) => boolean;
export type StoppedShell = {
    shellID: string;
    command: string;
};
/** A command to stop, with the directory its shell runs in. */
export type ShellToStop = StoppedShell & {
    shellDirectory: string;
};
/** The note that precedes stopping background commands of one session. Model-facing text, never shown in the UI. */
export declare function shellCancellationNote(shells: readonly [StoppedShell, ...StoppedShell[]]): {
    text: string;
    description: string;
    metadata: {
        openchamberShellCancellation: {
            shellIDs: string[];
        };
    };
};
/** The shells a stop note is about, or undefined for any other message. */
export declare function readShellCancellation(message: Message): {
    shellIDs: string[];
    stoppedAt: number;
} | undefined;
/** When the user stopped one background command, if they did. */
export declare function findShellCancellation(messages: readonly Message[], shellID: string): {
    stoppedAt: number;
} | undefined;
type ShellInfoWire = {
    id: string;
    status: string;
    command: string;
    file: string;
    metadata: Metadata;
    time: {
        started: number;
    };
};
/**
 * A running command started on behalf of a session. The shell tool tags every
 * command it spawns with the session; commands without one (a terminal the
 * TUI opened) belong to no session and are not tracked.
 */
export declare function runningShellFromWire(info: ShellInfoWire): RunningShell | undefined;
export {};
