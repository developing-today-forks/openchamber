/**
 * One session notice (`@/lib/opencode/session-notices`): a folded line with an
 * info icon and what happened, opening to the text the model received. It
 * draws the same inside a turn's Activity and between turns.
 */
import React from 'react';
import type { SessionNotice } from '@/lib/opencode/session-notices';
export declare const SessionNoticeBlock: React.FC<{
    notice: SessionNotice;
    blockId: string;
}>;
