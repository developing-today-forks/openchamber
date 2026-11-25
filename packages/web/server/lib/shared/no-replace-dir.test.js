import { mkdtemp, mkdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

// The loader resolves prebuilds by environment, so every import here is
// dynamic and happens after the environment for that case is set. The cache
// key includes the resolved roots, so switching the override re-resolves.

describe('no-replace-dir loader', () => {
  it('renames a directory without replacing an existing destination', async () => {
    delete process.env.OPENCHAMBER_NOREPLACE_PREBUILDS;
    const { renameDirectoryNoReplace } = await import('./no-replace-dir.js');
    const root = await mkdtemp(path.join(tmpdir(), 'oc-no-replace-dir-'));
    try {
      await mkdir(path.join(root, 'source'));
      await mkdir(path.join(root, 'taken'));
      renameDirectoryNoReplace(path.join(root, 'source'), path.join(root, 'moved'));
      const { lstat } = await import('node:fs/promises');
      await expect(lstat(path.join(root, 'moved'))).resolves.toMatchObject({});
      await expect(lstat(path.join(root, 'source'))).rejects.toMatchObject({ code: 'ENOENT' });
      expect(() => renameDirectoryNoReplace(path.join(root, 'moved'), path.join(root, 'taken')))
        .toThrowError(expect.objectContaining({ code: 'EEXIST' }));
      await expect(lstat(path.join(root, 'moved'))).resolves.toMatchObject({});
      await expect(lstat(path.join(root, 'taken'))).resolves.toMatchObject({});
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });

  it('fails closed with ENOSYS when no prebuild resolves', async () => {
    const empty = await mkdtemp(path.join(tmpdir(), 'oc-empty-prebuilds-'));
    process.env.OPENCHAMBER_NOREPLACE_PREBUILDS = empty;
    try {
      const { renameDirectoryNoReplace } = await import('./no-replace-dir.js');
      expect(() => renameDirectoryNoReplace('/repo/a', '/repo/b'))
        .toThrowError(expect.objectContaining({ code: 'ENOSYS' }));
    } finally {
      delete process.env.OPENCHAMBER_NOREPLACE_PREBUILDS;
      await rm(empty, { recursive: true, force: true });
    }
  });
});
