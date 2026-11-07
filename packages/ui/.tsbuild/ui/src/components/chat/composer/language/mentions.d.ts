/**
 * The composer's `@mention` grammar — the single source of truth for what an
 * `@token` means.
 *
 * Before this module the same rule was re-implemented four times inside
 * ChatInput.tsx with subtly different cleanup (highlighting, send-time
 * extraction, deletion, and the autocomplete trigger). Each new reference
 * type had to be taught to all four. Everything
 * that needs to know where mentions are now scans with `scanMentions` and
 * decides what they are with `classifyMention`.
 *
 * A mention is `@` at a token boundary followed by non-whitespace. The visible
 * span (`start`..`end`) covers the raw token including any punctuation that
 * merely brushes against it; `name` is that token cleaned of wrapping
 * punctuation, and is what gets matched against agents and file paths.
 */
export interface MentionToken {
    /** Offset of the `@`. */
    start: number;
    /**
     * Offset just past the reference itself — the `@` plus the cleaned name.
     * This is the span to highlight: in `see @a/b.ts, ok` the comma is
     * punctuation of the sentence, not part of the file being referenced.
     */
    end: number;
    /** The raw token including `@` and any brushing punctuation. */
    raw: string;
    /** The token with `@` and wrapping punctuation removed. */
    name: string;
}
/** True when `@` at `index` starts a mention rather than continuing a word. */
export declare function isMentionBoundary(text: string, index: number): boolean;
/** Strip the punctuation that wraps a mention without belonging to it. */
export declare function cleanMentionName(rawName: string): string;
/**
 * Find every `@mention` in `text`. Tokens whose name cleans away to nothing
 * (a bare `@`, `@...`) are skipped — there is nothing to reference.
 *
 * `confirmedMentions` lets a path the picker inserted keep its spaces:
 * `@docs/my document.md` is one mention when that path was confirmed, while an
 * unconfirmed `@docs/my document.md` still stops at the first space.
 */
export declare function scanMentions(text: string, confirmedMentions?: ReadonlySet<string>): MentionToken[];
export type MentionKind = 'agent' | 'file';
export interface MentionClassifier {
    /** Lowercased names of the agents that can be mentioned. */
    knownAgentNames: ReadonlySet<string>;
    /** Mention paths confirmed by the picker, a drop, or a restored draft. */
    confirmedMentions: ReadonlySet<string>;
}
/**
 * A name looks like a file when it carries path structure (a separator or an
 * extension) or when the user confirmed it explicitly through the picker.
 * Agents win over files: an agent name is an exact, known identifier.
 */
export declare function classifyMention(name: string, classifier: MentionClassifier): MentionKind | null;
export declare function looksLikeFilePath(name: string, confirmedMentions: ReadonlySet<string>): boolean;
