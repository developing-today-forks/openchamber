export type SessionWorktreeAttachment = {
    worktreeRoot: string | null;
    cwd: string | null;
    branch: string | null;
    headState: 'branch' | 'detached' | 'unborn';
    worktreeStatus: 'pending' | 'ready' | 'missing' | 'invalid' | 'not-a-repo';
    worktreeSource: 'existing' | 'created-for-session' | null;
    legacy: boolean;
    degraded: boolean;
    attentionReason?: 'merge' | 'rebase' | 'cherry-pick' | 'revert' | 'bisect' | null;
};
export interface AttachedFile {
    id: string;
    file: File;
    dataUrl: string;
    mimeType: string;
    filename: string;
    size: number;
    source: "local" | "server" | "vscode";
    serverPath?: string;
    vscodePath?: string;
    vscodeSource?: 'file' | 'selection';
    /** Shared ID linking entries extracted from the same document (PPTX, DOCX, etc.).
     *  Removing any entry with this ID cascades to all entries in the group. */
    sourceDocumentId?: string;
}
export type EditPermissionMode = 'allow' | 'ask' | 'deny' | 'full';
export type MessageStreamPhase = 'streaming' | 'cooldown' | 'completed';
export interface SessionHistoryMeta {
    limit: number;
    complete: boolean;
    loading: boolean;
}
interface SessionContextLimits {
    contextLimit: number;
    outputLimit?: number;
    thresholdLimit: number;
    lastMessageId?: string;
}
export type SessionContextUsage = (SessionContextLimits & {
    state: 'measured';
    totalTokens: number;
    percentage: number;
    normalizedOutput?: number;
})
/** Compacted and no response has reported tokens since: the size is unknown, not zero. */
 | (SessionContextLimits & {
    state: 'compacted';
});
/** Background trim target — automatic, not user-facing. */
export declare const getBackgroundTrimLimit: () => number;
export declare const getMemoryLimits: () => {
    MAX_SESSIONS: 3;
    FETCH_BUFFER: 20;
    STREAMING_BUFFER: number;
    ZOMBIE_TIMEOUT: number;
    HISTORICAL_MESSAGES: number;
    VIEWPORT_MESSAGES: number;
    HISTORY_CHUNK: number;
};
export declare const MEMORY_LIMITS: {
    readonly MAX_SESSIONS: 3;
    readonly VIEWPORT_MESSAGES: number;
    readonly HISTORICAL_MESSAGES: 200;
    readonly FETCH_BUFFER: 20;
    readonly HISTORY_CHUNK: 200;
    readonly STREAMING_BUFFER: number;
    readonly ZOMBIE_TIMEOUT: number;
};
export {};
