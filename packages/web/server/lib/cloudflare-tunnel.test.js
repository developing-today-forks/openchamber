import { afterEach, describe, expect, it } from 'bun:test';
import fs from 'fs';
import os from 'os';
import path from 'path';

import { checkCloudflaredAvailable, startCloudflareQuickTunnel } from './cloudflare-tunnel.js';

describe('checkCloudflaredAvailable', () => {
  const originalPath = process.env.PATH;
  const tempDirs = [];

  const installFakeCloudflared = (script) => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'openchamber-cloudflared-check-'));
    tempDirs.push(dir);
    const binary = path.join(dir, 'cloudflared');
    fs.writeFileSync(binary, script, { mode: 0o755 });
    process.env.PATH = `${dir}${path.delimiter}${originalPath ?? ''}`;
    return binary;
  };

  afterEach(() => {
    process.env.PATH = originalPath;
    while (tempDirs.length > 0) {
      fs.rmSync(tempDirs.pop(), { recursive: true, force: true });
    }
  });

  it('reports a prompt cloudflared binary as available', async () => {
    const binary = installFakeCloudflared('#!/bin/sh\necho "cloudflared version 2025.1.0"\n');

    const result = await checkCloudflaredAvailable();

    expect(result.available).toBe(true);
    expect(result.path).toBe(binary);
    expect(result.version).toContain('2025.1.0');
  });

  it('settles a hung cloudflared binary as unavailable instead of blocking', async () => {
    installFakeCloudflared('#!/bin/sh\nexec sleep 30\n');

    const startedAt = Date.now();
    const result = await checkCloudflaredAvailable({ timeoutMs: 200 });

    expect(result).toEqual({ available: false, path: null, version: null });
    expect(Date.now() - startedAt).toBeLessThan(10000);
  });
});

describe('startCloudflareQuickTunnel startup settlement', () => {
  const originalPath = process.env.PATH;
  const tempDirs = [];

  const installFakeCloudflared = (onTunnelStart) => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'openchamber-cloudflared-quick-'));
    tempDirs.push(dir);
    const binary = path.join(dir, 'cloudflared');
    fs.writeFileSync(binary, `#!/bin/sh
if [ "$1" = "--version" ]; then
  echo "cloudflared version 2025.1.0"
  exit 0
fi
${onTunnelStart}
`, { mode: 0o755 });
    process.env.PATH = `${dir}${path.delimiter}${originalPath ?? ''}`;
  };

  const settleWithin = (promise, timeoutMs = 1500) => new Promise((resolve) => {
    const timeout = setTimeout(() => resolve({ status: 'timeout' }), timeoutMs);
    promise.then(
      (value) => {
        clearTimeout(timeout);
        resolve({ status: 'resolved', value });
      },
      (error) => {
        clearTimeout(timeout);
        resolve({ status: 'rejected', error });
      },
    );
  });

  afterEach(() => {
    process.env.PATH = originalPath;
    while (tempDirs.length > 0) {
      fs.rmSync(tempDirs.pop(), { recursive: true, force: true });
    }
  });

  it('rejects when cloudflared exits 0 before printing a URL', async () => {
    installFakeCloudflared('exit 0');

    const outcome = await settleWithin(startCloudflareQuickTunnel({ originUrl: 'http://localhost:3000' }));

    expect(outcome.status).toBe('rejected');
    expect(outcome.error.message).toContain('code 0');
  });

  it('rejects with the signal when cloudflared dies before printing a URL', async () => {
    installFakeCloudflared('kill -TERM $$');

    const outcome = await settleWithin(startCloudflareQuickTunnel({ originUrl: 'http://localhost:3000' }));

    expect(outcome.status).toBe('rejected');
    expect(outcome.error.message).toContain('SIGTERM');
  });

  it('preserves nonzero exit errors', async () => {
    installFakeCloudflared('exit 1');

    const outcome = await settleWithin(startCloudflareQuickTunnel({ originUrl: 'http://localhost:3000' }));

    expect(outcome.status).toBe('rejected');
    expect(outcome.error.message).toBe('Cloudflared exited with code 1');
  });

  it('resolves when cloudflared prints a URL before exiting', async () => {
    installFakeCloudflared('echo "https://happy.trycloudflare.com"\nexit 0');

    const outcome = await settleWithin(startCloudflareQuickTunnel({ originUrl: 'http://localhost:3000' }));

    expect(outcome.status).toBe('resolved');
    expect(outcome.value.getPublicUrl()).toBe('https://happy.trycloudflare.com');
  });

  it('rejects when cloudflared prints a URL and then exits nonzero before readiness', async () => {
    installFakeCloudflared('echo "https://doomed.trycloudflare.com"\nexit 1');

    const outcome = await settleWithin(startCloudflareQuickTunnel({ originUrl: 'http://localhost:3000' }));

    expect(outcome.status).toBe('rejected');
    expect(outcome.error.message).toBe('Cloudflared exited with code 1');
  });

  it('rejects when cloudflared prints a URL and then dies by signal before readiness', async () => {
    installFakeCloudflared('echo "https://signalled.trycloudflare.com"\nkill -TERM $$');

    const outcome = await settleWithin(startCloudflareQuickTunnel({ originUrl: 'http://localhost:3000' }));

    expect(outcome.status).toBe('rejected');
    expect(outcome.error.message).toContain('SIGTERM');
  });

  it('keeps the resolved handle stable when cloudflared exits afterward', async () => {
    installFakeCloudflared('echo "https://steady.trycloudflare.com"\nexec sleep 0.3');

    const outcome = await settleWithin(startCloudflareQuickTunnel({ originUrl: 'http://localhost:3000' }));
    expect(outcome.status).toBe('resolved');
    expect(outcome.value.getPublicUrl()).toBe('https://steady.trycloudflare.com');

    await new Promise((resolve) => outcome.value.process.once('exit', resolve));
    expect(outcome.value.getPublicUrl()).toBe('https://steady.trycloudflare.com');
  });
});
