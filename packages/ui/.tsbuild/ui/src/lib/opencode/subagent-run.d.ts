/**
 * Background subagent runs, as the parent session's transcript sees them.
 *
 * OpenCode 2.x runs a command configured with `subagent: true`, and a
 * `subagent` tool call with `background: true`, as a job in a child session.
 * The parent's transcript gets nothing when the job starts. When the job
 * settles, OpenCode appends one synthetic message whose metadata names the
 * child (`source: "subagent"`) and whose text wraps the result in a
 * `<subagent …>` envelope (core `session/subagent-completion.ts`).
 *
 * While the job runs the only record of it is the child session itself, so a
 * running entry is built here from that record, in the same shape as the
 * completion, and the timeline renders both through one path.
 */
import type { Message, Part, Session, SyntheticMessage, ToolPart } from "./model";
export type SubagentRunState = "running" | "completed" | "error" | "cancelled";
export type SubagentRun = {
    childSessionID: string;
    agent?: string;
    state: SubagentRunState;
    description?: string;
    /** The child's final answer (or failure text), without the envelope. */
    output: string;
    /** When the report arrived (for a running entry, when the child started). */
    reportedAt: number;
};
/** The subagent run a message reports, or undefined for any other message. */
export declare function readSubagentRun(message: Message): SubagentRun | undefined;
/**
 * A timeline entry for a job that is still running. It exists only on the
 * client: its id is not a message OpenCode knows, so nothing may revert or
 * fork from it.
 */
export declare function runningSubagentRunMessage(parentSessionID: string, child: Session): SyntheticMessage;
export declare const isRunningSubagentRunMessage: (messageID: string) => boolean;
/** The child session of a subagent call that went to the background, or undefined for any other call. */
export declare function readBackgroundSubagentChildID(part: ToolPart): string | undefined;
/** The report of one child session among a session's messages. */
export declare function findSubagentRun(messages: readonly Message[], childSessionID: string): SubagentRun | undefined;
/** The note that precedes stopping a subagent. Model-facing text, never shown in the UI. */
export declare function subagentCancellationNote(input: {
    childSessionID: string;
    description: string | undefined;
}): {
    text: string;
    description: string;
    metadata: {
        openchamberSubagentCancellation: {
            sessionID: string;
        };
    };
};
/** Whether a message is the note that precedes stopping a subagent. */
export declare const isSubagentCancellationNote: (message: Message) => boolean;
/** Whether the user stopped the subagent running in one child session. */
export declare function findSubagentCancellation(messages: readonly Message[], childSessionID: string): boolean;
/**
 * The records with only the subagent reports of `subagent: true` commands
 * that started inside them. A report never opens a row of its own at the end
 * of the chat for a subagent the transcript already shows, or started before
 * the loaded history: the first finishes its call's row, the second is
 * reachable from the session's subagent list. A command run leaves no call,
 * so its report is its only trace; it is recognised as a child that started
 * within the loaded records while no call in them names it. A child whose
 * start is unknown is treated as outside. Returns the input unchanged when
 * nothing is dropped.
 */
export declare function keepCommandSubagentReports<T extends {
    info: Message;
    parts: Part[];
}>(records: T[], childStartedAt: (childSessionID: string) => number | undefined): T[];
