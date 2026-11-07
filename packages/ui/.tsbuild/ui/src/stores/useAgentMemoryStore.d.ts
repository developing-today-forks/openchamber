/**
 * Agent memory, as the panel and the send path see it.
 *
 * The server owns the store; this holds the last snapshot read from it and
 * serializes writes so two quick edits cannot land out of order.
 *
 * A failed load never blanks what is already held. An empty list would read as
 * "the agent has forgotten everything", which is the one wrong answer here: the
 * user would go looking for lost memory that is sitting safely on disk.
 */
import { type AgentMemoryEntry, type AgentMemoryScope } from '@/lib/agentMemoryApi';
interface AgentMemoryState {
    global: AgentMemoryEntry[];
    project: AgentMemoryEntry[];
    /** The project path the held `project` entries belong to. */
    projectPath: string | null;
    loading: boolean;
    loaded: boolean;
    /** When the held entries were last read successfully. */
    loadedAt: number | null;
    /** True once the server has reported the feature switched off. */
    disabled: boolean;
    globalFailed: boolean;
    projectFailed: boolean;
    error: string | null;
    /**
     * `maxAgeMs` skips the read when the same project's entries were loaded
     * more recently than that; omit it for an unconditional re-read.
     */
    load: (projectPath: string | null, options?: {
        maxAgeMs?: number;
    }) => Promise<void>;
    /** Re-read the store the last load used. */
    refresh: () => Promise<void>;
    saveEntry: (scope: AgentMemoryScope, memoryId: string, patch: {
        title?: string;
        body?: string;
    }) => Promise<boolean>;
    /**
     * `projectPath` pins a project-scope delete to the project it was asked in;
     * it defaults to the loaded one. A delete that lands after the panel moved
     * to another project must not go to that project or touch its list.
     */
    deleteEntry: (scope: AgentMemoryScope, memoryId: string, projectPath?: string | null) => Promise<boolean>;
    reset: () => void;
}
/** Never expose one owner's project entries under another owner's heading. */
export declare const selectProjectMemoryForPath: (state: AgentMemoryState, projectPath: string | null) => AgentMemoryEntry[];
export declare const useAgentMemoryStore: import("zustand").UseBoundStore<import("zustand").StoreApi<AgentMemoryState>>;
export {};
