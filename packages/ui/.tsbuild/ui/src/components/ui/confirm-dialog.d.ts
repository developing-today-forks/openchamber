type ConfirmRequest = {
    title: string;
    message: string;
    action: string;
    /** Label for declining, when declining still goes on without the action; defaults to Cancel. */
    decline?: string;
    /** The action discards something; its button reads as destructive. */
    destructive?: boolean;
};
/**
 * A yes-or-no question asked in the product's own dialog.
 *
 * Native `window.confirm` sits outside the page's focus tree: on Windows it can
 * leave Electron's renderer unable to accept text, and in a webview it does
 * not open at all. `confirm` resolves `true` for the action, `false` for cancel
 * or dismissal, and `false` when the owner unmounts while the question is
 * open, so a caller never waits on an answer nobody can give.
 */
export declare function useConfirmDialog(): {
    confirm: (next: ConfirmRequest) => Promise<boolean>;
    dialog: import("react/jsx-runtime").JSX.Element;
};
export {};
