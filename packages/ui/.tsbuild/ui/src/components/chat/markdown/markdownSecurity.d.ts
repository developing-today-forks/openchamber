/** Raw HTML stays inert; supported disclosures are constructed by the Markdown tokenizer. */
export declare const escapeRawMarkdownHtml: (value: string) => string;
/** Active elements forbidden again at the final DOMPurify boundary. */
export declare const MARKDOWN_FORBIDDEN_TAGS: readonly ['script', 'style'];
/**
 * Raw HTML a Markdown document keeps where a surface renders documents rather
 * than assistant output (the Files preview): roughly GitHub's allowlist. Author
 * styles, ids, data attributes, event handlers, forms and embeds are dropped;
 * a `video` stays, with controls and without autoplay.
 * The data attributes listed are the ones the Markdown renderer itself emits.
 */
export declare const DOCUMENT_HTML_ALLOWED_TAGS: readonly ['a', 'abbr', 'b', 'blockquote', 'br', 'code', 'dd', 'del', 'details', 'div', 'dl', 'dt', 'em', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hr', 'i', 'img', 'input', 'ins', 'kbd', 'li', 'mark', 'ol', 'p', 'picture', 'pre', 'q', 's', 'samp', 'source', 'span', 'strike', 'strong', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr', 'tt', 'ul', 'var', 'video'];
export declare const DOCUMENT_HTML_ALLOWED_ATTR: readonly ['align', 'alt', 'checked', 'class', 'colspan', 'controls', 'disabled', 'height', 'href', 'media', 'open', 'playsinline', 'preload', 'rel', 'rowspan', 'src', 'srcset', 'start', 'target', 'title', 'type', 'width', 'data-md-details', 'data-oc-math', 'data-openchamber-agent-mention', 'data-skill-name'];
export declare const isGeneratedMarkdownClass: (value: string) => boolean;
/** Every `srcset` candidate is a relative path or an http(s) URL. */
export declare const isSafeSrcset: (value: string) => boolean;
export declare const isLocalFileUrl: (value: string) => boolean;
