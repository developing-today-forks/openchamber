/**
 * Normalize a directory path for consistent comparison.
 *
 * Handles Windows-specific path quirks:
 * - Converts backslashes to forward slashes
 * - Uppercases lowercase Windows drive letters (e.g., "c:\\" → "C:\\")
 * - Trims trailing slashes, preserving Unix and Windows drive roots
 *
 * Returns null for non-string inputs, null/undefined, empty strings,
 * whitespace-only strings, and paths that consist only of slashes
 * (e.g. "\\", "\\\\", "///").
 *
 * The drive letter regex is anchored (^([a-z]):) and matches only a
 * single lowercase letter, so it never affects multi-character tokens
 * (e.g., "abc:def"), URLs, or Windows `\\?\` device paths.
 */
export declare const normalizePath: (value?: string | null) => string | null;
/** Lexical parent of an already-normalized directory; filesystem roots have none. */
export declare const getNormalizedParentDirectory: (directory: string) => string | null;
/**
 * The directory key every terminal surface must agree on: the terminal store's
 * map keys, the server `cwd` values grouped from a session listing, and the
 * sidebar indicators. Empty when the value is not a usable path.
 */
export declare const normalizeTerminalDirectory: (value: string) => string;
