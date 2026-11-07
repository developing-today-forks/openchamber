import { execFileSync, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { readMergedSettingsSync } from './settings-files.js';

const SETTINGS_FILE_MAX_BYTES = 8 * 1024 * 1024;
const supportsFifo = process.platform !== 'win32';

let dir;

beforeEach(() => {
  dir = fs.mkdtempSync(path.join(os.tmpdir(), 'settings-files-'));
});

afterEach(() => {
  vi.restoreAllMocks();
  fs.rmSync(dir, { recursive: true, force: true });
});

const settingsPath = () => path.join(dir, 'settings.json');
const preferencesPath = () => path.join(dir, 'preferences.json');

const readSettings = (settingsFilePath = settingsPath()) => readMergedSettingsSync({
  fs,
  path,
  settingsFilePath,
});

const readInChild = (settingsFilePath) => {
  const moduleUrl = new URL('./settings-files.js', import.meta.url).href;
  const script = `
    import fs from 'node:fs';
    import path from 'node:path';
    import { readMergedSettingsSync } from ${JSON.stringify(moduleUrl)};
    console.log(JSON.stringify(readMergedSettingsSync({ fs, path, settingsFilePath: ${JSON.stringify(settingsFilePath)} })));
  `;
  return spawnSync(process.execPath, ['--input-type=module', '-e', script], {
    encoding: 'utf8',
    timeout: 3000,
  });
};

describe('readMergedSettingsSync', () => {
  it('skips oversized settings.json without parsing it', () => {
    fs.writeFileSync(settingsPath(), JSON.stringify({ marker: 'oversized', padding: 'x'.repeat(SETTINGS_FILE_MAX_BYTES + 1) }));
    const warning = vi.spyOn(console, 'warn').mockImplementation(() => {});

    expect(readSettings()).toEqual({});
    expect(warning).toHaveBeenCalledWith('[settings] Skipping settings.json: too-large');
  });

  it('skips oversized preferences.json without parsing it', () => {
    fs.writeFileSync(settingsPath(), '{}');
    fs.writeFileSync(preferencesPath(), JSON.stringify({
      version: 1,
      fields: { oversizedPreference: { value: 'x'.repeat(SETTINGS_FILE_MAX_BYTES + 1), updatedAt: 1 } },
    }));
    const warning = vi.spyOn(console, 'warn').mockImplementation(() => {});

    expect(readSettings()).toEqual({});
    expect(warning).toHaveBeenCalledWith('[settings] Skipping preferences.json: too-large');
  });

  it.skipIf(!supportsFifo)('returns promptly for FIFOs at either settings path', () => {
    for (const fileName of ['settings.json', 'preferences.json']) {
      const caseDir = path.join(dir, fileName.replace('.json', ''));
      fs.mkdirSync(caseDir);
      const settingsFilePath = path.join(caseDir, 'settings.json');
      const fifoPath = path.join(caseDir, fileName);
      if (fileName === 'preferences.json') {
        fs.writeFileSync(settingsFilePath, JSON.stringify({ instanceValue: true }));
      }
      execFileSync('mkfifo', [fifoPath]);

      const result = readInChild(settingsFilePath);

      expect(result.error).toBeUndefined();
      expect(result.status).toBe(0);
      expect(JSON.parse(result.stdout.trim())).toEqual(fileName === 'settings.json' ? {} : { instanceValue: true });
      expect(result.stderr).toContain(`[settings] Skipping ${fileName}: not-regular`);
    }
  });

  it('keeps ordinary and missing-file contributions unchanged', () => {
    const settingsFilePath = settingsPath();
    expect(readSettings(settingsFilePath)).toEqual({});

    fs.writeFileSync(preferencesPath(), JSON.stringify({
      version: 1,
      fields: { profileValue: { value: 'profile', updatedAt: 1 } },
    }));
    expect(readSettings(settingsFilePath)).toEqual({ profileValue: 'profile' });

    fs.writeFileSync(settingsFilePath, JSON.stringify({ instanceValue: 'settings', overlap: 'instance' }));
    fs.writeFileSync(preferencesPath(), JSON.stringify({
      version: 1,
      fields: { overlap: { value: 'profile', updatedAt: 2 } },
    }));
    expect(readSettings(settingsFilePath)).toEqual({ instanceValue: 'settings', overlap: 'profile' });

    fs.unlinkSync(preferencesPath());
    expect(readSettings(settingsFilePath)).toEqual({ instanceValue: 'settings', overlap: 'instance' });
  });
});
