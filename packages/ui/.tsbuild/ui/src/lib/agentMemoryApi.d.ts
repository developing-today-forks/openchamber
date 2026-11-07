/**
 * Client for the OpenChamber agent memory routes.
 *
 * The store is owned by the server (`packages/web/server/lib/agent-memory`).
 * This module only speaks HTTP and resolves no storage paths.
 *
 * Every function throws on failure. An authoritative read must never resolve to
 * an empty list a caller could mistake for "the agent remembers nothing" — that
 * reading is exactly what would make the user think memory had been lost.
 *
 * A 404 is the one exception, and it means the feature is switched off rather
 * than that the entry is missing: the server disables the whole surface, so
 * callers translate it into `disabled` instead of an error.
 */
export type AgentMemoryType = 'fact' | 'preference' | 'reference';
export type AgentMemoryScope = 'global' | 'project';
export interface AgentMemoryEntry {
    id: string;
    title: string;
    body: string;
    type: AgentMemoryType;
    createdAt: number;
    updatedAt: number;
    /**
     * Reads as an instruction to the model rather than a fact. Kept in the store
     * and shown here, but withheld from what sessions are told.
     */
    flagged?: boolean;
    /** The session this was learned in, when the agent recorded one. */
    sessionId?: string;
}
interface AgentMemorySnapshot {
    global: AgentMemoryEntry[];
    project: AgentMemoryEntry[];
    /**
     * A scope that failed to load. Kept separate from an empty list so the panel
     * can say "could not load" rather than showing an empty tab that reads as
     * "the agent has forgotten everything".
     */
    globalFailed: boolean;
    projectFailed: boolean;
}
/** Mirrors the server's clamps, so the editor stops where storage would cut. */
export declare const AGENT_MEMORY_TITLE_MAX_LENGTH = 120;
export declare const AGENT_MEMORY_BODY_MAX_LENGTH = 2000;
/** Raised when the server reports the whole memory surface as switched off. */
export declare class AgentMemoryDisabledError extends Error {
    constructor();
}
/**
 * Both scopes in one request. Two requests would let one scope render while the
 * other is still in flight, which reads as memory that has gone missing.
 */
export declare const fetchAgentMemory: (projectPath: string | null, options?: {
    signal?: AbortSignal;
}) => Promise<AgentMemorySnapshot>;
/** A user correction from the panel; the agent rewrites by saving again. */
export declare const updateAgentMemory: (scope: AgentMemoryScope, projectPath: string | null, memoryId: string, patch: {
    title?: string;
    body?: string;
    type?: AgentMemoryType;
}) => Promise<AgentMemoryEntry>;
export declare const deleteAgentMemory: (scope: AgentMemoryScope, projectPath: string | null, memoryId: string) => Promise<void>;
export {};
