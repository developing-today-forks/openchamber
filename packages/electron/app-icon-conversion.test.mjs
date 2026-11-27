import assert from 'node:assert/strict';
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

import { convertAppIconToDataUrl } from './app-icon-conversion.mjs';

const PNG_BYTES = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

const writingConvert = (bytes) => async (_iconPath, outPath) => {
  await fsp.writeFile(outPath, bytes);
};

test('returns a data URL for the converted icon and removes its scratch directory', async () => {
  let seenOutPath;
  const dataUrl = await convertAppIconToDataUrl({
    iconPath: '/Applications/Safari.app/Contents/Resources/Safari.icns',
    appName: 'Safari',
    convert: async (iconPath, outPath) => {
      seenOutPath = outPath;
      await fsp.writeFile(outPath, PNG_BYTES);
    },
  });
  assert.equal(dataUrl, `data:image/png;base64,${PNG_BYTES.toString('base64')}`);
  assert.equal(fs.existsSync(path.dirname(seenOutPath)), false);
});

test('the converter output path is not the predictable shared-tmp name', async () => {
  let seenOutPath;
  await convertAppIconToDataUrl({
    iconPath: '/icon.icns',
    appName: 'Safari',
    convert: async (_iconPath, outPath) => {
      seenOutPath = outPath;
      await fsp.writeFile(outPath, PNG_BYTES);
    },
  });
  const predictable = /^openchamber-icon-Safari-\d+\.png$/;
  assert.equal(predictable.test(path.basename(seenOutPath)), false);
  assert.match(path.basename(path.dirname(seenOutPath)), /^openchamber-icon-Safari-.+/);
  assert.equal(path.dirname(path.dirname(seenOutPath)), os.tmpdir());
});

test('a planted symlink at the predictable path is not followed and the victim is untouched', async () => {
  const victimDir = await fsp.mkdtemp(path.join(os.tmpdir(), 'app-icon-victim-'));
  const victim = path.join(victimDir, 'victim-canary.txt');
  await fsp.writeFile(victim, 'CANARY-SECRET');
  const planted = [];
  try {
    // Cover the millisecond window the old construction could compute,
    // the way the issue's repro plants it.
    const now = Date.now();
    for (let offset = 0; offset < 3000; offset += 1) {
      const linkPath = path.join(os.tmpdir(), `openchamber-icon-Safari-${now + offset}.png`);
      try {
        await fsp.symlink(victim, linkPath);
        planted.push(linkPath);
      } catch {
        // A name that already exists is not ours to plant or remove.
      }
    }
    const dataUrl = await convertAppIconToDataUrl({
      iconPath: '/icon.icns',
      appName: 'Safari',
      convert: writingConvert(PNG_BYTES),
    });
    assert.equal(dataUrl, `data:image/png;base64,${PNG_BYTES.toString('base64')}`);
    assert.equal(await fsp.readFile(victim, 'utf8'), 'CANARY-SECRET');
  } finally {
    await Promise.all(planted.map((linkPath) => fsp.rm(linkPath, { force: true }).catch(() => {})));
    await fsp.rm(victimDir, { recursive: true, force: true });
  }
});

test('a failing converter returns null and still removes its scratch directory', async () => {
  let seenOutPath;
  const dataUrl = await convertAppIconToDataUrl({
    iconPath: '/icon.icns',
    appName: 'Safari',
    convert: async (_iconPath, outPath) => {
      seenOutPath = outPath;
      throw new Error('sips failed');
    },
  });
  assert.equal(dataUrl, null);
  assert.equal(fs.existsSync(path.dirname(seenOutPath)), false);
});
