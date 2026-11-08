import { afterEach, describe, expect, it } from 'bun:test';
import fs from 'fs';
import os from 'os';
import path from 'path';

import { execFileSync } from 'node:child_process';

import {
  checkCloudflaredAvailable,
  extractHostnameFromCloudflaredConfigDetailed,
  inspectManagedLocalCloudflareConfig,
  startCloudflareManagedRemoteTunnel,
  startCloudflareQuickTunnel,
} from './cloudflare-tunnel.js';

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

  it('rejects when cloudflared prints a URL and then exits cleanly before readiness', async () => {
    installFakeCloudflared('echo "https://happy.trycloudflare.com"\nexit 0');

    const outcome = await settleWithin(startCloudflareQuickTunnel({ originUrl: 'http://localhost:3000' }));

    expect(outcome.status).toBe('rejected');
    expect(outcome.error.message).toBe('Cloudflared exited with code 0');
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

  it('resolves when the tunnel URL is split across pipe chunks', async () => {
    installFakeCloudflared('printf %s "https://split-"\nsleep 0.2\nprintf %s "across.trycloudflare.com\n"\nexec sleep 0.3');

    const outcome = await settleWithin(startCloudflareQuickTunnel({ originUrl: 'http://localhost:3000' }));
    expect(outcome.status).toBe('resolved');
    expect(outcome.value.getPublicUrl()).toBe('https://split-across.trycloudflare.com');

    await new Promise((resolve) => outcome.value.process.once('exit', resolve));
  });
});

describe('startCloudflareManagedRemoteTunnel startup settlement', () => {
  const originalPath = process.env.PATH;
  const tempDirs = [];

  const installFakeCloudflared = (onTunnelStart) => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'openchamber-cloudflared-managed-'));
    tempDirs.push(dir);
    const binary = path.join(dir, 'cloudflared');
    fs.writeFileSync(binary, `#!/bin/sh\nif [ "$1" = "--version" ]; then\n  echo "cloudflared version 2025.1.0"\n  exit 0\nfi\n${onTunnelStart}\n`, { mode: 0o755 });
    process.env.PATH = `${dir}${path.delimiter}${originalPath ?? ''}`;
  };

  const settleWithin = (promise, timeoutMs = 3000) => new Promise((resolve) => {
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

  it('rejects when a fatal log line is split across pipe chunks', async () => {
    installFakeCloudflared('printf %s "invalid tok"\nsleep 0.2\nprintf %s "en supplied\n"\nexec sleep 5');

    const outcome = await settleWithin(startCloudflareManagedRemoteTunnel({ token: 'test-token', hostname: 'tunnel.example.com' }));

    expect(outcome.status).toBe('rejected');
    expect(outcome.error.message).toContain('Cloudflared failed to start managed-remote tunnel');
    expect(outcome.error.message).toContain('invalid token supplied');
  });

  it('resolves when a ready log line is split across pipe chunks', async () => {
    installFakeCloudflared('printf %s "Registered tunnel conn"\nsleep 0.2\nprintf %s "ection connIndex=0\n"\nexec sleep 5');

    const outcome = await settleWithin(startCloudflareManagedRemoteTunnel({ token: 'test-token', hostname: 'tunnel.example.com' }));

    expect(outcome.status).toBe('resolved');
    expect(outcome.value.getPublicUrl()).toBe('https://tunnel.example.com');
    outcome.value.stop();
  });

  it('rejects naming the line when a fatal log line is unterminated and the child exits', async () => {
    installFakeCloudflared('printf %s \"invalid token supplied\"\nsleep 0.2\nexit 1');

    const outcome = await settleWithin(startCloudflareManagedRemoteTunnel({ token: 'test-token', hostname: 'tunnel.example.com' }));

    expect(outcome.status).toBe('rejected');
    expect(outcome.error.message).toContain('Cloudflared failed to start managed-remote tunnel');
    expect(outcome.error.message).toContain('invalid token supplied');
  });

  it('rejects naming the line when a fatal log line is unterminated, its stream ends, and the child lingers', async () => {
    installFakeCloudflared('printf %s \"invalid token supplied\" >&2\nexec 2>&-\nsleep 5');

    const outcome = await settleWithin(startCloudflareManagedRemoteTunnel({ token: 'test-token', hostname: 'tunnel.example.com' }));

    expect(outcome.status).toBe('rejected');
    expect(outcome.error.message).toContain('Cloudflared failed to start managed-remote tunnel');
    expect(outcome.error.message).toContain('invalid token supplied');
  });

  it('does not resolve as ready at the liveness fallback when a fatal log line is unterminated and the child lingers', async () => {
    installFakeCloudflared('printf %s \"invalid token supplied\"\nexec sleep 10');

    const outcome = await settleWithin(startCloudflareManagedRemoteTunnel({ token: 'test-token', hostname: 'tunnel.example.com' }), 9000);

    expect(outcome.status).toBe('rejected');
    expect(outcome.error.message).toContain('Cloudflared failed to start managed-remote tunnel');
    expect(outcome.error.message).toContain('invalid token supplied');
  }, 12000);

  it('resolves when a ready log line is unterminated and the child exits', async () => {
    installFakeCloudflared('printf %s \"Registered tunnel connection connIndex=0\"\nsleep 0.2\nexit 0');

    const outcome = await settleWithin(startCloudflareManagedRemoteTunnel({ token: 'test-token', hostname: 'tunnel.example.com' }));

    expect(outcome.status).toBe('resolved');
    expect(outcome.value.getPublicUrl()).toBe('https://tunnel.example.com');
    outcome.value.stop();
  });
});

describe('managed local config bounded read', () => {
  const tempDirs = [];
  const makeDir = () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'openchamber-cloudflared-config-'));
    tempDirs.push(dir);
    return dir;
  };
  afterEach(() => {
    while (tempDirs.length > 0) {
      fs.rmSync(tempDirs.pop(), { recursive: true, force: true });
    }
  });
  const CONFIG = 'ingress:\n  - hostname: example.com\n    service: http://localhost:3000\n  - service: http_status:404\n';

  it('resolves the ingress hostname of a valid config (control)', () => {
    const configPath = path.join(makeDir(), 'config.yml');
    fs.writeFileSync(configPath, CONFIG);
    expect(inspectManagedLocalCloudflareConfig({ configPath })).toMatchObject({ ok: true, resolvedHostname: 'example.com' });
  });

  it('refuses a config grown past the cap after the stat point instead of parsing it whole', () => {
    const configPath = path.join(makeDir(), 'config.yml');
    // The state the extractor faces when the file grew between
    // assertReadableFile's stat and the read: over the 256 KiB cap with a
    // valid ingress hostname at the top. Pre-fix this returned the hostname.
    fs.writeFileSync(configPath, `${CONFIG}\n# ${'x'.repeat(300_000)}\n`);
    const result = extractHostnameFromCloudflaredConfigDetailed(configPath);
    expect(result.hostname).toBeNull();
    expect(result.parseError?.message).toBe('Managed local tunnel config file is too large (max 262144 bytes).');
  });

  it.skipIf(process.platform === 'win32')('refuses a FIFO swapped in at the config path promptly instead of blocking on the read', () => {
    const configPath = path.join(makeDir(), 'config.yml');
    execFileSync('mkfifo', [configPath]);
    // Pre-fix this read blocked forever; the test timeout is the guard.
    const result = extractHostnameFromCloudflaredConfigDetailed(configPath);
    expect(result.hostname).toBeNull();
    expect(result.parseError?.message).toBe('Managed local tunnel config path is not a file. Select a cloudflared config file.');
    expect(inspectManagedLocalCloudflareConfig({ configPath }).error).toContain('path is not a file');
  });
});
