export type ComposerInputRedirect = {
    /** Remembers the chat the user last clicked or focused into. */
    rememberColumn: (event: Event) => void;
    /** Sends a printable key with no text field focused to the composer. */
    redirectKey: (event: KeyboardEvent) => boolean;
    /** Sends a paste with no text field focused to the composer. */
    redirectPaste: (event: ClipboardEvent) => boolean;
    /** Puts the caret back in the composer when the window regains focus. */
    refocusAfterWindowFocus: () => void;
};
/**
 * The composer that receives redirected input: a chat pinned in the side
 * panel when the user last clicked or focused into it, the main chat's
 * otherwise.
 */
export declare function createComposerInputRedirect(): ComposerInputRedirect;
