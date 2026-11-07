import type { FormRequest } from '@/lib/opencode/model';
/** Whether an option label carries the agent's "(recommended)" marker. */
export declare const isRecommendedOption: (label: string) => boolean;
/** The option label without the "(recommended)" marker; the card shows a badge instead. */
export declare const stripRecommendedMarker: (label: string) => string;
/**
 * Markdown, one section per field:
 *
 *   ## <title or key>
 *
 *   <description>
 *
 *   _Select all that apply._        (multiselect only)
 *
 *   - **<label>** — <description>   (options; description elided when blank)
 */
export declare function serializeFormAsMarkdown(form: FormRequest): string;
/**
 * A stable JSON envelope of the form's content: the transient `id` and
 * `sessionID` are local routing concerns and stay out.
 */
export declare function serializeFormAsJson(form: FormRequest): string;
