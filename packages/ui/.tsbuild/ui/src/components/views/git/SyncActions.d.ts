import React from 'react';
import type { GitRemote } from '@/lib/gitApi';
type SyncAction = 'fetch' | 'pull' | 'sync' | 'publish' | null;
interface SyncActionsProps {
    syncAction: SyncAction;
    remotes: GitRemote[];
    onFetch: (remote: GitRemote) => void;
    onPull: (remote: GitRemote) => void;
    onSync: (remote: GitRemote) => void;
    onPublish: () => void;
    onChooseSyncTargets: () => void;
    currentBranch?: string;
    hasTracking?: boolean;
    onRemoveRemote?: (remote: GitRemote) => void;
    disabled: boolean;
    removingRemoteName?: string | null;
    iconOnly?: boolean;
    aheadCount?: number;
    behindCount?: number;
    trackingRemoteName?: string;
    trackingBranch?: string | null;
    /** Changes to tracked files; untracked files do not block a rebase. */
    hasUncommittedChanges?: boolean;
    /** A contributor's fork worktree: pushing opens a choice of where to. */
    choosesPushDestination?: boolean;
}
export declare const SyncActions: React.FC<SyncActionsProps>;
export {};
