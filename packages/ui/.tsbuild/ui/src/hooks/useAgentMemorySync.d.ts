/**
 * Keeps agent memory loaded for whatever project the session belongs to.
 *
 * This does not belong to the Memory tab. The session index is built from the
 * loaded snapshot, so leaving the load to the panel meant a user who never
 * opened Project notes sent every message with no memory index at all — the
 * agent had memories it was never told about.
 *
 * The session directory is resolved to its project first. A session in a
 * worktree has the worktree's path, and loading by that path reads a store the
 * agent does not write to, which is the same mismatch in the other direction.
 */
export declare const useAgentMemorySync: (directory: string | null) => void;
