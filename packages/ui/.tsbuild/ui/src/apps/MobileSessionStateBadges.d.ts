import React from 'react';
import type { Session } from '@/lib/opencode/model';
import type { PendingRequests } from './usePendingRequests';
/** The goal glyph the desktop sidebar shows, tinted by the goal's status. */
export declare const MobileSessionGoalGlyph: React.FC<{
    session: Session;
}>;
/** The permission and question badges the desktop sidebar shows. */
export declare const MobileSessionPendingBadges: React.FC<PendingRequests>;
