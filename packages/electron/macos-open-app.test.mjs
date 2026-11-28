import assert from 'node:assert/strict';
import path from 'node:path';
import test from 'node:test';

import {
  isSafeMacosAppName,
  macosAppBundleCandidates,
  macosAppBundleName,
  planMacosOpenArgs,
} from './macos-open-app.mjs';

test('plain installed-app names are safe', () => {
  assert.equal(isSafeMacosAppName('Safari'), true);
  assert.equal(isSafeMacosAppName('Visual Studio Code'), true);
  assert.equal(isSafeMacosAppName('Safari.app'), true);
  assert.equal(isSafeMacosAppName('  Cursor  '), true);
});

test('separator, traversal, and absolute-path app values are unsafe', () => {
  assert.equal(isSafeMacosAppName('/tmp/Evil.app'), false);
  assert.equal(isSafeMacosAppName('/Applications/Safari'), false);
  assert.equal(isSafeMacosAppName('../../tmp/Evil'), false);
  assert.equal(isSafeMacosAppName('..'), false);
  assert.equal(isSafeMacosAppName('Foo/Bar'), false);
  assert.equal(isSafeMacosAppName('Foo\\Bar'), false);
  assert.equal(isSafeMacosAppName('C:\\tmp\\Evil.app'), false);
  assert.equal(isSafeMacosAppName('a/../b'), false);
});

test('blank and non-string app values are unsafe', () => {
  assert.equal(isSafeMacosAppName(''), false);
  assert.equal(isSafeMacosAppName('   '), false);
  assert.equal(isSafeMacosAppName(undefined), false);
  assert.equal(isSafeMacosAppName(null), false);
  assert.equal(isSafeMacosAppName(42), false);
});

test('bundle name appends .app only when missing', () => {
  assert.equal(macosAppBundleName('Safari'), 'Safari.app');
  assert.equal(macosAppBundleName('Safari.app'), 'Safari.app');
  assert.equal(macosAppBundleName(' Visual Studio Code '), 'Visual Studio Code.app');
});

test('candidates probe only the fixed Applications directories', () => {
  const candidates = macosAppBundleCandidates('Safari', '/Users/tester');
  assert.deepEqual(candidates, [
    '/Applications/Safari.app',
    '/System/Applications/Safari.app',
    '/System/Applications/Utilities/Safari.app',
    path.join('/Users/tester', 'Applications', 'Safari.app'),
  ]);
});

test('traversal app values yield no candidates — the probe cannot escape', () => {
  assert.deepEqual(macosAppBundleCandidates('../../tmp/Evil', '/Users/tester'), []);
  assert.deepEqual(macosAppBundleCandidates('/tmp/Evil.app', '/Users/tester'), []);
  assert.deepEqual(macosAppBundleCandidates('..\\..\\tmp\\Evil', '/Users/tester'), []);
});

test('an evil app value never reaches open -a: plan falls back to a default open', () => {
  const targetPath = '/Users/tester/project/file.txt';
  // Unsafe names resolve to no bundle (resolveAppBundlePath returns
  // null), so the plan carries no '-a' at all.
  for (const evil of ['/tmp/Evil.app', '../../tmp/Evil', 'Foo/Bar', '..']) {
    assert.equal(isSafeMacosAppName(evil), false);
    assert.deepEqual(planMacosOpenArgs({ appName: evil, targetPath, bundlePath: null }), [targetPath]);
  }
});

test('unknown or uninstalled names fail closed to a default open', () => {
  const targetPath = '/Users/tester/project/file.txt';
  assert.deepEqual(
    planMacosOpenArgs({ appName: 'No Such App', targetPath, bundlePath: null }),
    [targetPath],
  );
  assert.deepEqual(planMacosOpenArgs({ appName: '', targetPath, bundlePath: null }), [targetPath]);
  assert.deepEqual(planMacosOpenArgs({ appName: undefined, targetPath, bundlePath: null }), [targetPath]);
});

test('a known installed app opens through its resolved bundle path', () => {
  const targetPath = '/Users/tester/project/file.txt';
  assert.deepEqual(
    planMacosOpenArgs({ appName: 'Safari', targetPath, bundlePath: '/Applications/Safari.app' }),
    ['-a', '/Applications/Safari.app', targetPath],
  );
});
