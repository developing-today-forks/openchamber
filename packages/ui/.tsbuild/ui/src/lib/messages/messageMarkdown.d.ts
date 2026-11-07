import type { Metadata, Part } from '@/lib/opencode/model';
/** Preserve both the source and the reply when a model context needs a limit. */
export declare function excerptMarkdown(text: string, limit: number): string;
/**
 * The model-facing text of a message's own parts. Attached context is no
 * longer a part — it arrives as its own synthetic message — so render it with
 * `formatContextMessage`.
 */
export declare function formatMessageText(parts: readonly Part[], options?: {
    user?: boolean;
    fieldLimit?: number;
}): string;
/** One attached context item (a synthetic message) as model-facing Markdown. */
export declare function formatContextMessage(message: {
    text: string;
    metadata?: Metadata;
}, fieldLimit?: number): string;
