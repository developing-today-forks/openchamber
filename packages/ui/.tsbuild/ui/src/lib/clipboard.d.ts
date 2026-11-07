export type ClipboardCopyResult = {
    ok: true;
    method: 'clipboard' | 'execCommand';
} | {
    ok: false;
    error: string;
};
export declare function copyTextToClipboard(text: string): Promise<ClipboardCopyResult>;
/** Reads clipboard text. Call it from the click itself: browsers only allow reads during a user gesture. */
export declare function readClipboardText(): Promise<string>;
export declare function copyMarkdownToClipboard(markdown: string, html: string, options?: {
    plainText?: string;
}): Promise<ClipboardCopyResult>;
