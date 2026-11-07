import type { TimeFormatPreference } from '@/stores/useUIStore';
type TimePrecision = 'minute' | 'second';
export declare const formatTimeForPreference: (timestamp: number | Date, preference: TimeFormatPreference, options?: {
    precision?: TimePrecision;
    hour?: 'numeric' | '2-digit';
    fallback?: string;
}) => string;
export declare const formatDateTimeForPreference: (timestamp: number | Date, preference: TimeFormatPreference, options: Intl.DateTimeFormatOptions) => string;
export {};
