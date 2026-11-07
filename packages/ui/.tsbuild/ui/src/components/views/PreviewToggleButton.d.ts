import React from 'react';
type PreviewToggleButtonProps = {
    /** Current mode - determines which icon is displayed */
    currentMode: 'preview' | 'edit';
    /** Callback fired when toggle button is clicked */
    onToggle: () => void;
};
/**
 * PreviewToggleButton - A toggle button for switching between preview and edit modes.
 *
 * Displays an eye icon when in preview mode (indicating the content is visible/read-only)
 * and a slashed eye icon when in edit mode (indicating the content can be edited).
 */
export declare const PreviewToggleButton: React.FC<PreviewToggleButtonProps>;
export {};
