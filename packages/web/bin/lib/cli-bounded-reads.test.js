import { describe, expect, it } from 'vitest';
import { execFileSync } from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';

import {
  readDesktopLocalClientTokenFromSettings,
  readDesktopLocalPortFromSettings,
  readLastManagedLocalConfigPath,
} from './cli-paths.js';
import { readInstanceOptions, readPidFile } from './cli-process.js';
import { followFile, readTailLines } from './cli-log-files.js';
import { ensureTunnelProfilesMigrated } from './cli-tunnel-profiles.js';

const withTempDataDir = async (fn) => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'oc-cli-bounded-'));
  const previous = process.env.OPENCHAMBER_DATA_DIR ?? null;
  process.env.OPENCHAMBER_DATA_DIR = dir;
  try {
    return await fn(dir);
  } finally {
    if (previous !== null) {
      process.env.OPENCHAMBER_DATA_DIR = previous;
    } else {
      delete process.env.OPENCHAMBER_DATA_DIR;
    }
    fs.rmSync(dir, { recursive: true, force: true });
  }
};

const makeFifo = (filePath) => execFileSync('mkfifo', [filePath]);

const overCapJson = (payload) => JSON.stringify({ ...payload, filler: 'x'.repeat(1024 * 1024) });

const validProfile = {
  id: 'profile-1',
  name: 'demo',
  provider: 'cloudflare',
  mode: 'managed-remote',
  hostname: 'demo.example.com',
  token: 'token-value',
};

describe('cli state-file bounded reads (#1706)', () => {
  it('reads valid settings, state, pid, instance, and profile files as before', async () => {
    await withTempDataDir(async (dir) => {
      fs.writeFileSync(
        path.join(dir, 'settings.json'),
        JSON.stringify({ desktopLocalPort: 4321, desktopLocalClientToken: ' token-abc ' }),
      );
      expect(readDesktopLocalPortFromSettings()).toBe(4321);
      expect(readDesktopLocalClientTokenFromSettings()).toBe('token-abc');

      fs.writeFileSync(
        path.join(dir, 'tunnel-cli-state.json'),
        JSON.stringify({ lastManagedLocalConfigPath: ' /tmp/managed.json ' }),
      );
      expect(readLastManagedLocalConfigPath()).toBe('/tmp/managed.json');

      const pidPath = path.join(dir, 'instance.pid');
      fs.writeFileSync(pidPath, '12345\n');
      expect(readPidFile(pidPath)).toBe(12345);

      const instancePath = path.join(dir, 'instance.json');
      fs.writeFileSync(instancePath, JSON.stringify({ port: 3000, host: '127.0.0.1' }));
      expect(readInstanceOptions(instancePath)).toEqual({ port: 3000, host: '127.0.0.1' });

      fs.writeFileSync(
        path.join(dir, 'tunnel-profiles.json'),
        JSON.stringify({ version: 1, profiles: [validProfile] }),
      );
      const store = ensureTunnelProfilesMigrated();
      expect(store.profiles).toHaveLength(1);
      expect(store.profiles[0].name).toBe('demo');
    });
  });

  it('yields defaults for over-cap state files instead of parsing them whole', async () => {
    await withTempDataDir(async (dir) => {
      fs.writeFileSync(path.join(dir, 'settings.json'), overCapJson({ desktopLocalPort: 4321 }));
      expect(readDesktopLocalPortFromSettings()).toBeNull();
      expect(readDesktopLocalClientTokenFromSettings()).toBe('');

      fs.writeFileSync(path.join(dir, 'tunnel-cli-state.json'), overCapJson({ lastManagedLocalConfigPath: '/tmp/x' }));
      expect(readLastManagedLocalConfigPath()).toBe('');

      const pidPath = path.join(dir, 'instance.pid');
      fs.writeFileSync(pidPath, '1'.repeat(16 * 1024));
      expect(readPidFile(pidPath)).toBeNull();

      const instancePath = path.join(dir, 'instance.json');
      fs.writeFileSync(instancePath, overCapJson({ port: 3000 }));
      expect(readInstanceOptions(instancePath)).toBeNull();

      fs.writeFileSync(path.join(dir, 'tunnel-profiles.json'), overCapJson({ version: 1, profiles: [validProfile] }));
      expect(ensureTunnelProfilesMigrated()).toEqual({ version: 1, profiles: [] });
    });
  });

  it('settles promptly with defaults when a state path is a FIFO', async () => {
    await withTempDataDir(async (dir) => {
      makeFifo(path.join(dir, 'settings.json'));
      expect(readDesktopLocalPortFromSettings()).toBeNull();
      expect(readDesktopLocalClientTokenFromSettings()).toBe('');

      makeFifo(path.join(dir, 'tunnel-profiles.json'));
      expect(ensureTunnelProfilesMigrated()).toEqual({ version: 1, profiles: [] });

      const pidPath = path.join(dir, 'instance.pid');
      makeFifo(pidPath);
      expect(readPidFile(pidPath)).toBeNull();

      const instancePath = path.join(dir, 'instance.json');
      makeFifo(instancePath);
      expect(readInstanceOptions(instancePath)).toBeNull();
    });
  });

  it('migrates valid legacy entries and ignores an over-cap legacy file', async () => {
    await withTempDataDir(async (dir) => {
      fs.writeFileSync(
        path.join(dir, 'cloudflare-managed-remote-tunnels.json'),
        JSON.stringify({
          version: 1,
          tunnels: [{ id: 'legacy-1', name: 'legacy', hostname: 'legacy.example.com', token: 'legacy-token', updatedAt: 5 }],
        }),
      );
      const migrated = ensureTunnelProfilesMigrated();
      expect(migrated.profiles).toHaveLength(1);
      expect(migrated.profiles[0].name).toBe('legacy');
    });

    await withTempDataDir(async (dir) => {
      fs.writeFileSync(
        path.join(dir, 'cloudflare-managed-remote-tunnels.json'),
        overCapJson({ version: 1, tunnels: [{ id: 'legacy-1', name: 'legacy', hostname: 'legacy.example.com', token: 'legacy-token' }] }),
      );
      expect(ensureTunnelProfilesMigrated()).toEqual({ version: 1, profiles: [] });
    });
  });
});

describe('readTailLines bounded tail window (#1706)', () => {
  it('returns exactly the tail of an ordinary log', async () => {
    await withTempDataDir(async (dir) => {
      const logPath = path.join(dir, 'app.log');
      const lines = Array.from({ length: 50 }, (_, index) => `line-${index}`);
      fs.writeFileSync(logPath, `${lines.join('\n')}\n`);
      expect(readTailLines(logPath, 5)).toEqual(lines.slice(-5));
      expect(readTailLines(logPath)).toEqual(lines);
      expect(readTailLines(path.join(dir, 'missing.log'))).toEqual([]);
    });
  });

  it('returns the correct tail of a large log without a whole-file read', async () => {
    await withTempDataDir(async (dir) => {
      const logPath = path.join(dir, 'big.log');
      // ~300 KiB of log: larger than the initial 256 KiB tail window, so the
      // window must grow and drop its partial first line correctly.
      const lines = Array.from({ length: 3000 }, (_, index) => `entry-${index}-${'y'.repeat(90)}`);
      fs.writeFileSync(logPath, `${lines.join('\n')}\n`);
      expect(readTailLines(logPath, 200)).toEqual(lines.slice(-200));
    });
  });

  it('handles a final line without a trailing newline', async () => {
    await withTempDataDir(async (dir) => {
      const logPath = path.join(dir, 'noeol.log');
      fs.writeFileSync(logPath, 'one\ntwo\nthree');
      expect(readTailLines(logPath, 2)).toEqual(['two', 'three']);
    });
  });

  it('settles promptly with [] when the log path is a FIFO', async () => {
    await withTempDataDir(async (dir) => {
      const logPath = path.join(dir, 'fifo.log');
      makeFifo(logPath);
      expect(readTailLines(logPath)).toEqual([]);
    });
  });
});

describe('followFile decode (#2059)', () => {
  const waitForLines = async (lines, count) => {
    const deadline = Date.now() + 5_000;
    while (lines.length < count && Date.now() < deadline) {
      await new Promise((resolve) => { setTimeout(resolve, 50); });
    }
  };

  it('delivers a character split across two polls whole, with no U+FFFD', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'oc-cli-follow-'));
    try {
      const file = path.join(dir, 'follow.log');
      fs.writeFileSync(file, '');
      const lines = [];
      const stop = followFile(file, (line) => lines.push(line));
      try {
        const emoji = Buffer.from('\u{1F600}', 'utf8');
        fs.appendFileSync(file, Buffer.concat([Buffer.from('mood: ', 'utf8'), emoji.subarray(0, 2)]));
        // Let at least one poll consume the split half before the rest lands.
        await new Promise((resolve) => { setTimeout(resolve, 900); });
        fs.appendFileSync(file, Buffer.concat([emoji.subarray(2), Buffer.from(' done\n', 'utf8')]));
        await waitForLines(lines, 1);
        expect(lines).toEqual(['mood: \u{1F600} done']);
        expect(lines[0]).not.toContain('\uFFFD');

        // Controls: a whole-append emoji line and a plain ASCII line are unchanged.
        fs.appendFileSync(file, 'whole \u{1F600} append\n');
        fs.appendFileSync(file, 'plain ascii\n');
        await waitForLines(lines, 3);
        expect(lines).toEqual(['mood: \u{1F600} done', 'whole \u{1F600} append', 'plain ascii']);
      } finally {
        stop();
      }
    } finally {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });

  it('does not carry a split character from before a truncation into the new file', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'oc-cli-follow-'));
    try {
      const file = path.join(dir, 'follow.log');
      fs.writeFileSync(file, '');
      const lines = [];
      const stop = followFile(file, (line) => lines.push(line));
      try {
        const emoji = Buffer.from('\u{1F600}', 'utf8');
        fs.appendFileSync(file, Buffer.concat([Buffer.from('old: ', 'utf8'), emoji.subarray(0, 2)]));
        await new Promise((resolve) => { setTimeout(resolve, 900); });
        // Truncate and rewrite smaller: the reset must drop the held half.
        fs.writeFileSync(file, 'new\n');
        await waitForLines(lines, 1);
        expect(lines).toEqual(['new']);
        expect(lines[0]).not.toContain('\uFFFD');
      } finally {
        stop();
      }
    } finally {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });
});
