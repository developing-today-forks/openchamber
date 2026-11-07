import type { StoreApi, UseBoundStore } from "zustand";
import type { Agent } from "@/lib/opencode/model";
import { type ConfigChangeScope } from "@/lib/configSync";
import { z } from "zod";
export declare const getConfigDirectory: () => string | null;
export declare const invalidateAgentsLoadCache: (directory?: string | null) => void;
export type AgentScope = 'user' | 'project';
/** Effect of a permission rule in OpenCode 2. */
export type PermissionEffect = 'allow' | 'ask' | 'deny';
/**
 * One entry of an agent's ordered `permissions` array. Evaluation is
 * last-match-wins, so the order of the array is meaningful and the editor
 * never sorts it.
 */
export interface PermissionRule {
    action: string;
    resource: string;
    effect: PermissionEffect;
}
/**
 * The agent entity as OpenChamber persists it, i.e. the OpenCode 2 shape the
 * config routes read and write. `model` is the joined `provider/model#variant`
 * string; sampling parameters live under `request.body`.
 */
/**
 * The sampling parameters OpenChamber edits. OpenCode 2 keeps them under
 * `request.body`; any other key a user put there is preserved on write.
 */
export interface AgentRequestBody {
    temperature?: number;
    top_p?: number;
}
export interface AgentRequest {
    headers?: Record<string, string>;
    body?: AgentRequestBody;
}
export interface AgentEntity {
    description?: string | null;
    model?: string | null;
    system?: string | null;
    mode?: "primary" | "subagent" | "all";
    hidden?: boolean;
    color?: string | null;
    steps?: number | null;
    /** null removes the key, which turns a disabled agent back on. */
    disabled?: boolean | null;
    request?: AgentRequest | null;
    permissions?: PermissionRule[] | null;
}
export interface AgentConfig extends AgentEntity {
    name: string;
    scope?: AgentScope;
}
/** What `GET /api/config/agents/:name/config` answers. */
export interface AgentEntityEnvelope {
    source: 'md' | 'json' | 'none';
    scope: AgentScope | null;
    path: string | null;
    legacy: boolean;
    config: AgentEntity;
}
/** What `GET /api/config/agents/:name/permissions` answers. */
interface AgentPermissionsEnvelope {
    global: PermissionRule[];
    agent: PermissionRule[];
    effective: Array<PermissionRule & {
        source: 'global' | 'agent';
    }>;
    source: 'md' | 'json' | 'none';
    path: string | null;
}
/**
 * Result of an agent config mutation.
 * `requiresManualRestart` is true when the change was persisted to disk but the
 * connected (external) OpenCode server could not be reloaded by OpenChamber, so
 * the user must restart that server before the change takes effect.
 */
export interface AgentMutationResult {
    ok: boolean;
    requiresManualRestart?: boolean;
}
/**
 * An agent plus the facts that live in its config file rather than in v2's
 * `AgentInfo`: where it is defined, and the authoring fields OpenChamber writes.
 */
export type AgentWithExtras = Agent & {
    native?: boolean;
    options?: {
        hidden?: boolean;
    };
    scope?: AgentScope;
    /** Subfolder name parsed from file path, e.g. "business", "development" */
    group?: string;
    /** The file OpenChamber would rewrite on the next save. */
    path?: string | null;
    /** The file still uses v1 spellings; the next save rewrites it in v2. */
    legacy?: boolean;
};
export declare const isAgentBuiltIn: (agent: Agent) => boolean;
export declare const isAgentHidden: (agent: Agent) => boolean;
export declare const filterVisibleAgents: (agents: Agent[]) => Agent[];
export declare const isAgentManageable: (agent: Agent) => boolean;
interface AgentDraft {
    name: string;
    scope: AgentScope;
    description?: string;
    /** Joined `provider/model#variant`. */
    model?: string | null;
    system?: string;
    steps?: number | null;
    temperature?: number | null;
    top_p?: number | null;
    mode?: "primary" | "subagent" | "all";
    permissions?: PermissionRule[];
    hidden?: boolean;
}
interface AgentsStore {
    selectedAgentName: string | null;
    /** Agents of the project the app is on. Chat and pickers read this one. */
    agents: Agent[];
    /** Every directory loaded so far, including the ambient one. */
    agentsByDirectory: Record<string, Agent[]>;
    isLoading: boolean;
    agentDraft: AgentDraft | null;
    setSelectedAgent: (name: string | null) => void;
    setAgentDraft: (draft: AgentDraft | null) => void;
    loadAgents: (directory?: string | null) => Promise<boolean>;
    resetForRuntimeSwitch: () => void;
    /** The agent's own config entry, as stored — never the resolved `AgentInfo`. */
    fetchAgentEntity: (name: string, directory?: string | null) => Promise<AgentEntityEnvelope | null>;
    /** Global + agent + effective permission rules for one agent. */
    fetchAgentPermissions: (name: string, directory?: string | null) => Promise<AgentPermissionsEnvelope | null>;
    createAgent: (config: AgentConfig, directory?: string | null) => Promise<AgentMutationResult>;
    updateAgent: (name: string, config: Partial<AgentConfig>, directory?: string | null) => Promise<AgentMutationResult>;
    deleteAgent: (name: string, scope?: AgentScope, directory?: string | null) => Promise<AgentMutationResult>;
    getAgentByName: (name: string, directory?: string | null) => Agent | undefined;
    /** Agents switched off with `disabled: true`, per directory. OpenCode leaves them out of its list. */
    disabledAgentsByDirectory: Record<string, DisabledAgent[]>;
    /** Re-read the disabled agents; a failed read keeps the previous list. */
    loadDisabledAgents: (directory?: string | null) => Promise<boolean>;
    getVisibleAgents: (directory?: string | null) => Agent[];
}
declare global {
    interface Window {
        __zustand_agents_store__?: UseBoundStore<StoreApi<AgentsStore>>;
    }
}
declare const DisabledAgentsResponseSchema: z.ZodObject<{
    agents: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        scope: z.ZodNullable<z.ZodEnum<{
            project: "project";
            user: "user";
        }>>;
        path: z.ZodNullable<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
}, z.core.$strip>;
type DisabledAgent = z.infer<typeof DisabledAgentsResponseSchema>['agents'][number];
/** Disabled agents of one project; an omitted directory means the project the app is on. */
export declare const selectDisabledAgentsForDirectory: (state: Pick<AgentsStore, 'disabledAgentsByDirectory'>, directory?: string | null) => DisabledAgent[];
/**
 * Agents of one project. Returns a stored array so components can select it
 * directly; an omitted directory means the project the app is on.
 */
export declare const selectAgentsForDirectory: (state: Pick<AgentsStore, 'agentsByDirectory'>, directory?: string | null) => Agent[];
export declare const useAgentsStore: UseBoundStore<Omit<Omit<StoreApi<AgentsStore>, "devtools" | "setState"> & {
    setState(partial: AgentsStore | Partial<AgentsStore> | ((state: AgentsStore) => AgentsStore | Partial<AgentsStore>), replace?: false | undefined, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): void;
    setState(state: AgentsStore | ((state: AgentsStore) => AgentsStore), replace: true, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): void;
    devtools: {
        cleanup: () => void;
    };
}, "persist" | "setState"> & {
    setState(partial: AgentsStore | Partial<AgentsStore> | ((state: AgentsStore) => AgentsStore | Partial<AgentsStore>), replace?: false | undefined, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): unknown;
    setState(state: AgentsStore | ((state: AgentsStore) => AgentsStore), replace: true, action?: (string | {
        [x: string]: unknown;
        [x: number]: unknown;
        [x: symbol]: unknown;
        type: string;
    }) | undefined): unknown;
    persist: {
        setOptions: (options: Partial<import("zustand/middleware").PersistOptions<AgentsStore, unknown, unknown>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: AgentsStore) => void) => () => void;
        onFinishHydration: (fn: (state: AgentsStore) => void) => () => void;
        getOptions: () => Partial<import("zustand/middleware").PersistOptions<AgentsStore, unknown, unknown>>;
    };
}>;
type ConfigRefreshMode = "active" | "projects";
export declare function refreshAfterOpenCodeRestart(options?: {
    message?: string;
    delayMs?: number;
    scopes?: ConfigChangeScope[];
    mode?: ConfigRefreshMode;
}): Promise<void>;
export declare function reloadOpenCodeConfiguration(options?: {
    message?: string;
    delayMs?: number;
    scopes?: ConfigChangeScope[];
    mode?: ConfigRefreshMode;
}): Promise<void>;
export {};
