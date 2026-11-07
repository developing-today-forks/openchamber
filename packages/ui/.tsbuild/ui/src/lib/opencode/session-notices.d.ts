/**
 * Session notices: the labelled messages OpenCode, a plugin or OpenChamber
 * puts into a session that the timeline shows as a one-line info row.
 *
 * A notice is a `synthetic` message with a `description`, or the `system`
 * message OpenCode writes when the session's instructions change. OpenCode's
 * own TUI shows every such message; the timeline shows the subset below and
 * hides the rest. A message without a description is never a notice.
 * Expanding a row shows the text the model received.
 *
 * Shown:
 * - A plugin's notice: any synthetic message with a description that no rule
 *   below claims (a quota plugin's "waiting for quota reset"). The row reads
 *   the plugin's description as it is.
 * - "Continuing after restart" (`metadata.notice: "restart"`): the OpenCode
 *   server restarted mid-turn and the agent carries on.
 * - A `!command` that could not start (`source: "shell"`, `state: "error"`,
 *   no `shellID`): otherwise the failure shows nowhere.
 * - "Moved to <folder>": an "Instructions updated" whose sources include the
 *   environment (`core/environment`), which changes when the session moves to
 *   a worktree, a project or back from a removed worktree. The folder is the
 *   `Working directory` line of the text OpenCode gave the model.
 *
 * Hidden, and why:
 * - The rest about the session's instructions, as noise the maintainer saw in
 *   real sessions (2026-10-19): "Instructions updated" without the
 *   environment (AGENTS.md and config instruction files, skills, MCP servers,
 *   Code Mode, references or the date changed) and "Loaded <files>"
 *   (`metadata.instruction.paths`, an AGENTS.md of a folder the agent entered).
 * - Composer context (an inline comment, terminal output, a linked issue):
 *   it folds into the user message as context chips.
 * - A background subagent's report and a dispatched session's result: they
 *   render as their own rows already (`subagent-run`, `dispatched-session`).
 * - A background shell command's completion: it finishes the shell call's
 *   own row (`background-shell`).
 * - OpenChamber's notes to the agent that the user stopped a subagent or a
 *   background command: the row of that call already says stopped.
 * - "ACP embedded context": editor context an ACP client sends; it is the
 *   user's own attachment, not news.
 */
import type { Message, Part, ToolPart } from "./model";
export type SessionNotice = {
    kind: "plugin";
    label: string;
    text: string;
} | {
    kind: "restart";
    text: string;
} | {
    kind: "command-failed";
    command: string;
    text: string;
} | {
    kind: "moved";
    folder: string | null;
    text: string;
};
/** The notice a message carries, or undefined when the timeline does not show it. */
export declare function readSessionNotice(message: Message): SessionNotice | undefined;
/** Whether a notice row sits before the step's own parts (it came before the step) or after them. */
export type SessionNoticePlacement = "before" | "after";
/** The Activity row for a notice message, owned by the step `ownerMessageID`. */
export declare function sessionNoticePart(message: Message, notice: SessionNotice, ownerMessageID: string, placement: SessionNoticePlacement): ToolPart;
/** The notice an Activity row stands for, or undefined for any other part. */
export declare function readSessionNoticePart(part: ToolPart): SessionNotice | undefined;
/** Whether a part is a notice row `sessionNoticePart` made. */
export declare const isSessionNoticePart: (part: Part) => boolean;
/** Where a notice row sits among its step's parts, or undefined for any other part. */
export declare function sessionNoticePlacement(part: Part): SessionNoticePlacement | undefined;
