import React from 'react';
type MarkdownPreviewSearchProps = {
    /** The scrollable preview container whose rendered text is searched. */
    containerRef: React.RefObject<HTMLDivElement | null>;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    /** Bumped every time the find shortcut is pressed to re-focus the input. */
    focusNonce: number;
    /** Layout overrides for the floating bar (position, offsets). */
    className?: string;
};
export declare const MarkdownPreviewSearch: React.FC<MarkdownPreviewSearchProps>;
export {};
