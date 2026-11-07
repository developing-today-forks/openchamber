/**
 * Path handling for composer attachments and dropped files.
 *
 * Three representations meet here: what the user sees in the prompt (a
 * project-relative mention), what the OpenCode server is given (a `file://`
 * URL), and what a host application hands over on drop (a native path, a
 * percent-encoded URI, or a JSON payload with either buried inside).
 */
/**
 * Percent-encode a path for use in a `file://` URL, leaving separators intact
 * and preserving a Windows drive letter, which must not be encoded.
 */
export declare function encodeFilePath(filepath: string): string;
/** The `file://` URL the server resolves an attachment from. */
export declare function toServerFileUrl(filepath: string): string;
/** POSIX root, UNC share, or Windows drive letter. */
export declare function isLikelyAbsolutePath(value: string): boolean;
/**
 * Trim and unquote a candidate, returning it only if it actually looks like a
 * file reference. A multi-line value is rejected outright: it is a document,
 * not a path.
 */
export declare function toLikelyFileDropReference(value: string): string | null;
/**
 * Extract file references from a drop payload. Hosts disagree on the shape:
 * a bare path, a newline-separated URI list, or JSON with the paths nested
 * somewhere inside — so try the text directly, then line by line, then again
 * over every string found in the parsed JSON.
 */
export declare function parseDroppedFileReferences(rawPayload: string): string[];
/** Turn a dropped `file://` URI back into a plain path. */
export declare function normalizeDroppedPath(rawPath: string): string;
export { normalizePath } from '@/lib/pathNormalization';
/**
 * Express an absolute path relative to the project root, so the prompt carries
 * the path the user recognizes. Paths outside the root are left absolute.
 */
export declare function toProjectRelativeMentionPath(absolutePath: string, root: string): string;
/** Data transfer types VS Code uses when dragging from its explorer. */
export declare const VS_CODE_DROP_DATA_TYPES: string[];
