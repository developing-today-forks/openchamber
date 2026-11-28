import assert from 'node:assert/strict';
import test from 'node:test';

import { createWindowsAppDiscovery } from './windows-app-discovery.mjs';

const TEST_ENV = { ProgramFiles: '/nonexistent-openchamber-test-program-files', SystemRoot: '/nonexistent-openchamber-test-windows' };

const ON_PATH = new Map([
  ['code.exe', 'C:\\Tools\\VS Code\\Code.exe'],
  ['wt.exe', 'C:\\Tools\\wt.exe'],
  ['powershell.exe', 'C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe'],
]);

// A child-process runner that answers on a later turn of the event loop, the
// way execFile does, and records every program it was asked to run.
const createRunner = (calls) => async (file, args) => {
  calls.push(file === 'where.exe' ? args[0] : file);
  await new Promise((resolve) => setImmediate(resolve));
  if (file === 'where.exe') {
    const resolved = ON_PATH.get(args[0]);
    if (!resolved) throw Object.assign(new Error('not found'), { code: 1 });
    return { stdout: `${resolved}\r\n` };
  }
  return { stdout: '' };
};

const fakeIcon = (filePath) => ({ isEmpty: () => false, toDataURL: () => `data:icon,${filePath}` });

test('lists installed apps with icons from async lookups', async () => {
  const calls = [];
  const discovery = createWindowsAppDiscovery({
    run: createRunner(calls),
    getFileIcon: async (filePath) => fakeIcon(filePath),
    env: TEST_ENV,
  });

  const apps = await discovery.buildWindowsInstalledApps(['File Explorer', 'Terminal', 'Visual Studio Code', 'Cursor', 'Visual Studio Code']);

  assert.deepEqual(apps.map((app) => app.name), ['File Explorer', 'Terminal', 'Visual Studio Code']);
  assert.deepEqual(apps.map((app) => app.iconDataUrl), [
    'data:icon,explorer.exe',
    'data:icon,C:\\Tools\\wt.exe',
    'data:icon,C:\\Tools\\VS Code\\Code.exe',
  ]);
});

test('scans that overlap ask PowerShell for Windows Terminal once', async () => {
  const calls = [];
  const discovery = createWindowsAppDiscovery({
    run: createRunner(calls),
    getFileIcon: async (filePath) => fakeIcon(filePath),
    env: TEST_ENV,
  });

  await Promise.all([
    discovery.buildWindowsInstalledApps(['Terminal']),
    discovery.buildWindowsInstalledApps(['Terminal']),
  ]);

  assert.equal(calls.filter((program) => program === ON_PATH.get('powershell.exe')).length, 1);
});

test('builds editor launch specs from the CLI, the executable and the app name', async () => {
  const discovery = createWindowsAppDiscovery({
    run: createRunner([]),
    getFileIcon: async (filePath) => fakeIcon(filePath),
    env: TEST_ENV,
  });

  const specs = await discovery.buildWindowsOpenFileSpecs({ filePath: 'C:\\work\\a.txt', appId: 'vscode', appName: 'Visual Studio Code' });

  assert.deepEqual(specs, [{ program: 'C:\\Tools\\VS Code\\Code.exe', args: ['C:\\work\\a.txt'] }]);
});

test('fetchWindowsAppIcons dedupes names before resolving icons', async () => {
  const calls = [];
  const discovery = createWindowsAppDiscovery({
    run: createRunner(calls),
    getFileIcon: async (filePath) => fakeIcon(filePath),
    env: TEST_ENV,
  });

  const icons = await discovery.fetchWindowsAppIcons(['Visual Studio Code', 'Visual Studio Code', 'Visual Studio Code']);

  assert.equal(icons.length, 1);
  assert.equal(icons[0].app, 'Visual Studio Code');
  assert.equal(calls.filter((program) => program === 'code.exe').length, 1);
});

test('installed-app lookups skip oversize entries and stop at the cap', async () => {
  const calls = [];
  const discovery = createWindowsAppDiscovery({
    run: createRunner(calls),
    getFileIcon: async (filePath) => fakeIcon(filePath),
    env: TEST_ENV,
  });

  const oversize = 'A'.repeat(1024 * 1024);
  const apps = await discovery.buildWindowsInstalledApps([
    oversize,
    ...Array.from({ length: 5000 }, (_, i) => `Missing App ${i}`),
  ]);

  assert.deepEqual(apps, []);
  // 100 capped names, each probed by name only (no known app id): the
  // oversize entry never reaches where.exe, and neither do names past
  // the cap.
  assert.equal(calls.length, 100);
  assert.ok(calls.every((program) => program.length <= 128 + '.exe'.length));
});
