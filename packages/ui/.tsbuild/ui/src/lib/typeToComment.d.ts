/**
 * Type-to-comment: while a selection bubble offers Comment, a plain
 * keystroke opens the comment input and becomes its first character.
 * Returns that character, or null when the keystroke belongs to someone
 * else: shortcuts (any modifier but Shift), navigation and editing keys,
 * whitespace (Space still scrolls), dead keys and IME composition, and
 * typing that already goes into an editable field.
 */
export declare const getTypeToCommentText: (event: KeyboardEvent) => string | null;
