/**
 * The composer's prompt language as a CodeMirror extension.
 *
 * `tokenizeComposer` already answers "what does this text mean"; this module
 * is the thin adapter that turns its ranges into mark decorations and keeps
 * them in sync with the document and with the workspace registries.
 *
 * Why this replaces the mirror overlay: a transparent textarea painted over a
 * mirror div can only use styles that do not change glyph advance width, or
 * the two layers drift apart and the caret lands in the wrong place. That is
 * why bold and italic were never highlighted, and why the overlay had to be
 * switched off entirely on mobile. CodeMirror owns the caret and the text, so
 * there is no second layer to keep aligned and no metric restriction.
 */
import { StateField } from '@codemirror/state';
import { Decoration, type DecorationSet } from '@codemirror/view';
import { type ComposerLanguageContext } from '../language/tokenize';
/**
 * Replace the workspace knowledge the tokenizer resolves against. Dispatched
 * when the agent, command, skill, snippet or attachment registries change —
 * not on every keystroke, which only changes the document.
 */
export declare const setLanguageContext: import("@codemirror/state").StateEffectType<ComposerLanguageContext>;
/**
 * Reuse the prompt's existing tokenization for both color and direction.
 * The composer already retokenizes on edits; bidi adds no second text scan.
 */
declare function buildDecorations(text: string, context: ComposerLanguageContext, typingEnd?: number | null): {
    highlights: import("@codemirror/state").RangeSet<Decoration>;
    chips: DecorationSet;
    isolates: DecorationSet;
};
type DecorationState = ReturnType<typeof buildDecorations> & {
    typingEnd: number | null;
};
/**
 * The composer language extension. Install once; feed it registry updates with
 * `setLanguageContext`.
 */
export declare function composerLanguage(initial?: ComposerLanguageContext): (StateField<DecorationState> | import("@codemirror/state").Extension)[];
export {};
