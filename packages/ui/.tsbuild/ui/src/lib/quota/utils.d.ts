import type { TimeFormatPreference } from '@/stores/useUIStore';
export declare const clampPercent: (value: number | null) => number | null;
export declare const formatPercent: (value: number | null) => string;
export declare const formatQuotaValueLabel: (valueLabel: string | null | undefined, percent: number | null) => string;
export declare const formatQuotaResetLabel: (resetAt: number | null, fallback?: string | null, timeFormatPreference?: TimeFormatPreference) => string;
export declare const resolveUsageTone: (percent: number | null) => 'safe' | 'warn' | 'critical';
export declare const formatWindowLabel: (label: string) => string;
