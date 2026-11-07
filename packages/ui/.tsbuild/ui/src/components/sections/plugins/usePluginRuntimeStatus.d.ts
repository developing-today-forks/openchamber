import { type PluginPackageUpdate } from '@/stores/usePluginsStore';
import { type PluginLoadState, type PluginRuntimeTarget, type PluginUpdateFlag } from './pluginLoadState';
export type PluginRuntimeStatus = 
/** No answer for this directory yet. */
{
    kind: 'loading';
}
/** The read failed, or the row has no identity OpenCode could report. */
 | {
    kind: 'unknown';
} | {
    kind: 'known';
    load: PluginLoadState;
    update: PluginUpdateFlag;
    target: PluginRuntimeTarget;
};
export declare function usePluginRuntimeStatus(target: PluginRuntimeTarget | null): PluginRuntimeStatus;
/** The update this client started for a package target in the current directory, if any. */
export declare function usePluginPackageUpdate(target: PluginRuntimeTarget | null): PluginPackageUpdate | null;
