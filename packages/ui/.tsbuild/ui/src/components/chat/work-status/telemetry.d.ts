import type { Message, Part } from '@/lib/opencode/model';
type SessionMessageRecord = {
    info: Message;
    parts: Part[];
};
export type CompletedTurnStats = {
    lastAssistantMessageId: string;
    stepsCount: number;
    elapsedDurationMs: number | null;
    totalLlmDurationMs: number | null;
    totalToolDurationMs: number | null;
    avgTtftMs: number | null;
    tokensPerSecond: number | null;
    responseTokensPerSecond: number | null;
    inputTokens: number | null;
    outputTokens: number | null;
    reasoningTokens: number | null;
    totalGeneratedTokens: number | null;
    cacheHitPercent: number | null;
    cost: number | null;
};
/**
 * Merge an array of [start, end] time intervals into a disjoint union of intervals.
 * Correctly accounts for parallel / overlapping tool executions without double-counting.
 */
export declare function mergeTimeIntervals(intervals: readonly (readonly [number, number])[]): Array<[number, number]>;
/**
 * Sum the total duration spanned by an array of disjoint intervals.
 */
export declare function sumIntervalsDuration(intervals: readonly (readonly [number, number])[]): number;
export declare const formatTelemetryDuration: (ms: number) => string;
export declare const formatTelemetryTokens: (tokens: number) => string;
export declare const formatThroughputRate: (tps: number) => string;
/**
 * Calculates telemetry metrics for the latest completed turn in the session.
 * A turn encompasses all assistant steps since the preceding user message up to the final completed assistant step.
 */
export declare function getLatestCompletedTurnStats(records: readonly SessionMessageRecord[] | null | undefined): CompletedTurnStats | null;
export {};
