import { formatDateTimeForPreference } from '@/lib/timeFormat';
import type { I18nKey, I18nParams } from '@/lib/i18n';
import type { TimeFormatPreference } from '@/stores/useUIStore';

type Translate = (key: I18nKey, params?: I18nParams) => string;

export const SESSION_TIMESTAMP_LABELS = [
  ['created', 'activityTime.created'],
  ['input', 'activityTime.input'],
  ['output', 'activityTime.output'],
  ['activity', 'activityTime.activity'],
] as const;

/** Date and time to the second; the year only when it is not this year. */
export const formatActivityTimestamp = (at: number, preference: TimeFormatPreference): string => {
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', second: '2-digit' };
  if (new Date(at).getFullYear() !== new Date().getFullYear()) options.year = 'numeric';
  return formatDateTimeForPreference(at, preference, options);
};

const MINUTE_MS = 60_000;
const HOUR_MS = 60 * MINUTE_MS;
const DAY_MS = 24 * HOUR_MS;
const WEEK_MS = 7 * DAY_MS;
const MONTH_MS = 30 * DAY_MS;
const YEAR_MS = 365 * DAY_MS;

export const formatActivityAgo = (at: number, now: number, t: Translate): string => {
  const elapsed = now - at;
  if (elapsed < MINUTE_MS) return t('common.relative.justNow');
  const compact = elapsed < HOUR_MS
    ? t('common.relative.minutesAgoCompact', { count: Math.floor(elapsed / MINUTE_MS) })
    : elapsed < DAY_MS
      ? t('common.relative.hoursAgoCompact', { count: Math.floor(elapsed / HOUR_MS) })
      : elapsed < WEEK_MS
        ? t('common.relative.daysAgoCompact', { count: Math.floor(elapsed / DAY_MS) })
        : elapsed < 5 * WEEK_MS
          ? t('common.relative.weeksAgoCompact', { count: Math.floor(elapsed / WEEK_MS) })
          : elapsed < YEAR_MS
            ? t('common.relative.monthsAgoCompact', { count: Math.floor(elapsed / MONTH_MS) })
            : t('common.relative.yearsAgoCompact', { count: Math.floor(elapsed / YEAR_MS) });
  return t('activityTime.ago', { time: compact });
};

export const formatActivityStamp = (at: number, now: number, preference: TimeFormatPreference, t: Translate) => {
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' };
  if (new Date(at).getFullYear() !== new Date(now).getFullYear()) options.year = 'numeric';
  return {
    ago: formatActivityAgo(at, now, t),
    when: formatDateTimeForPreference(at, preference, options),
  };
};
