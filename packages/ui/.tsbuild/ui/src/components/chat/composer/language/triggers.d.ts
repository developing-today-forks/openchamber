/**
 * Which autocomplete a caret position asks for.
 *
 * The composer has four pickers (command, skill, snippet, file/agent mention)
 * and the rule that opens each of them used to be inlined in a single 90-line
 * `updateAutocompleteState` callback, duplicating the boundary logic that
 * `scanPrefixTokens` and `scanMentions` already own. This module answers the
 * one question the composer actually asks — "given the text and the caret,
 * what should be open?" — as a pure function, so the editor layer only has to
 * report the caret and render the result.
 *
 * Exactly one trigger can be active, and order matters: the command palette
 * (a leading `/`) outranks the skill picker (`$`, anywhere in the text), which
 * outranks snippets, which outrank mentions. Commands and skills use separate
 * sigils so the palette lists commands only.
 */
import { type FileMentionAutocompleteInputSource } from '../../fileMentionAutocompleteState';
export type AutocompleteKind = 'command' | 'skill' | 'snippet' | 'mention';
export interface AutocompleteTrigger {
    kind: AutocompleteKind;
    /** Text typed after the sigil, used to filter the picker. */
    query: string;
}
export interface TriggerContext {
    /** Shell mode (`!cmd`) disables every picker. */
    inputMode: 'normal' | 'shell';
    mentionsEnabled?: boolean;
    /** Whether the change that moved the caret came from a paste. */
    inputSource?: FileMentionAutocompleteInputSource;
    /** The text that change inserted, when known. */
    insertedText?: string;
}
/**
 * The `#snippet` query being typed at the caret, or null. For text fields that
 * offer only the snippet picker (comment inputs), with the composer's rule.
 */
export declare function matchSnippetTrigger(value: string, cursorPosition: number): string | null;
/**
 * Resolve the single autocomplete that the caret asks for, or null when none
 * applies. Pure: the caller supplies the text and caret, and decides what to
 * do with the answer.
 */
export declare function resolveAutocompleteTrigger(value: string, cursorPosition: number, context: TriggerContext): AutocompleteTrigger | null;
