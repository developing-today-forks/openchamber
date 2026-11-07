import type { Part, Session, ToolInput } from '@/lib/opencode/model';
/**
 * The child session a subagent call runs in. v2 puts it on the call's result
 * metadata as `sessionID`; `sessionId` stays accepted for the legacy
 * `<task_metadata>` block.
 */
export declare const readTaskSessionIdFromRecord: (value: unknown) => string | undefined;
/**
 * OpenCode 2.x publishes a running subagent's child session id only through
 * the ephemeral `session.tool.progress` event; the stored tool part carries
 * no metadata until the call settles. A parent message loaded over REST while
 * the subagent runs therefore has no join. This recovers it from the child
 * session record: a child of the parent session, created after the call
 * started, running the requested agent, and not already joined to another
 * Task call of the same message. Parallel calls of one agent leave several
 * such children; OpenCode titles each child with its call's `description`,
 * which narrows them to one. Anything but exactly one candidate yields
 * `undefined`; the caller drops this fallback once the real id arrives.
 */
export declare const resolveRunningTaskChildSessionId: (options: {
    sessions: readonly Session[];
    parentSessionID: string;
    startedAt: number;
    /** The Task's `input.agent`; OpenCode stores this id on the child session. */
    agent: ToolInput[string] | undefined;
    /** The Task's `input.description`; OpenCode uses it as the child title. */
    description: ToolInput[string] | undefined;
    siblingParts: readonly Part[] | undefined;
    partID: string;
}) => string | undefined;
export declare const readTaskSessionIdFromOutput: (output: string | undefined) => string | undefined;
export declare const prepareTaskToolOutput: (output: string | undefined) => string;
