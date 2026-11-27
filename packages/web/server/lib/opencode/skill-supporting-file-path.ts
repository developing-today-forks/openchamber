import fs from 'fs';
import path from 'path';

import { isString } from '../shared/object-guards.js';

const isMissingPathError = (error: NodeJS.ErrnoException): boolean => (
  error.code === 'ENOENT' || error.code === 'ENOTDIR'
);

// Canonicalize the way the kernel will: the JS realpath implementation
// normalizes symlink text lexically, so a link whose target climbs with `..`
// past another symlink is judged by the wrong directory. The native binding
// follows filesystem semantics, matching the open() that happens later.
const realpathSync: typeof fs.realpathSync.native = fs.realpathSync.native ?? fs.realpathSync;

const MAX_SYMLINK_EXPANSIONS = 40;

const isWithin = (root: string, target: string): boolean => {
  const relative = path.relative(root, target);
  if (relative === '' || path.isAbsolute(relative)) return relative === '';
  return relative.split(path.sep)[0] !== '..';
};

const resolveExistingPath = (target: string): string => {
  let probe = target;
  const suffix: string[] = [];
  const seenProbes = new Set<string>();
  let expansions = 0;

  while (true) {
    try {
      return path.resolve(realpathSync(probe), ...suffix);
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
        expansions += 1;
        // A dangling link can expand back to itself (e.g. a link to
        // `missing/../loop`): without a bound this walk never terminates.
        if (expansions > MAX_SYMLINK_EXPANSIONS || seenProbes.has(probe)) {
          throw Object.assign(new Error('Too many levels of symbolic links'), { code: 'ELOOP' });
        }
        seenProbes.add(probe);
        // Keep the link text un-normalized: `..` in a link target applies to
        // the directory the link chain reaches, not to the link's parent, so
        // resolving it lexically here would misjudge where the path lands.
        // The next iteration's native realpath applies kernel semantics.
        const linkText = fs.readlinkSync(probe);
        probe = path.isAbsolute(linkText) ? linkText : `${path.dirname(probe)}${path.sep}${linkText}`;
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
  const root = realpathSync(skillDir);
  const target = path.resolve(root, relativePath);
  if (!isWithin(root, target)) throw accessDenied();

  // Resolve existing components too: project-owned symlinks can redirect an
  // otherwise-contained path, including a missing suffix below a dangling link.
  const resolvedTarget = resolveExistingPath(target);
  if (!isWithin(root, resolvedTarget)) throw accessDenied();
  return target;
};
