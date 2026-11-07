import type { ProviderResult, QuotaProviderId } from '@/types';
export type QuotaGiftResetType = 'FIVE_HOUR' | 'WEEK';
/** The deadline covers response bodies too, including transports that ignore abort. */
export declare const fetchQuota: (providerId: QuotaProviderId, { signal, timeoutMs }?: {
    signal?: AbortSignal;
    timeoutMs?: number;
}) => Promise<ProviderResult[]>;
/** The deadline covers response bodies too, including transports that ignore abort. */
export declare const activateGiftReset: (providerId: QuotaProviderId, recordId: number, resetType: QuotaGiftResetType, { signal, timeoutMs }?: {
    signal?: AbortSignal;
    timeoutMs?: number;
}) => Promise<void>;
