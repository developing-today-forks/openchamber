import type { QuotaProviderId, UsageWindow } from '@/types';
export type UsageLimitRow = {
    key: string;
    label: string;
    subtitle?: string;
    window: UsageWindow;
};
export type UsageProviderGroup = {
    providerId: QuotaProviderId;
    providerName: string;
    planLabel?: string | null;
    rows: UsageLimitRow[];
    /** Provider-level message: a fetch error, or "nothing reported". */
    status: string | null;
};
/**
 * Quota windows grouped by provider, shaped for the compact usage list.
 *
 * Shared by the mobile session-metadata popover and the work-status panel so
 * the two cannot drift on which providers appear, how model rows are filtered,
 * or what counts as a provider-level status.
 *
 * Include selected, configured providers and first-load failures whose
 * configuration is still unknown. Confirmed unconfigured providers stay hidden.
 */
export declare const useUsageProviderGroups: () => UsageProviderGroup[];
