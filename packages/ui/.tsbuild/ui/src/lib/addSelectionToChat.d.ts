interface ActiveSelectionToolbarActions {
    addToChat: () => void;
    dismiss: () => void;
}
export declare const registerActiveSelectionToolbar: (actions: ActiveSelectionToolbarActions) => (() => void);
export declare const hasActiveSelectionToolbar: () => boolean;
export declare const getActiveSelectionToolbarVersion: () => number;
export declare const invokeActiveSelectionAddToChat: () => boolean;
export declare const dismissActiveSelectionToolbar: () => boolean;
/**
 * Capture the current non-composer selection as chat-ready markdown.
 * Returns null when nothing usable is selected.
 */
export declare const captureSelectionMarkdownForChat: () => string | null;
/**
 * Append the current selection to the chat composer.
 * When nothing is selected, focuses the chat input unless focusWhenEmpty is false.
 * Returns true when selected text was appended.
 */
export declare const addSelectionToChat: (options?: {
    focusWhenEmpty?: boolean;
}) => boolean;
export {};
