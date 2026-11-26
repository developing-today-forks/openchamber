import fs from 'fs';
import path from 'path';

import { isString } from '../shared/object-guards.js';

const isMissingPathError = (error: NodeJS.ErrnoException): boolean => (
  error.code === 'ENOENT' || error.code === 'ENOTDIR'
);

const isWithin = (root: string, target: string): boolean => {
  const relative = path.relative(root, target);
  if (relative === '' || path.isAbsolute(relative)) return relative === '';
  return relative.split(path.sep)[0] !== '..';
};

const resolveExistingPath = (target: string): string => {
  let probe = target;
  const suffix: string[] = [];

  while (true) {
    try {
      return path.resolve(fs.realpathSync(probe), ...suffix);
    } catch (error) {
      // SAFETY: Node realpath errors carry ErrnoException.code; this parser
      // accepts only the two missing-path codes before continuing the walk.
      const pathError = error as NodeJS.ErrnoException;
      if (!isMissingPathError(pathError)) throw error;

      let isSymlink = false;
      try {
        isSymlink = fs.lstatSync(probe).isSymbolicLink();
      } catch (lstatError) {
        // SAFETY: Node lstat errors carry ErrnoException.code; only ENOENT and
        // ENOTDIR mean this path component is absent or blocked by a file.
        const lstatPathError = lstatError as NodeJS.ErrnoException;
        if (!isMissingPathError(lstatPathError)) throw lstatError;
      }
      if (isSymlink) {
        probe = path.resolve(path.dirname(probe), fs.readlinkSync(probe));
        continue;
      }

      const parent = path.dirname(probe);
      if (parent === probe) throw error;
      suffix.unshift(path.basename(probe));
      probe = parent;
    }
  }
};

const accessDenied = () => Object.assign(new Error('Access to file denied'), { code: 'EACCES' });

export const assertPathWithinSkillDir = (skillDir: string, relativePath: string): string => {
  if (!isString(relativePath)) {
    throw Object.assign(new TypeError('The skill file path must be a string'), { code: 'ERR_INVALID_ARG_TYPE' });
  }
  const root = fs.realpathSync(skillDir);
  const target = path.resolve(root, relativePath);
  if (!isWithin(root, target)) throw accessDenied();

  // Resolve existing components too: project-owned symlinks can redirect an
  // otherwise-contained path, including a missing suffix below a dangling link.
  const resolvedTarget = resolveExistingPath(target);
  if (!isWithin(root, resolvedTarget)) throw accessDenied();
  return target;
};
