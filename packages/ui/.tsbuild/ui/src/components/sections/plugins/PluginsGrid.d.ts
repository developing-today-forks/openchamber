import React from 'react';
export type PluginDeleteTarget = {
    kind: 'entry' | 'file';
    id: string;
    label: string;
};
/** Browse view of the Plugins page: config entries and plugin files as cards. */
export declare const PluginsGrid: React.FC<{
    onAdd: () => void;
    onDelete: (target: PluginDeleteTarget) => void;
}>;
