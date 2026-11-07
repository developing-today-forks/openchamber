import type { ToolPopupContent } from '../message/types';
type InlineMarkdownImageOptions = {
    container: HTMLElement;
    sessionId: string;
    messageId: string;
    directory: string;
    apiBaseUrl: string;
    /** VS Code reads workspace images through its filesystem bridge instead of the grant route. */
    useWorkspaceFsBridge: boolean;
    onShowPopup: (content: ToolPopupContent) => void;
};
/** Draws the settled message's images in place of their labels; returns the cleanup. */
export declare const attachInlineMarkdownImages: (options: InlineMarkdownImageOptions) => (() => void);
export {};
