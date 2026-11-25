import React from 'react';
import type { Session } from '@/lib/opencode/model';
import { useI18n } from '@/lib/i18n';
import { useUIStore } from '@/stores/useUIStore';
import { useSessionDisplayStore } from '@/stores/useSessionDisplayStore';
import { useMinuteTickerNow } from '@/hooks/useDurationTicker';
import { formatActivityStamp, formatActivityTimestamp, SESSION_TIMESTAMP_LABELS } from '@/lib/activityTimestampFormat';
import { lastRunDurationMs, resolveSessionTimestamps, useSessionActivityTimestampsStore } from '@/sync/session-activity-timestamps';
import { formatSessionActivityDuration } from '../../sessionActivityDurationFormat';

export const SessionTimestamps: React.FC<{ session: Session }> = ({ session }) => {
  const { t, locale } = useI18n();
  const preference = useUIStore((state) => state.timeFormatPreference);
  const display = useSessionDisplayStore((state) => state.sessionTimes.display);
  const fields = useSessionDisplayStore((state) => state.sessionTimes.fields);
  const recorded = useSessionActivityTimestampsStore((state) => state.byId.get(session.id));
  if (display !== 'inline') return null;
  const stamps = resolveSessionTimestamps(session, recorded);
  void locale;
  const shown = SESSION_TIMESTAMP_LABELS.filter(([field]) => fields.includes(field));
  if (shown.length === 0) return null;
  return <dl className="grid w-full min-w-0 grid-cols-[auto_minmax(0,1fr)] gap-x-2 typography-micro text-muted-foreground" data-session-timestamps={session.id}>
    {shown.map(([field, label]) => {
      const value = stamps[field];
      const formatted = value === null ? t('activityTime.unavailable') : formatActivityTimestamp(value, preference);
      return <React.Fragment key={field}>
        <dt>{t(label)}</dt>
        <dd className="min-w-0 truncate text-end tabular-nums" title={formatted}>
          {value === null ? formatted : <time dateTime={new Date(value).toISOString()}>{formatted}</time>}
        </dd>
      </React.Fragment>;
    })}
  </dl>;
};

export const SessionHoverTimes: React.FC<{ session: Session; activityAt: number }> = ({ session, activityAt }) => {
  const { t } = useI18n();
  const now = useMinuteTickerNow(true);
  const preference = useUIStore((state) => state.timeFormatPreference);
  const display = useSessionDisplayStore((state) => state.sessionTimes.display);
  const fields = useSessionDisplayStore((state) => state.sessionTimes.fields);
  const recorded = useSessionActivityTimestampsStore((state) => state.byId.get(session.id));
  const detailed = display === 'hover';
  const stamps = resolveSessionTimestamps(session, recorded);
  const rows: Array<{ key: string; label: string; at: number | null }> = detailed
    ? SESSION_TIMESTAMP_LABELS.filter(([field]) => fields.includes(field)).map(([field, label]) => ({ key: field, label: t(label), at: stamps[field] }))
    : [{ key: 'activity', label: t('activityTime.activity'), at: activityAt }];
  const lastRun = detailed ? lastRunDurationMs(recorded) : null;
  if (rows.length === 0 && lastRun === null) return null;
  return <dl className="grid w-full min-w-0 grid-cols-[auto_minmax(0,1fr)] gap-x-3 text-muted-foreground" data-session-timestamps={session.id}>
    {rows.map(({ key, label, at }) => {
      const stamp = at === null ? null : formatActivityStamp(at, now, preference, t);
      return <React.Fragment key={key}>
        <dt>{label}</dt>
        <dd className="min-w-0 truncate text-end tabular-nums" dir="auto" title={stamp ? `${stamp.ago} · ${stamp.when}` : undefined}>
          {stamp && at !== null
            ? <><span className="text-foreground">{stamp.ago}</span><span aria-hidden="true"> · </span><time dateTime={new Date(at).toISOString()}>{stamp.when}</time></>
            : t('activityTime.unavailable')}
        </dd>
      </React.Fragment>;
    })}
    {lastRun !== null ? <>
      <dt>{t('activityTime.lastRun')}</dt>
      <dd className="text-end tabular-nums" dir="auto">{formatSessionActivityDuration(lastRun, t)}</dd>
    </> : null}
  </dl>;
};
