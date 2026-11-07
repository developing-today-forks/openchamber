import type { useI18n } from '@/lib/i18n';
export type GuestRequestFailure = {
    method: 'GET' | 'POST';
    path: '/api/guests' | '/api/guests/upload';
} & ({
    kind: 'network';
} | {
    kind: 'http' | 'invalid-response';
    status: number;
});
/** Diagnostics contain fixed routes and status codes, never credentials or response bodies. */
export declare const describeGuestRequestFailure: (failure: GuestRequestFailure, t: ReturnType<typeof useI18n>['t']) => string;
