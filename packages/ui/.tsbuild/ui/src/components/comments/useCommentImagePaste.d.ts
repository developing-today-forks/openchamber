/** Where a paste's citations go: replace `[from, to)` of the comment with `insertion`. */
interface CommentImageInsertion {
    from: number;
    to: number;
    insertion: string;
}
/**
 * Images pasted into a comment. The comment text gets a `[image-1.png]`
 * citation, the same one the composer writes for a pasted image; the image
 * itself joins the composer's attachments only when the comment is attached,
 * so a cancelled comment leaves nothing behind, and an image whose citation
 * was deleted from the text is dropped.
 */
export declare const useCommentImagePaste: () => {
    takePastedImages: (clipboardData: DataTransfer, value: string, selection: {
        start: number;
        end: number;
    }) => CommentImageInsertion | null;
    attachCitedImages: (commentText: string) => Promise<void>;
    discardPastedImages: () => void;
    pendingFilenames: Set<string>;
};
export type CommentImagePaste = ReturnType<typeof useCommentImagePaste>;
export {};
