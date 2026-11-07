import type { Part } from '@/lib/opencode/model';
import type { TimeFormatPreference } from '@/stores/useUIStore';
export declare const derivePartsLabel: (parts: Part[]) => string;
/**
 * Returns the trailing `length` characters of a message id. Used because all
 * ids share the same long prefix and only the suffix is distinguishable.
 */
export declare const truncateMessageId: (id: string, length?: number) => string;
/**
 * Derive the inline snippet shown after `user:` on a user-row in the
 * Raw Messages preview. Returns the cleaned text of the first non-empty
 * text part, or `<N attachment[s]>` when the message carries no text
 * (e.g. file-only messages). Returns empty string when the message has
 * no parts at all.
 */
export declare const deriveUserSnippet: (parts: Part[]) => string;
/**
 * Format the assistant token counters as `<input> / <output>`. Both zero
 * still renders as `0 / 0` so streaming-not-started messages stay visible
 * in the column instead of disappearing.
 */
export declare const formatAssistantTokens: (input: number, output: number, formatNumber: (value: number) => string) => string;
/**
 * Format a message timestamp for the Raw Messages preview row.
 *
 * Mirrors the original short "MM/DD HH:MM" shape but honors the user's
 * `timeFormatPreference` setting. In 24h mode no AM/PM is rendered.
 */
export declare const formatMessagePreviewTime: (timestamp: number | null, preference: TimeFormatPreference) => string;
