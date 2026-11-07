type PickerKeyEvent = Pick<KeyboardEvent, 'key' | 'code' | 'ctrlKey' | 'metaKey' | 'altKey' | 'shiftKey' | 'preventDefault' | 'stopPropagation'>;
/**
 * The composer's `#snippet` picker for a comment field. The host reports every
 * text or caret change through `sync`, gives its keydown to `handleKeyDown`
 * first, and renders `picker` inside the field's wrapper. The list itself is
 * portalled to the body with a fixed position: comment fields sit in glass
 * popovers (a nested backdrop filter renders transparent) and near window
 * edges, so it opens above or below the wrapper, wherever it fits. Choosing a snippet writes `#trigger ` over the typed query, the way
 * the composer does; expansion happens when the message is sent.
 */
export declare function useCommentSnippetPicker({ text, getCaret, replaceRange, }: {
    text: string;
    getCaret: () => number;
    /** Replace `[from, to)` with `insert` and leave the caret after it. */
    replaceRange: (from: number, to: number, insert: string) => void;
}): {
    sync: (value: string, caret: number) => void;
    close: () => void;
    handleKeyDown: (event: PickerKeyEvent) => boolean;
    picker: import("react/jsx-runtime").JSX.Element | null;
};
export {};
