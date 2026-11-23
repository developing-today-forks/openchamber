// Renaming a temp file over its destination fails transiently on Windows
// when another process has the destination open for reading: the rename
// throws EPERM (also seen as EACCES or EBUSY) and an atomic write that gives
// up on the first attempt loses the update. These helpers retry only those
// codes with the backoff the VS Code bridge uses for the same hazard
// (10/25/50/100 ms); every other error throws on the first attempt, and a
// rename that keeps failing surfaces its last error after the final delay.

const TRANSIENT_RENAME_CODES = new Set(['EPERM', 'EACCES', 'EBUSY']);
const RENAME_RETRY_DELAYS_MS = [10, 25, 50, 100];

const isTransientRenameError = (error: unknown): error is { code: string } => (
  typeof error === 'object' && error !== null && 'code' in error && typeof error.code === 'string' && TRANSIENT_RENAME_CODES.has(error.code)
);

const waitSync = (ms: number) => {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
};

/** Async rename: `rename(source, destination)` is the caller's rename function (for example `fsPromises.rename`). */
export const renameWithRetry = async (rename: (from: string, to: string) => Promise<void>, source: string, destination: string): Promise<void> => {
  for (let attempt = 0; ; attempt++) {
    try {
      await rename(source, destination);
      return;
    } catch (error) {
      const delay = RENAME_RETRY_DELAYS_MS[attempt];
      if (delay === undefined || !isTransientRenameError(error)) throw error;
      await new Promise<void>((resolve) => setTimeout(resolve, delay));
    }
  }
};

/** Sync rename: waits between attempts with `Atomics.wait`, so callers stay synchronous. */
export const renameSyncWithRetry = (renameSync: (from: string, to: string) => void, source: string, destination: string): void => {
  for (let attempt = 0; ; attempt++) {
    try {
      renameSync(source, destination);
      return;
    } catch (error) {
      const delay = RENAME_RETRY_DELAYS_MS[attempt];
      if (delay === undefined || !isTransientRenameError(error)) throw error;
      waitSync(delay);
    }
  }
};

// A plain rename replaces an existing destination on POSIX and Windows
// alike, so checking the destination first and renaming second still
// destroys a destination created between the check and the commit
// (#2375). This helper commits the destination name with a primitive
// that fails when the name is already taken at commit time, then removes
// the source name: link(2) for a regular file (CreateHardLink on Windows
// also refuses an existing destination) and symlink(2) for a symbolic
// link, whose target is recreated at the destination. Two cases keep the
// plain rename: a directory, which no such primitive can name (a hard
// link cannot name a directory) and whose rename onto an existing file
// or non-empty directory fails instead of replacing it; and a rename
// whose destination is the source itself (a case-only rename), which
// replaces a file with itself and destroys nothing. If removing the
// source name fails after the destination is committed, the destination
// is removed again when it still names what this call created, so a
// failed commit leaves the source as the only name.

type NoReplaceRenameOps = {
  link: (from: string, to: string) => Promise<void>;
  unlink: (target: string) => Promise<void>;
  rename: (from: string, to: string) => Promise<void>;
  readlink: (target: string) => Promise<string>;
  symlink: (target: string, targetPath: string) => Promise<void>;
  lstat: (target: string) => Promise<{ dev: number; ino: number }>;
};

export const renameWithoutReplace = async (
  ops: NoReplaceRenameOps,
  source: string,
  destination: string,
  sourceKind: { isDirectory: boolean; isSymbolicLink: boolean; destinationIsSource: boolean },
): Promise<void> => {
  if (sourceKind.isDirectory || sourceKind.destinationIsSource) {
    await ops.rename(source, destination);
    return;
  }
  if (sourceKind.isSymbolicLink) {
    const target = await ops.readlink(source);
    await ops.symlink(target, destination);
    try {
      await ops.unlink(source);
    } catch (error) {
      const createdTarget = await ops.readlink(destination).catch(() => null);
      if (createdTarget === target) await ops.unlink(destination).catch(() => {});
      throw error;
    }
    return;
  }
  await ops.link(source, destination);
  try {
    await ops.unlink(source);
  } catch (error) {
    const [sourceStats, destinationStats] = await Promise.all([
      ops.lstat(source).catch(() => null),
      ops.lstat(destination).catch(() => null),
    ]);
    if (sourceStats && destinationStats && sourceStats.dev === destinationStats.dev && sourceStats.ino === destinationStats.ino) {
      await ops.unlink(destination).catch(() => {});
    }
    throw error;
  }
};
