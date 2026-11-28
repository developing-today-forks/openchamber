import assert from 'node:assert/strict';
import path from 'node:path';
import test from 'node:test';

import {
  isSafeMacosAppName,
  macosAppBundleCandidates,
  macosAppBundleName,
  planMacosOpenArgs,
  planMacosOpenInAppSpecs,
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

test('in-app gate: a resolved bundle path replaces the raw app name in -a and -na specs', () => {
  const targetPath = '/Users/tester/project';
  const specs = [
    { program: 'open', args: ['-a', 'Visual Studio Code', targetPath] },
    { program: 'open', args: ['-na', 'Visual Studio Code', '--args', targetPath] },
  ];
  assert.deepEqual(
    planMacosOpenInAppSpecs({
      specs,
      appName: 'Visual Studio Code',
      bundlePath: '/Applications/Visual Studio Code.app',
      targetPath,
    }),
    [
      { program: 'open', args: ['-a', '/Applications/Visual Studio Code.app', targetPath] },
      { program: 'open', args: ['-na', '/Applications/Visual Studio Code.app', '--args', targetPath] },
    ],
  );
});

test('in-app gate: an evil app value never reaches open -a — its specs drop out', () => {
  const targetPath = '/Users/tester/project';
  for (const evil of ['/tmp/Evil.app', '../../tmp/Evil', 'Foo/Bar']) {
    // Unsafe names resolve to no bundle (resolveAppBundlePath returns
    // null), so every spec carrying the raw value must disappear.
    const gated = planMacosOpenInAppSpecs({
      specs: [
        { program: 'code', args: ['-n', targetPath] },
        { program: 'open', args: ['-a', evil, targetPath] },
      ],
      appName: evil,
      bundlePath: null,
      targetPath,
    });
    assert.deepEqual(gated, [{ program: 'code', args: ['-n', targetPath] }]);
    assert.ok(!JSON.stringify(gated).includes(evil));
  }
});

test('in-app gate: CLI and Finder specs pass through untouched', () => {
  const targetPath = '/Users/tester/project';
  const specs = [
    { program: 'open', args: [targetPath] },
    { program: 'cursor', args: ['-n', targetPath] },
  ];
  assert.deepEqual(
    planMacosOpenInAppSpecs({ specs, appName: 'Cursor', bundlePath: null, targetPath }),
    specs,
  );
});

test('in-app gate: gating away the only spec fails closed to a default open', () => {
  const targetPath = '/Users/tester/project';
  assert.deepEqual(
    planMacosOpenInAppSpecs({
      specs: [{ program: 'open', args: ['-a', 'No Such App', targetPath] }],
      appName: 'No Such App',
      bundlePath: null,
      targetPath,
    }),
    [{ program: 'open', args: [targetPath] }],
  );
});
