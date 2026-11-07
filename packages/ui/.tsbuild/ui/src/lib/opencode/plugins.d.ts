/**
 * OpenCode's experimental plugin routes (`plugin.list`, `plugin.check`,
 * `plugin.update`), translated into the shape Settings → Plugins reads.
 *
 * Every call is scoped to a directory's Location: OpenCode activates plugins
 * per Location, so the same config entry can be loaded in one project and
 * failed or absent in another. All three throw on failure; a failed read is
 * never an empty inventory.
 */
export type PluginRuntimeSource = 
/** `target` is the config string verbatim (no implicit `@latest`). */
{
    kind: "package";
    target: string;
    version: string | null;
    outdated: boolean;
    updating: boolean;
}
/** A loaded plugin reports its entrypoint file; one that failed to load reports the configured path. */
 | {
    kind: "local";
    path: string;
} | {
    kind: "builtin";
};
export type PluginRuntimeState = {
    kind: "active";
} | {
    kind: "failed";
    error: string;
    ref: string | null;
};
export interface PluginRuntimeInfo {
    source: PluginRuntimeSource;
    state: PluginRuntimeState;
}
/** Every plugin OpenCode activated (or failed to) for the directory's Location. */
export declare function listPluginRuntime(directory: string | null): Promise<PluginRuntimeInfo[]>;
/**
 * Re-checks every package plugin against its registry or Git remote and
 * returns the refreshed inventory. OpenCode only marks mutable specs (bare
 * names, ranges, tags, Git branches) outdated; an exact version never is. A
 * target whose own check fails keeps its previous flag instead of failing
 * the request, so one unreachable package cannot hide the others.
 */
export declare function checkPluginUpdates(directory: string | null): Promise<PluginRuntimeInfo[]>;
/**
 * Reinstalls one package plugin at the newest release its spec allows and
 * reloads it. Config is not written. One target per request: the route fails
 * as a whole when any target fails, so batching would blur whose failure it was.
 */
export declare function updatePluginPackage(directory: string | null, target: string): Promise<void>;
