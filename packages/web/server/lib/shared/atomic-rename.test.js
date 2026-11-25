import { describe, expect, it } from 'vitest';

import { renameSyncWithRetry, renameWithRetry, renameWithoutReplace } from './atomic-rename.js';

const codedError = (code) => {
  const error = new Error(`rename failed: ${code}`);
  error.code = code;
  return error;
};

describe('renameWithRetry', () => {
  it('lands the rename when the first attempt fails with EPERM', async () => {
    let calls = 0;
    const rename = async () => {
      calls += 1;
      if (calls === 1) throw codedError('EPERM');
    };
    await renameWithRetry(rename, 'tmp', 'dest');
    expect(calls).toBe(2);
  });

  it('retries EACCES and EBUSY as well', async () => {
    for (const code of ['EACCES', 'EBUSY']) {
      let calls = 0;
      const rename = async () => {
        calls += 1;
        if (calls <= 2) throw codedError(code);
      };
      await renameWithRetry(rename, 'tmp', 'dest');
      expect(calls).toBe(3);
    }
  });

  it('surfaces the error after the final retry when the rename keeps failing', async () => {
    let calls = 0;
    const rename = async () => {
      calls += 1;
      throw codedError('EPERM');
    };
    await expect(renameWithRetry(rename, 'tmp', 'dest')).rejects.toMatchObject({ code: 'EPERM' });
    expect(calls).toBe(5);
  });

  it('throws a non-transient error on the first attempt', async () => {
    let calls = 0;
    const rename = async () => {
      calls += 1;
      throw codedError('EINVAL');
    };
    await expect(renameWithRetry(rename, 'tmp', 'dest')).rejects.toMatchObject({ code: 'EINVAL' });
    expect(calls).toBe(1);
  });
});

describe('renameSyncWithRetry', () => {
  it('lands the rename when the first attempt fails with EPERM', () => {
    let calls = 0;
    const renameSync = () => {
      calls += 1;
      if (calls === 1) throw codedError('EPERM');
    };
    renameSyncWithRetry(renameSync, 'tmp', 'dest');
    expect(calls).toBe(2);
  });

  it('surfaces the error after the final retry when the rename keeps failing', () => {
    let calls = 0;
    const renameSync = () => {
      calls += 1;
      throw codedError('EBUSY');
    };
    expect(() => renameSyncWithRetry(renameSync, 'tmp', 'dest')).toThrowError(expect.objectContaining({ code: 'EBUSY' }));
    expect(calls).toBe(5);
  });

  it('throws a non-transient error on the first attempt', () => {
    let calls = 0;
    const renameSync = () => {
      calls += 1;
      throw codedError('ENOENT');
    };
    expect(() => renameSyncWithRetry(renameSync, 'tmp', 'dest')).toThrowError(expect.objectContaining({ code: 'ENOENT' }));
    expect(calls).toBe(1);
  });
});

describe('renameWithoutReplace', () => {
  const fileKind = { isDirectory: false, isSymbolicLink: false, destinationIsSource: false };
  const makeOps = (overrides = {}) => {
    const calls = [];
    const ops = {
      link: async (from, to) => { calls.push(['link', from, to]); },
      unlink: async (target) => { calls.push(['unlink', target]); },
      rename: async (from, to) => { calls.push(['rename', from, to]); },
      readlink: async (target) => { calls.push(['readlink', target]); return 'link-target'; },
      symlink: async (target, targetPath) => { calls.push(['symlink', target, targetPath]); },
      lstat: async (target) => { calls.push(['lstat', target]); return { dev: 1, ino: 10 }; },
      ...overrides,
    };
    return { ops, calls };
  };

  it('commits a file as a hard link, then removes the source name', async () => {
    const { ops, calls } = makeOps();
    await renameWithoutReplace(ops, 'a.txt', 'b.txt', fileKind);
    expect(calls).toEqual([['link', 'a.txt', 'b.txt'], ['unlink', 'a.txt']]);
  });

  it('surfaces EEXIST from the link and leaves the source in place', async () => {
    const { ops, calls } = makeOps({
      link: async () => { throw codedError('EEXIST'); },
    });
    await expect(renameWithoutReplace(ops, 'a.txt', 'b.txt', fileKind)).rejects.toMatchObject({ code: 'EEXIST' });
    expect(calls.filter(([name]) => name === 'unlink')).toEqual([]);
    expect(calls.filter(([name]) => name === 'rename')).toEqual([]);
  });

  it('commits a directory with the native no-replace rename', async () => {
    const dirCalls = [];
    const { ops, calls } = makeOps({
      renameDirNoReplace: async (from, to) => { dirCalls.push([from, to]); },
    });
    await renameWithoutReplace(ops, 'dir', 'dir2', { ...fileKind, isDirectory: true });
    expect(dirCalls).toEqual([['dir', 'dir2']]);
    expect(calls.filter(([name]) => name === 'rename')).toEqual([]);
  });

  it('fails closed with ENOSYS for a directory without the native helper', async () => {
    const { ops, calls } = makeOps();
    await expect(renameWithoutReplace(ops, 'dir', 'dir2', { ...fileKind, isDirectory: true }))
      .rejects.toMatchObject({ code: 'ENOSYS' });
    expect(calls.filter(([name]) => name === 'rename')).toEqual([]);
  });

  it('uses a plain rename for a directory rename onto itself', async () => {
    const { ops, calls } = makeOps();
    await renameWithoutReplace(ops, 'Dir', 'DIR', { ...fileKind, isDirectory: true, destinationIsSource: true });
    expect(calls).toEqual([['rename', 'Dir', 'DIR']]);
  });

  it('uses a plain rename when the destination is the source itself', async () => {
    const { ops, calls } = makeOps();
    await renameWithoutReplace(ops, 'Readme.md', 'README.md', { ...fileKind, destinationIsSource: true });
    expect(calls).toEqual([['rename', 'Readme.md', 'README.md']]);
  });

  it('recreates a symbolic link at the destination, then removes the source', async () => {
    const { ops, calls } = makeOps();
    await renameWithoutReplace(ops, 'link-a', 'link-b', { ...fileKind, isSymbolicLink: true });
    expect(calls).toEqual([['readlink', 'link-a'], ['symlink', 'link-target', 'link-b'], ['unlink', 'link-a']]);
  });

  it('rolls the destination link back when removing the source fails', async () => {
    const unlinked = [];
    const { ops } = makeOps({
      unlink: async (target) => {
        unlinked.push(target);
        if (target === 'a.txt') throw codedError('EPERM');
      },
    });
    await expect(renameWithoutReplace(ops, 'a.txt', 'b.txt', fileKind)).rejects.toMatchObject({ code: 'EPERM' });
    expect(unlinked).toEqual(['a.txt', 'b.txt']);
  });

  it('keeps a destination that no longer names the source file', async () => {
    const unlinked = [];
    const { ops } = makeOps({
      unlink: async (target) => {
        unlinked.push(target);
        if (target === 'a.txt') throw codedError('EPERM');
      },
      lstat: async (target) => (target === 'a.txt' ? { dev: 1, ino: 10 } : { dev: 1, ino: 99 }),
    });
    await expect(renameWithoutReplace(ops, 'a.txt', 'b.txt', fileKind)).rejects.toMatchObject({ code: 'EPERM' });
    expect(unlinked).toEqual(['a.txt']);
  });
});
