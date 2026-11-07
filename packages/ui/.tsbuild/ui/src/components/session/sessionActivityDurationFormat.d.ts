import type { I18nKey, I18nParams } from '@/lib/i18n';
type Translate = (key: I18nKey, params?: I18nParams) => string;
/**
 * Compact turn duration for a session row: `7s`, `1m 23s`, `1h 2m`.
 *
 * Seconds are dropped past an hour so the label cannot outgrow the row's
 * metadata slot, and the unit suffixes are translated rather than concatenated
 * so locales that place or spell them differently stay correct.
 */
export declare const formatSessionActivityDuration: (durationMs: number, t: Translate) => string;
export {};
