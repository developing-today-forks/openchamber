import type { AgentMemoryEntry } from '@/lib/agentMemoryApi';
/**
 * The whole store, bodies included, for the tidy-up instructions. Handing the
 * agent every entry up front saves it a read call per entry.
 */
export declare const formatMemoryForTidy: (memory: {
    global: AgentMemoryEntry[];
    project: AgentMemoryEntry[];
}) => string;
type MemoryTidyOutcome = {
    ok: true;
    sessionId: string;
} | {
    ok: false;
    reason: 'no-model' | 'create-failed' | 'send-failed';
};
/**
 * Starts a session in the project that tidies the memory on its own, with the
 * default model and agent, and makes it the current session.
 */
export declare const startMemoryTidy: (input: {
    projectPath: string;
    title: string;
    memory: {
        global: AgentMemoryEntry[];
        project: AgentMemoryEntry[];
    };
}) => Promise<MemoryTidyOutcome>;
export {};
