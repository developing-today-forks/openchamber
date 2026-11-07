/**
 * One isolated space as the lists of spaces show it (journey step 9): the project's
 * spaces page, the spaces without a project in Settings, and the phone's project editor. Its name,
 * its network, the status line its group in the sidebar has, and the same two actions as the group:
 * the grant dialog's key and the actions, a menu on the desktop and the sheet on the phone. A space
 * whose project is no longer registered also names the folder it was made for.
 */
import React from 'react';
import type { SpaceEntry } from '@/lib/spaces/spaces-api';
export declare const SpaceRow: React.FC<{
    entry: SpaceEntry;
    /** The phone opens the actions as a sheet, where the desktop has a menu. */
    actions: 'menu' | 'sheet';
    /** For a space whose project is no longer registered: where it came from. */
    showFolder?: boolean;
}>;
