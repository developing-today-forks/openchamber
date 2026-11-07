import type { AgentMemoryScope } from '@/lib/agentMemoryApi';
import { type ProjectRef } from '@/lib/projectContextApi';
export declare const noteDeleteKey: (projectRef: ProjectRef, noteId: string) => string;
export declare const planDeleteKey: (projectRef: ProjectRef, planId: string) => string;
/** Memory ids are unique per store, and the global store is shared by every project. */
export declare const memoryDeleteKey: (scope: AgentMemoryScope, memoryId: string) => string;
/** Keys of entries hidden while their delete waits for the undo window. */
export declare const usePendingKnowledgeDeletes: () => ReadonlySet<string>;
export declare const scheduleKnowledgeDelete: ({ key, message, undoLabel, run, onFailure, undoWindowMs }: {
    /** From `noteDeleteKey`, `planDeleteKey` or `memoryDeleteKey`. */
    key: string;
    message: string;
    undoLabel: string;
    /** Sends the delete; resolves false when it failed. */
    run: () => Promise<boolean>;
    /** Called after a failed delete, once the entry is visible again. */
    onFailure: () => void;
    undoWindowMs?: number;
}) => void;
