/**
 * Recent OpenCode session errors, kept in memory for diagnostics.
 *
 * OpenCode reports a failed turn as a `session.error` event. The message it
 * carries is the only account of what went wrong, and it may arrive without
 * an assistant message to attach itself to, so a turn can end with nothing
 * on screen. This buffer keeps the last errors until someone asks for them,
 * via `__opencodeDebug`; the diagnostic timeline exports only the event type,
 * not the raw error message. In-memory
 * only: never persisted, never sent anywhere, dropped on reload.
 */
import type { StructuredError } from '@/lib/opencode/model';
export type OpenCodeErrorSummary = {
    name: string | null;
    message: string | null;
};
export type SessionErrorRecord = OpenCodeErrorSummary & {
    at: number;
    sessionId: string;
    directory: string | null;
};
/**
 * OpenCode v2 reports a failed turn as `{ type, message }`. The record keeps
 * both: `type` names the failure class the server recognised, `message` is the
 * text worth showing. Returns nulls when neither is usable, so a caller can
 * tell "no details" from a real message.
 */
export declare function summarizeOpenCodeError(error: StructuredError | null | undefined): OpenCodeErrorSummary;
/**
 * The provider's raw response body behind the error (OpenCode 2.0.20+), for
 * the details a person can expand under the notice. Kept out of the
 * diagnostics records: a body may echo request content.
 */
export declare function responseBodyOf(error: StructuredError | null | undefined): string | null;
export declare function recordSessionError(record: Omit<SessionErrorRecord, 'at'>): void;
/** Newest first. */
export declare function getRecentSessionErrors(): SessionErrorRecord[];
