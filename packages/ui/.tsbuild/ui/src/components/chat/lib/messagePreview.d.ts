import type { Part } from '@/lib/opencode/model';
import type { I18nKey, I18nParams } from '@/lib/i18n';
type Translate = (key: I18nKey, params?: I18nParams) => string;
export declare function getFullText(parts: Part[]): string;
/**
 * The text a user prompt shows in navigators: what the user typed, and — for
 * messages that are only attached context (a quoted message, a terminal
 * selection) — a label derived from that context, so such turns are never
 * label-less. Without a translator it falls back to the raw part text.
 */
export declare function getPromptPreviewText(parts: Part[], t?: Translate): string;
export declare function getMessagePreview(parts: Part[], maxLength?: number, t?: Translate): string;
export {};
