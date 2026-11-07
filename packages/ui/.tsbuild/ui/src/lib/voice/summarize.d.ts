/**
 * Client-side text sanitization for TTS output.
 * Removes markdown, URLs, file paths, and other non-speakable content.
 * Applied as a fallback when server-side summarization is skipped.
 */
export declare function sanitizeForTTS(text: string): string;
/**
 * Appends a period to lines that end with a letter or digit. Browser
 * speechSynthesis and macOS `say` treat a bare line break as near-space, so
 * headings and list items without terminal punctuation run into the next
 * line; a period gives every engine a real sentence boundary.
 */
export declare function ensureLineTerminalPunctuation(text: string): string;
