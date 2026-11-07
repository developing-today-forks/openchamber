/**
 * What is new or changed in agent memory since the user last looked.
 *
 * Derived from the entry's own timestamps against a per-scope "last viewed"
 * mark, so the store carries no review state and the user is never asked to
 * confirm anything. Looking at the tab is the acknowledgement.
 *
 * The two badges are worth separating: a memory the agent has just invented
 * and one it has quietly rewritten need different attention, and lumping them
 * together as "new" would hide every correction.
 */
import type { AgentMemoryEntry, AgentMemoryScope } from './agentMemoryApi';
export type MemoryBadge = 'new' | 'changed' | null;
/**
 * The key a scope's mark is stored under. Project marks are keyed by path
 * because each project has its own store — one shared mark would let opening
 * one project silently clear another's badges.
 */
export declare const memoryViewKey: (scope: AgentMemoryScope, projectPath: string | null) => string;
/**
 * `viewedAt` of 0 means the user has never opened this scope. Everything stored
 * is then genuinely new to them, which is what a first look should show.
 */
export declare const classifyMemory: (entry: AgentMemoryEntry, viewedAt: number) => MemoryBadge;
export declare const countHighlightedMemories: (entries: AgentMemoryEntry[], viewedAt: number) => number;
