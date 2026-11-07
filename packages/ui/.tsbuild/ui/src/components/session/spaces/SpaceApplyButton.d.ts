/**
 * The button in the desktop session header that opens the apply dialog of the space the open
 * session works in (journey step 6): the person looks at the chat when the agent
 * is done, not at the sidebar. The phone reaches the same dialog from the group's sheet. Nothing
 * for a host directory, while the feature is off, or in VS Code (decision 16).
 */
import React from 'react';
export declare const SpaceApplyButton: React.FC<{
    directory: string | null | undefined;
    className: string;
    iconClassName: string;
}>;
