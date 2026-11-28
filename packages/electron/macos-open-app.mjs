// Gate for renderer-supplied macOS "open with app" names (#2729).
//
// The desktop_open_path IPC handler takes an `app` string straight from
// the renderer and used to hand it to `open -a` verbatim. `open -a`
// accepts a bundle *path* as well as a registered name, so a compromised
// renderer could launch an arbitrary planted bundle (e.g.
// `open -a /tmp/Evil.app <file>`) while the UI believed it was doing
// "open this file in the selected app". The Windows sibling of this
// surface is #2719; this module is the macOS gate.
//
// A name may reach `open -a` only after it resolves to an installed
// bundle through resolveAppBundlePath in main.mjs, and only names that
// pass isSafeMacosAppName may be probed at all: a name carrying a path
// separator, a `..` fragment, or a NUL can never be a plain app name,
// and letting one through would let the bundle-path join in
// macosAppBundleCandidates escape the Applications directories it is
// meant to stay inside (e.g. '../../tmp/Evil' + '.app' normalizes to
// /tmp/Evil.app). Unknown or uninstalled names fail closed: the caller
// falls back to a default open of the target path with no `-a` spawn.

import path from 'node:path';

// True only for plain app names: non-empty after trimming, with no path
// separator ('/' or '\\'), no '..' fragment, and no NUL byte. Absolute
// paths are covered by the separator rule (POSIX) and the backslash
// rule (Windows-style), and a bare '..' is covered by the fragment rule.
export const isSafeMacosAppName = (appName) => {
  if (typeof appName !== 'string') return false;
  const name = appName.trim();
  if (!name) return false;
  if (name.includes('/') || name.includes('\\')) return false;
  if (name.includes('..')) return false;
  if (name.includes('\0')) return false;
  return true;
};

// The on-disk bundle file name for a safe app name ('Safari' ->
// 'Safari.app'); names already carrying the suffix are left alone.
// Callers must check isSafeMacosAppName first.
export const macosAppBundleName = (appName) =>
  appName.trim().endsWith('.app') ? appName.trim() : `${appName.trim()}.app`;

// The fixed set of bundle locations probed for a safe app name, in
// priority order. Unsafe names yield no candidates, so a traversal
// attempt can never turn into a probe outside these directories.
export const macosAppBundleCandidates = (appName, homeDir) => {
  if (!isSafeMacosAppName(appName)) return [];
  const bundleName = macosAppBundleName(appName);
  return [
    `/Applications/${bundleName}`,
    `/System/Applications/${bundleName}`,
    `/System/Applications/Utilities/${bundleName}`,
    path.join(homeDir, 'Applications', bundleName),
  ];
};

// Decide the argv for the macOS `open` spawn in desktop_open_path.
// Only a name that resolved to an installed bundle path earns the
// `-a <bundle>` form — and it is the resolved bundle path, never the
// raw renderer string, that is spawned. Anything else (no app asked
// for, an unsafe name, or a name that is not installed) fails closed
// to a default open of the already-validated target path.
export const planMacosOpenArgs = ({ appName, targetPath, bundlePath }) => {
  if (appName && bundlePath) return ['-a', bundlePath, targetPath];
  return [targetPath];
};

// Gate a macOS "open in app" spec chain (desktop_open_in_app /
// desktop_open_file_in_app, #2731) built from a renderer-supplied
// appName. The builders put the raw name after `-a`/`-na` in `open`
// specs; those specs may run only with the resolved bundle path in
// that slot, never the raw string — `open -a` accepts a bundle path,
// so the raw value is the planted-bundle primitive from #2729. When
// the name resolved to no bundle (unsafe or uninstalled), the `-a`
// specs drop out of the chain; CLI and Finder specs pass through
// untouched. If gating empties the chain, it fails closed to a
// default open of the already-validated target path, matching
// planMacosOpenArgs.
export const planMacosOpenInAppSpecs = ({ specs, appName, bundlePath, targetPath }) => {
  const gated = [];
  for (const spec of specs ?? []) {
    const flagIndex =
      spec?.program === 'open' && Array.isArray(spec.args)
        ? spec.args.findIndex((arg) => arg === '-a' || arg === '-na')
        : -1;
    if (flagIndex === -1 || spec.args[flagIndex + 1] !== appName) {
      gated.push(spec);
      continue;
    }
    if (!bundlePath) continue;
    const args = [...spec.args];
    args[flagIndex + 1] = bundlePath;
    gated.push({ ...spec, args });
  }
  return gated.length > 0 ? gated : [{ program: 'open', args: [targetPath] }];
};
