import React from 'react';
interface FilePreviewCommentMenuProps {
    containerRef: React.RefObject<HTMLElement | null>;
    filePath: string;
    /** Raw file source, used to locate the selected fragment's line range. */
    fileContent: string;
}
/**
 * Comment-on-selection for read-only file previews (rendered markdown and the
 * like). Selecting text shows a small Comment pill above the selection;
 * choosing it opens the shared comment input, and attaching stores a
 * file-quote context draft carrying the selected fragment (with a best-effort
 * source line range) plus the user's comment.
 */
export declare function FilePreviewCommentMenu({ containerRef, filePath, fileContent }: FilePreviewCommentMenuProps): React.ReactPortal | null;
export {};
