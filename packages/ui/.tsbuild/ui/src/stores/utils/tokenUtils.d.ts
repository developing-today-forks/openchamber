import type { AssistantMessage, Message, Part } from "@/lib/opencode/model";
import type { SessionContextUsage } from "../types/sessionTypes";
type TokenBreakdown = {
    /** Server-reported window of the turn's final round-trip. Optional in the schema; absent on older servers. */
    total?: number;
    input?: number;
    output?: number;
    reasoning?: number;
    cache?: {
        read?: number;
        write?: number;
    };
};
export declare const sumTokenBreakdown: (breakdown: TokenBreakdown | null | undefined) => number;
/**
 * Tokens the context window actually holds, from one message's token payload.
 *
 * The breakdown fields accumulate across every API round-trip inside a single
 * assistant turn: each tool call re-reads the whole (cached) prompt, so on a
 * multi-step turn `cache.read` alone can add up to several times the context
 * window (observed on opencode 1.18.18: cache.read 3,291,956 on a turn whose
 * 1M window really held 232,872 — rendered as a 330% context readout). The
 * server reports the final round-trip's window as `tokens.total` (optional in
 * the message schema, absent on older servers). Prefer it; fall back to
 * summing the fields only when the server did not send it.
 */
export declare const contextTokensFromBreakdown: (breakdown: TokenBreakdown | null | undefined) => number;
export type ContextFillMessage = {
    id?: string;
    role?: string;
    tokens?: TokenBreakdown;
    /**
     * Compaction records carry OpenCode's lifecycle for the summarizing turn
     * here. Widened to `string` so a whole `Message` (a shell record reports its
     * own statuses) still satisfies this reader.
     */
    status?: string;
    error?: AssistantMessage['error'];
};
type LatestContextFill = {
    state: 'measured';
    index: number;
    totalTokens: number;
}
/** Compacted since the last measured response; the current size is unknown. */
 | {
    state: 'compacted';
    index: number;
};
/**
 * What the context window holds now, read from the newest message that can say.
 *
 * A compaction's own assistant record describes the summarizing request, not
 * the window left behind: its input is the pre-compaction history, and its
 * output leaves out the system prompt, the tools and the recent tail OpenCode
 * keeps. No number is right until the next response reports tokens, so a
 * finished compaction yields `compacted` instead of falling back to an older,
 * pre-compaction response. A compaction still running or one that failed has
 * not changed the window, so it is skipped and the previous reading stands.
 * OpenCode v2 records a compaction as its own `compaction` message carrying
 * that lifecycle in `status`, so "finished" is `status === 'completed'` with
 * no error rather than the v1 `summary && finish && !error` heuristic.
 */
export declare const findLatestContextFill: (messages: readonly ContextFillMessage[]) => LatestContextFill | null;
/** Header-style context usage for a session's messages, shared by every surface that renders `ContextUsageDisplay`. */
export declare const buildSessionContextUsage: (messages: readonly ContextFillMessage[], contextLimit: number, outputLimit: number) => SessionContextUsage | null;
export declare const isSameContextUsage: (a: SessionContextUsage | null, b: SessionContextUsage | null) => boolean;
export declare const extractTokensFromMessage: (message: {
    info: Message;
    parts: Part[];
}) => number;
type CacheHitRateResult = {
    /** Cache hit rate as a 0-100 percentage. 0 when there is no input to compare against. */
    percent: number;
    /** True iff `breakdown` had a positive inclusive input total. When false, `percent` is meaningless. */
    hasInput: boolean;
};
/**
 * Compute prefix-cache hit rate from a token breakdown.
 *
 * The SDK reports `input` as the non-cached portion (total input minus
 * cache reads and cache writes). The full input processed by the model is
 * therefore:
 *
 *   totalInput = input + cache.read + cache.write
 *
 *   cacheHitRate = cache.read / totalInput
 *
 * Verified against the SDK source (`session.ts:getUsage`): `input`
 * is `safe(inputTokens - cacheReadInputTokens - cacheWriteInputTokens)`.
 *
 * Returns `hasInput: false` when there is no total input to compare against,
 * in which case `percent` is 0 and callers should hide the display.
 */
export declare const computeCacheHitRate: (breakdown: TokenBreakdown | null | undefined) => CacheHitRateResult;
export {};
