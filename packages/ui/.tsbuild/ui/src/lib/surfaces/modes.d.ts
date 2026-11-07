declare const BUILT_IN_CONTEXT_PANEL_MODES: readonly ['diff', 'walkthrough', 'file', 'context', 'chat', 'browser', 'git', 'pr', 'notes', 'messages', 'terminal'];
type BuiltInContextPanelMode = (typeof BUILT_IN_CONTEXT_PANEL_MODES)[number];
export type PluginContextPanelMode = `plugin:${string}`;
export type ContextPanelMode = BuiltInContextPanelMode | PluginContextPanelMode;
export declare const isPluginContextPanelMode: (mode: string) => mode is PluginContextPanelMode;
export declare const isContextPanelMode: (mode: string) => mode is ContextPanelMode;
export declare const pluginIdFromMode: (mode: PluginContextPanelMode) => string;
export declare const pluginModeFromId: (id: string) => PluginContextPanelMode;
export {};
