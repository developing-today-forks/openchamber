# no-replace-rename native addon

Atomic no-replace directory rename for issue #2573. Node's `fs.rename`
cannot rename a directory without replacing an existing empty destination
directory, and Node exposes none of the OS exclusive-rename flags, so this
module builds a one-function N-API addon (`renameDirectoryNoReplace`) with
the system C compiler. No node-gyp and no toolchain beyond `cc`/`cl`: the
addon is one C file using only the stable N-API ABI, so the same source
builds on Linux, macOS, and Windows and loads in both Node and Electron
with no rebuild.

## Platform primitives

- Linux: `renameat2(2)` with `RENAME_NOREPLACE` via a raw syscall, so it
  builds against old libc headers; needs kernel >= 3.15 at runtime.
- macOS: `renamex_np(2)` with `RENAME_EXCL` (macOS >= 10.12 SDK).
- Windows: `MoveFileWithProgressW` without `MOVEFILE_REPLACE_EXISTING`;
  `MOVEFILE_COPY_ALLOWED` keeps cross-volume directory moves working the
  way `fs.rename` allows them.

Errors surface as JS `Error`s whose `code` is the errno-style name
(`EEXIST` when the destination already exists, `ENOENT` when the source is
missing, `ENOSYS` when the platform or filesystem cannot provide the
exclusive operation). Callers fail closed on `ENOSYS`: never fall back to
check-then-rename, which reopens the race this helper exists to close.

## Build script (`build.mjs`)

Command line (strict: unknown or malformed arguments are a usage error):

```text
node build.mjs [--strict] [--outdir <dir>] [--headers-dir <dir>] [--compiler <bin>] [--help]
```

- `--strict`: exit non-zero when the build cannot complete (CI and
  packaging; the default warns and exits 0 so `bun run test` still works
  where no compiler is installed).
- `--outdir`: prebuilds root (default: `./prebuilds` next to the script).
- `--headers-dir`: Node headers directory containing `node_api.h`
  (default: `$NODE_HEADERS_DIR`, then a cached nodejs.org download).
- `--compiler`: C compiler binary (default: `$CC`, then `cc`/`cl` by
  platform).

Details:

- Headers: N-API headers ship with every Node; when they are not installed
  locally the script downloads the versioned headers tarball from
  nodejs.org into `$OPENCHAMBER_HEADERS_CACHE` (or `~/.cache`) and reuses it.
- The build is skipped when the existing prebuild is newer than the C source.
- On Windows `cl.exe` ships with Visual Studio but is not on `PATH` by
  default. CI sets up the compiler environment with `ilammy/msvc-dev-cmd`;
  for local builds without that environment the script locates a host-native
  `cl.exe` via `vswhere.exe`, and when none is found the build fails closed
  (warning, or non-zero under `--strict`).
- The Windows link also needs Node's import library: N-API symbols resolve
  from the host process at load time on POSIX, but on Windows they live in
  `node.exe`, so `cl` must link `node.lib`. It is not part of the headers
  tarball; the script downloads it as the standalone `win-<arch>/node.lib`
  dist file from nodejs.org and caches it beside the headers. A build that
  can neither find nor download it fails closed rather than producing an
  unresolved addon.

## Loader (`server/lib/shared/no-replace-dir.ts`)

One prebuild per platform/arch loads in both Node and Electron with no
rebuild. Resolution order: `$OPENCHAMBER_NOREPLACE_PREBUILDS` (when set, it
replaces the built-in roots entirely so tests and packagers pin one
prebuild location), otherwise the source/build prebuilds directory, then
the Electron packaged-app resources directory. A missing binary or load
error throws an `ENOSYS`-coded error; callers surface it, never falling
back to check-then-rename.
