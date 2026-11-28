import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { createUnreadBaseline, withUnreadBaseline } from './unread-baseline.js';

const tempDirs = [];

const makeDataDir = () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'openchamber-unread-'));
  tempDirs.push(dir);
  return dir;
};

const filePath = (dataDir) => path.join(dataDir, 'sessions-unread.json');

afterEach(() => {
  vi.restoreAllMocks();
  while (tempDirs.length > 0) {
    fs.rmSync(tempDirs.pop(), { recursive: true, force: true });
  }
});

describe('createUnreadBaseline', () => {
  it('creates the baseline on the first read and keeps it across restarts', async () => {
    const dataDir = makeDataDir();
    expect(await createUnreadBaseline({ dataDir, now: () => 1000 }).get()).toBe(1000);
    expect(JSON.parse(fs.readFileSync(filePath(dataDir), 'utf8'))).toEqual({ since: 1000 });
    expect(await createUnreadBaseline({ dataDir, now: () => 9000 }).get()).toBe(1000);
  });

  it('leaves an unreadable file alone and answers unknown', async () => {
    vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    const dataDir = makeDataDir();
    fs.writeFileSync(filePath(dataDir), '{ broken');
    const baseline = createUnreadBaseline({ dataDir, now: () => 9000 });
    expect(await baseline.get()).toBeNull();
    expect(fs.readFileSync(filePath(dataDir), 'utf8')).toBe('{ broken');
  });

  it('retries a failed read instead of creating a new baseline', async () => {
    vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    const dataDir = makeDataDir();
    fs.writeFileSync(filePath(dataDir), JSON.stringify({ since: 500 }));
    let fail = true;
    const fsPromises = {
      ...fs.promises,
      readFile: (...args) => (fail ? Promise.reject(Object.assign(new Error('busy'), { code: 'EBUSY' })) : fs.promises.readFile(...args)),
    };
    const baseline = createUnreadBaseline({ dataDir, fsPromises, now: () => 9000 });
    expect(await baseline.get()).toBeNull();
    fail = false;
    expect(await baseline.get()).toBe(500);
  });

  it('serves its baseline even when the file cannot be written', async () => {
    vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    const fsPromises = {
      ...fs.promises,
      writeFile: () => Promise.reject(new Error('read-only')),
    };
    const baseline = createUnreadBaseline({ dataDir: makeDataDir(), fsPromises, now: () => 1000 });
    expect(await baseline.get()).toBe(1000);
  });

  it('does not follow a planted symlink at the legacy temp path', async () => {
    const dataDir = makeDataDir();
    const victim = path.join(dataDir, 'victim.txt');
    fs.writeFileSync(victim, 'ORIGINAL');
    fs.symlinkSync(victim, path.join(dataDir, `sessions-unread.json.${process.pid}.tmp`));
    expect(await createUnreadBaseline({ dataDir, now: () => 1234567890 }).get()).toBe(1234567890);
    expect(fs.readFileSync(victim, 'utf8')).toBe('ORIGINAL');
    expect(JSON.parse(fs.readFileSync(filePath(dataDir), 'utf8'))).toEqual({ since: 1234567890 });
  });

  it('gives concurrent writes distinct temp files', async () => {
    const dataDir = makeDataDir();
    const tmpPaths = [];
    const fsPromises = {
      ...fs.promises,
      writeFile: (target, ...rest) => {
        tmpPaths.push(String(target));
        return fs.promises.writeFile(target, ...rest);
      },
    };
    const [first, second] = await Promise.all([
      createUnreadBaseline({ dataDir, fsPromises, now: () => 1000 }).get(),
      createUnreadBaseline({ dataDir, fsPromises, now: () => 2000 }).get(),
    ]);
    expect(first).toBe(1000);
    expect(second).toBe(2000);
    expect(tmpPaths).toHaveLength(2);
    expect(new Set(tmpPaths).size).toBe(2);
    for (const tmpPath of tmpPaths) {
      expect(tmpPath.startsWith(`${filePath(dataDir)}.`)).toBe(true);
    }
  });
});

describe('withUnreadBaseline', () => {
  const session = (time) => ({ id: 'ses_a', time: { created: 1, updated: 1, ...time } });

  it('serves a turn that ended before the baseline as seen', () => {
    expect(withUnreadBaseline(session({ idle: 100 }), 500).time.viewed).toBe(100);
    expect(withUnreadBaseline(session({ idle: 100, viewed: 50 }), 500).time.viewed).toBe(100);
    expect(withUnreadBaseline(session({ idle: 500 }), 500).time.viewed).toBe(500);
  });

  it('leaves later turns, seen turns and sessions without a turn as they are', () => {
    const later = session({ idle: 600, viewed: 50 });
    expect(withUnreadBaseline(later, 500)).toBe(later);
    const seen = session({ idle: 100, viewed: 100 });
    expect(withUnreadBaseline(seen, 500)).toBe(seen);
    const fresh = session({});
    expect(withUnreadBaseline(fresh, 500)).toBe(fresh);
    expect(withUnreadBaseline(null, 500)).toBeNull();
  });
});
