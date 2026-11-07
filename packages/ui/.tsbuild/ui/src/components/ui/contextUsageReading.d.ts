import type { SessionContextUsage } from '@/stores/types/sessionTypes';
/** `compacted`: the session was compacted and no response has reported tokens since, so the size is unknown. */
export type ContextUsageReading = {
    state: 'measured';
    totalTokens: number;
    percentage: number;
    colorPercentage?: number;
} | {
    state: 'compacted';
};
/**
 * The displayed percentage is unrounded so every surface agrees with the
 * work-status panel; the colour threshold keeps the store's rounded value.
 */
export declare const toContextUsageReading: (usage: SessionContextUsage) => ContextUsageReading;
