/**
 * The composer's prefix-token grammar: `/command`, `$skill` and `#snippet`.
 *
 * Structurally these are the same construct — a sigil at a word boundary
 * followed by an identifier — and they were previously scanned by three
 * different regexes per sigil (highlighting, send-time collection, and the
 * autocomplete trigger), each with its own idea of the valid character set.
 * The send-time skill scanner, for instance, accepted only lowercase names, so
 * a `My_Skill` token was painted but never collected.
 *
 * Scanning is deliberately generous: it finds every syntactically plausible
 * token and leaves the decision of what exists to the caller, which holds the
 * authoritative set of commands, skills or snippets. Membership is the
 * authority; the pattern is only a locator.
 *
 * @see mentions.ts for the `@` half of the grammar.
 */
/** Sigils that introduce a prefix token: commands, skills, snippets. */
export type TokenPrefix = '/' | '$' | '#';
export interface PrefixToken {
    /** Offset of the sigil. */
    start: number;
    /** Offset just past the identifier. */
    end: number;
    /** The sigil that introduced this token. */
    prefix: TokenPrefix;
    /** The identifier without its sigil. */
    name: string;
}
/**
 * Find every `prefix`-token in `text`. A token must sit at the start of the
 * text or directly after whitespace, so `a/b` and `#1` inside `issue#1` stay
 * ordinary prose.
 */
export declare function scanPrefixTokens(text: string, prefix: TokenPrefix): PrefixToken[];
/**
 * The tokens whose name is present in `known`, in document order. `compare`
 * decides how a token name is matched against the set — snippets and commands
 * both match case-insensitively, while the skill-instruction
 * builder matches the exact registered name.
 */
export declare function filterKnownTokens(tokens: readonly PrefixToken[], known: ReadonlySet<string>, compare?: 'exact' | 'case-insensitive'): PrefixToken[];
/**
 * Distinct names of the known `prefix`-tokens in `text`, in first-occurrence
 * order. Used to tell the model which skills the user named explicitly.
 */
export declare function collectKnownTokenNames(text: string, prefix: TokenPrefix, known: ReadonlySet<string>, compare?: 'exact' | 'case-insensitive'): string[];
