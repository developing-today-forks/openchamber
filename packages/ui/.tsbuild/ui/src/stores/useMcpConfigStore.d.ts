export type McpScope = 'user' | 'project';
type McpMutationResult = {
    ok: boolean;
    reloadFailed?: boolean;
    message?: string;
    warning?: string;
    requiresManualRestart?: boolean;
};
/**
 * OpenCode 2 splits an MCP server's timeouts by phase, all in milliseconds.
 * `startup` only applies to a local (spawned) server.
 */
interface McpTimeout {
    startup?: number;
    catalog?: number;
    execution?: number;
}
/** OAuth fields as OpenCode 2 spells them in config (snake_case). */
export interface McpOAuthConfig {
    client_id?: string;
    client_secret?: string;
    scope?: string;
    callback_port?: number;
    redirect_uri?: string;
    /** Added in OpenCode 2.0.8; points at the authorization server metadata document. */
    auth_server_metadata_url?: string;
}
/**
 * How OpenCode opens the MCP connection (2.0.8+). An absent key means
 * `legacy`, so the config file only ever carries the other two.
 */
export type McpProtocol = 'legacy' | 'auto' | '2026-07-28';
export declare const MCP_PROTOCOLS: readonly McpProtocol[];
/**
 * Code Mode as the form offers it. `default` is an absent key: OpenCode then
 * decides per server (on, except servers its own defaults exclude, such as
 * executor.sh). `on` and `off` write an explicit value that OpenCode keeps.
 */
export type McpCodemodeChoice = 'default' | 'on' | 'off';
export declare const MCP_CODEMODE_CHOICES: readonly McpCodemodeChoice[];
export declare const codemodeChoiceOf: (value: boolean | undefined) => McpCodemodeChoice;
interface McpConfigBase {
    environment?: Record<string, string>;
    /** v2 replaced the v1 `enabled` flag; absent means the server is active. */
    disabled?: boolean;
    /** Expose the server's tools through Code Mode instead of one tool each. */
    codemode?: boolean;
    timeout?: McpTimeout;
    protocol?: McpProtocol;
}
interface McpLocalConfig extends McpConfigBase {
    type: 'local';
    command: string[];
    cwd?: string;
}
interface McpRemoteConfig extends McpConfigBase {
    type: 'remote';
    url: string;
    headers?: Record<string, string>;
    oauth?: McpOAuthConfig | false;
}
type McpServerConfig = (McpLocalConfig | McpRemoteConfig) & {
    name: string;
};
type McpServerWithScope = McpServerConfig & {
    scope?: McpScope | null;
    /** The config file the entry lives in. */
    path?: string | null;
    /** The entry still uses v1 spellings; the next save rewrites it in v2. */
    legacy?: boolean;
};
export interface McpDraft {
    name: string;
    scope: McpScope;
    type: 'local' | 'remote';
    command: string[];
    url: string;
    environment: Array<{
        key: string;
        value: string;
    }>;
    headers: Array<{
        key: string;
        value: string;
    }>;
    oauthEnabled: boolean;
    oauthClientId: string;
    oauthClientSecret: string;
    oauthScope: string;
    oauthRedirectUri: string;
    oauthCallbackPort: string;
    oauthAuthServerMetadataUrl: string;
    protocol: McpProtocol;
    timeoutStartup: string;
    timeoutCatalog: string;
    timeoutExecution: string;
    codemode: McpCodemodeChoice;
    disabled: boolean;
}
export declare const envRecordToArray: (env?: Record<string, string>) => Array<{
    key: string;
    value: string;
}>;
interface McpConfigStore {
    /** Servers of the project the app is on. Chat and mobile read this one. */
    mcpServers: McpServerWithScope[];
    /** Every directory loaded so far, including the ambient one. */
    serversByDirectory: Record<string, McpServerWithScope[]>;
    selectedMcpName: string | null;
    isLoading: boolean;
    mcpDraft: McpDraft | null;
    setSelectedMcp: (name: string | null) => void;
    setMcpDraft: (draft: McpDraft | null) => void;
    loadMcpConfigs: (options?: {
        force?: boolean;
        directory?: string | null;
    }) => Promise<boolean>;
    createMcp: (config: McpDraft, directory?: string | null) => Promise<McpMutationResult>;
    updateMcp: (name: string, config: Partial<McpDraft>, directory?: string | null) => Promise<McpMutationResult>;
    deleteMcp: (name: string, directory?: string | null) => Promise<McpMutationResult>;
    getMcpByName: (name: string, directory?: string | null) => McpServerWithScope | undefined;
    getMcpServersForDirectory: (directory?: string | null) => McpServerWithScope[];
}
/**
 * Servers of one project. Returns a stored array so components can select it
 * directly; an omitted directory means the project the app is on.
 */
export declare const selectMcpServersForDirectory: (state: Pick<McpConfigStore, 'serversByDirectory'>, directory?: string | null) => McpServerWithScope[];
export declare const useMcpConfigStore: import("zustand").UseBoundStore<Omit<Omit<import("zustand").StoreApi<McpConfigStore>, "devtools" | "setState"> & {
    setState(partial: McpConfigStore | Partial<McpConfigStore> | ((state: McpConfigStore) => McpConfigStore | Partial<McpConfigStore>), replace?: false | undefined, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): void;
    setState(state: McpConfigStore | ((state: McpConfigStore) => McpConfigStore), replace: true, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): void;
    devtools: {
        cleanup: () => void;
    };
}, "persist" | "setState"> & {
    setState(partial: McpConfigStore | Partial<McpConfigStore> | ((state: McpConfigStore) => McpConfigStore | Partial<McpConfigStore>), replace?: false | undefined, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): unknown;
    setState(state: McpConfigStore | ((state: McpConfigStore) => McpConfigStore), replace: true, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): unknown;
    persist: {
        setOptions: (options: Partial<import("zustand/middleware").PersistOptions<McpConfigStore, unknown, unknown>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: McpConfigStore) => void) => () => void;
        onFinishHydration: (fn: (state: McpConfigStore) => void) => () => void;
        getOptions: () => Partial<import("zustand/middleware").PersistOptions<McpConfigStore, unknown, unknown>>;
    };
}>;
export {};
