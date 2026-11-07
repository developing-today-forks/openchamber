import React from 'react';
import { SessionFolderItem } from '../../SessionFolderItem';
import type { SessionNode } from '../types';
type Props = React.ComponentProps<typeof SessionFolderItem<SessionNode>> & {
    notifyOnSubtasks: boolean;
    activityNodes: readonly SessionNode[];
};
/** Keep activity subscriptions on the mounted folder row, not the entire list. */
export declare function SessionSidebarFolderItem({ notifyOnSubtasks, activityNodes, ...props }: Props): React.ReactNode;
export {};
