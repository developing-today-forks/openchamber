import type { UsageStats, UsageTokens } from '@/lib/opencode/session-stats';
export type UsageRange = '7d' | '30d' | '90d' | 'all';
export declare const USAGE_RANGES: readonly UsageRange[];
/**
 * Start of the range in epoch ms: local midnight, so "7 days" means today plus
 * the six calendar days before it, matching the day buckets OpenCode builds
 * in the viewer's time zone. `all` has no start; OpenCode begins at the
 * oldest message.
 */
export declare function rangeStart(range: UsageRange, now: Date): number | undefined;
export type ActivityBar = {
    /** First day of the bucket, `YYYY-MM-DD`. */
    start: string;
    /** Last day of the bucket; equals `start` for daily bars. */
    end: string;
    steps: number;
};
export type ActivitySeries = {
    unit: 'day' | 'week';
    bars: ActivityBar[];
    max: number;
};
/**
 * Every calendar day of the report range, active or not, so gaps read as
 * gaps. OpenCode lists active days only. Local dates are used because the
 * request sends the viewer's own time zone.
 */
export declare function buildActivitySeries(stats: Pick<UsageStats, 'range' | 'activity'>): ActivitySeries;
/** Nothing happened in the range: no prompt and no model step. */
export declare const isEmptyReport: (stats: Pick<UsageStats, 'prompts' | 'steps'>) => boolean;
/** Share of prompt tokens served from the cache: reads over everything that
 * could have been a miss (cache reads plus cache writes plus fresh input).
 * Null when nothing entered the context, so callers can show a dash. */
export declare const cacheHitRate: (tokens: Pick<UsageTokens, 'input' | 'cacheRead' | 'cacheWrite'>) => number | null;
/** total / count, or null when there is nothing to divide by. */
export declare const averagePer: (total: number, count: number) => number | null;
/** Succeeded calls over all completed calls; null when nothing completed. */
export declare const toolSuccessRate: (totals: {
    succeeded: number;
    failed: number;
}) => number | null;
/** Cost in USD per one million tokens, or null with no tokens at all. */
export declare const costPerMillionTokens: (cost: number, tokens: number) => number | null;
/** Share of reasoning inside everything the model produced; null when it
 * produced nothing. */
export declare const reasoningShare: (tokens: Pick<UsageTokens, 'output' | 'reasoning'>) => number | null;
export type TokenSegmentKey = 'input' | 'output' | 'cacheRead' | 'cacheWrite';
/** One stacked-bar slice; zero values stay so legend order is stable. */
interface TokenSegment {
    key: TokenSegmentKey;
    /** Output merges reasoning: the model's own production. */
    value: number;
}
/** Token totals as stacked-bar segments in fixed order: fresh input, model
 * output plus reasoning, cache reads, cache writes. Zero segments stay in the
 * list so legend order is stable; renderers skip them. */
export declare const tokenSegments: (tokens: UsageTokens) => TokenSegment[];
/** Project name as the sidebar shows it: its label, else the folder name. */
export declare const projectDisplayName: (project: {
    label?: string | null;
    path: string;
}) => string;
/** Both timestamps fall on the same calendar day in the viewer's time zone. */
export declare const isSameLocalDay: (a: number, b: number) => boolean;
export {};
