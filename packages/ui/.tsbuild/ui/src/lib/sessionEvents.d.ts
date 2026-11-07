import type { Session } from '@/lib/opencode/model';
import { type Part } from '@/lib/opencode/model';
import type { WorktreeMetadata } from '@/types/worktree';
type SessionDeleteRequest = {
    sessions: Session[];
    dateLabel?: string;
    mode?: 'session' | 'worktree';
    worktree?: WorktreeMetadata | null;
    skipDialogIfSafe?: boolean;
};
type SessionCreateRequest = {
    worktreeMode?: 'main' | 'create' | 'reuse';
    parentID?: string | null;
    projectId?: string | null;
};
type DeleteListener = (request: SessionDeleteRequest) => void;
type CreateListener = (request: SessionCreateRequest) => void;
type DirectoryListener = () => void;
type GitRefreshHint = {
    directory: string;
    paths?: string[];
};
type GitRefreshListener = (hint: GitRefreshHint) => void;
export declare const sessionEvents: {
    onDeleteRequest(listener: DeleteListener): () => void;
    requestDelete(payload: SessionDeleteRequest): void;
    onCreateRequest(listener: CreateListener): () => void;
    requestCreate(payload?: SessionCreateRequest): void;
    onDirectoryRequest(listener: DirectoryListener): () => void;
    requestDirectoryDialog(): void;
    onGitRefreshHint(listener: GitRefreshListener): () => void;
    requestGitRefresh(hint: GitRefreshHint): void;
    requestGitRefreshForToolTransition(directory: string, previousPart: Part | undefined, nextPart: Part): void;
    /** Drops tool refreshes still waiting out their window; they belong to the previous runtime. */
    cancelPendingGitRefreshes(): void;
};
export {};
