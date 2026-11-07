import type { UsageProviderGroup, UsageLimitRow } from '@/components/usage/usageGroups';
export declare const resolveQuotaProviderId: (modelProviderId: string | null | undefined) => string | null;
/**
 * Shortest reported window for the provider the composer is pointed at.
 *
 * Returns null when nothing matches — the section then falls back to its
 * display-mode label rather than showing a quota belonging to some other
 * provider, which would read as the active one.
 */
export declare const pickUsageHeadline: (groups: readonly UsageProviderGroup[], modelProviderId: string | null | undefined) => {
    group: UsageProviderGroup;
    row: UsageLimitRow;
} | null;
