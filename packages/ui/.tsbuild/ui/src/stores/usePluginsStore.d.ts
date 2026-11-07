import { type PluginRuntimeInfo } from '@/lib/opencode/plugins';
export type PluginScope = 'user' | 'project';
/** Plugin options are JSON values from the config file: the value contract the server round-trips verbatim. */
type PluginOptionValue = string | number | boolean | null | PluginOptionValue[] | {
    [key: string]: PluginOptionValue;
};
export type PluginOptions = Record<string, PluginOptionValue>;
type PluginParsedKind = 'npm' | 'path';
export interface PluginEntry {
    id: string;
    spec: string;
    options?: PluginOptions;
    scope: PluginScope;
    kind: 'config';
    parsedKind: PluginParsedKind;
    /** The config file that declares the entry; relative path specs resolve against its directory. */
    sourcePath?: string;
}
export interface PluginFile {
    id: string;
    fileName: string;
    scope: PluginScope;
    /** `file` is a `.ts`/`.js` OpenChamber can open; `package` is a plugin directory (or a v1 `plugin/` file) OpenCode loads but the page only lists. */
    kind: 'file' | 'package';
    absolutePath?: string;
}
export interface PluginDraft {
    mode: 'entry' | 'file';
    scope: PluginScope;
    spec: string;
    optionsJson: string;
    fileName: string;
    content: string;
}
export type PluginMutationResult = {
    ok: boolean;
    reloadFailed?: boolean;
    message?: string;
    warning?: string;
    requiresManualRestart?: boolean;
    /** The server refused the spec: OpenCode cannot load it. Nothing was written. */
    invalidSpec?: boolean;
};
export type RegistryResult = {
    kind: 'npm-ok';
    spec: string;
    name: string;
    currentVersion: string | null;
    latestVersion: string | null;
    versions: string[];
    hasUpdate: boolean;
} | {
    kind: 'npm-missing-version';
    spec: string;
    name: string;
    currentVersion: string;
    latestVersion: string | null;
    versions: string[];
} | {
    kind: 'npm-missing-package';
    spec: string;
    name: string;
    error: string;
} | {
    kind: 'npm-malformed';
    spec: string;
    error: string;
} | {
    kind: 'npm-network';
    spec: string;
    error: string;
} | {
    kind: 'path-ok';
    spec: string;
    absolutePath: string;
} | {
    kind: 'path-missing';
    spec: string;
    absolutePath: string;
} | {
    kind: 'path-unreadable';
    spec: string;
    absolutePath: string;
};
/**
 * What OpenCode reported for the plugins of one directory and runtime
 * (`scope`, see `getPluginsScopeKey`). `failed` means the read failed: every
 * plugin's status is unknown, never "all fine" and never "all failed".
 */
type PluginRuntimeSnapshot = {
    kind: 'idle';
} | {
    kind: 'ready';
    scope: string;
    plugins: PluginRuntimeInfo[];
} | {
    kind: 'failed';
    scope: string;
};
/** An update this client started, keyed by `getPluginUpdateKey`. */
export type PluginPackageUpdate = {
    kind: 'running';
} | {
    kind: 'failed';
    error: string;
};
interface PluginsStore {
    entries: PluginEntry[];
    loadedDirectory: string | null | undefined;
    loadedRuntimeKey: string | undefined;
    files: PluginFile[];
    selectedId: string | null;
    isLoading: boolean;
    registryInfo: Record<string, RegistryResult>;
    isLoadingRegistry: boolean;
    draft: PluginDraft | null;
    runtime: PluginRuntimeSnapshot;
    isCheckingUpdates: boolean;
    packageUpdates: Record<string, PluginPackageUpdate>;
    setSelected: (id: string | null) => void;
    setDraft: (draft: PluginDraft | null) => void;
    loadPlugins: (options?: {
        force?: boolean;
    }) => Promise<boolean>;
    loadRegistryInfo: (opts?: {
        specs?: string[];
        force?: boolean;
    }) => Promise<boolean>;
    updateToLatest: (id: string) => Promise<PluginMutationResult>;
    loadRuntime: () => Promise<boolean>;
    checkUpdates: () => Promise<boolean>;
    updatePackage: (target: string) => Promise<boolean>;
    createEntry: (input: {
        spec: string;
        options?: PluginOptions;
        scope: PluginScope;
    }) => Promise<PluginMutationResult>;
    updateEntry: (id: string, input: {
        spec?: string;
        options?: PluginOptions;
    }) => Promise<PluginMutationResult>;
    deleteEntry: (id: string) => Promise<PluginMutationResult>;
    readFile: (id: string) => Promise<{
        fileName: string;
        scope: PluginScope;
        content: string;
    } | null>;
    createFile: (input: {
        fileName: string;
        content: string;
        scope: PluginScope;
    }) => Promise<PluginMutationResult>;
    updateFile: (id: string, input: {
        content: string;
    }) => Promise<PluginMutationResult>;
    deleteFile: (id: string) => Promise<PluginMutationResult>;
    getById: (id: string) => PluginEntry | PluginFile | undefined;
}
export declare const getPluginsConfigDirectory: () => string | null;
declare const getPluginCacheKey: (directory: string | null) => string;
/** Identifies the directory and runtime a runtime snapshot or update belongs to. */
export declare const getPluginsScopeKey: typeof getPluginCacheKey;
export declare const getPluginUpdateKey: (scope: string, target: string) => string;
export declare const usePluginsStore: import("zustand").UseBoundStore<Omit<Omit<import("zustand").StoreApi<PluginsStore>, "devtools" | "setState"> & {
    setState(partial: Partial<PluginsStore> | PluginsStore | ((state: PluginsStore) => Partial<PluginsStore> | PluginsStore), replace?: false | undefined, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): void;
    setState(state: PluginsStore | ((state: PluginsStore) => PluginsStore), replace: true, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): void;
    devtools: {
        cleanup: () => void;
    };
}, "persist" | "setState"> & {
    setState(partial: Partial<PluginsStore> | PluginsStore | ((state: PluginsStore) => Partial<PluginsStore> | PluginsStore), replace?: false | undefined, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): unknown;
    setState(state: PluginsStore | ((state: PluginsStore) => PluginsStore), replace: true, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): unknown;
    persist: {
        setOptions: (options: Partial<import("zustand/middleware").PersistOptions<PluginsStore, unknown, unknown>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: PluginsStore) => void) => () => void;
        onFinishHydration: (fn: (state: PluginsStore) => void) => () => void;
        getOptions: () => Partial<import("zustand/middleware").PersistOptions<PluginsStore, unknown, unknown>>;
    };
}>;
export {};
