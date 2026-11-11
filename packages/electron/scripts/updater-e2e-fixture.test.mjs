import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

import { createFixtureServer, stageUpdaterFixture } from './updater-e2e-fixture.mjs';
import { parseUpdateManifest, verifyUpdateManifest } from './verify-update-manifest.mjs';

test('stages architecture-specific generic updater fixtures with valid metadata', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'openchamber-updater-fixture-'));
  try {
    const source = path.join(root, 'OpenChamber-1.15.1-linux-arm64.AppImage');
    const directory = path.join(root, 'feed');
    fs.writeFileSync(source, 'fixture-appimage');
    const result = stageUpdaterFixture({
      architecture: 'arm64',
      nextAppImage: source,
      version: '1.15.1',
      directory,
    });
    assert.equal(result.manifestName, 'latest-linux-arm64.yml');
    const manifestPath = path.join(directory, result.manifestName);
    assert.deepEqual(parseUpdateManifest(fs.readFileSync(manifestPath, 'utf8')).files.length, 1);
    assert.deepEqual(verifyUpdateManifest({
      manifestPath,
      artifactPaths: [result.artifactPath],
      expectedVersion: '1.15.1',
    }), {
      version: '1.15.1',
      artifacts: [{ name: 'OpenChamber-1.15.1-linux-arm64.AppImage', size: 16 }],
    });
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('serves only staged fixture files over loopback', async () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'openchamber-updater-server-'));
  const artifact = path.join(root, 'OpenChamber.AppImage');
  fs.writeFileSync(artifact, 'fixture');
  const { server, url } = await createFixtureServer({ directory: root });
  try {
    assert.equal(new URL(url).hostname, '127.0.0.1');
    const response = await fetch(`${url}OpenChamber.AppImage`);
    assert.equal(response.status, 200);
    assert.equal(await response.text(), 'fixture');
    assert.equal((await fetch(`${url}../package.json`)).status, 404);
  } finally {
    await new Promise((resolve) => server.close(resolve));
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('a registered file removed after startup returns 404 and the server keeps serving (#2078)', async () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'openchamber-updater-removed-'));
  fs.writeFileSync(path.join(root, 'test.yml'), 'version: 1\n');
  fs.writeFileSync(path.join(root, 'keep.yml'), 'version: 2\n');
  const { server, url } = await createFixtureServer({ directory: root });
  try {
    fs.rmSync(path.join(root, 'test.yml'));
    const removed = await fetch(`${url}test.yml`);
    assert.equal(removed.status, 404);
    const kept = await fetch(`${url}keep.yml`);
    assert.equal(kept.status, 200);
    assert.equal(await kept.text(), 'version: 2\n');
  } finally {
    await new Promise((resolve) => server.close(resolve));
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('a read-stream failure aborts only that response and the server keeps serving (#2078)', { skip: process.getuid?.() === 0 && 'root ignores file permission bits' }, async () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'openchamber-updater-unreadable-'));
  const artifact = path.join(root, 'OpenChamber.AppImage');
  fs.writeFileSync(artifact, 'fixture');
  const { server, url } = await createFixtureServer({ directory: root });
  try {
    // stat still succeeds but opening the file for reading fails (EACCES),
    // which surfaces as a read-stream error after headers are sent.
    fs.chmodSync(artifact, 0o000);
    await assert.rejects(fetch(`${url}OpenChamber.AppImage`));
    fs.chmodSync(artifact, 0o644);
    const recovered = await fetch(`${url}OpenChamber.AppImage`);
    assert.equal(recovered.status, 200);
    assert.equal(await recovered.text(), 'fixture');
  } finally {
    await new Promise((resolve) => server.close(resolve));
    fs.rmSync(root, { recursive: true, force: true });
  }
});
