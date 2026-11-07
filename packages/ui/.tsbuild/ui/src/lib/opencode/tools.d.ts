/**
 * The tools OpenCode v2 ships, and the only place chat rendering is allowed to
 * branch on a tool name.
 *
 * v2 renamed and reshaped the built-ins: `bash` became `shell`, `task` became
 * `subagent`, `apply_patch` became `patch`, and `todowrite`, `todoread`, `lsp`,
 * `multiedit` and `list` are gone. File tools take `path` (not `filePath`), and
 * a tool state no longer carries a server-rendered `title` — the row's
 * description has to be derived from the call's own input and metadata.
 *
 * Everything outside this module works with the predicates and accessors here,
 * so the next rename is one file. Names that are not in this list (MCP servers,
 * OpenChamber's own plugin tools) still flow through the generic renderers;
 * every helper answers "no"/"unknown" for them instead of throwing.
 *
 * A call's `input` and `metadata` are free-form JSON the model and the tool
 * produced, so every read here parses the fields it claims to understand and
 * ignores the rest: one malformed field must not blank a whole tool row.
 */
import { z } from "zod";
import type { JsonValue, Metadata, ToolInput, ToolState } from "./model";
/** Built-in tool names as the server reports them. */
export declare const OPENCODE_TOOLS: {
    readonly edit: "edit";
    readonly execute: "execute";
    readonly glob: "glob";
    readonly grep: "grep";
    readonly patch: "patch";
    readonly question: "question";
    readonly read: "read";
    readonly shell: "shell";
    readonly skill: "skill";
    readonly subagent: "subagent";
    readonly webfetch: "webfetch";
    readonly websearch: "websearch";
    readonly write: "write";
    readonly sessionRename: "session_rename";
    readonly sessionMove: "session_move";
    readonly models: "models";
};
/** A tool name as it arrives on a part: always a string, sometimes namespaced. */
export type ToolName = string | undefined;
/**
 * Comparable form of a tool name: lowercased, without a trailing `:index`
 * dedup suffix, and reduced to the last segment of a namespaced name
 * (`opencode.session_rename` -> `session_rename`).
 */
export declare function normalizeToolName(toolName: ToolName): string;
export declare const isShellTool: (toolName: ToolName) => boolean;
/**
 * Code Mode: one tool that runs a short JS script which calls the MCP and
 * integration tools as functions. The script is `input.code`; what it actually
 * called is `metadata.toolCalls`.
 */
export declare const isExecuteTool: (toolName: ToolName) => boolean;
export declare const isSubagentTool: (toolName: ToolName) => boolean;
export declare const isQuestionTool: (toolName: ToolName) => boolean;
export declare const isSkillTool: (toolName: ToolName) => boolean;
export declare const isEditTool: (toolName: ToolName) => boolean;
export declare const isWriteTool: (toolName: ToolName) => boolean;
export declare const isPatchTool: (toolName: ToolName) => boolean;
export declare const isNavigationTool: (toolName: ToolName) => boolean;
/** Tools that mutate a file, so a turn counts their result as a change. */
export declare const isFileChangeTool: (toolName: ToolName) => boolean;
/** Tools whose result metadata carries `files: FileDiff.Info[]`. */
export declare const carriesFileDiffs: (toolName: ToolName) => boolean;
export declare const isExplorationTool: (toolName: ToolName) => boolean;
export declare const isWebTool: (toolName: ToolName) => boolean;
export declare const isWebSearchTool: (toolName: ToolName) => boolean;
declare const fileDiffSchema: z.ZodObject<{
    file: z.ZodCatch<z.ZodOptional<z.ZodString>>;
    patch: z.ZodCatch<z.ZodOptional<z.ZodString>>;
    additions: z.ZodCatch<z.ZodOptional<z.ZodNumber>>;
    deletions: z.ZodCatch<z.ZodOptional<z.ZodNumber>>;
    status: z.ZodCatch<z.ZodOptional<z.ZodEnum<{
        added: "added";
        deleted: "deleted";
        modified: "modified";
    }>>>;
}, z.core.$strip>;
/** One entry of a tool's `metadata.files` (`FileDiff.Info` on the wire). */
export type ToolFileDiff = z.infer<typeof fileDiffSchema> & {
    file: string;
};
/**
 * The file a call targets, as the tool reported it. Callers render it relative
 * to the session directory.
 */
export declare function toolInputPath(input: ToolInput | undefined): string | undefined;
/**
 * Per-file diffs a completed `edit` or `patch` call reported. Entries without
 * a file are dropped rather than failing the whole list, so one malformed file
 * cannot erase the other files of the same call.
 */
export declare function toolFileDiffs(metadata: Metadata | undefined): ToolFileDiff[];
/** A tool an `execute` script called, as the row and the expanded body show it. */
export type ExecuteToolCall = {
    tool: string;
    /** `completed`, `error`, or whatever else the runtime reported. */
    status?: string;
    /** The call arguments as compact one-line JSON, absent when there were none. */
    input?: string;
};
/** Blocking work in a running `execute`, including progress forwarded by its child tool. */
export declare function executeHasBackgroundableWork(metadata: Metadata | undefined): boolean;
/**
 * The tools an `execute` script called, in order. Entries without a tool name
 * are dropped rather than failing the list, so one malformed call cannot erase
 * the other calls of the same script.
 */
export declare function executeToolCalls(metadata: Metadata | undefined): ExecuteToolCall[];
/**
 * Where OpenCode wrote an `execute` result it had to cut short, or `null` when
 * the row shows the whole output. The path is shown as plain text: the app has
 * no open-file affordance for a path outside the project.
 */
export declare function executeOutputTruncation(metadata: Metadata | undefined): {
    outputPath?: string;
} | null;
/** The script an `execute` call ran (`input.code`). */
export declare function executeScript(input: ToolInput | undefined): string | undefined;
/** Where a page stands on the user's answer. */
export type RenderedPageAsk = {
    kind: "show";
} | {
    kind: "waiting";
} | {
    kind: "answered";
    summary: string;
    data: JsonValue;
} | {
    kind: "answered-in-chat";
} | {
    kind: "unanswered";
};
/**
 * The page an `openchamber_render` call showed: present once OpenChamber
 * accepted the call, so a refused or unfinished call keeps its tool row. A
 * page that waits for the user's answer shows while its call runs, since the
 * call runs until the user answers, and after a call that failed while waiting.
 */
export declare function renderedPage(toolName: ToolName, state: ToolState): {
    html: string;
    title: string;
    ask: RenderedPageAsk;
} | null;
export declare function subagentAgent(input: ToolInput | undefined): string | undefined;
/** The short label a `subagent` call gives its task (`input.description`). */
export declare function subagentDescription(input: ToolInput | undefined): string | undefined;
/** The child session a `subagent` call runs in (`metadata.sessionID`). */
export declare function subagentSessionId(metadata: Metadata | undefined): string | undefined;
/**
 * What a tool row shows under the tool name.
 *
 * `path` results are raw paths the caller still renders relative to the
 * session directory (and with a file icon); `text` results are shown as is.
 */
/**
 * What a tool row says under its name. `path`/`text` come straight from the
 * call; `questions`/`files` are counts the UI turns into localized copy.
 */
export type ToolDescription = {
    kind: "path";
    value: string;
} | {
    kind: "text";
    value: string;
} | {
    kind: "questions";
    count: number;
}
/** Several files in one call; `files` are the raw paths, `count` their number. */
 | {
    kind: "files";
    count: number;
    files: string[];
}
/** An `execute` script, described by the tools it called. */
 | {
    kind: "tools";
    calls: Array<{
        name: string;
        count: number;
    }>;
    overflow: number;
};
/**
 * The files a `patch` call names in its own text (`*** Add File: path` and
 * friends), so the row can describe the call before the tool reports its
 * diffs and when a run ends without them.
 */
export declare function patchInputFiles(input: ToolInput | undefined): string[];
/**
 * The files whose directory listing a finished call may have changed, as the
 * call named them (relative to the session directory, or absolute). `write`
 * may create its file; `patch` adds, deletes and moves, so both the paths in
 * its text and the ones it reported count. An empty list means the call
 * changed no listing. `null` means it could have touched any file: `shell`,
 * `execute`, and every MCP or plugin tool.
 */
export declare function toolListingChanges(toolName: ToolName, input: ToolInput | undefined, metadata: Metadata | undefined): string[] | null;
/**
 * Derives the row description from v2 data alone: no state carries a title any
 * more, so every tool answers from its own input, falling back to the per-tool
 * result metadata and finally to a generic `description` field for MCP tools.
 */
export declare function toolDescription(toolName: ToolName, input: ToolInput | undefined, metadata: Metadata | undefined): ToolDescription | null;
export {};
