import { type UsageStats, type UsageTools } from '@/lib/opencode/session-stats';
import { type UsageRange } from './usageStatsModel';
/**
 * In-memory cache of Stats page reports for the app session, one entry per
 * (runtime, range, project). Reopening the page or going back to a filter
 * shows the cached report without refetching; only a key with nothing cached
 * loads on its own, and the refresh button forces a new read. A runtime
 * switch drops every entry and ignores answers still in flight.
 *
 * `7d`/`30d` are relative to now: an entry reports the range it was fetched
 * for (`stats.range`) and when (`fetchedAt`), which the page shows.
 */
export type UsageStatsRequest = {
    range: UsageRange;
    projectDirectory: string | null;
};
export type UsageStatsEntry = {
    /** Last successful report; kept on screen through refreshes and failed refreshes. */
    stats: UsageStats | null;
    fetchedAt: number | null;
    loading: boolean;
    /** Message of the last failed read; cleared by the next success. */
    error: string | null;
};
export type UsageStatsFetcher = (request: UsageStatsRequest, signal: AbortSignal) => Promise<UsageStats>;
/**
 * Tool calls for a loaded report, fetched only on request: counting them makes
 * OpenCode read every tool call in the range. `range` is the loaded report's
 * window, so the tool numbers match the rest of the page.
 */
export type UsageToolsEntry = {
    tools: UsageTools | null;
    loading: boolean;
    /** Message of the last failed read; never shown as zero calls. */
    error: string | null;
};
export type UsageToolsFetcher = (request: UsageStatsRequest, range: UsageStats['range'], signal: AbortSignal) => Promise<UsageTools>;
export declare const usageStatsKey: (runtimeKey: string, request: UsageStatsRequest) => string;
type UsageStatsStore = {
    entries: Record<string, UsageStatsEntry>;
    /**
     * Loads a report for the request under the current runtime. Without `force`
     * this only reads a key that has no report, no error and no read running.
     */
    load: (request: UsageStatsRequest, options?: {
        force?: boolean;
    }) => Promise<void>;
    toolEntries: Record<string, UsageToolsEntry>;
    /**
     * Set once the user asks for tool calls; from then on every loaded report
     * fetches its tools after it lands, for the rest of the app session.
     */
    toolsRequested: boolean;
    /**
     * Loads tool calls for the request's loaded report. Without `force` this
     * only reads a key that has no tools, no error and no read running; with no
     * loaded report there is no window to count, so it does nothing.
     */
    loadTools: (request: UsageStatsRequest, options?: {
        force?: boolean;
    }) => Promise<void>;
    /** Forgets every entry and ignores reads still in flight. */
    reset: () => void;
};
export declare function createUsageStatsStore(fetcher: UsageStatsFetcher, runtimeKey: () => string, now?: () => number, toolsFetcher?: UsageToolsFetcher): import("zustand").UseBoundStore<import("zustand").StoreApi<UsageStatsStore>>;
export declare const useUsageStatsStore: import("zustand").UseBoundStore<import("zustand").StoreApi<UsageStatsStore>>;
export declare const selectUsageToolsEntry: (state: Pick<UsageStatsStore, 'toolEntries'>, request: UsageStatsRequest) => UsageToolsEntry | undefined;
export declare const selectUsageStatsEntry: (state: Pick<UsageStatsStore, 'entries'>, request: UsageStatsRequest) => UsageStatsEntry | undefined;
export {};
