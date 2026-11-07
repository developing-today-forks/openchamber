import type { Part } from '@/lib/opencode/model';
/** The non-empty text parts of an assistant message, trimmed, in order. Tool and reasoning parts are left out. */
export declare const assistantTextSegments: (parts: Part[]) => string[];
export declare const flattenAssistantTextParts: (parts: Part[]) => string;
export declare const flattenUserTextParts: (parts: Part[]) => string;
export declare const suggestPlanTitleFromText: (text: string) => string;
