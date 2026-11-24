// Loader for the no-replace directory rename native addon (#2573).
//
// The addon is N-API, so one prebuild per platform/arch loads in both Node
// and Electron with no rebuild. Resolution order: $OPENCHAMBER_NOREPLACE_PREBUILDS
// (when set, it replaces the built-in roots entirely so tests and packagers
// pin one prebuild location), otherwise the source/build prebuilds directory
// next to this module, then the Electron packaged-app resources directory.
//
// Failure is fail-closed: a missing binary or load error throws an ENOSYS
// coded error. Callers must surface the error, never fall back to
// check-then-rename, which reopens the race the addon exists to close.

import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

type NoReplaceDirBinding = {
  renameDirectoryNoReplace: (source: string, destination: string) => void;
};

const ADDON_FILE = 'no-replace-rename.node';

const desktopProcess: NodeJS.Process & { resourcesPath?: string } = process;

const codedError = (code: string, message: string): Error & { code: string } => (
  Object.assign(new Error(message), { code })
);

const candidateRoots = (): string[] => {
  const override = process.env.OPENCHAMBER_NOREPLACE_PREBUILDS;
  if (override !== undefined) return [override];
  const roots: string[] = [];
  const here = path.dirname(fileURLToPath(import.meta.url));
  roots.push(path.resolve(here, '..', '..', 'native', 'no-replace-rename', 'prebuilds'));
  const resourcesPath = desktopProcess.resourcesPath;
  if (resourcesPath) {
    roots.push(path.join(resourcesPath, 'no-replace-rename', 'prebuilds'));
  }
  return roots;
};

let cached: { key: string; binding?: NoReplaceDirBinding; failure?: string } | null = null;

const loadBinding = (): NoReplaceDirBinding => {
  const roots = candidateRoots();
  const key = roots.join('|');
  if (cached && cached.key === key) {
    if (cached.binding) return cached.binding;
    throw codedError('ENOSYS', cached.failure ?? 'no-replace prebuild load failed');
  }
  const relative = path.join(`${process.platform}-${process.arch}`, ADDON_FILE);
  const tried: string[] = [];
  const require = createRequire(import.meta.url);
  for (const root of roots) {
    const candidate = path.join(root, relative);
    tried.push(candidate);
    try {
      const binding: NoReplaceDirBinding = require(candidate);
      cached = { key, binding };
      return binding;
    } catch {
      // Try the next root; a missing or unloadable binary is ENOSYS below.
    }
  }
  const failure = `atomic no-replace directory rename is unavailable: no loadable prebuild for ${process.platform}-${process.arch} (tried ${tried.join(', ')}). Build it with packages/web/server/native/no-replace-rename/build.mjs.`;
  cached = { key, failure };
  throw codedError('ENOSYS', failure);
};

/** Atomically rename a directory without replacing an existing destination. */
export const renameDirectoryNoReplace = (source: string, destination: string): void => {
  loadBinding().renameDirectoryNoReplace(source, destination);
};
