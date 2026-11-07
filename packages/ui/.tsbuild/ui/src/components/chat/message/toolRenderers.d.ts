import type { JsonValue } from '@/lib/opencode/model';
export declare const coerceToText: (value: unknown, fallback?: string) => string;
export declare const TOOL_OUTPUT_MAX_CHARS: number;
export declare const capToolOutputText: (output: string, maxChars?: number) => string;
declare const formatInputForDisplay: (input: Record<string, unknown>, toolName?: string) => string;
export declare const tryParseJsonOutput: (output: string) => {
    data: JsonValue;
    isJson: boolean;
};
/**
 * The text of a tool result made of text content blocks, joined on newlines.
 * A finished v2 tool call carries its result as `[{type:"text",text}]`, and
 * the transport may serialize that list once more, so the joined text is
 * unwrapped again while it is itself such a list, four passes at most
 * (issue #5067). Any other result returns null.
 */
export declare const unwrapTextBlocks: (data: JsonValue) => string | null;
export declare const formatEditOutput: (output: string, toolName: string, metadata?: Record<string, unknown>) => string;
interface ParsedReadOutputLine {
    text: string;
    lineNumber: number | null;
    isInfo: boolean;
}
interface ParsedReadToolOutput {
    type: 'file' | 'directory' | 'unknown';
    lines: ParsedReadOutputLine[];
}
export declare const parseReadToolOutput: (output: string) => ParsedReadToolOutput;
export declare const renderGrepOutput: (output: string, isMobile: boolean, options?: {
    unstyled?: boolean;
}) => import("react/jsx-runtime").JSX.Element | null;
export declare const renderGlobOutput: (output: string, isMobile: boolean, options?: {
    unstyled?: boolean;
}) => import("react/jsx-runtime").JSX.Element | null;
export declare const renderWebSearchOutput: (output: string, options?: {
    unstyled?: boolean;
}) => import("react/jsx-runtime").JSX.Element | null;
type DiffLineType = 'context' | 'added' | 'removed';
interface UnifiedDiffLine {
    type: DiffLineType;
    lineNumber: number | null;
    content: string;
}
interface UnifiedDiffHunk {
    file: string;
    oldStart: number;
    newStart: number;
    lines: UnifiedDiffLine[];
}
export declare const parseDiffToUnified: (diffText: string) => UnifiedDiffHunk[];
export declare const detectLanguageFromOutput: (output: string, toolName: string, input?: Record<string, unknown>) => string;
export { formatInputForDisplay };
