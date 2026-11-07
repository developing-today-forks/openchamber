/**
 * Maps a plugin row in Settings to what OpenCode reports for it.
 *
 * The rules mirror OpenCode 2.x (`core/src/config/plugin/source.ts`,
 * `plugin/module.ts`, `plugin/supervisor.ts`):
 *
 * - A config string that is `file://…`, starts with `./` or `../`, or is
 *   absolute is a local path; relative ones resolve against the directory of
 *   the config file that declares them. Everything else (including `~/…`) is
 *   a package target, kept verbatim: `foo` and `foo@latest` are different
 *   targets and no `@latest` is implied.
 * - A package plugin reports `source.target` equal to that string.
 * - A local plugin that loaded reports its entrypoint file, which sits inside
 *   the configured directory (or is the file itself for a standalone plugin
 *   file); one that failed to load reports the configured path.
 */
import type { PluginRuntimeInfo } from '@/lib/opencode/plugins';
export type PluginRuntimeTarget = {
    kind: 'package';
    target: string;
} | {
    kind: 'local';
    path: string;
};
export type PluginLoadState = 
/** OpenCode reported it and it is running. */
{
    kind: 'active';
    version: string | null;
}
/** OpenCode reported it and could not load it (or disabled it later). */
 | {
    kind: 'failed';
    error: string;
    ref: string | null;
}
/** A complete inventory arrived without it: still installing, disabled by a `-name` entry, or skipped. */
 | {
    kind: 'notReported';
};
export type PluginUpdateFlag = 'none' | 'available' | 'updating';
/**
 * What OpenCode will report for a config entry. `sourcePath` is the config
 * file that declares it; without it a relative path cannot be resolved and
 * the entry has no runtime identity.
 */
export declare function configEntryRuntimeTarget(spec: string, sourcePath: string | undefined): PluginRuntimeTarget | null;
/** A plugin file or package directory OpenCode discovers from a `plugins/` folder. */
export declare function pluginFileRuntimeTarget(absolutePath: string | undefined): PluginRuntimeTarget | null;
export declare function findRuntimeMatches(target: PluginRuntimeTarget, inventory: readonly PluginRuntimeInfo[]): PluginRuntimeInfo[];
/**
 * A failure wins over an active match: when a new revision fails OpenCode
 * keeps the previous one running and reports both, and the failure is what
 * the user needs to see.
 */
export declare function resolveLoadState(matched: readonly PluginRuntimeInfo[]): PluginLoadState;
export declare function resolveUpdateFlag(matched: readonly PluginRuntimeInfo[]): PluginUpdateFlag;
