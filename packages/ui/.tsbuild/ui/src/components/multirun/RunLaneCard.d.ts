import React from 'react';
import type { Session } from '@/lib/opencode/model';
import type { LaneSummary } from '@/lib/multirun/useLaneSummaries';
import type { LaneStatus } from '@/lib/multirun/laneStatus';
export type RunLaneCardProps = {
    session: Session;
    providerID: string;
    modelLabel: string;
    variantLabel: string | null;
    isFusion: boolean;
    busy: boolean;
    status: LaneStatus;
    /** The member has activity the user has not opened yet. */
    unread: boolean;
    summary: LaneSummary | undefined;
    /** Present while the fuse bar is open: whether this card is a fusion source. */
    fuseSource: {
        checked: boolean;
        selectable: boolean;
    } | null;
    hasWorktree: boolean;
    onToggleFuseSource: () => void;
    /** Offered on finished cards of an isolated run: keep this one, clean up the rest. */
    onKeep?: () => void;
    /** Leave the run as an ordinary session. */
    onDetach: () => void;
    /** Archive this member only; the rest of the run stays. */
    onArchive: () => void;
    actionsDisabled: boolean;
    onOpenChat: () => void;
    onOpenDiff: () => void;
};
export declare function RunLaneCard({ session, providerID, modelLabel, variantLabel, isFusion, busy, status, unread, summary, fuseSource, hasWorktree, onToggleFuseSource, onKeep, onDetach, onArchive, actionsDisabled, onOpenChat, onOpenDiff, }: RunLaneCardProps): React.ReactNode;
