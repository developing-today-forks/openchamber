/**
 * Results of sessions an agent dispatched with `returnResult`, as the
 * dispatching session's transcript sees them.
 *
 * When the dispatched session's turn ends, the OpenChamber server
 * (`web/server/lib/dispatch-results`) appends one synthetic message to the
 * session that dispatched it and wakes that session. Its metadata names the
 * dispatched session (`source: "openchamber-session"`) and its text wraps the
 * answer in an `<openchamber-session …>` envelope, the way OpenCode reports a
 * background subagent (see `./subagent-run`).
 */
import type { Message } from "./model";
export type DispatchedSessionState = "completed" | "error" | "cancelled";
export type DispatchedSessionResult = {
    sessionID: string;
    state: DispatchedSessionState;
    title?: string;
    /** The session's final answer (or failure text), without the envelope. */
    output: string;
    reportedAt: number;
};
/** The dispatched session a message reports the result of, or undefined for any other message. */
export declare function readDispatchedSessionResult(message: Message): DispatchedSessionResult | undefined;
