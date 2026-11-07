import React from 'react';
/** Recent-sessions popover under the mobile header, opened by tapping the
    session title. Same visual family as the metadata/usage overlay. */
export declare const MobileSessionSwitcher: React.FC<{
    open: boolean;
    onClose: () => void;
    anchorRef: React.RefObject<HTMLElement | null>;
}>;
