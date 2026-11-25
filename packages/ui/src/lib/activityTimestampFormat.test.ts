import { afterAll, beforeEach, describe, expect, test } from 'bun:test';

import { dict as enDict } from '@/lib/i18n/messages/en';
import { formatMessage, type I18nKey, type I18nParams } from '@/lib/i18n';
import { useI18nStore } from '@/lib/i18n/store';
import { formatActivityAgo, formatActivityStamp } from './activityTimestampFormat';

// Oracle: the compact units of the row's time ("5m", "3h", ...) wrapped in
// the locale's "ago", and Intl's own date-time output for the chosen locale
// and hour cycle. Dates are built in local time so the TZ does not matter.
const t = (key: I18nKey, params?: I18nParams): string => formatMessage(enDict, key, params);
const MINUTE = 60_000;
const now = new Date(2026, 10, 24, 5, 41, 30).getTime();

beforeEach(() => {
  useI18nStore.getState().setLocale('en');
});

// The locale store is shared by every test file in the run.
afterAll(() => {
  useI18nStore.getState().setLocale('en');
});

describe('formatActivityAgo', () => {
  test('reads how long ago at minute resolution, in the row time units', () => {
    expect(formatActivityAgo(now - 59_999, now, t)).toBe('Just now');
    expect(formatActivityAgo(now - 5 * MINUTE - 10_000, now, t)).toBe('5m ago');
    expect(formatActivityAgo(now - 3 * 60 * MINUTE, now, t)).toBe('3h ago');
    expect(formatActivityAgo(now - 2 * 24 * 60 * MINUTE, now, t)).toBe('2d ago');
    expect(formatActivityAgo(now - 9 * 24 * 60 * MINUTE, now, t)).toBe('1w ago');
    expect(formatActivityAgo(now - 100 * 24 * 60 * MINUTE, now, t)).toBe('3mo ago');
    expect(formatActivityAgo(now - 800 * 24 * 60 * MINUTE, now, t)).toBe('2y ago');
  });

  test('a time ahead of the clock reads as now', () => {
    expect(formatActivityAgo(now + 5 * MINUTE, now, t)).toBe('Just now');
  });

  test('every boundary step is monotonic: older never reads as more recent', () => {
    const order = ['Just now', 'm ago', 'h ago', 'd ago', 'w ago', 'mo ago', 'y ago'];
    const rank = (label: string) => order.findIndex((suffix) => label.endsWith(suffix));
    let previous = 0;
    for (let elapsed = 0; elapsed < 3 * 365 * 24 * 60 * MINUTE; elapsed += 7 * 60 * MINUTE + 13_000) {
      const current = rank(formatActivityAgo(now - elapsed, now, t));
      expect(current).toBeGreaterThanOrEqual(previous);
      previous = current;
    }
  });
});

describe('formatActivityStamp', () => {
  const at = new Date(2026, 10, 24, 5, 36, 12).getTime();

  test('pairs how long ago with the date and time, honouring the hour cycle', () => {
    // Engines join date and time differently ("Nov 24, 05:36" in Chromium,
    // "Nov 24 at 05:36" in JavaScriptCore); both are the locale's own form.
    const h24 = formatActivityStamp(at, now, '24h', t);
    expect(h24.ago).toBe('5m ago');
    expect(/^Nov 24(,| at) 05:36$/.test(h24.when)).toBe(true);
    expect(/^Nov 24(,| at) 5:36\sAM$/.test(formatActivityStamp(at, now, '12h', t).when)).toBe(true);
  });

  test('names the year only when it differs from now', () => {
    const lastYear = new Date(2025, 0, 2, 13, 5).getTime();
    expect(/^Jan 2, 2025(,| at) 1:05\sPM$/.test(formatActivityStamp(lastYear, now, '12h', t).when)).toBe(true);
    expect(formatActivityStamp(at, now, '12h', t).when).not.toContain('2026');
  });

  test('follows the interface locale for the date', () => {
    useI18nStore.getState().setLocale('de');
    expect(formatActivityStamp(at, now, 'auto', t).when).toBe(new Date(at).toLocaleString('de-DE', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }));
  });
});
