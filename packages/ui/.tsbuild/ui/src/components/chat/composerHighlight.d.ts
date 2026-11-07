/**
 * Markdown tokenizer for the chat composer.
 *
 * The composer paints a "source mode" look similar to GitHub's comment editor:
 * the constructs stay visible as text while their syntax punctuation dims and
 * their content takes on the shape it will have when rendered.
 *
 * The rule that shapes this file is which constructs are worth recognizing at
 * all. Emphasis delimiters collide with ordinary prose — `2 * 3`, `foo_bar` —
 * so they are matched only in positions where the collision cannot occur,
 * rather than wherever the character appears.
 *
 * (Until the editor moved to CodeMirror, highlighting also could not use any
 * style that changes glyph advance width: the composer was a transparent
 * textarea over a mirror div, and a bold span would slide the mirror out from
 * under the caret. That constraint is gone — emphasis is real weight and
 * slant now — but `className` values still have to be safe to apply to a
 * decoration, so avoid font-family and font-size.)
 */
type HighlightStyle = 'marker' | 'code' | 'codeFence' | 'link' | 'linkUrl' | 'heading' | 'blockquote' | 'listMarker' | 'strong' | 'emphasis' | 'attention' | 'path';
type MentionKind = 'file' | 'agent';
export interface HighlightRange {
    start: number;
    end: number;
    style: HighlightStyle | 'mentionFile' | 'mentionAgent' | 'mentionCommand' | 'mentionSnippet';
    /**
     * Optional explicit class, used by syntax highlighting where the style is
     * resolved dynamically (per language token) rather than from a fixed enum.
     * When set it overrides STYLE_CLASS[style]. Keep to properties that are
     * safe on an inline decoration: colour, background, decoration, weight and
     * slant are fine; font-family and font-size are not.
     */
    className?: string;
    /** Optional explicit priority; falls back to STYLE_PRIORITY[style]. */
    priority?: number;
}
export interface MentionRange {
    start: number;
    end: number;
    kind: MentionKind;
}
export interface HighlightPart {
    text: string;
    className: string;
}
/**
 * A resolved, non-overlapping stretch of text carrying exactly one class.
 * Offsets rather than text, so a decoration-based renderer (CodeMirror) can
 * consume the same resolution the mirror overlay does.
 */
export interface HighlightSegment {
    start: number;
    end: number;
    className: string;
}
export interface FenceOpen {
    /** The full opening fence run, e.g. "```" or "~~~~". */
    marker: string;
    /** First info-string token (the language), or '' when absent. */
    lang: string;
}
/** Recognize an opening code fence line (3+ backticks or tildes). */
export declare function matchFenceOpen(line: string): FenceOpen | null;
/**
 * A closing fence: the same fence character, at least as long as the opening
 * run, and nothing but whitespace after it — so a `` ```js `` line inside a
 * block is treated as content, not a close. Shared with highlightFencedCode so
 * both agree on fence boundaries.
 */
export declare function isFenceClose(line: string, openMarker: string): boolean;
export declare function tokenizeMarkdown(text: string): HighlightRange[];
/**
 * Flatten a set of (possibly overlapping) ranges into non-overlapping segments,
 * resolving each stretch to the highest-priority range covering it. This is the
 * shared resolution step: the mirror overlay turns segments into spans,
 * CodeMirror turns them into mark decorations, and both agree on what wins.
 *
 * Segments cover the whole text, including unstyled stretches, so callers can
 * reconstruct the input exactly.
 */
export declare function resolveHighlightSegments(text: string, ranges: HighlightRange[]): HighlightSegment[];
/**
 * Split `text` into styled parts for the mirror overlay. Returns null when
 * there is nothing to highlight so callers can skip the overlay entirely for
 * plain text.
 */
export declare function buildHighlightParts(text: string, ranges: HighlightRange[]): HighlightPart[] | null;
/** The class an unstyled stretch of composer text carries. */
export declare const DEFAULT_HIGHLIGHT_CLASS = "text-foreground";
export declare function mentionRangesToHighlightRanges(mentions: MentionRange[]): HighlightRange[];
export {};
