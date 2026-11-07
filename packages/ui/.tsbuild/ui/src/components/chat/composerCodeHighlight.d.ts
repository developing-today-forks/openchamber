/**
 * Per-language syntax highlighting for fenced code blocks in the chat composer.
 *
 * Reuses the editor's CodeMirror language resolver and Lezer parsers so a
 * ```bash / ```ts block in the composer is colored the same way it is in the
 * file editor and in rendered messages. Output is fed into the composer's
 * highlight overlay (see composerHighlight.ts), which sits behind a transparent
 * <textarea>; the overlay may only change color / decoration / background, never
 * glyph metrics, so every token class below is color-only.
 *
 * Only languages the resolver returns synchronously are highlighted. Unknown or
 * lazily-loaded languages fall back to the uniform `codeFence` styling.
 */
import { type HighlightRange } from './composerHighlight';
/**
 * Produce syntax-token highlight ranges for every fenced code block in `text`
 * whose language can be resolved synchronously. An unterminated block (still
 * being typed) is highlighted up to the end of the text.
 */
export declare function highlightFencedCode(text: string): HighlightRange[];
