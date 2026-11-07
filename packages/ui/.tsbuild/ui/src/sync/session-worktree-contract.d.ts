import type { WorktreeMetadata } from '@/types/worktree';
import type { SessionWorktreeAttachment } from '@/stores/types/sessionTypes';
type ResolveSessionWorktreeStateInput = {
    sessionDirectory: string | null;
    metadata: WorktreeMetadata | null;
    cwdExists?: boolean;
    runtimeResolution?: SessionWorktreeAttachment | null;
};
type WorktreeCanonicalizationResult = {
    worktreeRoot: string | null;
    cwd: string | null;
    branch: string | null;
    headState: 'branch' | 'detached' | 'unborn';
    worktreeStatus: 'pending' | 'ready' | 'missing' | 'invalid' | 'not-a-repo';
    legacy: boolean;
    degraded: boolean;
    attentionReason?: 'merge' | 'rebase' | 'cherry-pick' | 'revert' | 'bisect' | null;
};
type SessionWorktreeCanonicalizationOptions = {
    existingAttachment?: SessionWorktreeAttachment | null;
    fallbackDirectory?: string | null;
    worktreeSource?: SessionWorktreeAttachment['worktreeSource'];
};
export declare function getAttachedSessionDirectory(attachment: SessionWorktreeAttachment | null | undefined, fallbackDirectory?: string | null): string | null;
export declare function buildAttachmentFromCanonicalization(canonical: WorktreeCanonicalizationResult, options?: SessionWorktreeCanonicalizationOptions): SessionWorktreeAttachment;
export declare function resolveSessionWorktreeState(input: ResolveSessionWorktreeStateInput): SessionWorktreeAttachment;
export declare function formatSessionWorktreeBadge(attachment: SessionWorktreeAttachment, labels?: {
    pending?: string;
    missing?: string;
}): string;
export type SessionWorktreeRepairAction = 'locate' | 'open-without-worktree-features';
export declare function getSessionWorktreeRepairActions(attachment: SessionWorktreeAttachment): SessionWorktreeRepairAction[];
export type MutationBlockingReason = {
    reason: 'attention';
    attentionReason: NonNullable<SessionWorktreeAttachment['attentionReason']>;
} | {
    reason: 'missing';
} | {
    reason: 'invalid';
} | {
    reason: 'dirty';
    dirtyFiles?: number;
};
export declare function getMutationBlockingReasons(attachment: SessionWorktreeAttachment | null | undefined, gitStatus?: {
    isClean?: boolean;
    files?: Array<{
        path: string;
    }>;
}): MutationBlockingReason[];
export type SessionTargetOption = {
    value: string;
    label: string;
    kind: 'root' | 'worktree';
    pending?: boolean;
};
export declare function buildSessionTargetOptions(input: {
    projectRoot: string;
    rootBranch: string;
    worktrees: Array<{
        path: string;
        branch: string;
        label: string;
        projectDirectory: string;
    }>;
    pendingBootstrapDirectory?: string | null;
}): SessionTargetOption[];
export {};
