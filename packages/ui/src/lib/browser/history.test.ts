import { describe, expect, test } from 'bun:test';

import {
  MAX_HISTORY_ENTRIES,
  forgetVisit,
  historyUrl,
  recordVisit,
  suggestFromHistory,
  type BrowserHistoryEntry,
} from './history';

const entry = (url: string, title: string, lastVisitedAt: number): BrowserHistoryEntry => (
  { url, title, lastVisitedAt }
);

describe('what is worth remembering', () => {
  test('accepts a typed address the way the panel opens it', () => {
    expect(historyUrl('localhost:3000')).toBe('http://localhost:3000/');
  });

  test('refuses the resting state and documents with no address', () => {
    expect(historyUrl('about:blank')).toBe('');
    expect(historyUrl('data:text/html,<p>hi</p>')).toBe('');
    expect(historyUrl('')).toBe('');
  });

  test('refuses an address too long to be one', () => {
    expect(historyUrl(`http://example.test/${'a'.repeat(3000)}`)).toBe('');
  });
});

describe('recording visits', () => {
  test('keeps places rather than events', () => {
    let entries = recordVisit([], { url: 'http://localhost:3000/', title: 'App', at: 1 });
    entries = recordVisit(entries, { url: 'http://localhost:5173/', title: 'Docs', at: 2 });
    entries = recordVisit(entries, { url: 'http://localhost:3000/', title: 'App', at: 3 });

    expect(entries.map((item) => item.url)).toEqual(['http://localhost:3000/', 'http://localhost:5173/']);
    expect(entries[0]?.lastVisitedAt).toBe(3);
  });

  test('a later visit with no title keeps the name already known', () => {
    let entries = recordVisit([], { url: 'http://localhost:3000/', title: 'App', at: 1 });
    entries = recordVisit(entries, { url: 'http://localhost:3000/', at: 2 });
    expect(entries[0]?.title).toBe('App');
  });

  test('ignores a visit that is not a page', () => {
    const entries = recordVisit([], { url: 'about:blank', at: 1 });
    expect(entries).toEqual([]);
  });

  test('never stores a title ending in a lone surrogate (#2050)', () => {
    // The stored title is persisted, so a lone half would bake in as U+FFFD.
    const straddle = recordVisit([], { url: 'http://localhost:3000/', title: `${'a'.repeat(199)}\u{1F600}`, at: 1 });
    expect(straddle[0]?.title).toBe('a'.repeat(199));
    expect(straddle[0]?.title.length).toBeLessThanOrEqual(200);
    expect(new TextDecoder().decode(new TextEncoder().encode(straddle[0]?.title))).not.toContain('\uFFFD');

    // An astral character ending exactly at the cap is kept whole.
    const atCap = recordVisit([], { url: 'http://localhost:3000/', title: `${'a'.repeat(198)}\u{1F600}`, at: 1 });
    expect(atCap[0]?.title).toBe(`${'a'.repeat(198)}\u{1F600}`);

    // ASCII over-limit and under-limit titles are unchanged by the guard.
    const ascii = recordVisit([], { url: 'http://localhost:3000/', title: 'b'.repeat(250), at: 1 });
    expect(ascii[0]?.title).toBe('b'.repeat(200));
    const short = recordVisit([], { url: 'http://localhost:3000/', title: 'Docs \u{1F600}', at: 1 });
    expect(short[0]?.title).toBe('Docs \u{1F600}');
  });

  test('drops the oldest rather than growing without end', () => {
    let entries: BrowserHistoryEntry[] = [];
    for (let index = 0; index < MAX_HISTORY_ENTRIES + 10; index += 1) {
      entries = recordVisit(entries, { url: `http://example.test/${index}`, at: index });
    }
    expect(entries).toHaveLength(MAX_HISTORY_ENTRIES);
    expect(entries[0]?.url).toBe(`http://example.test/${MAX_HISTORY_ENTRIES + 9}`);
  });

  test('forgets one address without touching the rest', () => {
    const entries = [entry('http://a.test/', 'A', 2), entry('http://b.test/', 'B', 1)];
    expect(forgetVisit(entries, 'http://a.test').map((item) => item.url)).toEqual(['http://b.test/']);
  });
});

describe('suggestions', () => {
  const entries = [
    entry('http://localhost:3000/', 'Storefront', 1),
    entry('http://localhost:5173/docs', 'Docs', 3),
    entry('https://staging.example.test/', 'Staging', 2),
  ];

  test('an empty address bar offers the most recent places', () => {
    expect(suggestFromHistory(entries, '').map((item) => item.url)).toEqual([
      'http://localhost:5173/docs',
      'https://staging.example.test/',
      'http://localhost:3000/',
    ]);
  });

  test('matches a port or a fragment of the path, not just a prefix', () => {
    expect(suggestFromHistory(entries, '5173').map((item) => item.url)).toEqual(['http://localhost:5173/docs']);
    expect(suggestFromHistory(entries, 'docs').map((item) => item.url)).toEqual(['http://localhost:5173/docs']);
  });

  test('matches the page title as well as the address', () => {
    expect(suggestFromHistory(entries, 'storefront').map((item) => item.url)).toEqual(['http://localhost:3000/']);
  });

  test('ignores the scheme the user did or did not type', () => {
    expect(suggestFromHistory(entries, 'http://staging').map((item) => item.url))
      .toEqual(['https://staging.example.test/']);
  });

  test('does not offer back the address already typed in full', () => {
    expect(suggestFromHistory(entries, 'http://localhost:3000/')).toEqual([]);
  });

  test('never offers more than it was asked for', () => {
    expect(suggestFromHistory(entries, '', 2)).toHaveLength(2);
  });
});
