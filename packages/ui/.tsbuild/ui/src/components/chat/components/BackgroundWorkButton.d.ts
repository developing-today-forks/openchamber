import React from 'react';
/**
 * "Move to background" for the work the agent is blocked on. Shared by the
 * status chip above the composer and the scroll-to-bottom pill that stands in
 * for it, so both carry the same action, label and shortcut.
 */
export declare const BackgroundWorkButton: React.FC<{
    onClick: () => void;
    className?: string;
}>;
