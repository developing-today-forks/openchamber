import assert from 'node:assert/strict';
import test from 'node:test';

import {
  INSTALLED_APP_PROBE_CONCURRENCY,
  MAX_APP_NAME_LENGTH,
  MAX_INSTALLED_APP_NAMES,
  boundedAppNames,
  mapWithConcurrency,
} from './app-name-bounds.mjs';

test('non-array input yields no names', () => {
  assert.deepEqual(boundedAppNames(undefined), []);
  assert.deepEqual(boundedAppNames('Visual Studio Code'), []);
  assert.deepEqual(boundedAppNames(null), []);
});

test('an over-cap array is truncated to the documented cap', () => {
  const apps = Array.from({ length: 5000 }, (_, i) => `Missing App ${i}`);
  apps.push('Visual Studio Code');
  const names = boundedAppNames(apps);
  assert.equal(names.length, MAX_INSTALLED_APP_NAMES);
  assert.equal(names[0], 'Missing App 0');
  assert.equal(names[names.length - 1], `Missing App ${MAX_INSTALLED_APP_NAMES - 1}`);
});

test('oversize entries are skipped before any work happens', () => {
  const oversize = 'A'.repeat(1024 * 1024);
  assert.deepEqual(boundedAppNames([oversize, 'Visual Studio Code']), ['Visual Studio Code']);
  const atCap = 'B'.repeat(MAX_APP_NAME_LENGTH);
  assert.deepEqual(boundedAppNames([atCap]), [atCap]);
  assert.deepEqual(boundedAppNames([`${atCap}x`]), []);
});

test('duplicates, blanks, and non-strings collapse before work', () => {
  assert.deepEqual(
    boundedAppNames([' Cursor ', 'Cursor', '', '  ', null, undefined, 'Zed', 'Zed']),
    ['Cursor', 'Zed'],
  );
});

test('mapWithConcurrency never exceeds the limit and preserves order', async () => {
  let live = 0;
  let maxLive = 0;
  const items = Array.from({ length: 50 }, (_, i) => i);
  const results = await mapWithConcurrency(items, INSTALLED_APP_PROBE_CONCURRENCY, async (item) => {
    live += 1;
    maxLive = Math.max(maxLive, live);
    await new Promise((resolve) => setTimeout(resolve, 5));
    live -= 1;
    return item * 2;
  });
  assert.deepEqual(results, items.map((item) => item * 2));
  assert.ok(maxLive > 1, 'probes should still run in parallel');
  assert.ok(maxLive <= INSTALLED_APP_PROBE_CONCURRENCY, `max live ${maxLive} exceeds the bound`);
});

test('mapWithConcurrency handles empty input', async () => {
  assert.deepEqual(await mapWithConcurrency([], 4, async () => 1), []);
});
