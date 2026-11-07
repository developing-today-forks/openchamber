import React from 'react';
import type { PluginRuntimeTarget } from './pluginLoadState';
interface PluginStatusBannerProps {
    target: PluginRuntimeTarget | null;
    /** How the plugin is named in toasts. */
    name: string;
}
/** What OpenCode reports for the selected plugin, plus the update OpenCode can install for it. */
export declare const PluginStatusBanner: React.FC<PluginStatusBannerProps>;
export {};
