export declare const MESSAGE_IMAGE_EXPORT_EXCLUDE_ATTRIBUTE = "data-message-image-export-exclude";
export declare const cloneMessageImageExportSource: (source: HTMLElement) => HTMLElement;
/**
 * The image source for a whole turn: every text part its assistant messages
 * wrote, in order. Earlier steps may be folded away or not mounted, and part of
 * the last message can sit in Activity, so the text is rendered here from
 * Markdown with the classes and decoration the chat uses. `syntaxStyle` carries
 * the code colour variables the chat sets inline on its Markdown roots.
 */
export declare const buildTurnImageExportSource: (segments: readonly string[], syntaxStyle: string | null, renderMarkdownHtml?: (text: string) => Promise<string>) => Promise<HTMLElement>;
