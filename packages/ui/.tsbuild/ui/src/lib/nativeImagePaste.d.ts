declare const IMAGE_PASTE_FAILURES: readonly ['unreadable', 'too-large', 'unsupported-type'];
export type NativeImagePasteFailure = (typeof IMAGE_PASTE_FAILURES)[number];
export type NativeImagePaste = {
    ok: true;
    file: File;
} | {
    ok: false;
    reason: NativeImagePasteFailure;
};
/**
 * Narrows the declaration to the composer: the WebView is one input connection for every
 * editable element, so without this an image pasted into any other field would be offered and
 * then routed into a chat draft the user never targeted. Turning it on also makes the shell
 * re-read it, since the IME reads it at focus time and that can be before this call arrives.
 */
export declare const setNativeImagePasteEnabled: (enabled: boolean) => void;
/** Unsubscribe, and a no-op outside the Android app. */
export declare const subscribeToNativeImagePastes: (handler: (paste: NativeImagePaste) => void) => (() => void);
export {};
